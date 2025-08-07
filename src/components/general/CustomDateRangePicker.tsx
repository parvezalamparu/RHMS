import { useState, useRef } from 'react';
import Flatpickr from 'react-flatpickr';
import 'flatpickr/dist/themes/material_blue.css';

const CustomDateRangePicker = () => {
  const [range, setRange] = useState<Date[]>([]);
  const inputRef = useRef<any>(null);

  return (
    <div className="mb-4 relative">
      <label className="block mb-1 text-sm font-medium">Date Range Picker</label>
      <div className="relative">
        <Flatpickr
          options={{
            mode: 'range',
            dateFormat: 'd-m-Y',
            closeOnSelect: false,
          }}
          value={range}
          onChange={(selectedDates) => setRange(selectedDates)}
          className="border px-3 py-2 rounded w-full pr-10"
          ref={inputRef}
        />
      </div>
    </div>
  );
};

export default CustomDateRangePicker;
