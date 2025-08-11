import React, { useState } from "react";

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const MonthSelect = () => {
  const currentMonthIndex = new Date().getMonth(); // 0 for Jan, 11 for Dec
  const [selectedMonth, setSelectedMonth] = useState(months[currentMonthIndex]);

  return (
    <div>
      <label className="block font-medium mb-1">Select Month:</label>
      <select
        value={selectedMonth}
        onChange={(e) => setSelectedMonth(e.target.value)}
        className="border border-gray-300 rounded px-3 py-1"
      >
        {months.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

export default MonthSelect;
