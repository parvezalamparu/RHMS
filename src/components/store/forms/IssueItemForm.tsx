import React, { useState } from "react";
import Button from "../general/Button";
import { FaPlus } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BiSave } from "react-icons/bi";

interface IssueItem {
  itemName: string;
  batchNo: string;
  expDate: string;
  unitQty: number;
  unit: string;
  subUnitQty: number;
  subUnit: string;
  availableQty: number;
}

const IssueItemForm: React.FC = () => {
  const [note, setNote] = useState("");
  const [items, setItems] = useState<IssueItem[]>([]);
  const [formItem, setFormItem] = useState<IssueItem>({
    itemName: "",
    batchNo: "",
    expDate: "",
    unitQty: 0,
    unit: "",
    subUnitQty: 0,
    subUnit: "",
    availableQty: 0,
  });

  const [department, setDepartment] = useState("");
  const [status, setStatus] = useState("");
  const [reqNo, setReqNo] = useState("");

  const [errors, setErrors] = useState<Partial<Record<keyof IssueItem, string>>>({});

  const validateItem = (item: IssueItem) => {
    const error: Partial<Record<keyof IssueItem, string>> = {};
    if (!item.itemName) error.itemName = "Required";
    if (!item.batchNo) error.batchNo = "Required";
    if (!item.expDate) error.expDate = "Required";
    if (!item.unitQty || item.unitQty <= 0) error.unitQty = "Required";
    if (!item.unit) error.unit = "Required";
    if (!item.subUnitQty || item.subUnitQty <= 0) error.subUnitQty = "Required";
    if (!item.subUnit) error.subUnit = "Required";
    if (item.availableQty < 0) error.availableQty = "Required";
    return error;
  };

  const handleAddItem = () => {
    const error = validateItem(formItem);
    if (Object.keys(error).length > 0) {
      setErrors(error);
      return;
    }
    setItems([...items, formItem]);
    setFormItem({
      itemName: "",
      batchNo: "",
      expDate: "",
      unitQty: 0,
      unit: "",
      subUnitQty: 0,
      subUnit: "",
      availableQty: 0,
    });
    setErrors({});
  };

  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleFormItemChange = (field: keyof IssueItem, value: string | number) => {
    setFormItem({ ...formItem, [field]: value as never });
    if (errors[field]) {
      const newErrors = { ...errors };
      delete newErrors[field];
      setErrors(newErrors);
    }
  };

  const handleSubmit = () => {
    if (items.length === 0) {
      alert("Please add at least one item before submitting.");
      return;
    }
    const issueData = {
      date: new Date().toISOString(),
      department,
      status,
      reqNo,
      note,
      items,
    };
    console.log("Issue Submitted:", issueData);
  };

  return (
    <div className="p-5 bg-white shadow rounded-md w-full mx-2">
      <h2 className="text-xl font-semibold text-[#035d67] bg-[var(--base-color)] uppercase mb-4 p-3">
        Add Issue
      </h2>

      {/* Header Section */}
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
          <label className="block text-sm font-medium text-gray-700 mb-1">Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          >
            <option value="">Select Department...</option>
            <option value="Pharmacy">Pharmacy</option>
            <option value="Surgery">Surgery</option>
          </select>
        </div>

        <div className="w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Requisition Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full px-3 py-2  border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          >
            <option value="">Select Status...</option>
            <option value="Incomplete">Incomplete</option>
            <option value="Complete">Complete</option>
          </select>
        </div>

        <div className="w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Requisition No.</label>
          <input
            type="text"
            value={reqNo}
            onChange={(e) => setReqNo(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          />
        </div>
      </div>

      {/* Table Head */}
      <div className="grid grid-cols-12 gap-2 font-sm text-[#035d67] bg-[var(--base-color)] px-2 py-2 rounded">
        <div className="col-span-2">Item Name <span className="text-red-500">*</span></div>
        <div className="col-span-2">Batch No. <span className="text-red-500">*</span></div>
        <div className="col-span-2">Exp Date</div>
        <div className="col-span-1">Unit Qty <span className="text-red-500">*</span></div>
        <div className="col-span-1">Unit <span className="text-red-500">*</span></div>
        <div className="col-span-1">Sub Unit Qty <span className="text-red-500">*</span></div>
        <div className="col-span-1">Sub Unit <span className="text-red-500">*</span></div>
        <div className="col-span-1">Avail. Qty <span className="text-red-500">*</span></div>
        <div className="col-span-1 text-center">Action</div>
      </div>

      {/* Form Row */}
      <div className="grid grid-cols-12 gap-2 items-start border border-gray-200 rounded px-2 py-2 mt-2 bg-white">
        <div className="col-span-2">
          <select
            value={formItem.itemName}
            onChange={(e) => handleFormItemChange("itemName", e.target.value)}
            className={`w-full px-2 py-1 h-[2.15rem] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.itemName ? "border-red-500" : ""}`}
          >
            <option value="">Select...</option>
            <option value="Item A">Item A</option>
            <option value="Item B">Item B</option>
          </select>
          {errors.itemName && <p className="text-xs text-red-500">{errors.itemName}</p>}
        </div>

        <div className="col-span-2">
          <input
            type="text"
            placeholder="Batch No."
            value={formItem.batchNo}
            onChange={(e) => handleFormItemChange("batchNo", e.target.value)}
            className={`w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.batchNo ? "border-red-500" : ""}`}
          />
          {errors.batchNo && <p className="text-xs text-red-500">{errors.batchNo}</p>}
        </div>

        <div className="col-span-2">
          <input
            type="date"
            value={formItem.expDate}
            onChange={(e) => handleFormItemChange("expDate", e.target.value)}
            className={`w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.expDate ? "border-red-500" : ""}`}
          />
          {errors.expDate && <p className="text-xs text-red-500">{errors.expDate}</p>}
        </div>

        <div className="col-span-1">
          <input
            type="number"
            placeholder="Qty"
            value={formItem.unitQty}
            onChange={(e) => handleFormItemChange("unitQty", parseInt(e.target.value))}
            className={`w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.unitQty ? "border-red-500" : ""}`}
          />
          {errors.unitQty && <p className="text-xs text-red-500">{errors.unitQty}</p>}
        </div>

        <div className="col-span-1">
          <input
            type="text"
            placeholder="Unit"
            value={formItem.unit}
            onChange={(e) => handleFormItemChange("unit", e.target.value)}
            className={`w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.unit ? "border-red-500" : ""}`}
          />
          {errors.unit && <p className="text-xs text-red-500">{errors.unit}</p>}
        </div>

        <div className="col-span-1">
          <input
            type="number"
            placeholder="Sub Qty"
            value={formItem.subUnitQty}
            onChange={(e) => handleFormItemChange("subUnitQty", parseInt(e.target.value))}
            className={`w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.subUnitQty ? "border-red-500" : ""}`}
          />
          {errors.subUnitQty && <p className="text-xs text-red-500">{errors.subUnitQty}</p>}
        </div>

        <div className="col-span-1">
          <input
            type="text"
            placeholder="Sub Unit"
            value={formItem.subUnit}
            onChange={(e) => handleFormItemChange("subUnit", e.target.value)}
            className={`w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.subUnit ? "border-red-500" : ""}`}
          />
          {errors.subUnit && <p className="text-xs text-red-500">{errors.subUnit}</p>}
        </div>

        <div className="col-span-1">
          <input
            type="number"
            placeholder="Avail."
            value={formItem.availableQty}
            onChange={(e) => handleFormItemChange("availableQty", parseInt(e.target.value))}
            className={`w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.availableQty ? "border-red-500" : ""}`}
          />
          {errors.availableQty && <p className="text-xs text-red-500">{errors.availableQty}</p>}
        </div>

        <div className="col-span-1 flex justify-center">
          <Button
            onClick={handleAddItem}
            icon={<FaPlus />}
            bgcolor=""
            border="border-3 border-[--var(--base-color)]"
            textColor="text-black"
            hover="hover:bg-green-300"
          />
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-2 mt-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-12 gap-2 items-center border border-gray-200 rounded px-2 py-2 bg-gray-50"
          >
            <div className="col-span-2">{item.itemName}</div>
            <div className="col-span-2">{item.batchNo}</div>
            <div className="col-span-2">{item.expDate}</div>
            <div className="col-span-1">{item.unitQty}</div>
            <div className="col-span-1">{item.unit}</div>
            <div className="col-span-1">{item.subUnitQty}</div>
            <div className="col-span-1">{item.subUnit}</div>
            <div className="col-span-1">{item.availableQty}</div>
            <div className="col-span-1 flex justify-center">
              <Button
                onClick={() => handleRemoveItem(index)}
                icon={<MdOutlineDeleteForever />}
                bgcolor=""
                border="border-3 border-[--var(--base-color)]"
                textColor="text-black"
                hover="hover:bg-red-300"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Note</label>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          rows={3}
        />
      </div>

      {/* Submit */}
      <div className="mt-6 flex justify-center">
        <Button
          onClick={handleSubmit}
          icon={<BiSave />}
          name="Submit"
          bgcolor="bg-green-400"
          border="border-3 border"
          textColor="text-black"
          hover="hover:bg-green-300"
        />
      </div>
    </div>
  );
};

export default IssueItemForm;
