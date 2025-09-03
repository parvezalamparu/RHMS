import React from "react";
import { useForm, useFieldArray, useWatch } from "react-hook-form";
import Button from "../general/Button";
import { FaPlus } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { BiSave } from "react-icons/bi";
import CustomDatePicker from "../../general/CustomDatePicker";
import { FileSliders } from "lucide-react";

interface IssueItem {
  itemName: string;
  batchNo: string;
  expDate: string;
  unitQty: number;
  unit: string;
  subUnitQty: number;
  subUnit: string;
  availableQty: number;
}

interface FormValues {
  department: string;
  status: string;
  reqNo: string;
  note: string;
  items: IssueItem[];
  // Field for the input row
  formItem?: IssueItem;
}

// Dummy data for dropdowns
const departments = ["Pharmacy", "Surgery", "Emergency"];
const statuses = ["Incomplete", "Complete"];
const itemNames = ["Item A", "Item B", "Item C"];

const IssueItemForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      department: "",
      status: "",
      reqNo: "",
      note: "",
      items: [],
      formItem: {
        itemName: "",
        batchNo: "",
        expDate: "",
        unitQty: 0,
        unit: "",
        subUnitQty: 0,
        subUnit: "",
        availableQty: 0,
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const formItem = useWatch({ control, name: "formItem" });

  const handleAddItem = () => {
    // Check if required fields in the input row are filled
    if (
      formItem?.itemName &&
      formItem.batchNo &&
      formItem.expDate &&
      formItem.unitQty > 0 &&
      formItem.unit &&
      formItem.subUnitQty > 0 &&
      formItem.subUnit &&
      formItem.availableQty >= 0
    ) {
      append(formItem);
      // Reset the formItem fields for the next entry
      reset({
        ...formItem,
        formItem: {
          itemName: "",
          batchNo: "",
          expDate: "",
          unitQty: 0,
          unit: "",
          subUnitQty: 0,
          subUnit: "",
          availableQty: 0,
        },
      });
    } else {
      alert("Please fill in all required fields for the item before adding.");
    }
  };

  const onSubmit = (data: FormValues) => {
    if (data.items.length === 0) {
      alert("Please add at least one item before submitting.");
      return;
    }
    console.log("Issue Submitted:", data);
    alert("Purchase Order Submitted.");
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="pl-2 shadow rounded-md w-full mx-2"
    >
      <h2 className="text-xl font-semibold text-[#035d67] bg-[var(--base-color)] uppercase mb-4 p-3">
        Add Issue
      </h2>

      {/* Header Section */}
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
            className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
              errors.department ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Department...</option>
            {departments.map((dept) => (
              <option key={dept} value={dept}>
                {dept}
              </option>
            ))}
          </select>
          {errors.department && (
            <p className="text-xs text-red-500">{errors.department.message}</p>
          )}
        </div>

        <div className="w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Requisition Status
          </label>
          <select
            {...register("status", { required: "Status is required" })}
            className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
              errors.status ? "border-red-500" : ""
            }`}
          >
            <option value="">Select Status...</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.status && (
            <p className="text-xs text-red-500">{errors.status.message}</p>
          )}
        </div>

        <div className="w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Requisition No.
          </label>
          <input
            type="text"
            {...register("reqNo", { required: "Requisition No. is required" })}
            className={`w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
              errors.reqNo ? "border-red-500" : ""
            }`}
          />
          {errors.reqNo && (
            <p className="text-xs text-red-500">{errors.reqNo.message}</p>
          )}
        </div>
      </div>

      {/* Table Head */}
      <div className="grid grid-cols-12 gap-2 font-sm text-[#035d67] bg-[var(--base-color)] px-2 py-2 rounded">
        <div className="col-span-2">
          Item Name <span className="text-red-500">*</span>
        </div>
        <div className="col-span-2">
          Batch No. <span className="text-red-500">*</span>
        </div>
        <div className="col-span-2">
          Exp Date <span className="text-red-500">*</span>
        </div>
        <div className="col-span-1">
          Unit Qty <span className="text-red-500">*</span>
        </div>
        <div className="col-span-1">
          Unit <span className="text-red-500">*</span>
        </div>
        <div className="col-span-1">
          Sub Unit Qty <span className="text-red-500">*</span>
        </div>
        <div className="col-span-1">
          Sub Unit <span className="text-red-500">*</span>
        </div>
        <div className="col-span-1">
          Avail. Qty <span className="text-red-500">*</span>
        </div>
        <div className="col-span-1 text-center">Action</div>
      </div>

      {/* Form Row */}
      <div className="grid grid-cols-12 gap-2 items-start border border-gray-200 rounded px-2 py-1">
        <div className="col-span-2">
          <select
            {...register("formItem.itemName", { required: fields.length === 0 ? "Required" : false })}
            className={`w-full px-2 py-1 h-[2.15rem] border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
              errors.formItem?.itemName ? "border-red-500" : ""
            }`}
          >
            <option value="">Select...</option>
            {itemNames.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
          {errors.formItem?.itemName && (
            <p className="text-xs text-red-500">{errors.formItem.itemName.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <input
            type="text"
            placeholder="Batch No."
            {...register("formItem.batchNo", { required: fields.length === 0 ? "Required" : false })}
            className={`w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
              errors.formItem?.batchNo ? "border-red-500" : ""
            }`}
          />
          {errors.formItem?.batchNo && (
            <p className="text-xs text-red-500">{errors.formItem.batchNo.message}</p>
          )}
        </div>

        <div className="col-span-2">
          <input
          type="date"
            {...register("formItem.expDate", { required:fields.length===0? "Required" : false })}
            className={`w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
              errors.formItem?.expDate ? "border-red-500" : ""
            }`}
          />
          {errors.formItem?.expDate && (
            <p className="text-xs text-red-500">{errors.formItem.expDate.message}</p>
          )}
        </div>

        <div className="col-span-1">
          <input
            type="number"
            placeholder="Qty"
            {...register("formItem.unitQty", {
              required:fields.length===0? "Required":false,
              valueAsNumber: true,
              min: fields.length===0? { value: 1, message: "Must be > 0" } : undefined,
            })}
            className={`w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
              errors.formItem?.unitQty ? "border-red-500" : ""
            }`}
          />
          {errors.formItem?.unitQty && (
            <p className="text-xs text-red-500">{errors.formItem.unitQty.message}</p>
          )}
        </div>

        <div className="col-span-1">
          <input
            type="text"
            placeholder="Unit"
            {...register("formItem.unit", { required:fields.length===0? "Required" : false })}
            className={`w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
              errors.formItem?.unit ? "border-red-500" : ""
            }`}
          />
          {errors.formItem?.unit && (
            <p className="text-xs text-red-500">{errors.formItem.unit.message}</p>
          )}
        </div>

        <div className="col-span-1">
          <input
            type="number"
            placeholder="Sub Qty"
            {...register("formItem.subUnitQty", {
              required:fields.length===0? "Required":false,
              valueAsNumber: true,
              min: fields.length===0? { value: 1, message: "Must be > 0" } : undefined,
            })}
            className={`w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
              errors.formItem?.subUnitQty ? "border-red-500" : ""
            }`}
          />
          {errors.formItem?.subUnitQty && (
            <p className="text-xs text-red-500">
              {errors.formItem.subUnitQty.message}
            </p>
          )}
        </div>

        <div className="col-span-1">
          <input
            type="text"
            placeholder="Sub Unit"
            {...register("formItem.subUnit", { required: fields.length===0? "Required":false })}
            className={`w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
              errors.formItem?.subUnit ? "border-red-500" : ""
            }`}
          />
          {errors.formItem?.subUnit && (
            <p className="text-xs text-red-500">{errors.formItem.subUnit.message}</p>
          )}
        </div>

        <div className="col-span-1">
          <input
            type="number"
            placeholder="Avail."
            {...register("formItem.availableQty", {
              required:fields.length===0? "Required":false,
              valueAsNumber: true,
              min: fields.length===0? { value: 0, message: "Cannot be negative" }:undefined,
            })}
            className={`w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${
              errors.formItem?.availableQty ? "border-red-500" : ""
            }`}
          />
          {errors.formItem?.availableQty && (
            <p className="text-xs text-red-500">
              {errors.formItem.availableQty.message}
            </p>
          )}
        </div>

        <div className="col-span-1 flex justify-center">
          <Button
            type="button"
            onClick={handleAddItem}
            icon={<FaPlus />}
            bgcolor=""
            border="border-3"
            textColor="text-green-800"
            hover="hover:text-green-600"
          />
        </div>
      </div>

      {/* Items List */}
      <div className="space-y-2">
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-12 gap-2 items-center border border-gray-200 rounded px-2 py-1.5 bg-gray-50"
          >
            <div className="col-span-2">
              <input
                type="text"
                {...register(`items.${index}.itemName` as const)}
                value={field.itemName}
                disabled
                className="w-full bg-transparent border-none"
              />
            </div>
            <div className="col-span-2">
              <input
                type="text"
                {...register(`items.${index}.batchNo` as const)}
                value={field.batchNo}
                disabled
                className="w-full bg-transparent border-none"
              />
            </div>
            <div className="col-span-2">
              <input
                type="text"
                {...register(`items.${index}.expDate` as const)}
                value={field.expDate}
                disabled
                className="w-full bg-transparent border-none"
              />
            </div>
            <div className="col-span-1">
              <input
                type="number"
                {...register(`items.${index}.unitQty` as const)}
                value={field.unitQty}
                disabled
                className="w-full bg-transparent border-none"
              />
            </div>
            <div className="col-span-1">
              <input
                type="text"
                {...register(`items.${index}.unit` as const)}
                value={field.unit}
                disabled
                className="w-full bg-transparent border-none"
              />
            </div>
            <div className="col-span-1">
              <input
                type="number"
                {...register(`items.${index}.subUnitQty` as const)}
                value={field.subUnitQty}
                disabled
                className="w-full bg-transparent border-none"
              />
            </div>
            <div className="col-span-1">
              <input
                type="text"
                {...register(`items.${index}.subUnit` as const)}
                value={field.subUnit}
                disabled
                className="w-full bg-transparent border-none"
              />
            </div>
            <div className="col-span-1">
              <input
                type="number"
                {...register(`items.${index}.availableQty` as const)}
                value={field.availableQty}
                disabled
                className="w-full bg-transparent border-none"
              />
            </div>
            <div className="col-span-1 flex justify-center">
              <Button
                type="button"
                onClick={() => remove(index)}
                icon={<MdOutlineDeleteForever />}
                bgcolor=""
                border="border-3"
                textColor="text-red-700"
                hover="hover:text-red-500"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Footer Note */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Note
        </label>
        <textarea
          {...register("note")}
          className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          rows={3}
        />
      </div>

      {/* Submit */}
      <div className="py-6 flex justify-end gap-2">
        <Button
          type="button"
          name="Cancel"
          bgcolor=""
          border="border-3 "
          textColor="text-red-700"
          hover="hover:text-red-500"
        />
        <Button
          type="submit"
          icon={<BiSave />}
          name="Submit"
          bgcolor=""
          border="border-3 "
          textColor="text-green-800"
          hover="hover:text-green-600"
        />
      </div>
    </form>
  );
};

export default IssueItemForm;