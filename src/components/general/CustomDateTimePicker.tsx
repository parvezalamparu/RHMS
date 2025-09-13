import { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

type CustomSize = {
  height?: string;
  width?: string;
  border?: string;
  rounded?: string;
  focus?: string;
  isDisable?: boolean;
  label?: string;
  value?: Date;
  onChange?: (date: Date) => void;
};

const CustomDateTimePicker: React.FC<CustomSize> = ({
  border = "border border-gray-300",
  rounded = "rounded",
  height = "py-2",
  width = "w-50",
  focus = "focus:outline-none focus:ring-2 focus:ring-cyan-200",
  isDisable = false,
  label = "Date & Time Picker",
  value,
  onChange,
}) => {
  const [dateTime, setDateTime] = useState<Date>(value || new Date());

  const handleChange = (selectedDates: Date[]) => {
    const newDate = selectedDates[0];
    setDateTime(newDate);
    if (onChange) onChange(newDate);
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium">{label}</label>
      <Flatpickr
        options={{
          enableTime: true,
          dateFormat: "d-m-Y h:i K", // e.g., 12-09-2025 10:15 PM
          time_24hr: false,
        }}
        className={`${border} ${height} ${width} ${rounded} ${focus} px-2 w-full`}
        value={dateTime}
        disabled={isDisable}
        onChange={handleChange}
      />
    </div>
  );
};

export default CustomDateTimePicker;
