import React from "react";
import { useForm } from "react-hook-form";

export interface Item {
  id: number;
  name: string;
  category: string;
  unit: string;
  subUnit: string;
  relation: string;
  hsn: string;
  activated: boolean;
}

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
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<Item>({
    defaultValues: editItem,
  });

  const onSubmit = (data: Item) => {
    onSave({ ...editItem, ...data });
    setEditItem(null);
    reset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/20 animate-fadeIn">
      <div
        className="bg-white p-6 rounded shadow-lg w-full max-w-lg transform transition-all duration-300 opacity-100 scale-100 relative"
        style={{
          animation: "fadeInScale 0.3s ease-out",
          animationFillMode: "forwards",
        }}
      >
        {/* ❌ Close button */}
        <button
          onClick={() => setEditItem(null)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-600"
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-xl font-semibold mb-4">Edit Item</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">
          {/* Name */}
          <div className="col-span-2 sm:col-span-1">
            <label className="text-sm font-medium">Item Name <span className="text-red-500">*</span></label>
            <input
              {...register("name", { required: "Item Name is required" })}
              className="border p-2 rounded w-full"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Category */}
          <div className="col-span-2 sm:col-span-1">
            <label className="text-sm font-medium">Category <span className="text-red-500">*</span></label>
            <input
              {...register("category", { required: "Category is required" })}
              className="border p-2 rounded w-full"
            />
            {errors.category && (
              <p className="text-xs text-red-500 mt-1">{errors.category.message}</p>
            )}
          </div>

          {/* Unit */}
          <div>
            <label className="text-sm font-medium">Unit</label>
            <input {...register("unit")} className="border p-2 rounded w-full" />
          </div>

          {/* SubUnit */}
          <div>
            <label className="text-sm font-medium">Sub-Unit</label>
            <input {...register("subUnit")} className="border p-2 rounded w-full" />
          </div>

          {/* Relation */}
          <div className="col-span-2">
            <label className="text-sm font-medium">Relation</label>
            <input {...register("relation")} className="border p-2 rounded w-full" />
          </div>

          {/* HSN */}
          <div className="col-span-2">
            <label className="text-sm font-medium">HSN</label>
            <input {...register("hsn")} className="border p-2 rounded w-full" />
          </div>

          {/* Buttons */}
          <div className="col-span-2 flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={() => setEditItem(null)}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditItemModal;
