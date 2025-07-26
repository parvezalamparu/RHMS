import React, { useState } from "react";
import { BiPlus, BiSave } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";
import Button from "../general/Button";

const vendorList = ["Vendor A", "Vendor B", "Vendor C"];
const unitList = ["Box", "Bottle", "Packet"];
const subUnitList = ["Piece", "Strip", "Tablet"];

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
    <div className="p-6 max-w-full">
      <h2 className="text-2xl font-bold text-[#035d67] mb-4">
        ADD PURCHASE ENTRY
      </h2>

      {/* Header Fields */}
      <div className="grid grid-cols-6 gap-4 mb-6">
        <div>
          <label className="font-medium text-gray-700">
            Date <span className="text-red-500">*</span>
          </label>
          <input
            type="datetime-local"
            {...register("date", { required: true })}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="font-medium text-gray-700">
            Vendor <span className="text-red-500">*</span>
          </label>
          <select
            {...register("vendor", { required: true })}
            className="w-full border rounded p-2"
          >
            <option value="">Select Vendor</option>
            {vendorList.map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="font-medium text-gray-700">
            Invoice No <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("invoiceNo", { required: true })}
            className="w-full border rounded p-2"
          />
        </div>

        <div>
          <label className="font-medium text-gray-700">
            Purchase Type <span className="text-red-500">*</span>
          </label>
          <select
            {...register("purchaseType", { required: true })}
            className="w-full border rounded p-2"
            onChange={(e) => setPurchaseType(e.target.value)}
          >
            <option value="">Select Type</option>
            <option value="Cash">Direct Purchase</option>
            <option value="Credit">Indirect Purchase</option>
          </select>
        </div>

        {purchaseType === "Credit" && (
          <div>
            <label className="font-medium text-gray-700">
              Purchase Order ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              {...register("purchaseOrderId", { required: true })}
              placeholder="Enter PO ID"
              className="w-full border rounded p-2"
            />
          </div>
        )}
      </div>

      {/* Table Header */}
      <div className="overflow-auto border rounded-md">
        <table className="min-w-[1800px] w-full border-collapse text-sm">
          <thead className="bg-[#2fe2fe] text-gray-900">
            <tr>
              {[
                "Item *",
                "Batch No",
                "Exp. Date",
                "Unit Qty",
                "Unit",
                "Sub Unit Qty",
                "Sub Unit",
                "Test QTY",
                "MRP/QTY",
                "Rate/QTY",
                "Net Amt.",
                "Dis(%)",
                "Dis(₹)",
                "CGST",
                "SGST",
                "IGST",
                "Amount *",
                "",
              ].map((label, i) => (
                <th
                  key={i}
                  className="border px-2 py-1 text-center whitespace-nowrap"
                >
                  {label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border p-1">
                <input
                  {...register("item", { required: true })}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="border p-1">
                <input
                  {...register("batchNo")}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="border p-1">
                <input
                  type="date"
                  {...register("expDate")}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  {...register("unitQty")}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="border p-1">
                <select
                  {...register("unit")}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="">Select</option>
                  {unitList.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  {...register("subUnitQty")}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="border p-1">
                <select
                  {...register("subUnit")}
                  className="w-full border rounded px-2 py-1"
                >
                  <option value="">Select</option>
                  {subUnitList.map((u) => (
                    <option key={u} value={u}>
                      {u}
                    </option>
                  ))}
                </select>
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  {...register("testQty")}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  {...register("mrpQty")}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  {...register("rateQty")}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  {...register("netAmt")}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  {...register("disPercent")}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  {...register("disAmount")}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  {...register("cgst")}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  {...register("sgst")}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  {...register("igst")}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="border p-1">
                <input
                  type="number"
                  {...register("amount")}
                  className="w-full border rounded px-2 py-1"
                />
              </td>
              <td className="border p-1 text-center">
                <button
                  type="button"
                  onClick={addItem}
                  className="bg-green-200 hover:bg-green-300 text-green-900 px-2 py-1 rounded shadow"
                >
                  <BiPlus size={20} />
                </button>
              </td>
            </tr>

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
                <td className="border p-1 text-center">{item.netAmt}</td>
                <td className="border p-1 text-center">{item.disPercent}</td>
                <td className="border p-1 text-center">{item.disAmount}</td>
                <td className="border p-1 text-center">{item.cgst}</td>
                <td className="border p-1 text-center">{item.sgst}</td>
                <td className="border p-1 text-center">{item.igst}</td>
                <td className="border p-1 text-center">{item.amount}</td>
                <td className="border p-1 text-center"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Note & Payment */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <textarea
          {...register("note")}
          placeholder="Note"
          className="border rounded p-2 w-full h-20"
        />
        <select
          {...register("paymentTerms")}
          className="border rounded p-2 w-full h-10"
        >
          <option value="">Select Payment Term</option>
          <option value="Cash">Cash</option>
          <option value="Credit">Online</option>
        </select>
      </div>

      {/* Total Calculations */}
      <div className="w-full flex justify-end mt-6">
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
