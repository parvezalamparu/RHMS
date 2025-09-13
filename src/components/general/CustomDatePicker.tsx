import { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

type CustomDatePickerProps = {
  defaultDate?: string;
  onChange?: (date: string) => void;
};

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({ defaultDate, onChange }) => {
  const [date, setDate] = useState<Date | null>(defaultDate ? new Date(defaultDate) : null);

  return (
    <div>
      <Flatpickr
        options={{
          dateFormat: "d-m-Y",
          allowInput: true, // let user clear it
        }}
        className="border px-3 py-1 w-full border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200"
        value={date || ""}
        placeholder="00-00-0000"
        onChange={(selectedDates) => {
          const selected = selectedDates[0] || null;
          setDate(selected);
          if (onChange) onChange(selected ? selected.toISOString() : "");
        }}
      />
    </div>
  );
};

export default CustomDatePicker;
