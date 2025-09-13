import React from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
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
  itemsToAppend?: RequisitionItem;
}

// In a real application, you would fetch these from an API
const departments = ["Pharmacy", "General Store", "Pathology", "Radiology"];
const itemNames = [
  "LIQUID PARAFFIN",
  "GLUCOSE",
  "PARACETAMOL",
  "AMOXICILLIN",
  "IBUPROFEN",
];

const AddRequisitionForm: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      department: "", 
      note: "Urgent requisition for stock refill",
      items: [],
      itemsToAppend: {
        itemName: "", 
        unitQty: 0,
        unit: "",
        subUnitQty: 0,
        subUnit: "",
        relation: "",
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchAddItem = useWatch({ control, name: "itemsToAppend" });

  const onSubmit = (data: FormValues) => {
    if (data.items.length === 0) {
      alert("Please add at least one item before submitting.");
      return;
    }
    console.log("New Requisition Submitted:", data);
    alert("requisition form submitted succesfully");
    reset();
  };

  const handleAddItem = () => {
    const newItem = watchAddItem;

    if (
      newItem?.itemName &&
      newItem.unitQty > 0 &&
      newItem.unit &&
      newItem.subUnitQty > 0 &&
      newItem.subUnit
    ) {
      append(newItem);
      reset((formValues) => ({
        ...formValues,
        itemsToAppend: {
          itemName: "",
          unitQty: 0,
          unit: "",
          subUnitQty: 0,
          subUnit: "",
          relation: "",
        },
      }));
    } else {
      alert("Please fill in all required fields for the item.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-2 bg-gray-100 shadow rounded-md w-full mx-1"
    >
      <h2 className="text-xl font-semibold text-[#035d67] bg-[var(--base-color)] uppercase mb-4 p-3">
        New Requisition
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
          <select
            {...register("department", { required: "Department is required" })}
            className="w-full px-3 py-[.55rem] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          >
            <option value="">Select a Department</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="text-xs text-red-500 mt-1">{errors.department.message}</p>
          )}
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
        <div className="col-span-2">Relation</div>
        <div className="col-span-1 text-center">Action</div>
      </div>

      {/* Input row for adding new items */}
      <div className="grid grid-cols-14 gap-2 items-start border border-gray-200 rounded py-0.5 px-1">
        <div className="col-span-4">
          <select
            {...register("itemsToAppend.itemName", {
              required:fields.length===0? "Item is required":false,
            })}
            className="w-full px-2 py-[.36rem] border rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm border-gray-300"
          >
            <option value="">Select an Item</option>
            {itemNames.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
          {errors.itemsToAppend?.itemName && (
            <p className="text-xs text-red-500">
              {errors.itemsToAppend?.itemName.message}
            </p>
          )}
        </div>

        <div className="col-span-1">
          <input
            type="number"
            {...register("itemsToAppend.unitQty", {
              valueAsNumber: true,
              min:fields.length===0? { value: 1, message: "Must be > 0" }:undefined,
              required: fields.length===0? "Required":false,
            })}
            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm border-gray-300"
          />
          {errors.itemsToAppend?.unitQty && (
            <p className="text-xs text-red-500">
              {errors.itemsToAppend?.unitQty.message}
            </p>
          )}
        </div>

        <div className="col-span-2">
          <input
            type="text"
            {...register("itemsToAppend.unit", { required: fields.length===0? "Required":false })}
            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm border-gray-300"
          />
          {errors.itemsToAppend?.unit && (
            <p className="text-xs text-red-500">
              {errors.itemsToAppend?.unit.message}
            </p>
          )}
        </div>

        <div className="col-span-2">
          <input
            type="number"
            {...register("itemsToAppend.subUnitQty", {
              valueAsNumber: true,
              min: fields.length===0? { value: 1, message: "Must be > 0" }:undefined,
              required: fields.length===0? "Required":false,
            })}
            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm border-gray-300"
          />
          {errors.itemsToAppend?.subUnitQty && (
            <p className="text-xs text-red-500">
              {errors.itemsToAppend?.subUnitQty.message}
            </p>
          )}
        </div>

        <div className="col-span-2">
          <input
            type="text"
            {...register("itemsToAppend.subUnit", { required:fields.length===0? "Required":false })}
            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm border-gray-300"
          />
          {errors.itemsToAppend?.subUnit && (
            <p className="text-xs text-red-500">
              {errors.itemsToAppend?.subUnit.message}
            </p>
          )}
        </div>

        <div className="col-span-2">
          <input
            type="text"
            {...register("itemsToAppend.relation")}
            className="w-full px-2 py-1 border rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm border-gray-300"
          />
        </div>

        <div className="col-span-1 flex justify-center items-center">
          <Button
            type="button"
            onClick={handleAddItem}
            bgcolor=""
            border="border-3 border"
            textColor="text-blue-800"
            hover="hover:text-blue-600"
            icon={<FaPlus />}
          />
        </div>
      </div>

      {/* Added Rows */}
      <div className="">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-14 gap-2 items-start border bg-gray-50 border-gray-200 rounded py-0.5 px-1"
          >
            {/* Item Name */}
            <div className="col-span-4">
              <input
                type="text"
                {...register(`items.${index}.itemName` as const)}
                className="w-full px-2 py-1"
                disabled
              />
            </div>
            {/* Unit Qty */}
            <div className="col-span-1">
              <input
                type="number"
                {...register(`items.${index}.unitQty` as const)}
                className="w-full px-2 py-1"
                disabled
              />
            </div>
            {/* Unit */}
            <div className="col-span-2">
              <input
                type="text"
                {...register(`items.${index}.unit` as const)}
                className="w-full px-2 py-1"
                disabled
              />
            </div>
            {/* Sub Unit Qty */}
            <div className="col-span-2">
              <input
                type="number"
                {...register(`items.${index}.subUnitQty` as const)}
                className="w-full px-2 py-1"
                disabled
              />
            </div>
            {/* Sub Unit */}
            <div className="col-span-2">
              <input
                type="text"
                {...register(`items.${index}.subUnit` as const)}
                className="w-full px-2 py-1"
                disabled
              />
            </div>
            {/* Relation */}
            <div className="col-span-2">
              <input
                type="text"
                {...register(`items.${index}.relation` as const)}
                className="w-full px-2 py-1"
                disabled
              />
            </div>
            {/* Delete */}
            <div className="col-span-1 flex justify-center">
              <Button
                type="button"
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

      {/* Button */}
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
          name="Create Requisition"
        />
      </div>
    </form>
  );
};

export default AddRequisitionForm;