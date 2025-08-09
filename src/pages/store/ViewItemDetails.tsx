import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/store/general/Button";
import { TiArrowBackOutline } from "react-icons/ti";
import { a4 } from "../../assets/assets";

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

const ViewItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const item = dummyItems.find((item) => item.id === Number(id));
  const [activeTab, setActiveTab] = useState(0);
  const profileName = "Admin"; // replace with actual logged-in profile name

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

  const renderTable = () => {
    const baseTableClass = "min-w-full mt-4 text-sm border border-gray-300";
    const thTdClass = "px-3 py-2 border border-gray-300 text-left";

    switch (activeTab) {
      case 0:
        return (
          <table className={baseTableClass}>
            <thead className="bg-[var(--base-color)]">
              <tr>
                <th className={thTdClass}>Batch No.</th>
                <th className={thTdClass}>Rate/Unit</th>
                <th className={thTdClass}>Exp. Date</th>
                <th className={thTdClass}>Qty</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className={thTdClass}>B-001</td>
                <td className={thTdClass}>₹50</td>
                <td className={thTdClass}>2026-01-01</td>
                <td className={thTdClass}>100</td>
              </tr>
            </tbody>
          </table>
        );
      case 1:
        return (
          <table className={baseTableClass}>
            <thead className="bg-[var(--base-color)]">
              <tr>
                {[
                  "SN",
                  "Date",
                  "Batch No.",
                  "Exp. Date",
                  "Vendor",
                  "Purchased By",
                  "Buy Qty",
                  "Return Qty",
                  "Rate/Unit",
                  "MRP/Unit",
                  "CGST",
                  "SGST",
                  "IGST",
                  "Sub Total",
                  "Total",
                ].map((col) => (
                  <th key={col} className={thTdClass}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {[
                  "1",
                  "2025-08-04",
                  "B-001",
                  "2026-01-01",
                  "Vendor A",
                  profileName,
                  "100",
                  "5",
                  "₹50",
                  "₹60",
                  "5%",
                  "5%",
                  "0%",
                  "₹5000",
                  "₹5500",
                ].map((val, i) => (
                  <td key={i} className={thTdClass}>
                    {val}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        );
      case 2:
        return (
          <table className={baseTableClass}>
            <thead className="bg-[var(--base-color)]">
              <tr>
                {[
                  "SN",
                  "Issue No.",
                  "Req No.",
                  "Issued By",
                  "Where",
                  "Date",
                  "Batch No.",
                  "Qty",
                  "Rate/Unit",
                  "CGST",
                  "SGST",
                  "IGST",
                  "Sub Total",
                  "Total",
                ].map((col) => (
                  <th key={col} className={thTdClass}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {[
                  "1",
                  "ISS-101",
                  "REQ-55",
                  profileName,
                  "Lab",
                  "2025-08-04",
                  "B-001",
                  "10",
                  "₹50",
                  "5%",
                  "5%",
                  "0%",
                  "₹500",
                  "₹550",
                ].map((val, i) => (
                  <td key={i} className={thTdClass}>
                    {val}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        );
      case 3:
        return (
          <table className={baseTableClass}>
            <thead className="bg-[var(--base-color)]">
              <tr>
                {[
                  "SN",
                  "Approved By",
                  "Where",
                  "Date",
                  "Batch No.",
                  "Qty",
                  "Total",
                ].map((col) => (
                  <th key={col} className={thTdClass}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {[
                  "1",
                  profileName,
                  "Pharmacy",
                  "2025-08-04",
                  "B-002",
                  "3",
                  "₹150",
                ].map((val, i) => (
                  <td key={i} className={thTdClass}>
                    {val}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        );
      case 4:
        return (
          <table className={baseTableClass}>
            <thead className="bg-[var(--base-color)]">
              <tr>
                {["SN", "Approved By", "Where", "Date", "Batch No.", "Qty"].map(
                  (col) => (
                    <th key={col} className={thTdClass}>
                      {col}
                    </th>
                  )
                )}
              </tr>
            </thead>
            <tbody>
              <tr>
                {["1", profileName, "Ward 1", "2025-08-04", "B-003", "2"].map(
                  (val, i) => (
                    <td key={i} className={thTdClass}>
                      {val}
                    </td>
                  )
                )}
              </tr>
            </tbody>
          </table>
        );
      default:
        return null;
    }
  };

  return (
    <div className="ml-2 p-4 bg-white shadow-lg rounded-lg border-2 border-gray-300 w-auto">
      <div className="bg-[var(--base-color)] text-[#035d67] px-4 py-2 rounded-t flex justify-between">
        <h2 className="text-lg font-semibold uppercase">Item Details</h2>

        <Button
          name="Back to Items"
          onClick={() => navigate(-1)}
          bgcolor="bg-white"
          border="border-3 border-[--var(--base-color)]"
          textColor="text-blue-600"
          hover="hover:bg-gray-100"
          icon={<TiArrowBackOutline />}
        />
      </div>

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
          <Row
            label="1 Unit = (Sub Unit)"
            value={`1 ${item.itemUnit} = ${item.subUnitQty} ${item.subItemUnit}`}
          />
          <Row label="Rack No" value={item.rackNo} />
          <Row label="Shelf No" value={item.shelfNo} />
        </div>
        <div>
          {item.imageUrl && (
            <div className="col-span-2 flex items-start mt-2">
              
              <div>
                
                <img
                  src={a4}
                  alt="Item"
                  className="mt-1 w-24 h-24 object-cover rounded border"
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="pt-4">
        <div className="flex text-sm font-medium">
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
