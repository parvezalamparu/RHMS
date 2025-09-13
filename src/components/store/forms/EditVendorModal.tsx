import React, { useEffect } from "react";
import { X } from "lucide-react";
import Button from "../../general/Button";
import { BiSave } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";

interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  gst: string;
  contactPerson: string;
  pincode: string;
  address: string;
}

interface EditVendorModalProps {
  open: boolean;
  vendor: Vendor | null;
  handleClose: () => void;
  onSave: (updatedVendor: Vendor) => void;
}

const EditVendorModal: React.FC<EditVendorModalProps> = ({
  open,
  vendor,
  handleClose,
  onSave,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Vendor>();

  // When vendor changes, reset the form with that vendor's values
  useEffect(() => {
    if (vendor) reset(vendor);
  }, [vendor, reset]);

  if (!open || !vendor) return null;

  const onSubmit = (data: Vendor) => {
    onSave({ ...vendor, ...data }); // update vendor
    handleClose();
    reset();
  };

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-[3px] flex justify-center items-center z-50">
      <div className="bg-gray-50 w-full max-w-3xl rounded-xl shadow-lg p-8 relative border-2">
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-[#035d67] mb-6">EDIT VENDOR</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-6 text-sm"
        >
          {/* Vendor Name */}
          <div>
            <label className="font-medium text-gray-700">
              Vendor Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("name", { required: true })}
              type="text"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            />
            {errors.name && (
              <p className="text-red-500">Vendor name is required</p>
            )}
          </div>

          {/* Vendor Email */}
          <div>
            <label className="font-medium text-gray-700">
              Vendor Email <span className="text-red-500">*</span>
            </label>
            <input
              {...register("email", {
                required: true,
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Enter a valid email",
                },
              })}
              type="email"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            />
            {errors.email && (
              <p className="text-red-500">
                {errors.email.message || "Vendor email is required"}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="font-medium text-gray-700">
              Phone No <span className="text-red-500">*</span>
            </label>
            <input
              {...register("phone", {
                required: true,
                pattern: {
                  value: /^[6-9]\d{9}$/,
                  message: "Enter a valid 10-digit number",
                },
              })}
              type="text"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            />
            {errors.phone && (
              <p className="text-red-500">{errors.phone.message}</p>
            )}
          </div>

          {/* Pincode */}
          <div>
            <label className="font-medium text-gray-700">
              Pincode <span className="text-red-500">*</span>
            </label>
            <input
              {...register("pincode", { required: true })}
              type="number"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            />
            {errors.pincode && (
              <p className="text-red-500">Pincode is required</p>
            )}
          </div>

          {/* GST */}
          <div>
            <label className="font-medium text-gray-700">
              GSTIN <span className="text-red-500">*</span>
            </label>
            <input
              {...register("gst", { required: true })}
              type="text"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            />
            {errors.gst && <p className="text-red-500">GST number is required</p>}
          </div>

          {/* Contact Person */}
          <div>
            <label className="font-medium text-gray-700">
              Contact Person Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("contactPerson", { required: true })}
              type="text"
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            />
            {errors.contactPerson && (
              <p className="text-red-500">Contact person is required</p>
            )}
          </div>

          {/* Address */}
          <div className="col-span-2">
            <label className="font-medium text-gray-700">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              {...register("address", { required: true })}
              rows={3}
              className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            />
            {errors.address && (
              <p className="text-red-500">Address is required</p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="col-span-2 flex justify-end mt-4">
            <div className="mr-4">
              <Button
                onClick={handleClose}
                bgcolor=""
                border="border-3"
                textColor="text-red-700"
                hover="hover:text-red-500"
                name="Close"
                icon={<IoIosCloseCircleOutline />}
              />
            </div>
            <div>
              <Button
                type="submit"
                bgcolor=""
                border="border-3"
                textColor="text-green-800"
                hover="hover:text-green-600"
                name="Save Changes"
                icon={<BiSave />}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditVendorModal;
