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
    toast.success("Updated successfully.")
  };

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-[3px] flex justify-center items-center z-50">
      <div className="bg-gray-50 w-full max-w-7xl rounded-xl shadow-lg p-8 relative border-2">
        <button
          onClick={() => setEditItem(null)}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-[#035d67] mb-6">ADD NEW ITEM</h2>

        <form
          className="p-6 grid grid-cols-4 gap-4 text-sm"
          onSubmit={handleSubmit}
        >
          {[
            { label: "Item Name", name: "itemName" },
            { label: "Item Code", name: "itemCode" },
            { label: "Item Type", name: "itemType" },
            { label: "Item Category", name: "itemCategory" },
            { label: "Item Sub-Category", name: "itemSubCategory" },
            { label: "Low Level", name: "lowLevel", type: "number" },
            { label: "High Level", name: "highLevel", type: "number" },
            { label: "Company", name: "company" },
            { label: "Stored", name: "stored" },
            { label: "HSN", name: "hsn" },
            { label: "Item Unit", name: "itemUnit" },
            { label: "Sub Item Unit", name: "subItemUnit" },
            { label: "Sub Unit Qty", name: "subUnitQty", type: "number" },
            { label: "Rack No", name: "rackNo" },
            { label: "Shelf No", name: "shelfNo" },
          ].map(({ label, name, type }) => (
            <div key={name} className="flex flex-col">
              <label htmlFor={name} className="mb-1 font-medium">
                {label}
              </label>
              <input
                type={type || "text"}
                name={name}
                value={(formData as any)[name] ?? ""}
                onChange={handleChange}
                className="border px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200"
              />
            </div>
          ))}

          <div className="col-span-4 mt-8 flex justify-end">
            <div className="mx-4">
              <Button
                name="Cancel"
                onClick={() => setEditItem(null)}
                bgcolor="bg-red-400"
                border="border-3 border-[--var(--base-color)]"
                textColor="text-black"
                hover="hover:bg-red-300"
                icon={<IoIosCloseCircleOutline />}
              />
            </div>
            <div>
              <Button
                name="Update"
                type="submit"
                bgcolor="bg-green-400"
                border="border-3 border-[--var(--base-color)]"
                textColor="text-black"
                hover="hover:bg-green-300"
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
