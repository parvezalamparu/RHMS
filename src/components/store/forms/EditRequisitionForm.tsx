import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Button from "../../general/Button";
import { FaPlus } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

interface RequisitionItem {
  itemName: string;
  unitQty: number;
  unit: string;
  subUnitQty: number;
  subUnit: string;
  relation: string;
}

interface FormValues {
  department: string;
  note: string;
  items: RequisitionItem[];
}

const EditRequisitionForm: React.FC<{ initialData?: FormValues }> = ({
  initialData,
}) => {
const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: initialData || {
      department: "Pharmacy", // default department if not provided
      note: "Urgent requisition for stock refill",
      items: [
        {
          itemName: "LIQUID PARAFFIN",
          unitQty: 10,
          unit: "Jar",
          subUnitQty: 20,
          subUnit: "Pc",
          relation: "1jar = 5l",
        },
        {
          itemName: "GLUCOSE",
          unitQty: 5,
          unit: "Bag",
          subUnitQty: 50,
          subUnit: "Packet",
          relation: "1jar = 2kg",

        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data: FormValues) => {
    if (!data.items || data.items.length === 0) {
      alert("Please add at least one item before submitting.");
      return;
    }
    console.log("Edited Requisition Submitted:", data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-2 bg-gray-100 shadow rounded-md w-full mx-1"
    >
      <h2 className="text-xl font-semibold text-[#035d67] bg-[var(--base-color)] uppercase mb-4 p-3">
        Edit Requisition
      </h2>

      {/* Top section */}
      <div className="flex gap-4 my-4">
        <div className="w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="text"
            value={new Date().toLocaleString()}
            disabled
            className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <div className="w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Department
          </label>
          <input
            type="text"
            {...register("department")}
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          />
        </div>
      </div>

      {/* Table Head */}
      <div className="grid grid-cols-14 gap-2 font-semibold text-[#035d67] bg-[var(--base-color)] px-2 py-1.5 rounded">
        <div className="col-span-4">
          Item Name <span className="text-red-500">*</span>
        </div>
        <div className="col-span-1">
          Unit Qty <span className="text-red-500">*</span>
        </div>
        <div className="col-span-2">
          Unit <span className="text-red-500">*</span>
        </div>
        <div className="col-span-2">
          Sub Unit Qty <span className="text-red-500">*</span>
        </div>
        <div className="col-span-2">
          Sub Unit <span className="text-red-500">*</span>
        </div>
        <div className="col-span-2">
          Relation 
        </div>
        <div className="col-span-1 text-center">Action</div>
      </div>

      {/* Editable Rows */}
      <div className="">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-14 gap-2 items-start border border-gray-200 rounded py-0.5 px-1"
          >
            {/* Item Name */}
            <div className="col-span-4">
              <input
                type="text"
                {...register(`items.${index}.itemName`, {
                  required: "Required",
                })}
                className={`w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
                  errors.items?.[index]?.itemName
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.items?.[index]?.itemName && (
                <p className="text-xs text-red-500">
                  {errors.items[index]?.itemName?.message}
                </p>
              )}
            </div>

            {/* Unit Qty */}
            <div className="col-span-1">
              <input
                type="number"
                {...register(`items.${index}.unitQty`, {
                  required: "Required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Must be > 0" },
                })}
                className={`w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
                  errors.items?.[index]?.unitQty
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.items?.[index]?.unitQty && (
                <p className="text-xs text-red-500">
                  {errors.items[index]?.unitQty?.message}
                </p>
              )}
            </div>

            {/* Unit */}
            <div className="col-span-2">
              <input
                type="text"
                {...register(`items.${index}.unit`, { required: "Required" })}
                className={`w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
                  errors.items?.[index]?.unit
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.items?.[index]?.unit && (
                <p className="text-xs text-red-500">
                  {errors.items[index]?.unit?.message}
                </p>
              )}
            </div>

            {/* Sub Unit Qty */}
            <div className="col-span-2">
              <input
                type="number"
                {...register(`items.${index}.subUnitQty`, {
                  required: "Required",
                  valueAsNumber: true,
                  min: { value: 1, message: "Must be > 0" },
                })}
                className={`w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
                  errors.items?.[index]?.subUnitQty
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.items?.[index]?.subUnitQty && (
                <p className="text-xs text-red-500">
                  {errors.items[index]?.subUnitQty?.message}
                </p>
              )}
            </div>

            {/* Sub Unit */}
            <div className="col-span-2">
              <input
                type="text"
                {...register(`items.${index}.subUnit`, {
                  required: "Required",
                })}
                className={`w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
                  errors.items?.[index]?.subUnit
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              {errors.items?.[index]?.subUnit && (
                <p className="text-xs text-red-500">
                  {errors.items[index]?.subUnit?.message}
                </p>
              )}
            </div>
              {/* relation */}
            <div className="col-span-2">
              <input
                type="text"
                {...register(`items.${index}.relation`, {
                  required: "Required",
                })}
                className={`w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
                  errors.items?.[index]?.relation
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />
              </div>

            {/* Delete */}
            <div className="col-span-1 flex justify-center">
              <Button
                onClick={() => remove(index)}
                bgcolor=""
                border="border-3 border"
                textColor="text-red-700"
                hover="hover:text-red-500"
                icon={<MdOutlineDeleteForever />}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Add Empty Row Button */}
      <div className="mt-4">
        <Button
          onClick={() =>
            append({
              itemName: "",
              unitQty: 0,
              unit: "",
              subUnitQty: 0,
              subUnit: "",
              relation: "",
            })
          }
          bgcolor=""
          border="border-3 border-[--var(--base-color)]"
          textColor="text-blue-800"
          hover="hover:text-blue-600"
          name="Add Row"
          icon={<FaPlus />}
        />
      </div>

      {/* Note */}
      <div className="mt-6">
        <label
          htmlFor="note"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Note
        </label>
        <textarea
          id="note"
          {...register("note")}
          className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200"
          rows={3}
        />
      </div>

      {/* button */}
      <div className="my-6 flex justify-end gap-2">
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
          hover="hover:border-green-600 hover:text-green-700"
          name="Save Changes"
        />
      </div>
    </form>
  );
};

export default EditRequisitionForm;
