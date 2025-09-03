import React from "react";
import Button from "../store/general/Button";

interface FilterField {
  key: string;
  label: string;
  type?: string;
  options?: string[];
}

interface FilterFormProps {
  fields: FilterField[];
  filters: Record<string, string>;
  setFilters: React.Dispatch<React.SetStateAction<Record<string, string>>>;
  onApply?: () => void;
  onReset?: () => void;
}

const FilterForm: React.FC<FilterFormProps> = ({
  fields,
  filters,
  setFilters,
  onApply,
  onReset,
}) => {
  return (
    <div className="bg-gray-50 p-4 rounded-xl shadow-md border border-gray-200">
      <h1 className="text-lg pb-2 font-semibold text-[#035d67]">Filter</h1>
      {/* Inputs Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-1 gap-2">
        {fields.map((field) => (
          <div key={field.key} className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">
              {field.label}
            </label>

            {field.type === "select" && field.options ? (
              <select
                value={filters[field.key] || ""}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, [field.key]: e.target.value }))
                }
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
              >
                <option value="">Select {field.label}</option>
                {field.options.map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={field.type || "text"}
                value={filters[field.key] || ""}
                onChange={(e) =>
                  setFilters((prev) => ({ ...prev, [field.key]: e.target.value }))
                }
                className="border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-300"
              />
            )}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 justify-end mt-6">
        {onReset && (
          <Button
            bgcolor="bg-red-400"
            name="Reset"
            border="border-2 border-gray-800"
            textColor="text-black"
            hover="hover:bg-red-300"
            onClick={onReset}
          />
        )}
        {onApply && (
          <Button
            bgcolor="bg-green-400"
            name="Apply"
            border="border-2 border-gray-800"
            textColor="text-black"
            hover="hover:bg-green-300"
            onClick={onApply}
          />
        )}
      </div>
    </div>
  );
};

export default FilterForm;
