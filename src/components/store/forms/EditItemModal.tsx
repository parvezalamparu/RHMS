import React, { useState, useEffect } from "react";
import type { Item } from "../../../pages/store/InventoryPage";
import Button from "../../store/general/Button";
import { X } from "lucide-react";
import { BiSave } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

interface EditItemModalProps {
  editItem: Item;
  setEditItem: (item: Item | null) => void;
  onSave: (updated: Item) => void;
}

// 🔽 Centralized dropdown options (shared with AddItemModal)
const dropdownOptions = {
  itemType: ["Food", "NonFood"],
  itemCategory: ["Medical", "Liquid", "Other"],
  itemSubCategory: ["Tablet", "Syrup", "Injection"],
  company: ["Rainbow", "Glaxo", "Sun Pharma"],
  stored: ["Store A", "Store B", "Warehouse"],
  itemUnit: ["PCS", "Gram", "Litre"],
  subItemUnit: ["PCS", "Gram", "ML"],
};

const EditItemModal: React.FC<EditItemModalProps> = ({
  editItem,
  setEditItem,
  onSave,
}) => {
  const [formData, setFormData] = useState<Item>(editItem);

  useEffect(() => {
    setFormData(editItem);
  }, [editItem]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    toast.success("Updated successfully.");
  };

  // 🔽 Define form fields
  const fields = [
    { label: "Item Name", name: "itemName" },
    { label: "Item Code", name: "itemCode" },
    { label: "Item Type", name: "itemType", type: "select" },
    { label: "Item Category", name: "itemCategory", type: "select" },
    { label: "Item Sub-Category", name: "itemSubCategory", type: "select" },
    { label: "Low Level", name: "lowLevel", type: "number" },
    { label: "High Level", name: "highLevel", type: "number" },
    { label: "Company", name: "company", type: "select" },
    { label: "Stored", name: "stored", type: "select" },
    { label: "HSN", name: "hsn" },
    { label: "Item Unit", name: "itemUnit", type: "select" },
    { label: "Sub Item Unit", name: "subItemUnit", type: "select" },
    { label: "Sub Unit Qty", name: "subUnitQty", type: "number" },
    { label: "Rack No", name: "rackNo" },
    { label: "Shelf No", name: "shelfNo" },
  ];

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-[3px] flex justify-center items-center z-50">
      <div className="bg-gray-50 w-full max-w-7xl rounded-xl shadow-lg p-8 relative border-2">
        <button
          onClick={() => setEditItem(null)}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-[#035d67] mb-6">EDIT ITEM</h2>

        <form
          className="p-6 grid grid-cols-4 gap-4 text-sm"
          onSubmit={handleSubmit}
        >
          {fields.map(({ label, name, type }) => (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className="mb-1 font-medium">
                {label}
              </label>

              {type === "select" ? (
                <select
                  name={name}
                  value={(formData as any)[name] ?? ""}
                  onChange={handleChange}
                  className="border border-gray-300 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200"
                >
                  {/* Show placeholder only if no value yet */}
                  {!formData[name as keyof Item] && (
                    <option value="">Select {label}</option>
                  )}
                  {dropdownOptions[name as keyof typeof dropdownOptions]?.map(
                    (option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    )
                  )}
                </select>
              ) : (
                <input
                  type={type || "text"}
                  name={name}
                  value={(formData as any)[name] ?? ""}
                  onChange={handleChange}
                  className="border border-gray-300 px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200"
                />
              )}
            </div>
          ))}

          {/* Buttons */}
          <div className="col-span-4 mt-8 flex justify-end">
            <div className="mx-4">
              <Button
                name="Cancel"
                onClick={() => setEditItem(null)}
                bgcolor=""
                border="border-3"
                textColor="text-red-700"
                hover="hover:text-red-500"
                icon={<IoIosCloseCircleOutline />}
              />
            </div>
            <div>
              <Button
                name="Update"
                type="submit"
                bgcolor=""
                border="border-3"
                textColor="text-green-800"
                hover="hover:text-green-600"
                icon={<BiSave />}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemModal;
