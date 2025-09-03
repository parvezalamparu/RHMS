import React, { useState } from "react";
import Button from "../../components/store/general/Button";
import { PiMicrosoftExcelLogo } from "react-icons/pi";


interface StockItem {
  id: number;
  itemName: string;
  unitType: string;
  issueQty: number;
  returnQty: number;
  amount: number;
}

const DepartmentStockReport: React.FC = () => {
  const [department, setDepartment] = useState("");
  const [stockData, setStockData] = useState<StockItem[]>([]);

  const departments = ["Reception", "OPD", "IPD", "Investigation"];

  // Dummy data - Replace with API call based on department
  const dummyStockData: StockItem[] = [
    { id: 1, itemName: "A4 Paper", unitType: "PCS", issueQty: 100, returnQty: 10, amount: 5000 },
    { id: 2, itemName: "Pen", unitType: "Piece", issueQty: 50, returnQty: 5, amount: 2000 },
    { id: 3, itemName: "Prescription", unitType: "Piece", issueQty: 30, returnQty: 0, amount: 1500 },
  ];

  const handleFindItems = () => {
    if (!department) {
      alert("Please select a department.");
      return;
    }
    setStockData(dummyStockData);
  };

  const totalAmount = stockData.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="flex flex-col pl-4 mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 bg-[var(--base-color)] max-h-12 p-2">
        <h2 className="text-xl font-bold text-[#035d67] uppercase">
          Department Stock Report
        </h2>
        <Button
          bgcolor="bg-white"
          border="border-2 border-gray-800"
          textColor="text-black"
          name="Export"
          icon={<PiMicrosoftExcelLogo />}
          hover="hover:bg-gray-100"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 my-8">
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="border border-gray-300 rounded px-3 py-2 min-w-60 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
        >
          <option value="">Select Department</option>
          {departments.map((dept, index) => (
            <option key={index} value={dept}>
              {dept}
            </option>
          ))}
        </select>

        <Button
          bgcolor="bg-white"
          border="border border-gray-300"
          textColor="text-black"
          hover="hover:bg-gray-100"
          name="Find Items"
          onClick={handleFindItems}
        />
      </div>

      {/* Table */}
      {stockData.length > 0 && (
        <div className="overflow-auto bg-white rounded shadow-md border border-gray-200">
          <table className="w-full text-sm text-gray-800 border-collapse">
            <thead className="bg-[var(--base-color)] text-xs font-semibold">
              <tr>
                {["Sl. No.", "Item Name", "Unit Type", "Issue Qty.", "Return Qty.", "Amount"].map(
                  (header, idx) => (
                    <th
                      key={idx}
                      className="px-4 py-3 border border-gray-300 text-left select-none"
                    >
                      {header}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              {stockData.map((item, index) => (
                <tr
                  key={item.id}
                  className="transition duration-150 hover:bg-gray-50 border border-gray-300"
                >
                  <td className="px-4 py-2 border border-gray-300">{index + 1}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.itemName}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.unitType}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.issueQty}</td>
                  <td className="px-4 py-2 border border-gray-300">{item.returnQty}</td>
                  <td className="px-4 py-2 border border-gray-300">
                    ₹{item.amount.toFixed(2)}
                  </td>
                </tr>
              ))}

              {/* Grand Total */}
              <tr className="bg-gray-100 font-bold text-blue-500">
                <td colSpan={5} className="px-4 py-2 border border-gray-300 text-center">
                  Grand Total
                </td>
                <td className="px-4 py-2 border border-gray-300">
                  ₹{totalAmount.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DepartmentStockReport;
