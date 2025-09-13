import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import Button from "../../general/Button";
import { FaPlus } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CustomDatePicker from "../../general/CustomDatePicker";

// Interfaces and sample data
interface PurchaseItem {
  item: string;
  batchNo?: string;
  expDate?: string;
  unitQty: number;
  unit: string;
  subUnitQty: number;
  subUnit: string;
  testQty?: number;
  mrpQty: number;
  rateQty: number;
  netAmt: number;
  disPercent?: number;
  disAmount?: number;
  cgst: number;
  sgst: number;
  igst?: number;
  amount: number;
}

interface FormInputs {
  vendor: string;
  invoiceNo: string;
  purchaseType: string;
  purchaseOrderId?: string;
  note?: string;
  paymentTerms?: string;
  item: string;
  batchNo?: string;
  expDate?: string;
  unitQty: number;
  unit: string;
  subUnitQty: number;
  subUnit: string;
  testQty?: number;
  mrpQty: number;
  rateQty: number;
  netAmt: number;
  disPercent?: number;
  disAmount?: number;
  cgst: number;
  sgst: number;
  igst?: number;
  amount: number;
}

interface Totals {
  subTotal: number;
  cgstAmt: number;
  sgstAmt: number;
  igstAmt: number;
  discount: number;
  total: number;
}

const vendorList = ["Vendor A", "Vendor B", "Vendor C"];
const itemUnits = {
  "Item A": { unit: "Pcs", subUnit: "Box" },
  "Item B": { unit: "Kg", subUnit: "Packet" },
  "Item C": { unit: "Ltr", subUnit: "Bottle" },
};

const AddPurchaseForm = () => {
  const [items, setItems] = useState<PurchaseItem[]>([]);
  const [purchaseType, setPurchaseType] = useState("");
  const [discountType, setDiscountType] = useState<"rs" | "percent">("rs");
  const [discountValue, setDiscountValue] = useState(0);
  const [totals, setTotals] = useState<Totals>({
    subTotal: 0,
    cgstAmt: 0,
    sgstAmt: 0,
    igstAmt: 0,
    discount: 0,
    total: 0,
  });

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  // Watch for changes in Unit Qty, Rate, and GST fields to update Amount
  const unitQty = watch("unitQty");
  const rateQty = watch("rateQty");
  const cgst = watch("cgst");
  const sgst = watch("sgst");
  const igst = watch("igst");
  const disPercent = watch("disPercent");
  const disAmount = watch("disAmount");

  // Automatically calculate netAmt and amount whenever relevant fields change
  useEffect(() => {
    const unitQtyVal = Number(unitQty) || 0;
    const rateQtyVal = Number(rateQty) || 0;
    const cgstVal = Number(cgst) || 0;
    const sgstVal = Number(sgst) || 0;
    const igstVal = Number(igst) || 0;
    const disPercentVal = Number(disPercent) || 0;
    const disAmountVal = Number(disAmount) || 0;

    const netAmount = unitQtyVal * rateQtyVal;
    setValue("netAmt", netAmount);

    const discountFromPercent = netAmount * (disPercentVal / 100);
    const totalDiscount = disAmountVal > 0 ? disAmountVal : discountFromPercent;

    const taxableAmount = netAmount - totalDiscount;

    const cgstAmt = (taxableAmount * cgstVal) / 100;
    const sgstAmt = (taxableAmount * sgstVal) / 100;
    const igstAmt = (taxableAmount * igstVal) / 100;

    const finalAmount = taxableAmount + cgstAmt + sgstAmt + igstAmt;

    setValue("amount", finalAmount);
  }, [unitQty, rateQty, cgst, sgst, igst, disPercent, disAmount, setValue]);

  // Set Unit and Sub Unit based on selected item
  useEffect(() => {
    const selectedItem = getValues("item");
    const units = itemUnits[selectedItem as keyof typeof itemUnits];
    if (units) {
      setValue("unit", units.unit);
      setValue("subUnit", units.subUnit);
    } else {
      setValue("unit", "");
      setValue("subUnit", "");
    }
  }, [watch("item"), setValue, getValues]);

  // Add item to list
  const addItem = () => {
    const newItem = getValues() as PurchaseItem;
    if (
      !newItem.item ||
      !newItem.unitQty ||
      !newItem.unit ||
      !newItem.subUnitQty ||
      !newItem.subUnit ||
      !newItem.mrpQty ||
      !newItem.rateQty ||
      !newItem.netAmt ||
      !newItem.cgst ||
      !newItem.sgst
    ) {
      alert("Please fill in all required fields for the item.");
      return;
    }
    setItems((prev) => [newItem, ...prev]);
    reset({
      ...getValues(),
      item: "",
      batchNo: "",
      expDate: "",
      unitQty: 0,
      subUnitQty: 0,
      mrpQty: 0,
      rateQty: 0,
      netAmt: 0,
      disPercent: 0,
      disAmount: 0,
      cgst: 0,
      sgst: 0,
      igst: 0,
      amount: 0,
    });
  };
  

  // Delete item from the list
  const deleteItem = (indexToDelete: number) => {
    setItems((prev) => prev.filter((_, index) => index !== indexToDelete));
  };

  // Handle form submission
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (items.length === 0) {
      alert("Please add at least one item to the purchase entry.");
      return;
    }
    const finalData = {
      ...data,
      items,
      totals,
    };
    console.log("Form Submitted:", finalData);
    alert("form submitted succesfully")
  };

  // Calculate totals
  useEffect(() => {
    if (items.length === 0) {
      setTotals({
        subTotal: 0,
        cgstAmt: 0,
        sgstAmt: 0,
        igstAmt: 0,
        discount: 0,
        total: 0,
      });
      return;
    }
    let subTotal = 0,
      cgstAmt = 0,
      sgstAmt = 0,
      igstAmt = 0;

    items.forEach((item) => {
      const amt = item.netAmt || 0;
      subTotal += amt;

      // Calculate GST amounts based on taxable value (netAmt)
      const taxableAmt =
        amt - ((item.disPercent ? amt * (item.disPercent / 100) : 0) + (item.disAmount || 0));
      cgstAmt += (taxableAmt * (item.cgst || 0)) / 100;
      sgstAmt += (taxableAmt * (item.sgst || 0)) / 100;
      igstAmt += (taxableAmt * (item.igst || 0)) / 100;
    });

    let overallDiscount =
      discountType === "percent"
        ? (subTotal * discountValue) / 100
        : discountValue;

    const total = subTotal + cgstAmt + sgstAmt + igstAmt - overallDiscount;

    setTotals({
      subTotal,
      cgstAmt,
      sgstAmt,
      igstAmt,
      discount: overallDiscount,
      total,
    });
  }, [items, discountType, discountValue]);

  return (
    <div className="pl-2 mb-4">
      <h2 className="text-2xl font-bold text-[#035d67] mb-6 bg-[var(--base-color)] p-2">
        ADD PURCHASE ENTRY
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Header Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-12">
          {/* Date */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={new Date().toLocaleString()}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
            />
          </div>
          {/* Vendor */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Vendor <span className="text-red-500">*</span>
            </label>
            <select
              {...register("vendor", { required: "Vendor is required" })}
              className={`w-full border rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
                errors.vendor ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Vendor</option>
              {vendorList.map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
            {errors.vendor && (
              <p className="text-red-500 text-xs mt-1">
                {errors.vendor.message}
              </p>
            )}
          </div>
          {/* Invoice No */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Invoice No <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("invoiceNo", { required: "Invoice No is required" })}
              className={`w-full border rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
                errors.invoiceNo ? "border-red-500" : "border-gray-300"
              }`}
            />
            {errors.invoiceNo && (
              <p className="text-red-500 text-xs mt-1">
                {errors.invoiceNo.message}
              </p>
            )}
          </div>
          {/* Purchase Type */}
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Purchase Type <span className="text-red-500">*</span>
            </label>
            <select
              {...register("purchaseType", {
                required: "Purchase Type is required",
              })}
              onChange={(e) => setPurchaseType(e.target.value)}
              className={`w-full border rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
                errors.purchaseType ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select Type</option>
              <option value="Cash">Direct Purchase</option>
              <option value="Credit">Indirect Purchase</option>
            </select>
            {errors.purchaseType && (
              <p className="text-red-500 text-xs mt-1">
                {errors.purchaseType.message}
              </p>
            )}
          </div>
          {/* Purchase Order ID */}
          {purchaseType === "Credit" && (
            <div className="w-full">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Purchase Order ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                {...register("purchaseOrderId", {
                  required: "Purchase Order ID is required",
                })}
                placeholder="Enter PO ID"
                className={`w-full border rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
                  errors.purchaseOrderId ? "border-red-500" : "border-gray-300"
                }`}
              />
              {errors.purchaseOrderId && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.purchaseOrderId.message}
                </p>
              )}
            </div>
          )}
        </div>
        {/* Table Header */}
        <div className="overflow-auto border rounded">
          <table className="min-w-[2500px] w-full border-collapse text-sm">
            <thead className="bg-[var(--base-color)] text-gray-900">
              <tr>
                {[
                  { label: "Item", required: true },
                  { label: "Batch No" },
                  { label: "Exp. Date" },
                  { label: "Unit Qty", required: true },
                  { label: "Unit", required: true },
                  { label: "Sub Unit Qty", required: true },
                  { label: "Sub Unit", required: true },
                  { label: "Test QTY" },
                  { label: "MRP/QTY", required: true },
                  { label: "Rate/QTY", required: true },
                  { label: "Net Amt.", required: true },
                  { label: "Dis(%)" },
                  { label: "Dis(₹)" },
                  { label: "CGST", required: true },
                  { label: "SGST", required: true },
                  { label: "IGST" },
                  { label: "Amount", required: true },
                  { label: "" },
                ].map((col, i) => (
                  <th
                    key={i}
                    className="border px-2 py-1 text-center whitespace-nowrap"
                  >
                    {col.label} {col.required && <span className="text-red-500">*</span>}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* Input Row for New Item */}
              <tr>
                <td className="border p-1">
                  <input
                    {...register("item", { required: items.length===0? "Item is required":false })}
                    list="itemsList"
                    className={`w-70 border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
                      errors.item ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  <datalist id="itemsList">
                    {Object.keys(itemUnits).map((item) => (
                      <option key={item} value={item} />
                    ))}
                  </datalist>
                  {errors.item && (
                    <p className="text-red-500 text-xs">
                      {errors.item.message}
                    </p>
                  )}
                </td>
                <td className="border p-1">
                  <input
                    {...register("batchNo")}
                    className="w-50 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
                  />
                </td>
                <td className="border border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm">
                  <CustomDatePicker />
                </td>
                <td className="border p-1">
                  <input
                    type="number"
                    {...register("unitQty", {
                      required: "Unit Qty is required",
                      valueAsNumber: true,
                    })}
                    className={`w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
                      errors.unitQty ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.unitQty && (
                    <p className="text-red-500 text-xs">
                      {errors.unitQty.message}
                    </p>
                  )}
                </td>
                <td className="border p-1">
                  <input
                    type="text"
                    {...register("unit", { required: items.length===0? "Unit is required":false })}
                    readOnly
                    className={`w-full border rounded px-2 py-1 bg-gray-100 cursor-not-allowed ${
                      errors.unit ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.unit && (
                    <p className="text-red-500 text-xs">
                      {errors.unit.message}
                    </p>
                  )}
                </td>
                <td className="border p-1">
                  <input
                    type="number"
                    {...register("subUnitQty", {
                      required: "Sub Unit Qty is required",
                      valueAsNumber: true,
                    })}
                    className={`w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
                      errors.subUnitQty ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.subUnitQty && (
                    <p className="text-red-500 text-xs">
                      {errors.subUnitQty.message}
                    </p>
                  )}
                </td>
                <td className="border p-1">
                  <input
                    type="text"
                    {...register("subUnit", {
                      required: items.length===0? "Sub Unit is required":false,
                    })}
                    readOnly
                    className={`w-full border rounded px-2 py-1 bg-gray-100 cursor-not-allowed ${
                      errors.subUnit ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.subUnit && (
                    <p className="text-red-500 text-xs">
                      {errors.subUnit.message}
                    </p>
                  )}
                </td>
                <td className="border p-1">
                  <input
                    type="number"
                    {...register("testQty", { valueAsNumber: true })}
                    className="w-24 border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="number"
                    {...register("mrpQty", {
                      required: "MRP is required",
                      valueAsNumber: true,
                    })}
                    className={`w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
                      errors.mrpQty ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.mrpQty && (
                    <p className="text-red-500 text-xs">
                      {errors.mrpQty.message}
                    </p>
                  )}
                </td>
                <td className="border p-1">
                  <input
                    type="number"
                    {...register("rateQty", {
                      required: "Rate is required",
                      valueAsNumber: true,
                    })}
                    className={`w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
                      errors.rateQty ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.rateQty && (
                    <p className="text-red-500 text-xs">
                      {errors.rateQty.message}
                    </p>
                  )}
                </td>
                <td className="border p-1">
                  <input
                    type="number"
                    {...register("netAmt", {
                      required: "Net Amount is required",
                      valueAsNumber: true,
                    })}
                    readOnly
                    className={`w-full border rounded px-2 py-1 bg-gray-100 cursor-not-allowed ${
                      errors.netAmt ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.netAmt && (
                    <p className="text-red-500 text-xs">
                      {errors.netAmt.message}
                    </p>
                  )}
                </td>
                <td className="border p-1">
                  <input
                    type="number"
                    {...register("disPercent", { valueAsNumber: true })}
                    className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="number"
                    {...register("disAmount", { valueAsNumber: true })}
                    className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="number"
                    {...register("cgst", {
                      required: "CGST is required",
                      valueAsNumber: true,
                    })}
                    className={`w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
                      errors.cgst ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.cgst && (
                    <p className="text-red-500 text-xs">
                      {errors.cgst.message}
                    </p>
                  )}
                </td>
                <td className="border p-1">
                  <input
                    type="number"
                    {...register("sgst", {
                      required: "SGST is required",
                      valueAsNumber: true,
                    })}
                    className={`w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
                      errors.sgst ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.sgst && (
                    <p className="text-red-500 text-xs">
                      {errors.sgst.message}
                    </p>
                  )}
                </td>
                <td className="border p-1">
                  <input
                    type="number"
                    {...register("igst", { valueAsNumber: true })}
                    className="w-full border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
                  />
                </td>
                <td className="border p-1">
                  <input
                    type="number"
                    {...register("amount", {
                      required: "Amount is required",
                      valueAsNumber: true,
                    })}
                    readOnly
                    className={`w-full border rounded px-2 py-1 bg-gray-100 cursor-not-allowed ${
                      errors.amount ? "border-red-500" : "border-gray-300"
                    }`}
                  />
                  {errors.amount && (
                    <p className="text-red-500 text-xs">
                      {errors.amount.message}
                    </p>
                  )}
                </td>
                <td className="border p-1 text-center">
                  <Button
                    type="button"
                    onClick={addItem}
                    bgcolor=""
                    border="border-3 border-[--var(--base-color)]"
                    textColor="text-blue-800"
                    hover="hover:text-blue-600"
                    icon={<FaPlus />}
                  />
                </td>
              </tr>
              {/* Render Added Items */}
              {items.map((item, index) => (
                <tr key={index} className="bg-gray-100">
                  <td className="border p-1 text-center">{item.item}</td>
                  <td className="border p-1 text-center">{item.batchNo}</td>
                  <td className="border p-1 text-center">{item.expDate}</td>
                  <td className="border p-1 text-center">{item.unitQty}</td>
                  <td className="border p-1 text-center">{item.unit}</td>
                  <td className="border p-1 text-center">{item.subUnitQty}</td>
                  <td className="border p-1 text-center">{item.subUnit}</td>
                  <td className="border p-1 text-center">{item.testQty}</td>
                  <td className="border p-1 text-center">{item.mrpQty}</td>
                  <td className="border p-1 text-center">{item.rateQty}</td>
                  <td className="border p-1 text-center">{item.netAmt.toFixed(2)}</td>
                  <td className="border p-1 text-center">{item.disPercent}</td>
                  <td className="border p-1 text-center">{item.disAmount}</td>
                  <td className="border p-1 text-center">{item.cgst}</td>
                  <td className="border p-1 text-center">{item.sgst}</td>
                  <td className="border p-1 text-center">{item.igst}</td>
                  <td className="border p-1 text-center">{item.amount.toFixed(2)}</td>
                  <td className="border p-1 text-center">
                    <Button
                      type="button"
                      onClick={() => deleteItem(index)}
                      bgcolor=""
                      border="border-3"
                      textColor="text-red-500"
                      hover="hover:text-red-700"
                      icon={<MdOutlineDeleteForever />}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* Note & Payment */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          <div className="col-span-1">
            <textarea
              {...register("note")}
              placeholder="Note"
              className="border border-gray-300 rounded p-2 w-full h-20 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            />
          </div>
          <div className="col-span-1">
            <select
              {...register("paymentTerms")}
              className="border border-gray-300 rounded p-2 w-full h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            >
              <option value="">Select Payment Term</option>
              <option value="Cash">Cash</option>
              <option value="Credit">Online</option>
            </select>
          </div>
        </div>
        {/* Total Calculations */}
        <div className="mt-6 space-y-3 w-full flex justify-end">
          <div className="grid grid-cols-1 md:grid-rows-6 gap-1">
            {[
              { label: "SUB TOTAL", value: totals.subTotal },
              { label: "CGST Amount", value: totals.cgstAmt },
              { label: "SGST Amount", value: totals.sgstAmt },
              { label: "IGST Amount", value: totals.igstAmt },
            ].map(({ label, value }, i) => (
              <div key={i} className="flex items-center gap-4">
                <label className="w-44 font-bold text-gray-700 text-right">
                  {label} :
                </label>
                <input
                  readOnly
                  value={value.toFixed(2)}
                  className="border border-gray-300 rounded p-2 w-60 focus:outline-none text-blue-600"
                />
              </div>
            ))}
            {/* Discount row (editable) */}
            <div className="flex items-center gap-4">
              <label className="w-44 font-bold text-gray-700 text-right">
                Discount :
              </label>
              <div className="flex w-60 gap-2">
                <select
                  value={discountType}
                  onChange={(e) =>
                    setDiscountType(e.target.value as "rs" | "percent")
                  }
                  className="border border-gray-300 rounded w-16 p-2 font-bold focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
                >
                  <option value="rs">₹</option>
                  <option value="percent">%</option>
                </select>
                <input
                  type="number"
                  value={discountValue}
                  onChange={(e) =>
                    setDiscountValue(parseFloat(e.target.value) || 0)
                  }
                  placeholder="Overall Discount"
                  className="border border-gray-300 rounded p-2 w-full focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
                />
              </div>
            </div>
            {/* Final Total RS row */}
            <div className="flex items-center gap-4">
              <label className="w-44 font-bold text-gray-700 text-right">
                Total RS :
              </label>
              <input
                readOnly
                value={totals.total.toFixed(2)}
                className="border border-gray-300 rounded p-2 w-60 focus:outline-none text-blue-600 font-bold"
              />
            </div>
          </div>
        </div>
        {/* Save Buttons */}
        <div className="mt-8 flex justify-end gap-2">
          <Button
            type="button"
            bgcolor=""
            border="border-3 border"
            textColor="text-red-500"
            hover="hover:text-red-800"
            name="Cancel"
            onClick={() => navigate(-1)}
          />
          <Button
            type="submit"
            bgcolor=""
            border="border-3 border"
            textColor="text-green-900"
            hover="hover:text-green-800"
            name="Submit"
          />
        </div>
      </form>
    </div>
  );
};

export default AddPurchaseForm;