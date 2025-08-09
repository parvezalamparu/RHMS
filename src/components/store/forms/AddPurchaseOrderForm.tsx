import React, { useState } from "react";
import Button from "../general/Button";
import { FaPlus } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BiSave } from "react-icons/bi";

interface PurchaseOrderItem {
  itemName: string;
  unitQty: number;
  unit: string;
  subUnitQty: number;
  subUnit: string;
}

const AddPurchaseOrder: React.FC = () => {
  const [date, setDate] = useState<string>(new Date().toISOString().slice(0, 16));
  const [vendor, setVendor] = useState("");
  const [note, setNote] = useState("");
  const [items, setItems] = useState<PurchaseOrderItem[]>([]);
  const [formItem, setFormItem] = useState<PurchaseOrderItem>({
    itemName: "",
    unitQty: 0,
    unit: "",
    subUnitQty: 0,
    subUnit: "",
  });

  const [errors, setErrors] = useState<Partial<Record<keyof PurchaseOrderItem, string>>>({});

  const validateItem = (item: PurchaseOrderItem) => {
    const error: Partial<Record<keyof PurchaseOrderItem, string>> = {};
    if (!item.itemName) error.itemName = "Required";
    if (!item.unitQty || item.unitQty <= 0) error.unitQty = "Required";
    if (!item.unit) error.unit = "Required";
    if (!item.subUnitQty || item.subUnitQty <= 0) error.subUnitQty = "Required";
    if (!item.subUnit) error.subUnit = "Required";
    return error;
  };

  const handleAddItem = () => {
    const error = validateItem(formItem);
    if (Object.keys(error).length > 0) {
      setErrors(error);
      return;
    }
    setItems([...items, formItem]);
    setFormItem({ itemName: "", unitQty: 0, unit: "", subUnitQty: 0, subUnit: "" });
    setErrors({});
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormItemChange = (field: keyof PurchaseOrderItem, value: string | number) => {
    setFormItem({ ...formItem, [field]: value as never });
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleSubmit = () => {
    if (!vendor) {
      alert("Please select a vendor before submitting.");
      return;
    }
    if (items.length === 0) {
      alert("Please add at least one item before submitting.");
      return;
    }

    const purchaseOrderData = {
      date,
      vendor,
      note,
      items,
    };

    console.log("Purchase Order Submitted:", purchaseOrderData);
    // Submit logic here
  };

  return (
    <div className="p-6 bg-white shadow rounded-md w-full mx-2">
      <h2 className="text-xl font-semibold text-[#035d67] bg-[var(--base-color)] uppercase mb-4 p-3">
        Add Purchase Order
      </h2>

      {/* Header Section */}
      <div className="flex gap-4 my-4">
        <div className="w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-3 py-2 border rounded"
          />
        </div>

        <div className="w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1 ">Vendor</label>
          <select
            value={vendor}
            onChange={(e) => setVendor(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          >
            <option value="">Select Vendor...</option>
            <option value="Vendor A">Vendor A</option>
            <option value="Vendor B">Vendor B</option>
          </select>
        </div>
      </div>

      {/* Table Head */}
      <div className="grid grid-cols-12 gap-2 font-semibold text-[#035d67] bg-[var(--base-color)] px-2 py-2 rounded">
        <div className="col-span-4">Item Name <span className="text-red-500">*</span></div>
        <div className="col-span-1">Unit Qty <span className="text-red-500">*</span></div>
        <div className="col-span-2">Unit <span className="text-red-500">*</span></div>
        <div className="col-span-2">Sub Unit Qty <span className="text-red-500">*</span></div>
        <div className="col-span-2">Sub Unit <span className="text-red-500">*</span></div>
        <div className="col-span-1 text-center">Action</div>
      </div>

      {/* Form Row */}
      <div className="grid grid-cols-12 gap-2 items-start border border-gray-200 rounded px-2 py-2 mt-2 bg-white">
        <div className="col-span-4">
          <input
            type="text"
            className={`w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.itemName ? "border-red-500" : ""}`}
            placeholder="Item Name"
            value={formItem.itemName}
            onChange={(e) => handleFormItemChange("itemName", e.target.value)}
          />
          {errors.itemName && <p className="text-xs text-red-500">{errors.itemName}</p>}
        </div>

        <div className="col-span-1">
          <input
            type="number"
            className={`w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.unitQty ? "border-red-500" : ""}`}
            placeholder="Qty"
            value={formItem.unitQty}
            onChange={(e) => handleFormItemChange("unitQty", parseInt(e.target.value))}
          />
          {errors.unitQty && <p className="text-xs text-red-500">{errors.unitQty}</p>}
        </div>

        <div className="col-span-2">
          <input
            type="text"
            className={`w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.unit ? "border-red-500" : ""}`}
            placeholder="Unit"
            value={formItem.unit}
            onChange={(e) => handleFormItemChange("unit", e.target.value)}
          />
          {errors.unit && <p className="text-xs text-red-500">{errors.unit}</p>}
        </div>

        <div className="col-span-2">
          <input
            type="number"
            className={`w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.subUnitQty ? "border-red-500" : ""}`}
            placeholder="Sub Qty"
            value={formItem.subUnitQty}
            onChange={(e) => handleFormItemChange("subUnitQty", parseInt(e.target.value))}
          />
          {errors.subUnitQty && <p className="text-xs text-red-500">{errors.subUnitQty}</p>}
        </div>

        <div className="col-span-2">
          <input
            type="text"
            className={`w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.subUnit ? "border-red-500" : ""}`}
            placeholder="Sub Unit"
            value={formItem.subUnit}
            onChange={(e) => handleFormItemChange("subUnit", e.target.value)}
          />
          {errors.subUnit && <p className="text-xs text-red-500">{errors.subUnit}</p>}
        </div>

        <div className="col-span-1 flex justify-center">
          <Button
            onClick={handleAddItem}
            bgcolor=""
            border="border-3 border-[--var(--base-color)]"
            textColor="text-black"
            hover="hover:bg-green-300"
            icon={<FaPlus />}
          />
        </div>
      </div>

      {/* Added Items */}
      <div className="space-y-2 mt-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-2 items-center border border-gray-200 rounded px-2 py-2 bg-gray-50"
          >
            <div className="col-span-4">{item.itemName}</div>
            <div className="col-span-1">{item.unitQty}</div>
            <div className="col-span-2">{item.unit}</div>
            <div className="col-span-2">{item.subUnitQty}</div>
            <div className="col-span-2">{item.subUnit}</div>
            <div className="col-span-1 flex justify-center">
              <Button
                onClick={() => handleRemoveItem(index)}
                bgcolor=""
                border="border-3 border-[--var(--base-color)]"
                textColor="text-black"
                hover="hover:bg-red-300"
                icon={<MdOutlineDeleteForever />}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-6">
        <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
          Note
        </label>
        <textarea
          id="note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full md:w-1/2 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-200"
          rows={3}
        />
      </div>

      {/* Submit Button */}
      <div className="mt-6 flex justify-center">
        <Button
          onClick={handleSubmit}
          bgcolor="bg-green-400"
          border="border-3 border"
          textColor="text-black"
          hover="hover:bg-green-300"
          name="Submit"
          icon={<BiSave />}
        />
      </div>
    </div>
  );
};

export default AddPurchaseOrder;
