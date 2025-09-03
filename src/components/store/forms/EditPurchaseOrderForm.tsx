import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Button from "../general/Button";
import { FaPlus } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import CustomDateTimePicker from "../../general/CustomDateTimePicker";

interface PurchaseOrderItem {
  itemName: string;
  unitQty: number;
  unit: string;
  subUnitQty: number;
  subUnit: string;
}

interface FormValues {
  date: string;
  vendor: string;
  note: string;
  items: PurchaseOrderItem[];
}

const EditPurchaseOrderForm: React.FC<{ initialData?: FormValues }> = ({ initialData }) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialData || {
      date: new Date().toISOString(),
      vendor: "",
      note: "",
      items: [
        { itemName: "Handwash", unitQty: 1, unit: "Jar", subUnitQty: 5, subUnit: "Ltr" },
        { itemName: "Paper", unitQty: 5, unit: "Rim", subUnitQty: 500, subUnit: "pc" },
      ],
    },
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const handleAddItem = () => {
    append({ itemName: "", unitQty: 0, unit: "jar", subUnitQty: 0, subUnit: "pc" });
  };

  const onSubmit = (data: FormValues) => {
    if (!data.vendor) {
      alert("Please select a vendor before submitting.");
      return;
    }
    if (!data.items || data.items.length === 0) {
      alert("Please add at least one item before submitting.");
      return;
    }

    console.log("Edited Purchase Order Submitted:", data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white shadow rounded-md w-full mx-2"
    >
      <h2 className="text-xl font-semibold text-[#035d67] bg-[var(--base-color)] uppercase mb-4 p-3">
        Edit Purchase Order
      </h2>

      {/* Header */}
      <div className="flex gap-4 my-4">
        <div className="w-1/4">
          <CustomDateTimePicker width="w-[22rem]" height="h-[2.4rem]" isDisable={false} />
        </div>

        <div className="w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Vendor</label>
          <select
            {...register("vendor")}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          >
            <option value="">Select Vendor...</option>
            <option value="Vendor A">Vendor A</option>
            <option value="Vendor B">Vendor B</option>
          </select>
        </div>
      </div>

      {/* Table Head */}
      <div className="grid grid-cols-12 gap-2 font-semibold text-[#035d67] bg-[var(--base-color)] px-2 py-1.5 rounded">
        <div className="col-span-4">Item Name <span className="text-red-500">*</span></div>
        <div className="col-span-1">Unit Qty <span className="text-red-500">*</span></div>
        <div className="col-span-2">Unit <span className="text-red-500">*</span></div>
        <div className="col-span-2">Sub Unit Qty <span className="text-red-500">*</span></div>
        <div className="col-span-2">Sub Unit <span className="text-red-500">*</span></div>
        <div className="col-span-1 text-center">Action</div>
      </div>

      {/* Editable Rows */}
      <div className="">
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-2 items-start border border-gray-200 rounded px-2 py-1 bg-white"
          >
            <div className="col-span-4">
              <input
                type="text"
                {...register(`items.${index}.itemName`, { required: "Required" })}
                className={`w-full px-2 py-1 border rounded focus:outline-none ${
                  errors.items?.[index]?.itemName ? "border-red-500" : "border-gray-300"
                }`}
              />
            </div>

            <div className="col-span-1">
              <input
                type="number"
                {...register(`items.${index}.unitQty`, {
                  required: "Required",
                  valueAsNumber: true,
                  min: 1,
                })}
                className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none"
              />
            </div>

            <div className="col-span-2">
              <input
                type="text"
                {...register(`items.${index}.unit`, { required: "Required" })}
                className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none"
              />
            </div>

            <div className="col-span-2">
              <input
                type="number"
                {...register(`items.${index}.subUnitQty`, {
                  required: "Required",
                  valueAsNumber: true,
                  min: 1,
                })}
                className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none"
              />
            </div>

            <div className="col-span-2">
              <input
                type="text"
                {...register(`items.${index}.subUnit`, { required: "Required" })}
                className="w-full px-2 py-1 border border-gray-200 rounded focus:outline-none"
              />
            </div>

            <div className="col-span-1 flex justify-center">
              <Button
                onClick={() => remove(index)}
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

      {/* Add New Row */}
      <div className="mt-4">
        <Button
          onClick={handleAddItem}
          bgcolor=""
          border="border-3 border-[--var(--base-color)]"
          textColor="text-black"
          hover="hover:bg-green-300"
          name="Add Row"
          icon={<FaPlus />}
        />
      </div>

      {/* Note */}
      <div className="mt-6">
        <label htmlFor="note" className="block text-sm font-medium text-gray-700 mb-1">
          Note
        </label>
        <textarea
          id="note"
          {...register("note")}
          className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none"
          rows={3}
        />
      </div>

      {/* Submit */}
      <div className="mt-6 flex justify-end gap-2">
        <Button
          type="button"
          bgcolor=""
          border="border-3 border"
          textColor="text-red-500"
          hover="hover:text-red-800"
          name="Cancel"
          onClick={() => navigate(-1)}
        />
        <Button
          type="submit"
          bgcolor=""
          border="border-3 border"
          textColor="text-green-900"
          hover="hover:text-green-700"
          name="Save Changes"
        />
      </div>
    </form>
  );
};

export default EditPurchaseOrderForm;
