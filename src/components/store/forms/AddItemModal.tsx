import React from "react";
import { X } from "lucide-react";
import { BiSave } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useForm } from "react-hook-form";
import Button from "../general/Button";
import { useState } from "react";
import ImageUploader from "../../general/ImageUploader";
import toast from "react-hot-toast";

interface NewItemData {
  itemName: string;
  itemCode: string;
  itemType: string;
  itemCategory: string;
  itemSubCategory?: string;
  lowLevel: number;
  highLevel: number;
  company?: string;
  stored?: string;
  hsn?: string;
  itemUnit: string;
  subUnitQty: number;
  subItemUnit: string;
  rackNo: string;
  shelfNo?: string;
  image?: File | null;
}

interface AddItemModalProps {
  open: boolean;
  handleClose: () => void;
  handleAddItem: (data: NewItemData) => void;
}

const AddItemModal: React.FC<AddItemModalProps> = ({
  open,
  handleClose,
  handleAddItem,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<NewItemData>();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  if (!open) return null;

  const onSubmit = (data: NewItemData) => {
    const formDataWithImage = {
      ...data,
      image: selectedImage,
    };
    handleAddItem(formDataWithImage);
    toast.success("Item Added Succesfully")
    handleClose();
    reset();
    setSelectedImage(null);
  };
  

  return (
    <div className="fixed inset-0 bg-white/10 backdrop-blur-[3px] flex justify-center items-center z-50">
      <div className="bg-gray-50 w-full max-w-7xl rounded-xl border-gray-300-xl shadow-lg p-8 relative border-2">
        <button
          onClick={() => {
            reset();
            handleClose();
          }}
          className="absolute top-4 right-4 text-gray-600 hover:text-red-500 transition"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-[#035d67] mb-6">ADD NEW ITEM</h2>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-4 gap-6 text-sm"
          method="POST"
        >
          {/* Item Name */}
          <div>
            <label className="font-medium text-gray-700">
              Item Name <span className="text-red-500">*</span>
            </label>
            <input
              {...register("itemName", { required: "Item Name is required" })}
              type="text"
              className="w-full border rounded border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            />
            {errors.itemName && (
              <p className="text-red-500">{errors.itemName.message}</p>
            )}
          </div>

          {/* Item Code */}
          <div>
            <label className="font-medium text-gray-700">
              Item Code <span className="text-red-500">*</span>
            </label>
            <input
              {...register("itemCode", { required: "Item Code is required" })}
              type="text"
              className="w-full border rounded border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            />
            {errors.itemCode && (
              <p className="text-red-500">{errors.itemCode.message}</p>
            )}
          </div>

          {/* Item Type */}
          <div>
            <label className="font-medium text-gray-700">
              Item Type <span className="text-red-500">*</span>
            </label>
            <select
              {...register("itemType", { required: "Item Type is required" })}
              defaultValue=""
              className="w-full border rounded border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            >
              <option value="" disabled>
                Select One
              </option>
              <option value="Food">Food</option>
              <option value="NonFood">Non-Food</option>
            </select>
            {errors.itemType && (
              <p className="text-red-500">{errors.itemType.message}</p>
            )}
          </div>

          {/* Item Category */}
          <div>
            <label className="font-medium text-gray-700">
              Item Category <span className="text-red-500">*</span>
            </label>
            <select
              {...register("itemCategory", {
                required: "Item Category is required",
              })}
              defaultValue=""
              className="w-full border rounded border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            >
              <option value="" disabled>
                Select One
              </option>
              <option value="Medical">Medical</option>
              <option value="Liquid">Liquid</option>
              <option value="Other">Other</option>
            </select>
            {errors.itemCategory && (
              <p className="text-red-500">{errors.itemCategory.message}</p>
            )}
          </div>

          {/* Item Sub Category */}
          <div>
            <label className="font-medium text-gray-700">
              Item Sub Category
            </label>
            <select
              {...register("itemSubCategory")}
              defaultValue=""
              className="w-full border rounded border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            >
              <option value="" disabled>
                Select One
              </option>
              <option value="Tablet">Tablet</option>
              <option value="Syrup">Syrup</option>
              <option value="Injection">Injection</option>
            </select>
          </div>

          {/* Low Level */}
          <div>
            <label className="font-medium text-gray-700">
              Low Level <span className="text-red-500">*</span>
            </label>
            <input
              {...register("lowLevel", {
                required: "Low Level is required",
                min: { value: 0, message: "Minimum value is 0" },
              })}
              type="number"
              className="w-full border rounded border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            />
            {errors.lowLevel && (
              <p className="text-red-500">{errors.lowLevel.message}</p>
            )}
          </div>

          {/* High Level */}
          <div>
            <label className="font-medium text-gray-700">
              High Level <span className="text-red-500">*</span>
            </label>
            <input
              {...register("highLevel", {
                required: "High Level is required",
                min: { value: 1, message: "Minimum value is 1" },
              })}
              type="number"
              className="w-full border rounded border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            />
            {errors.highLevel && (
              <p className="text-red-500">{errors.highLevel.message}</p>
            )}
          </div>

          {/* Company */}
          <div>
            <label className="font-medium text-gray-700">Company</label>
            <select
              {...register("company")}
              defaultValue=""
              className="w-full border rounded border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            >
              <option value="" disabled>
                Select One
              </option>
              <option value="Rainbow">Rainbow</option>
              <option value="Glaxo">Glaxo</option>
              <option value="Sun Pharma">Sun Pharma</option>
            </select>
          </div>

          {/* Stored */}
          <div>
            <label className="font-medium text-gray-700">Stored</label>
            <select
              {...register("stored")}
              defaultValue=""
              className="w-full border rounded border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            >
              <option value="" disabled>
                Select One
              </option>
              <option value="Store A">Store A</option>
              <option value="Store B">Store B</option>
              <option value="Warehouse">Warehouse</option>
            </select>
          </div>

          {/* HSN */}
          <div>
            <label className="font-medium text-gray-700">HSN or SAC No</label>
            <input
              {...register("hsn")}
              type="text"
              className="w-full border rounded border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            />
          </div>

          {/* Item Unit */}
          <div>
            <label className="font-medium text-gray-700">
              Item Unit <span className="text-red-500">*</span>
            </label>
            <select
              {...register("itemUnit", { required: "Item Unit is required" })}
              defaultValue=""
              className="w-full border rounded border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            >
              <option value="" disabled>
                Select Unit
              </option>
              <option value="PCS">PCS</option>
              <option value="Gram">Gram</option>
              <option value="Litre">Litre</option>
            </select>
            {errors.itemUnit && (
              <p className="text-red-500">{errors.itemUnit.message}</p>
            )}
          </div>

          {/* Sub Unit */}
          <div>
            <label className="font-medium text-gray-700">
              Sub Unit <span className="text-red-500">*</span>
            </label>
            <select
              {...register("subItemUnit", { required: "Sub Unit is required" })}
              defaultValue=""
              className="w-full border rounded border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            >
              <option value="" disabled>
                Select Unit
              </option>
              <option value="PCS">PCS</option>
              <option value="Gram">Gram</option>
              <option value="ML">ML</option>
            </select>
            {errors.subItemUnit && (
              <p className="text-red-500">{errors.subItemUnit.message}</p>
            )}
          </div>
          {/* realtion */}
          <div>
            <label className="font-medium text-gray-700">
              *1 Unit = How many Sub Unit?{" "}
              <span className="text-red-500">*</span>
            </label>
            <input
              {...register("subUnitQty", {
                required: "Sub Unit Qty is required",
                min: { value: 1, message: "Must be at least 1" },
              })}
              type="number"
              className="w-full border rounded border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            />
            {errors.subUnitQty && (
              <p className="text-red-500">{errors.subUnitQty.message}</p>
            )}
          </div>

          {/* Rack No */}
          <div>
            <label className="font-medium text-gray-700">
              Rack No. <span className="text-red-500">*</span>
            </label>
            <input
              {...register("rackNo", { required: "Rack No. is required" })}
              type="text"
              className="w-full border rounded border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            />
            {errors.rackNo && (
              <p className="text-red-500">{errors.rackNo.message}</p>
            )}
          </div>

          {/* Self No */}
          <div>
            <label className="font-medium text-gray-700">Shelf No.</label>
            <input
              {...register("shelfNo")}
              type="text"
              className="w-full border rounded border-gray-300 p-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
            />
          </div>

          {/* Image Upload (not connected to form) */}
          <div className="col-span-1">
            <ImageUploader onImageSelect={(file) => setSelectedImage(file)} />
          </div>

          {/* Buttons */}
          <div className="col-span-4 mt-8 flex justify-end">
            <div className="mx-4">
              <Button
                onClick={() => {
                  reset();
                  handleClose();
                }}
                bgcolor=""
                border="border-3 "
                textColor="text-red-700"
                hover="hover:text-red-500"
                name="Close"
                icon={<IoIosCloseCircleOutline />}
              />
            </div>
            <div>
              <Button
                onClick={handleSubmit(onSubmit)}
                bgcolor=""
                border="border-3 border"
                textColor="text-green-800"
                hover="hover:text-green-600"
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

export default AddItemModal;
