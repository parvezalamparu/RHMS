import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/store/general/Button";
import { TiArrowBackOutline } from "react-icons/ti";
import { a4 } from "../../assets/assets";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

interface ItemDetails {
  id: number;
  itemName: string;
  itemCode: string;
  itemType: string;
  itemCategory: string;
  itemSubCategory?: string;
  lowLevel: number;
  highLevel: number;
  company?: string;
  stored?: string;
  hsn?: string;
  itemUnit: string;
  subUnitQty: number;
  subItemUnit: string;
  rackNo: string;
  shelfNo?: string;
  imageUrl?: string;
}

const dummyItems: ItemDetails[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  itemName: `Item ${i + 1}`,
  itemCode: `CODE-${i + 1}`,
  itemType: "Food",
  itemCategory: "Medical",
  itemSubCategory: "Tablet",
  lowLevel: 5,
  highLevel: 100,
  company: "Rainbow",
  stored: "Store A",
  hsn: `HSN-${i + 1}`,
  itemUnit: "PCS",
  subItemUnit: "PCS",
  subUnitQty: 10,
  rackNo: `R-${i + 1}`,
  shelfNo: `S-${i + 1}`,
  imageUrl: "https://via.placeholder.com/100",
}));

const Row: React.FC<{ label: string; value?: string | number }> = ({
  label,
  value,
}) => (
  <div className="flex items-start mb-2">
    <span className="text-red-600 font-semibold mr-2">☮</span>
    <span className="font-semibold text-gray-800 mr-1">{label} :-</span>
    <span className="text-gray-900">{value || "—"}</span>
  </div>
);

const tableTabs = [
  "Available Stock",
  "Item Stock Details",
  "Item Issue Details",
  "Item Return Details",
  "Item Damage Details",
];

// Dummy data per tab
const tabData: Record<number, string[][]> = {
  0: [["B-001", "₹50", "2026-01-01", "100"]],
  1: [["1", "2025-08-04", "B-001", "2026-01-01", "Vendor A", "Admin", "100", "5", "₹50", "₹60", "5%", "5%", "0%", "₹5000", "₹5500"]],
  2: [["1", "ISS-101", "REQ-55", "Admin", "Lab", "2025-08-04", "B-001", "10", "₹50", "5%", "5%", "0%", "₹500", "₹550"]],
  3: [["1", "Admin", "Pharmacy", "2025-08-04", "B-002", "3", "₹150"]],
  4: [["1", "Admin", "Ward 1", "2025-08-04", "B-003", "2"]],
};

const tableHeaders: Record<number, string[]> = {
  0: ["Batch No.", "Rate/Unit", "Exp. Date", "Qty"],
  1: ["SN", "Date", "Batch No.", "Exp. Date", "Vendor", "Purchased By", "Buy Qty", "Return Qty", "Rate/Unit", "MRP/Unit", "CGST", "SGST", "IGST", "Sub Total", "Total"],
  2: ["SN", "Issue No.", "Req No.", "Issued By", "Department", "Date", "Batch No.", "Qty", "Rate/Unit", "CGST", "SGST", "IGST", "Sub Total", "Total"],
  3: ["SN", "Approved By", "Department", "Date", "Batch No.", "Qty", "Total"],
  4: ["SN", "Approved By", "Department", "Date", "Batch No.", "Qty"],
};

const ViewItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = dummyItems.find((item) => item.id === Number(id));

  const [activeTab, setActiveTab] = useState(0);

  // One state per tab
  const [tabStates, setTabStates] = useState(
    tableTabs.map(() => ({
      itemsPerPage: 5,
      currentPage: 1,
      searchTerm: "",
    }))
  );

  if (!item) {
    return (
      <div className="p-6">
        <h2 className="text-xl font-semibold text-red-600">Item not found.</h2>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 bg-gray-700 text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  const updateTabState = (index: number, changes: Partial<typeof tabStates[number]>) => {
    setTabStates((prev) =>
      prev.map((state, i) =>
        i === index ? { ...state, ...changes } : state
      )
    );
  };

  const renderTable = () => {
    const headers = tableHeaders[activeTab];
    const rows = tabData[activeTab];

    const { itemsPerPage, currentPage, searchTerm } = tabStates[activeTab];

    // Filter rows by search term
    const filteredRows = rows.filter((row) =>
      row.some((cell) =>
        cell.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );

    const totalPages = Math.ceil(filteredRows.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedRows = filteredRows.slice(
      startIndex,
      startIndex + itemsPerPage
    );

    const startNumber = startIndex + 1;
    const endNumber = startIndex + paginatedRows.length;
    return (
      <div>
        {/* Controls */}
        <div className="flex justify-between items-center mb-3 flex-wrap gap-4">
          <div className="flex items-center space-x-2">
            <label className="text-sm">Show</label>
            <select
              value={itemsPerPage}
              onChange={(e) => updateTabState(activeTab, { itemsPerPage: parseInt(e.target.value), currentPage: 1 })}
              className="border border-gray-300 cursor-pointer px-2 py-1 text-sm rounded"
            >
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="25">25</option>
            </select>
            <span className="text-sm">entries</span>
          </div>

          <input
            type="search"
            value={searchTerm}
            onChange={(e) => updateTabState(activeTab, { searchTerm: e.target.value, currentPage: 1 })}
            placeholder="Search..."
            className="border border-gray-300 px-3 py-1 rounded text-sm w-56 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          />
        </div>

        {/* Table */}
        <div className="overflow-auto border border-gray-300 rounded">
          <table className="min-w-full text-sm border-collapse">
            <thead className="bg-[var(--base-color)]">
              <tr>
                {headers.map((col) => (
                  <th key={col} className="px-3 py-2 border border-gray-300 text-left">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedRows.length === 0 ? (
                <tr>
                  <td colSpan={headers.length} className="text-center py-3 text-red-500">No data found</td>
                </tr>
              ) : (
                paginatedRows.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className="px-3 py-2 border border-gray-300">{cell}</td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-2 bg-gray-50 border border-t-0 border-gray-300 text-sm mt-2">
          <div>
            Showing {filteredRows.length === 0 ? 0 : startNumber} to {endNumber} of {filteredRows.length} entries
          </div>
          <Stack direction="row" spacing={2}>
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => updateTabState(activeTab, { currentPage: page })}
              variant="outlined"
              size="small"
              color="primary"
            />
          </Stack>
        </div>
      </div>
    );
  };

  return (
    <div className="ml-2 p-4 bg-white shadow-lg rounded-lg border-2 border-gray-300 w-auto">
      <div className="bg-[var(--base-color)] text-[#035d67] px-4 py-2 rounded-t flex justify-between">
        <h2 className="text-lg font-semibold uppercase">Item Details</h2>
      </div>

      {/* Item Info */}
      <div className="grid grid-cols-4 gap-x-10 gap-y-2 p-6 text-sm">
        <div>
          <Row label="Item Name" value={item.itemName} />
          <Row label="Item Code" value={item.itemCode} />
          <Row label="Item Type" value={item.itemType} />
          <Row label="Item Category" value={item.itemCategory} />
          <Row label="Item Sub Category" value={item.itemSubCategory} />
        </div>
        <div>
          <Row label="Low Level" value={item.lowLevel} />
          <Row label="High Level" value={item.highLevel} />
          <Row label="Company" value={item.company} />
          <Row label="Stored In" value={item.stored} />
          <Row label="HSN/SAC No." value={item.hsn} />
        </div>
        <div>
          <Row label="Item Unit" value={item.itemUnit} />
          <Row label="Sub Item Unit" value={item.subItemUnit} />
          <Row label="1 Unit = (Sub Unit)" value={`1 ${item.itemUnit} = ${item.subUnitQty} ${item.subItemUnit}`} />
          <Row label="Rack No" value={item.rackNo} />
          <Row label="Shelf No" value={item.shelfNo} />
        </div>
        <div>
          {item.imageUrl && (
            <img src={a4} alt="Item" className="mt-1 w-24 h-24 object-cover rounded border-2 border-gray-300" />
          )}
        </div>
      </div>

      {/* Tabs */}
      <div className="pt-4">
        <div className="flex text-sm font-medium mb-3">
          {tableTabs.map((tab, index) => (
            <button
              key={index}
              className={`px-4 py-2 cursor-pointer border border-gray-300 ${
                activeTab === index
                  ? "bg-[var(--base-color)] text-[#064046]"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => setActiveTab(index)}
            >
              {tab}
            </button>
          ))}
        </div>

        {renderTable()}
      </div>
    </div>
  );
};

export default ViewItemDetails;
