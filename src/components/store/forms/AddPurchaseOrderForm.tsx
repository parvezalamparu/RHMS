
import { useForm, useFieldArray } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import Button from "../general/Button";
import { BiSave } from "react-icons/bi";
import CustomDateTimePicker from "../../general/CustomDateTimePicker";


type FormValues = {
  date: string;
  vendor: string;
  items: {
    itemName: string;
    unitQty: number;
    unit: string;
    subUnitQty: number;
    subUnit: string;
  }[];
  note: string;
};

const AddPurchaseOrderForm = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      date: new Date().toISOString().slice(0, 16),
      vendor: "",
      items: [
        { itemName: "", unitQty: 0, unit: "", subUnitQty: 0, subUnit: "" },
      ],
      note: "",
    },
  });

  const { fields, append } = useFieldArray({
    control,
    name: "items",
  });

  const onSubmit = (data: FormValues) => {
    alert("Form submitted!\n" + JSON.stringify(data, null, 2));
    navigate("/purchase-orders");
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold mb-6 text-[#035d67] uppercase">Add Purchase Order</h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6 bg-white p-6 rounded shadow-md"
      >
        {/* Date & Vendor */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div>
            <CustomDateTimePicker/>
            {errors.date && <p className="text-red-500 text-sm">Date is required</p>}
          </div>

          <div>
            <label className="block font-medium mb-1">
              Vendor <span className="text-red-500">*</span>
            </label>
            <select
              {...register("vendor", { required: true })}
              className="w-full border px-3 py-2 rounded"
            >
              <option value="">Select One.....</option>
              <option value="ABC Suppliers">ABC Suppliers</option>
              <option value="XYZ Traders">XYZ Traders</option>
              <option value="Delta Corp">Delta Corp</option>
            </select>
            {errors.vendor && <p className="text-red-500 text-sm">Vendor is required</p>}
          </div>
        </div>

        {/* Items Header */}
        <div className="bg-[#2ef2ef] text-gray-900 font-semibold p-2 rounded-t">
          <div className="grid grid-cols-7 gap-2 text-sm">
            <span className="col-span-2">Item Name *</span>
            <span>Unit Qty *</span>
            <span>Unit *</span>
            <span>Sub Unit Qty *</span>
            <span>Sub Unit *</span>
            <span className="flex justify-end">+ Add</span>
          </div>
        </div>

        {/* Items Rows */}
        {fields.map((field, index) => (
          <div
            key={field.id}
            className="grid grid-cols-7 gap-2 border-b py-2 items-center"
          >
            <select
              {...register(`items.${index}.itemName`, { required: true })}
              className="col-span-2 border px-2 py-1 rounded"
            >
              <option value="">Select One.....</option>
              <option value="Item A">Item A</option>
              <option value="Item B">Item B</option>
            </select>

            <input
              type="number"
              {...register(`items.${index}.unitQty`, { required: true })}
              className="border px-2 py-1 rounded"
            />
            <input
              type="text"
              {...register(`items.${index}.unit`, { required: true })}
              className="border px-2 py-1 rounded"
            />
            <input
              type="number"
              {...register(`items.${index}.subUnitQty`, { required: true })}
              className="border px-2 py-1 rounded"
            />
            <input
              type="text"
              {...register(`items.${index}.subUnit`, { required: true })}
              className="border px-2 py-1 rounded"
            />

            {/* Add Button Only in Last Row */}
            <div className="text-end">
              {index === fields.length - 1 && (
                <button
                  type="button"
                  onClick={() =>
                    append({
                      itemName: "",
                      unitQty: 0,
                      unit: "",
                      subUnitQty: 0,
                      subUnit: "",
                    })
                  }
                  className="text-green-700 hover:text-green-900 p-2"
                  title="Add Item"
                >
                  <FaPlus />
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Note */}
        <div>
          <label className="block font-medium mb-1">Note</label>
          <textarea
            {...register("note")}
            rows={4}
            className="w-1/2 border px-3 py-2 rounded"
          />
        </div>

        {/* Save */}
        <div className="mt-8 flex justify-center">
          <Button
            bgcolor="bg-green-400"
            border="border-3 border-[--var(--base-color)]"
            textColor="text-black"
            hover="hover:bg-green-300"
            name="Save and Update Stock"
            icon={<BiSave />}
          />
        </div>
      </form>
    </div>
  );
};

export default AddPurchaseOrderForm;
