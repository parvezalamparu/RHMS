import { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";

const CustomDatePicker = () => {
  const [date, setDate] = useState<Date | string>(new Date());

  return (
    <div>
      {/* <label className="block mb-1 text-sm font-medium">Date Picker</label> */}
      <Flatpickr
        options={{
          dateFormat: "d-m-Y",
        }}
        className="border px-3 py-1 rounded w-full"
        value={date}
        onChange={(selectedDates) => setDate(selectedDates[0])}
      />
    </div>
  );
};

export default CustomDatePicker;
