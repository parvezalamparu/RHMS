import { useState } from "react";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/material_blue.css";


type customeSize = {
   height?: string,
   width?: string,
   isDisable? : boolean
}

const CustomDateTimePicker : React.FC <customeSize> = ({height = 'py-2', width = 'w-50',isDisable})   => {
  const [dateTime, setDateTime] = useState<Date>(new Date()); 

  return (
    <div className="mb-4">
      <label className="block mb-1 text-sm font-medium">Date & Time Picker</label>
      <Flatpickr
        options={{
          enableTime: true,
          dateFormat: "d-m-Y h:i K",
          time_24hr: false,
        }}
        className= {`border ${height} ${width} px-2 rounded w-6/9`}
        value={dateTime}
        disabled = {isDisable}
        onChange={(selectedDates) => setDateTime(selectedDates[0])}
      />
    </div>
  );
};

export default CustomDateTimePicker;
