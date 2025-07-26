import React, { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "../general/Button";
// import AddPurchaseModal from "../forms/AddPurchaseForm";
import AddPurchaseFormPage from "../forms/AddPurchaseForm";
import { FaPlus } from "react-icons/fa6";
// import { IoOptionsSharp } from "react-icons/io5";
import { SlOptionsVertical } from "react-icons/sl";
import { useNavigate } from "react-router-dom";

interface Purchase {
  id: string;
  invoiceNo: string;
  poNo: string;
  vendor: string;
  generatedBy: string;
  date: string;
  paymentTerms: string;
}

const generatePurchases = (count: number): Purchase[] => {
  const vendors = ["ABC Corp", "XYZ Pvt Ltd", "MediSupplies", "TechGear", "Global Traders"];
  const names = ["John Doe", "Jane Smith", "Robert Brown", "Alice Johnson", "Steve Adams"];
  const paymentTermsList = ["Net 30", "Net 15", "Due on Receipt", "Advance", "Installments"];

  return Array.from({ length: count }, (_, i) => ({
    id: `PUR-${(i + 1).toString().padStart(3, "0")}`,
    invoiceNo: `INV-${1000 + i}`,
    poNo: `PO-${2000 + i}`,
    vendor: vendors[Math.floor(Math.random() * vendors.length)],
    generatedBy: names[Math.floor(Math.random() * names.length)],
    date: new Date(2025, 6, Math.floor(Math.random() * 30) + 1).toISOString().split("T")[0],
    paymentTerms: paymentTermsList[Math.floor(Math.random() * paymentTermsList.length)],
  }));
};

const PurchesListPage = () => {
  const [purchases] = useState<Purchase[]>(generatePurchases(100));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");

  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [purchaseType, setPurchaseType] = useState<"direct" | "indirect" | null>(null);

  const handleOpenModal = (type: "direct" | "indirect") => {
    setPurchaseType(type);
    setShowPurchaseModal(true);
  };

//   const handleCloseModal = () => {
//     setShowPurchaseModal(false);
//     setPurchaseType(null);
//   };
const navigate = useNavigate();

  const filteredPurchases = purchases.filter((purchase) => {
    const term = searchTerm.toLowerCase();
    return (
      purchase.id.toLowerCase().includes(term) ||
      purchase.invoiceNo.toLowerCase().includes(term) ||
      purchase.poNo.toLowerCase().includes(term) ||
      purchase.vendor.toLowerCase().includes(term) ||
      purchase.generatedBy.toLowerCase().includes(term) ||
      purchase.date.toLowerCase().includes(term) ||
      purchase.paymentTerms.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredPurchases.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentPurchases = filteredPurchases.slice(startIdx, startIdx + itemsPerPage);
  const startNumber = startIdx + 1;
  const endNumber = startIdx + currentPurchases.length;

  const handleEdit = (id: string) => {
    const purchase = purchases.find((p) => p.id === id);
    if (purchase) {
      alert(`Edit Purchase:\n\n${JSON.stringify(purchase, null, 2)}`);
    }
  };

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <h1 className="text-2xl font-semibold">Purchase List</h1>
        <div className="flex gap-4">
          <Button
            bgcolor="bg-white"
            border="border border-gray-700"
            textColor="text-black"
            name="Add Purchase"
            icon={<FaPlus />}
            hover="hover:bg-gray-200"
            // onClick={() => handleOpenModal("direct")}
            onClick={() => navigate("/store/purchase-list/add-purchase-form")}
          />
          
        </div>
      </div>

      <div className="flex justify-between mb-4 flex-wrap gap-4 items-center">
        <div className="flex items-center space-x-2">
          <label htmlFor="pageSize" className="text-sm text-gray-700">Show</label>
          <select
            id="pageSize"
            className="border rounded px-2 py-1 text-sm"
            value={itemsPerPage}
            onChange={(e) => {
              setItemsPerPage(parseInt(e.target.value));
              setCurrentPage(1);
            }}
          >
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
          </select>
          <span className="text-sm text-gray-700">entries</span>
        </div>

        <input
          type="search"
          className="border px-3 py-2 rounded text-sm w-56"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      <div className="overflow-x-auto bg-white rounded shadow mb-8">
        <table className="min-w-full text-sm text-left table-auto">
          <thead className="bg-[var(--base-color)] text-gray-700 border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 border-r">SN</th>
              <th className="px-4 py-3 border-r">Purchase No.</th>
              <th className="px-4 py-3 border-r">Invoice No.</th>
              <th className="px-4 py-3 border-r">Purchase Order No.</th>
              <th className="px-4 py-3 border-r">Vendor</th>
              <th className="px-4 py-3 border-r">Generated By</th>
              <th className="px-4 py-3 border-r">Date</th>
              <th className="px-4 py-3 border-r">Payment Terms</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentPurchases.map((purchase, index) => (
              <tr key={purchase.id} className="border-t hover:bg-gray-50 transition duration-200">
                <td className="px-4 py-2 border-r">{(currentPage - 1) * itemsPerPage + index + 1}</td>
                <td className="px-4 py-2 border-r">{purchase.id}</td>
                <td className="px-4 py-2 border-r">{purchase.invoiceNo}</td>
                <td className="px-4 py-2 border-r">{purchase.poNo}</td>
                <td className="px-4 py-2 border-r">{purchase.vendor}</td>
                <td className="px-4 py-2 border-r">{purchase.generatedBy}</td>
                <td className="px-4 py-2 border-r">{purchase.date}</td>
                <td className="px-4 py-2 border-r">{purchase.paymentTerms}</td>
                <td className="px-4 py-2">
                  <Button
                    icon={<SlOptionsVertical className="text-lg" />}
                    bgcolor="bg-gray-100"
                    border="border-2 border-gray-600"
                    textColor="text-blue-900"
                    hover="hover:bg-gray-200"
                    onClick={() => handleEdit(purchase.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center p-4 border-t border-b bg-gray-50 text-sm text-gray-600">
          <div>
            Showing {startNumber} to {endNumber} of {filteredPurchases.length} entries
          </div>
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => changePage(page)}
              variant="outlined"
              color="primary"
            />
          </Stack>
        </div>
      </div>

      {/* {showPurchaseModal && (
        <AddPurchaseModal
          open={showPurchaseModal}
          handleClose={handleCloseModal}
        //   type={purchaseType}
        />
      )} */}
    </div>
  );
};

export default PurchesListPage;
