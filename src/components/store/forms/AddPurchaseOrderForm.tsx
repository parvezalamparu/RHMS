import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Button from "../../general/Button";
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
  draft: PurchaseOrderItem;
  items: PurchaseOrderItem[];
}

const AddPurchaseOrder: React.FC = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    getValues,
    trigger,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      date: new Date().toISOString(),
      vendor: "",
      note: "",
      draft: {
        itemName: "",
        unitQty: 0,
        unit: "jar",
        subUnitQty: 0,
        subUnit: "pc",
      },
      items: [],
    },
    mode: "onTouched",
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  // Add item from draft row
  const handleAddItem = async () => {
    const ok = await trigger([
      "draft.itemName",
      "draft.unitQty",
      "draft.unit",
      "draft.subUnitQty",
      "draft.subUnit",
    ]);

    if (!ok) return;

    append(getValues("draft"));

    // Reset draft row after adding
    setValue("draft.itemName", "");
    setValue("draft.unitQty", 0);
    setValue("draft.subUnitQty", 0);
    setValue("draft.unit", "jar");
    setValue("draft.subUnit", "pc");
  };

  // Submit form
  const onSubmit = (data: FormValues) => {
    if (!data.vendor) {
      alert("Please select a vendor before submitting.");
      return;
    }
    if (data.items.length === 0) {
      alert("Please add at least one item before submitting.");
      return;
    }

    const payload = {
      date: data.date,
      vendor: data.vendor,
      note: data.note,
      items: data.items,
    };

    console.log("Purchase Order Submitted:", payload);
    alert("Purchase Order Submitted");

    // Reset form
    reset({
      date: new Date().toISOString(),
      vendor: "",
      note: "",
      draft: {
        itemName: "",
        unitQty: 0,
        unit: "jar",
        subUnitQty: 0,
        subUnit: "pc",
      },
      items: [],
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-2 shadow-sm rounded-md w-full mx-2 bg-gray-100"
    >
      <h2 className="text-xl font-semibold text-[#035d67] bg-[var(--base-color)] uppercase mb-4 p-3">
        Add Purchase Order
      </h2>

      {/* Header */}
      <div className="flex gap-4 my-4">
        <div className="w-1/4">
          <CustomDateTimePicker
            width="w-[22rem]"
            height="h-[2.4rem]"
            isDisable={true}
          />
        </div>

        <div className="w-1/4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Vendor <span className="text-red-500">*</span>
          </label>
          <select
            {...register("vendor", { required: "Vendor is required" })}
            className={`w-full px-3 py-2 border rounded shadow-sm focus:outline-none ${
              errors.vendor ? "border-red-500" : "border-gray-300"
            }`}
          >
            <option value="">Select Vendor...</option>
            <option value="Vendor A">Vendor A</option>
            <option value="Vendor B">Vendor B</option>
          </select>
          {errors.vendor && (
            <p className="text-xs text-red-500">{errors.vendor.message}</p>
          )}
        </div>
      </div>

      {/* Table Head */}
      <div className="grid grid-cols-12 gap-2 font-semibold text-[#035d67] bg-[var(--base-color)] px-2 py-1.5 rounded">
        <div className="col-span-4">Item Name *</div>
        <div className="col-span-1">Unit Qty *</div>
        <div className="col-span-2">Unit *</div>
        <div className="col-span-2">Sub Unit Qty *</div>
        <div className="col-span-2">Sub Unit *</div>
        <div className="col-span-1 text-center">Action</div>
      </div>

      {/* Draft Row */}
      <div className="grid grid-cols-12 gap-2 items-start border border-gray-200 rounded px-1 py-1">
        <div className="col-span-4">
          <input
            type="text"
            placeholder="Item Name"
            {...register("draft.itemName", {
              required: fields.length === 0 ? "Required" : false,
            })}
            className={`w-full px-2 py-1 border rounded ${
              errors.draft?.itemName ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.draft?.itemName && (
            <p className="text-xs text-red-500">
              {errors.draft.itemName.message}
            </p>
          )}
        </div>

        <div className="col-span-1">
          <input
            type="number"
            placeholder="Qty"
            {...register("draft.unitQty", {
              required: fields.length === 0 ? "Required" : false,
              valueAsNumber: true,
              min:
                fields.length === 0
                  ? { value: 1, message: "Must be > 0" }
                  : undefined,
            })}
            className={`w-full px-2 py-1 border rounded ${
              errors.draft?.unitQty ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.draft?.unitQty && (
            <p className="text-xs text-red-500">
              {errors.draft.unitQty.message}
            </p>
          )}
        </div>

        <div className="col-span-2">
          <input
            type="text"
            readOnly
            {...register("draft.unit", { required: "Required" })}
            className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <div className="col-span-2">
          <input
            type="number"
            placeholder="Sub Qty"
            {...register("draft.subUnitQty", {
              required: fields.length === 0 ? "Required" : false,
              valueAsNumber: true,
              min:
                fields.length === 0
                  ? { value: 1, message: "Must be > 0" }
                  : undefined,
            })}
            className={`w-full px-2 py-1 border rounded ${
              errors.draft?.subUnitQty ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.draft?.subUnitQty && (
            <p className="text-xs text-red-500">
              {errors.draft.subUnitQty.message}
            </p>
          )}
        </div>

        <div className="col-span-2">
          <input
            type="text"
            readOnly
            {...register("draft.subUnit", { required: "Required" })}
            className="w-full px-2 py-1 border border-gray-300 rounded bg-gray-100"
          />
        </div>

        <div className="col-span-1 flex justify-center">
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

      {/* Items list */}
      <div>
        {fields.map((item, index) => (
          <div
            key={item.id}
            className="grid grid-cols-12 gap-2 items-center border border-gray-200 rounded px-1 py-1 bg-gray-50"
          >
            <div className="col-span-4 px-2">{item.itemName}</div>
            <div className="col-span-1 px-2">{item.unitQty}</div>
            <div className="col-span-2 px-2">{item.unit}</div>
            <div className="col-span-2 px-2">{item.subUnitQty}</div>
            <div className="col-span-2 px-2">{item.subUnit}</div>
            <div className="col-span-1 px-2 flex justify-center">
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
          className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded"
          rows={3}
        />
      </div>

      {/* Buttons */}
      <div className="my-6 flex justify-end gap-2">
        <Button
          type="button"
          onClick={() => navigate(-1)}
          bgcolor=""
          border="border-3 border"
          textColor="text-red-500"
          hover="hover:border-red-800 hover:text-red-800"
          name="Cancel"
        />
        <Button
          type="submit"
          bgcolor=""
          border="border-3 border"
          textColor="text-green-900"
          hover="hover:text-green-700"
          name="Submit"
        />
      </div>
    </form>
  );
};

export default AddPurchaseOrder;
