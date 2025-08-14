import React, { useState } from "react";
import { BiPlus, BiSave } from "react-icons/bi";
import { useForm } from "react-hook-form";
import Button from "../general/Button";
import { FaPlus } from "react-icons/fa";
// import CustomDateTimePicker from "../../general/CustomDateTimePicker";
import CustomDatePicker from "../../general/CustomDatePicker";

const vendorList = ["Vendor A", "Vendor B", "Vendor C"];

const AddPurchaseForm = () => {
  const [items, setItems] = useState([]);
  const [purchaseType, setPurchaseType] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm();

  const addItem = () => {
    const newItem = getValues();
    setItems([...items, newItem]);
    reset({ ...getValues(), item: "", batchNo: "", expDate: "", unitQty: 0 });
  };

  return (
    <div className="px-4 py-6 ml-2">
      <div>
      <h2 className="text-2xl font-bold text-[#035d67] mb-6 bg-[var(--base-color)] p-2">
        ADD PURCHASE ENTRY
      </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2 mb-12">
        {/* Date Picker */}
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
            {...register("vendor", { required: true })}
            className="w-full border border-gray-300 rounded px-3 h-10 text-sm"
          >
            <option value="">Select Vendor</option>
            {vendorList.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        {/* Invoice No */}
        <div className="w-full">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Invoice No <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("invoiceNo", { required: true })}
            className="w-full border border-gray-300 rounded px-3 h-10 text-sm"
          />
        </div>

        {/* Purchase Type */}
        <div className="w-full">
          <label className="text-sm font-medium text-gray-700 mb-1 block">
            Purchase Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register("purchaseType", { required: true })}
            onChange={(e) => setPurchaseType(e.target.value)}
            className="w-full border border-gray-300 rounded px-3 h-10 text-sm"
          >
            <option value="">Select Type</option>
            <option value="Cash">Direct Purchase</option>
            <option value="Credit">Indirect Purchase</option>
          </select>
        </div>

        {/* Purchase Order ID (Conditional) */}
        {purchaseType === "Credit" && (
          <div className="w-full">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Purchase Order ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("purchaseOrderId", { required: true })}
              placeholder="Enter PO ID"
              className="w-full border border-gray-300 rounded px-3 h-10 text-sm"
            />
          </div>
        )}
      </div>

      {/* Table Header */}
      <div className="overflow-auto border rounded">
  <table className="min-w-[2500px] w-full border-collapse text-sm">
    <thead className="bg-[#2fe2fe] text-gray-900">
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
          <th key={i} className="border px-2 py-1 text-center whitespace-nowrap">
            {col.label} {col.required && <span className="text-red-500">*</span>}
          </th>
        ))}
      </tr>
    </thead>

    <tbody>
      <tr>
        {/* Item */}
        <td className="border p-1">
          <input
            {...register("item", { required: "Item is required" })}
            className={`w-70 border border-gray-300 rounded px-2 py-1 ${errors.item ? "border-red-500" : ""}`}
          />
          {errors.item?.message && <p className="text-red-500 text-xs">{errors.item.message as string}</p>}
        </td>

        {/* Batch No */}
        <td className="border p-1">
          <input {...register("batchNo")} className="w-50 border border-gray-300 rounded px-2 py-1" />
        </td>

        {/* Exp Date */}
        <td className="border border-gray-300 p-1">
          <CustomDatePicker />
        </td>

        {/* Unit Qty */}
        <td className="border p-1">
          <input
            type="number"
            {...register("unitQty", { required: "Unit Qty is required" })}
            className={`w-full border border-gray-300 rounded px-2 py-1 ${errors.unitQty ? "border-red-500" : ""}`}
          />
          {errors.unitQty?.message && <p className="text-red-500 text-xs">{errors.unitQty.message as string}</p>}
        </td>

        {/* Unit */}
        <td className="border p-1">
          <input
            type="text"
            {...register("unit", { required: "Unit is required" })}
            readOnly
            className={`w-full border border-gray-300 rounded px-2 py-1 bg-gray-100 cursor-not-allowed ${errors.unit ? "border-red-500" : ""}`}
          />
          {errors.unit?.message && <p className="text-red-500 text-xs">{errors.unit.message as string}</p>}
        </td>

        {/* Sub Unit Qty */}
        <td className="border p-1">
          <input
            type="number"
            {...register("subUnitQty", { required: "Sub Unit Qty is required" })}
            className={`w-full border border-gray-300 rounded px-2 py-1 ${errors.subUnitQty ? "border-red-500" : ""}`}
          />
          {errors.subUnitQty?.message && <p className="text-red-500 text-xs">{errors.subUnitQty.message as string}</p>}
        </td>

        {/* Sub Unit */}
        <td className="border p-1">
          <input
            type="text"
            {...register("subUnit", { required: "Sub Unit is required" })}
            readOnly
            className={`w-full border border-gray-300 rounded px-2 py-1 bg-gray-100 cursor-not-allowed ${errors.subUnit ? "border-red-500" : ""}`}
          />
          {errors.subUnit?.message && <p className="text-red-500 text-xs">{errors.subUnit.message as string}</p>}
        </td>

        {/* Test Qty */}
        <td className="border p-1">
          <input type="number" {...register("testQty")} className="w-24 border border-gray-300 rounded px-2 py-1" />
        </td>

        {/* MRP */}
        <td className="border p-1">
          <input
            type="number"
            {...register("mrpQty", { required: "MRP is required" })}
            className={`w-full border border-gray-300 rounded px-2 py-1 ${errors.mrpQty ? "border-red-500" : ""}`}
          />
          {errors.mrpQty?.message && <p className="text-red-500 text-xs">{errors.mrpQty.message as string}</p>}
        </td>

        {/* Rate */}
        <td className="border p-1">
          <input
            type="number"
            {...register("rateQty", { required: "Rate is required" })}
            className={`w-full border border-gray-300 rounded px-2 py-1 ${errors.rateQty ? "border-red-500" : ""}`}
          />
          {errors.rateQty?.message && <p className="text-red-500 text-xs">{errors.rateQty.message as string}</p>}
        </td>

        {/* Net Amount */}
        <td className="border p-1">
          <input
            type="number"
            {...register("netAmt", { required: "Net Amount is required" })}
            className={`w-full border border-gray-300 rounded px-2 py-1 ${errors.netAmt ? "border-red-500" : ""}`}
          />
          {errors.netAmt?.message && <p className="text-red-500 text-xs">{errors.netAmt.message as string}</p>}
        </td>

        {/* Discount % */}
        <td className="border p-1">
          <input type="number" {...register("disPercent")} className="w-full border border-gray-300 rounded px-2 py-1" />
        </td>

        {/* Discount ₹ */}
        <td className="border p-1">
          <input type="number" {...register("disAmount")} className="w-full border border-gray-300 rounded px-2 py-1" />
        </td>

        {/* CGST */}
        <td className="border p-1">
          <input
            type="number"
            {...register("cgst", { required: "CGST is required" })}
            className={`w-full border border-gray-300 rounded px-2 py-1 ${errors.cgst ? "border-red-500" : ""}`}
          />
          {errors.cgst?.message && <p className="text-red-500 text-xs">{errors.cgst.message as string}</p>}
        </td>

        {/* SGST */}
        <td className="border p-1">
          <input
            type="number"
            {...register("sgst", { required: "SGST is required" })}
            className={`w-full border border-gray-300 rounded px-2 py-1 ${errors.sgst ? "border-red-500" : ""}`}
          />
          {errors.sgst?.message && <p className="text-red-500 text-xs">{errors.sgst.message as string}</p>}
        </td>

        {/* IGST */}
        <td className="border p-1">
          <input type="number" {...register("igst")} className="w-full border border-gray-300 rounded px-2 py-1" />
        </td>

        {/* Amount */}
        <td className="border p-1">
          <input
            type="number"
            {...register("amount", { required: "Amount is required" })}
            className={`w-full border border-gray-300 rounded px-2 py-1 ${errors.amount ? "border-red-500" : ""}`}
          />
          {errors.amount?.message && <p className="text-red-500 text-xs">{errors.amount.message as string}</p>}
        </td>

        {/* Add Button */}
        <td className="border p-1 text-center">
          <Button
            onClick={addItem}
            bgcolor=""
            border="border-3 border-[--var(--base-color)]"
            textColor="text-black"
            hover="hover:bg-green-300"
            icon={<FaPlus />}
          />
        </td>
      </tr>

      {/* Render Added Items */}
      {items.map((item, index) => (
        <tr key={index} className="bg-gray-100">
          {[
            "item", "batchNo", "expDate", "unitQty", "unit", "subUnitQty",
            "subUnit", "testQty", "mrpQty", "rateQty", "netAmt", "disPercent",
            "disAmount", "cgst", "sgst", "igst", "amount"
          ].map((key, i) => (
            <td key={i} className="border p-1 text-center">{item[key]}</td>
          ))}
          <td className="border p-1 text-center"></td>
        </tr>
      ))}
    </tbody>
  </table>
</div>


      {/* Note & Payment */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {/* Note Textarea */}
        <div className="col-span-1">
          <textarea
            {...register("note")}
            placeholder="Note"
            className="border border-gray-300 rounded p-2 w-full h-20 text-sm"
          />
        </div>

        {/* Payment Terms */}
        <div className="col-span-1">
          <select
            {...register("paymentTerms")}
            className="border border-gray-300 rounded p-2 w-full h-10 text-sm"
          >
            <option value="">Select Payment Term</option>
            <option value="Cash">Cash</option>
            <option value="Credit">Online</option>
          </select>
        </div>
      </div>

      {/* Total Calculations */}
      <div className="w-full flex justify-end  mt-6">
        <div className="grid grid-cols-1 md:grid-rows-6 gap-1">
          {[
            { label: "SUB TOTAL", name: "subTotal" },
            { label: "CGST Amount", name: "cgstAmt" },
            { label: "SGST Amount", name: "sgstAmt" },
            { label: "IGST Amount", name: "igstAmt" },
            { label: "Discount", name: "discount" },
            { label: "Total RS", name: "total" },
          ].map(({ label, name }, i) => (
            <div key={i} className="flex items-center gap-4">
              <label className="w-44 font-medium text-gray-700">
                {label} <span className="text-red-500">*</span>
              </label>
              <input
                {...register(name)}
                placeholder={label}
                className="border rounded p-2 w-full"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save Buttons */}
      <div className="mt-8 flex justify-center">
        {/* <div className="mx-4">
          <Button
            bgcolor="bg-red-400"
            border="border-3 border-[--var(--base-color)]"
            textColor="text-black"
            hover="hover:bg-red-300"
            name="Close"
            icon={<IoIosCloseCircleOutline />}
          />
        </div> */}
        <div>
          <Button
            bgcolor="bg-green-400"
            border="border-3 border-[--var(--base-color)]"
            textColor="text-black"
            hover="hover:bg-green-300"
            name="Save and Update Stock"
            icon={<BiSave />}
          />
        </div>
      </div>
    </div>
  );
};

export default AddPurchaseForm;
