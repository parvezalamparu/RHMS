import React from "react";
import { X } from "lucide-react";
import Button from "../general/Button";
import { BiSave } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";

interface AddItemModalProps {
  open: boolean;
  handleClose: () => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({ open, handleClose }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  if (!open) return null;
  
  const onSubmit = (data: any) => {
    console.log("Form Submitted:", data);
    handleClose();
    reset();
  };
  
  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-[3px] flex justify-center items-center z-50">
      <div className="bg-gray-50 w-full max-w-7xl rounded-xl shadow-lg p-8 relative border-2">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-[#035d67] mb-6">ADD NEW ITEM</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-4 gap-6 text-sm" method="POST">
          <div>
            <label className="font-medium text-gray-700">
              Item Type <span className="text-red-500">*</span>
            </label>
            <select
              {...register("itemType", { required: true })}
              aria-invalid={errors.itemType ? "true" : "false"}
              defaultValue=""
              className="w-full border rounded-lg p-1 focus:outline-none focus:ring-3 focus:ring-cyan-200 shadow-sm focus:shadow-lg transition duration-200"
            >
              <option value="" disabled>
                Select One
              </option>
              <option value="Food">Food</option>
              <option value="NonFood">Non-Food</option>
            </select>
            {errors.itemType?.type === "required" && (
              <p role="alert" className="text-red-500">Item Type is required</p>
            )}
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Item Category <span className="text-red-500">*</span>
            </label>
            <select
              {...register("itemCategory", { required: true })}
              defaultValue=""
              className="w-full border rounded-lg p-1 focus:outline-none focus:ring-3 focus:ring-green-200 shadow-sm focus:shadow-lg transition duration-200"
            >
              <option value="" disabled>
                Select One
              </option>
              <option value="Medical">Medical</option>
              <option value="Liquid">Liquid</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Item Sub Category
            </label>
            <select
              {...register("itemSubCategory")}
              defaultValue=""
              className="w-full border rounded-lg p-1 focus:outline-none focus:ring-3 focus:ring-green-200 shadow-sm focus:shadow-lg transition duration-200"
            >
              <option value="" disabled>
                Select One
              </option>
              <option value="Tablet">Tablet</option>
              <option value="Syrup">Syrup</option>
              <option value="Injection">Injection</option>
            </select>
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Item Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("itemName", { required: true })}
              type="text"
              className="w-full border rounded-lg p-1 focus:outline-none focus:ring-3 focus:ring-green-200 shadow-sm focus:shadow-lg transition duration-200"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Low Level <span className="text-red-500">*</span>
            </label>
            <input
              {...register("lowLevel", { required: true })}
              type="number"
              className="w-full border rounded-lg p-1 focus:outline-none focus:ring-3 focus:ring-green-200 shadow-sm focus:shadow-lg transition duration-200"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">
              High Level <span className="text-red-500">*</span>
            </label>
            <input
              {...register("lowLevel", { required: true })}
              type="number"
              className="w-full border rounded-lg p-1 focus:outline-none focus:ring-3 focus:ring-green-200 shadow-sm focus:shadow-lg transition duration-200"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">Company</label>
            <select
              {...register("company")}
              defaultValue=""
              className="w-full border rounded-lg p-1 focus:outline-none focus:ring-3 focus:ring-green-200 shadow-sm focus:shadow-lg transition duration-200"
            >
              <option value="" disabled>
                Select One
              </option>
              <option value="Rainbow">Rainbow</option>
              <option value="Glaxo">Glaxo</option>
              <option value="Sun Pharma">Sun Pharma</option>
            </select>
          </div>

          <div>
            <label className="font-medium text-gray-700">Stored</label>
            <select
              {...register("stored")}
              defaultValue=""
              className="w-full border rounded-lg p-1 focus:outline-none focus:ring-3 focus:ring-green-200 shadow-sm focus:shadow-lg transition duration-200"
            >
              <option value="" disabled>
                Select One
              </option>
              <option value="Store A">Store A</option>
              <option value="Store B">Store B</option>
              <option value="Warehouse">Warehouse</option>
            </select>
          </div>

          <div>
            <label className="font-medium text-gray-700">HSN or SAC No</label>
            <input
              {...register("hsn")}
              type="text"
              className="w-full border rounded-lg p-1 focus:outline-none focus:ring-3 focus:ring-green-200 shadow-sm focus:shadow-lg transition duration-200"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Item Unit <span className="text-red-500">*</span>
            </label>
            <select
              {...register("itemUnit", { required: true })}
              defaultValue=""
              className="w-full border rounded-lg p-1 focus:outline-none focus:ring-3 focus:ring-green-200 shadow-sm focus:shadow-lg transition duration-200"
            >
              <option value="" disabled>
                Select Unit
              </option>
              <option value="PCS">PCS</option>
              <option value="Gram">Gram</option>
              <option value="Litre">Litre</option>
            </select>
          </div>

          {/* <div className="col-span-2">
            <div className="bg-gray-300 rounded-full px-10 py-4 flex justify-center items-center text-lg text-gray-800">
              <label className="font-semibold text-red-700 flex items-center gap-4">
                *1 Unit = How many Sub Unit?
                <input
                  {...register("subUnit", { required: true })}
                  type="number"
                  className="w-32 p-1 rounded-md border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm focus:shadow-lg transition duration-200"
                  placeholder="?"
                />
              </label>
            </div>
          </div> */}

          <div>
            <label className="font-medium text-gray-700">
              *1 Unit = How many Sub Unit?{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              {...register("lowLevel", { required: true })}
              type="number"
              className="w-full border rounded-lg p-1 focus:outline-none focus:ring-3 focus:ring-green-200 shadow-sm focus:shadow-lg transition duration-200"
            />
          </div>

          <div>
            <label className="font-medium text-gray-700">
              Sub Unit <span className="text-red-500">*</span>
            </label>
            <select
              {...register("subItemUnit", { required: true })}
              defaultValue=""
              className="w-full border rounded-lg p-1 focus:outline-none focus:ring-3 focus:ring-green-200 shadow-sm focus:shadow-lg transition duration-200"
            >
              <option value="" disabled>
                Select Unit
              </option>
              <option value="PCS">PCS</option>
              <option value="Gram">Gram</option>
              <option value="ML">ML</option>
            </select>
          </div>

          <div className="col-span-1">
            <label className="block mb-2 text-sm font-medium text-gray-700">
              Item Image
            </label>

            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="dropzone-file"
                className="flex flex-col items-center justify-center w-full h-40 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
              >
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg
                    aria-hidden="true"
                    className="w-10 h-10 mb-3 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M7 16V4m0 0l-4 4m4-4l4 4M7 20h10a2 2 0 002-2V10a2 2 0 00-2-2H7v10z"
                    />
                  </svg>
                  <p className="mb-2 text-sm text-gray-500">
                    <span className="font-semibold">Click to upload</span> or
                    drag & drop
                  </p>
                  <p className="text-xs text-gray-500">
                    PNG, JPG, JPEG (MAX. 2MB)
                  </p>
                </div>
                <input
                  id="dropzone-file"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    console.log("Selected file:", file);
                  }}
                />
              </label>
            </div>
          </div>
        </form>

        {/* Save & Close Buttons */}
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
              // onClick={}
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

export default AddItemModal;


