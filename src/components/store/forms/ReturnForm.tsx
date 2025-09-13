import React, { useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import Button from "../../general/Button";
import { FaPlus } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BiSave } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

interface ReturnItem {
  itemName: string;
  batchNo: string;
  qty: number;
  qtyUnit: string;
  reason: string;
}

interface FormValues {
  itemName: string;
  batchNo: string;
  qty: number;
  qtyUnit: string;
  reason: string;
}

const ReturnForm: React.FC = () => {
  const navigate=useNavigate();

  const [note, setNote] = useState("");
  const [items, setItems] = useState<ReturnItem[]>([]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      itemName: "",
      batchNo: "",
      qty: 0,
      qtyUnit: "",
      reason: "",
    },
  });

  const onAddItem: SubmitHandler<FormValues> = (data) => {
    setItems([...items, data]);
    reset();
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFinalSubmit = () => {
    if (items.length === 0) {
      alert("Please add at least one item before submitting.");
      return;
    }

    const returnData = {
      date: new Date().toISOString(),
      note,
      items,
    };

    console.log("Return Form Submitted:", returnData);
    alert("Return form submitted")
  };

  return (
    <div className="pl-2 bg-gray-100 shadow rounded-md w-full mx-2">
      <h2 className="text-xl font-semibold text-[#035d67] bg-[var(--base-color)] uppercase mb-4 p-3">
        Return Form
      </h2>

      {/* Top section */}
      <div className="flex gap-4 my-4">
        <div className="w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
          <input
            type="text"
            value={new Date().toLocaleString()}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <div className="w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1 ">Department</label>
          <input
            type="text"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          />
        </div>
      </div>

      {/* Table Head */}
      <div className="grid grid-cols-12 gap-2 font-semibold text-[#035d67] bg-[var(--base-color)] px-2 py-2 rounded">
        <div className="col-span-3">Item Name <span className="text-red-500">*</span></div>
        <div className="col-span-2">Batch No <span className="text-red-500">*</span></div>
        <div className="col-span-2">Qty <span className="text-red-500">*</span></div>
        <div className="col-span-2">Qty Unit <span className="text-red-500">*</span></div>
        <div className="col-span-2">Reason <span className="text-red-500">*</span></div>
        <div className="col-span-1 text-center">Action</div>
      </div>

      {/* Input Row (react-hook-form) */}
      <form
        onSubmit={handleSubmit(onAddItem)}
        className="grid grid-cols-12 gap-2 items-start border border-gray-200 rounded px-2 py-1"
      >
        <div className="col-span-3">
          <input
            type="text"
            className={`w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.itemName ? "border-red-500" : ""}`}
            {...register("itemName", { required: "Required" })}
          />
          {errors.itemName && <p className="text-xs text-red-500">{errors.itemName.message}</p>}
        </div>

        <div className="col-span-2">
          <input
            type="text"
            className={`w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.batchNo ? "border-red-500" : ""}`}
            {...register("batchNo", { required: "Required" })}
          />
          {errors.batchNo && <p className="text-xs text-red-500">{errors.batchNo.message}</p>}
        </div>

        <div className="col-span-2">
          <input
            type="number"
            className={`w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.qty ? "border-red-500" : ""}`}
            {...register("qty", { required: "Required", min: { value: 1, message: "Must be > 0" } })}
          />
          {errors.qty && <p className="text-xs text-red-500">{errors.qty.message}</p>}
        </div>

        <div className="col-span-2">
          <input
            type="text"
            className={`w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.qtyUnit ? "border-red-500" : ""}`}
            {...register("qtyUnit", { required: "Required" })}
          />
          {errors.qtyUnit && <p className="text-xs text-red-500">{errors.qtyUnit.message}</p>}
        </div>

        <div className="col-span-2">
          <input
            type="text"
            className={`w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.reason ? "border-red-500" : ""}`}
            {...register("reason", { required: "Required" })}
          />
          {errors.reason && <p className="text-xs text-red-500">{errors.reason.message}</p>}
        </div>

        <div className="col-span-1 flex justify-center">
          <Button
            type="submit"
            bgcolor=""
            border="border-3"
            textColor="text-green-800"
            hover="hover:text-green-600"
            icon={<FaPlus />}
          />
        </div>
      </form>

      {/* Items List */}
      <div className="space-y-2">
        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-2 items-center border border-gray-200 rounded px-2 py-1 bg-gray-50"
          >
            <div className="col-span-3 px-2">{item.itemName}</div>
            <div className="col-span-2 px-2">{item.batchNo}</div>
            <div className="col-span-2 px-2">{item.qty}</div>
            <div className="col-span-2 px-2">{item.qtyUnit}</div>
            <div className="col-span-2 px-2">{item.reason}</div>
            <div className="col-span-1 px-2 flex justify-center">
              <Button
                onClick={() => handleRemoveItem(index)}
                bgcolor=""
                border="border-3"
                textColor="text-red-700"
                hover="hover:text-red-500"
                icon={<MdOutlineDeleteForever />}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Notes */}
      <div className="mt-6">
        <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
          Note
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200"
          rows={3}
        />
      </div>

      {/* Submit Button */}
      <div className="py-6 flex justify-end gap-2">
        <Button
          bgcolor=""
          border="border-3"
          textColor="text-red-700"
          hover="hover:text-red-500"
          name="Cancel"
          onClick={()=> navigate(-1)}
        />
        <Button
          onClick={handleFinalSubmit}
          bgcolor=""
          border="border-3"
          textColor="text-green-800"
          hover="hover:text-green-600"
          name="Submit"
          icon={<BiSave />}
        />
      </div>
    </div>
  );
};

export default ReturnForm;
