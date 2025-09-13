import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "../../components/general/Button";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import AddVendorModal from "../../components/store/forms/AddVendorModal";
import EditVendorModal from "../../components/store/forms/EditVendorModal";

interface Vendor {
  id: string;
  name: string;
  email: string;
  phone: string;
  gst: string;
  contactPerson: string;
  pincode: string;
  address: string;
}

const generateRandomVendors = (count: number): Vendor[] => {
  const names = [
    "ABC Traders",
    "QuickMart",
    "SupplyCo",
    "Mega Distributors",
    "Nova Vendors",
  ];
  const contacts = [
    "Amit Sharma",
    "Rekha Verma",
    "Suresh Das",
    "Nisha Rai",
    "Dinesh Patel",
  ];
  const addresses = ["Kolkata", "Delhi", "Mumbai", "Chennai", "Hyderabad"];
  return Array.from({ length: count }, (_, i) => ({
    id: `V-${(i + 1).toString().padStart(3, "0")}`,
    name: names[Math.floor(Math.random() * names.length)],
    email: `vendor${i + 1}@example.com`,
    phone: `98${Math.floor(10000000 + Math.random() * 89999999)}`,
    gst: `27ABCDE${i + 1000}Z5`,
    contactPerson: contacts[Math.floor(Math.random() * contacts.length)],
    pincode: `74${Math.floor(1000 + Math.random() * 8999)}`,
    address: addresses[Math.floor(Math.random() * addresses.length)],
  }));
};

const VendorPage = () => {
  const [vendors, setVendors] = useState<Vendor[]>(generateRandomVendors(20));
  const [editVendor, setEditVendor] = useState<Vendor | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Vendor;
    direction: "asc" | "desc";
  } | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleSort = (key: keyof Vendor) => {
    setSortConfig((prev) => {
      if (prev?.key === key) {
        return { key, direction: prev.direction === "asc" ? "desc" : "asc" };
      }
      return { key, direction: "asc" };
    });
  };

  const sortedVendors = [...vendors].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aVal = a[key]?.toString().toLowerCase() ?? "";
    const bVal = b[key]?.toString().toLowerCase() ?? "";
    if (aVal < bVal) return direction === "asc" ? -1 : 1;
    if (aVal > bVal) return direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredVendors = sortedVendors.filter((vendor) => {
    const term = searchTerm.toLowerCase();
    return (
      vendor.id.toLowerCase().includes(term) ||
      vendor.name.toLowerCase().includes(term) ||
      vendor.phone.toLowerCase().includes(term) ||
      vendor.gst.toLowerCase().includes(term) ||
      vendor.contactPerson.toLowerCase().includes(term) ||
      vendor.address.toLowerCase().includes(term)
    );
  });

  const totalPages = Math.ceil(filteredVendors.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentVendors = filteredVendors.slice(
    startIdx,
    startIdx + itemsPerPage
  );

  const changePage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleEdit = (id: string) => {
    const vendor = vendors.find((v) => v.id === id);
    if (vendor) {
      setEditVendor(vendor);
      setShowEditModal(true);
    }
  };

  const handleSaveVendor = (updatedVendor: Vendor) => {
    setVendors((prev) =>
      prev.map((v) => (v.id === updatedVendor.id ? updatedVendor : v))
    );
  };

  const startNumber = startIdx + 1;
  const endNumber = startIdx + currentVendors.length;

  return (
    <div className="pl-2 bg-gray-50">
      <div className="flex justify-between items-center mb-3 bg-[var(--base-color)] p-2">
        <h1 className="text-2xl font-bold uppercase text-[#035d67]">Vendors</h1>
        <Button
          bgcolor="bg-white"
          border="border-3 border-[var(--dark-color)]"
          textColor="text-black"
          name="Add Vendor"
          icon={<FaPlus />}
          hover="hover:bg-gray-200"
          onClick={() => setShowAddModal(true)}
        />
      </div>

      <div className="flex items-center justify-between mb-2 flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="pageSize" className="text-sm text-gray-700">
            Show
          </label>
          <select
            id="pageSize"
            className="border border-gray-300 cursor-pointer rounded px-2 py-1 text-sm"
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
          className="border border-gray-300 px-3 py-2 rounded text-sm w-56 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
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
              <th className="px-4 py-2 border-r border-gray-300">Sl. No</th>
              {["name", "email", "phone", "gst", "contactPerson", "pincode", "address"].map(
                (key) => (
                  <th
                    key={key}
                    className="px-4 py-2 border-r border-gray-300 cursor-pointer select-none"
                    onClick={() => handleSort(key as keyof Vendor)}
                  >
                    {(() => {
                      switch (key) {
                        case "name":
                          return "Vendor Name";
                        case "email":
                          return "Email"
                        case "phone":
                          return "Phone No";
                        case "gst":
                          return "Vendor GST";
                        case "contactPerson":
                          return "Contact Person Name";
                        case "pincode":
                          return "Pin Code"
                        case "address":
                          return "Address";
                        default:
                          return key;
                      }
                    })()}
                    <span>
                      {sortConfig?.key === key
                        ? sortConfig.direction === "asc"
                          ? " ▲"
                          : " ▼"
                        : " ⇅"}
                    </span>
                  </th>
                )
              )}
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentVendors.map((vendor, index) => (
              <tr
                key={vendor.id}
                className="border-t border-gray-300 hover:bg-gray-50 transition duration-200"
              >
                <td className="px-4 py-1 border-r border-gray-200">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-4 py-1 border-r border-gray-200">
                  {vendor.name}
                </td>
                <td className="px-4 py-1 border-r border-gray-200">
                  {vendor.email}
                  </td>
                <td className="px-4 py-1 border-r border-gray-200">
                  {vendor.phone}
                </td>
                <td className="px-4 py-1 border-r border-gray-200">
                  {vendor.gst}
                </td>
                <td className="px-4 py-1 border-r border-gray-200">
                  {vendor.contactPerson}
                </td>
                <td className="px-4 py-1 border-r border-gray-200">
                  {vendor.pincode}
                  </td>
                <td className="px-4 py-1 border-r border-gray-200">
                  {vendor.address}
                </td>
                <td className="px-4 py-1.5">
                  <Button
                    icon={<FaRegEdit className="text-lg" />}
                    bgcolor="bg-yellow-200"
                    border="border-2 border-yellow-600"
                    textColor="text-yellow-900"
                    hover="hover:bg-yellow-100"
                    onClick={() => handleEdit(vendor.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-between items-center p-4 border-t border-b border-gray-300 bg-gray-50 text-sm text-gray-600">
          <div>
            Showing {startNumber} to {endNumber} of {filteredVendors.length}{" "}
            entries
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

      <AddVendorModal
        open={showAddModal}
        handleClose={() => setShowAddModal(false)}
      />
      <EditVendorModal
        open={showEditModal}
        vendor={editVendor}
        handleClose={() => setShowEditModal(false)}
        onSave={handleSaveVendor}
      />
    </div>
  );
};

export default VendorPage;
