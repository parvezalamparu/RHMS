import React from "react";
import { X } from "lucide-react";
import Button from "../general/Button";
import { BiSave } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";

interface AddVendorModalProps {
  open: boolean;
  handleClose: () => void;
}

const AddVendorModal: React.FC<AddVendorModalProps> = ({ open, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  if (!open) return null;

  const onSubmit = (data: any) => {
    console.log("Vendor Submitted:", data);
    handleClose();
    reset();
  };

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-[3px] flex justify-center items-center z-50">
      <div className="bg-gray-50 w-full max-w-3xl rounded-xl shadow-lg p-8 relative border-2">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-[#035d67] mb-6">ADD NEW VENDOR</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-2 gap-6 text-sm">
          <div>
            <label className="font-medium text-gray-700">
              Vendor Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("vendorName", { required: true })}
              type="text"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-sm"
            />
            {errors.vendorName && <p className="text-red-500">Vendor name is required</p>}
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Phone No <span className="text-red-500">*</span>
            </label>
            <input
              {...register("phone", {
                required: true,
                pattern: /^[6-9]\d{9}$/,
              })}
              type="text"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-sm"
            />
            {errors.phone && <p className="text-red-500">Valid phone number is required</p>}
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Vendor GST <span className="text-red-500">*</span>
            </label>
            <input
              {...register("gst", { required: true })}
              type="text"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-sm"
            />
            {errors.gst && <p className="text-red-500">GST number is required</p>}
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Contact Person Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("contactPerson", { required: true })}
              type="text"
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-sm"
            />
            {errors.contactPerson && <p className="text-red-500">Contact person is required</p>}
          </div>

          <div className="col-span-2">
            <label className="font-medium text-gray-700">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("address", { required: true })}
              rows={3}
              className="w-full border rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-sm"
            />
            {errors.address && <p className="text-red-500">Address is required</p>}
          </div>

          {/* Action Buttons */}
          <div className="col-span-2 flex justify-end mt-4">
            <div className="mr-4">
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
                type="submit"
                bgcolor="bg-green-400"
                border="border-3 border-[--var(--base-color)]"
                textColor="text-black"
                hover="hover:bg-green-300"
                name="Save"
                icon={<BiSave />}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddVendorModal;
