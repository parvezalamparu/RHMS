import React from "react";
import { X } from "lucide-react";
import Button from "../general/Button";
import { BiSave } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";

interface AddPurchesOrderModalProps {
  open: boolean;
  handleClose: () => void;
}

const AddPurchesOrderModal: React.FC<AddPurchesOrderModalProps> = ({ open, handleClose }) => {
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm();

  if (!open) return null;

  const onSubmit = (data: any) => {
    console.log("Purchase Order Submitted:", data);
    handleClose();
    reset();
  };

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-[3px] flex justify-center items-center z-50">
      <div className="bg-gray-50 w-full max-w-5xl rounded-xl shadow-lg p-8 relative border-2">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-[#035d67] mb-6">ADD PURCHASE ORDER</h2>

        <form className="grid grid-cols-4 gap-6 text-sm">
          <div>
            <label className="font-medium text-gray-700">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              {...register("date", { required: true })}
              type="date"
              className="w-full border rounded-lg p-1 focus:outline-none focus:ring-3 focus:ring-green-200 shadow-sm"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Vendor <span className="text-red-500">*</span>
            </label>
            <input
              {...register("vendor", { required: true })}
              type="text"
              placeholder="Enter vendor name"
              className="w-full border rounded-lg p-1 focus:outline-none focus:ring-3 focus:ring-green-200 shadow-sm"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Item Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("itemName", { required: true })}
              type="text"
              placeholder="Enter item name"
              className="w-full border rounded-lg p-1 focus:outline-none focus:ring-3 focus:ring-green-200 shadow-sm"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Unit Quantity <span className="text-red-500">*</span>
            </label>
            <input
              {...register("unitQty", { required: true })}
              type="number"
              className="w-full border rounded-lg p-1 focus:outline-none focus:ring-3 focus:ring-green-200 shadow-sm"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Unit <span className="text-red-500">*</span>
            </label>
            <select
              {...register("unit", { required: true })}
              defaultValue=""
              className="w-full border rounded-lg p-1 focus:outline-none focus:ring-3 focus:ring-green-200 shadow-sm"
            >
              <option value="" disabled>Select Unit</option>
              <option value="PCS">PCS</option>
              <option value="Gram">Gram</option>
              <option value="Litre">Litre</option>
            </select>
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Sub Unit Quantity <span className="text-red-500">*</span>
            </label>
            <input
              {...register("subUnitQty", { required: true })}
              type="number"
              className="w-full border rounded-lg p-1 focus:outline-none focus:ring-3 focus:ring-green-200 shadow-sm"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Sub Unit <span className="text-red-500">*</span>
            </label>
            <select
              {...register("subUnit", { required: true })}
              defaultValue=""
              className="w-full border rounded-lg p-1 focus:outline-none focus:ring-3 focus:ring-green-200 shadow-sm"
            >
              <option value="" disabled>Select Sub Unit</option>
              <option value="PCS">PCS</option>
              <option value="Gram">Gram</option>
              <option value="ML">ML</option>
            </select>
          </div>

          <div className="col-span-2">
            <label className="font-medium text-gray-700">
              Note
            </label>
            <textarea
              {...register("note")}
              rows={3}
              placeholder="Additional details..."
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-3 focus:ring-green-200 shadow-sm"
            ></textarea>
          </div>
        </form>

        <div className="mt-8 flex justify-end">
          <div className="mx-4">
            <Button
              onClick={handleClose}
              bgcolor="bg-red-400"
              border="border-3 border-[--var(--base-color)]"
              textColor="text-black"
              hover="hover:bg-red-300"
              name="Close"
              icon={<IoIosCloseCircleOutline />}
            />
          </div>
          <div>
            <Button
              onClick={handleSubmit(onSubmit)}
              bgcolor="bg-green-400"
              border="border-3 border-[--var(--base-color)]"
              textColor="text-black"
              hover="hover:bg-green-300"
              name="Save"
              icon={<BiSave />}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPurchesOrderModal;
