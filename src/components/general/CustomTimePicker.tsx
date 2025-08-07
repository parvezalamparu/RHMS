import { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

const CustomTimePicker = () => {
  const [time, setTime] = useState<Date>(new Date()); 

  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium">Time Picker</label>
      <Flatpickr
        options={{
          enableTime: true,
          noCalendar: true,
          dateFormat: "h:i K", 
          time_24hr: false,   
        }}
        className="border px-3 rounded w-full"
        value={time}
        onChange={(selectedDates) => setTime(selectedDates[0])}
      />
    </div>
  );
};

export default CustomTimePicker;
