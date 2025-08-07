import { useState } from "react";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import Button from "../../components/store/general/Button";
import { FaRegEdit } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import ToggleSwitch from "../../components/store/general/ToggleSwitchProps";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { BiSave } from "react-icons/bi";
import { IoIosCloseCircleOutline } from "react-icons/io";
import toast from "react-hot-toast";

interface ItemCategory {
  id: number;
  name: string;
  status: boolean;
}

const generateRandomCategories = (count: number): ItemCategory[] => {
  const categories = [
    "Medicine",
    "Equipment",
    "Consumables",
    "Surgical",
    "Lab Supplies",
  ];
  return Array.from({ length: count }, (_, i) => ({
    id: i + 1,
    name: `${categories[i % categories.length]} ${i + 1}`,
    status: Math.random() > 0.5,
  }));
};

const ItemCategoryPage = () => {
  const [categories, setCategories] = useState<ItemCategory[]>(
    generateRandomCategories(47)
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  // Edit modal states
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editCategory, setEditCategory] = useState<ItemCategory | null>(null);
  const [editedName, setEditedName] = useState("");

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);
  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentCategories = filteredCategories.slice(
    startIdx,
    startIdx + itemsPerPage
  );
  const startNumber = startIdx + 1;
  const endNumber = startIdx + currentCategories.length;

  const handleEdit = (id: number) => {
    const category = categories.find((cat) => cat.id === id);
    if (category) {
      setEditCategory(category);
      setEditedName(category.name);
      setIsEditModalOpen(true);
    }
  };

  const handleUpdateCategory = () => {
    if (editCategory && editedName.trim()) {
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === editCategory.id ? { ...cat, name: editedName.trim() } : cat
        )
      );
      setIsEditModalOpen(false);
      setEditCategory(null);
    }
  };

  const handleStatusToggle = (id: number) => {
    setCategories((prev) =>
      prev.map((cat) => (cat.id === id ? { ...cat, status: !cat.status } : cat))
    );
  };

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      const newCat: ItemCategory = {
        id: categories.length + 1,
        name: newCategory.trim(),
        status: true,
      };
      setCategories([newCat, ...categories]);
      setNewCategory("");
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 bg-[var(--base-color)] p-2">
        <h1 className="text-2xl font-bold text-[#035d67] uppercase">
          Item Categories
        </h1>
        <Button
          bgcolor="bg-white"
          border="border-3 border-[var(--dark-color)]"
          textColor="text-black"
          name="Add Category"
          icon={<FaPlus />}
          hover="hover:bg-gray-200"
          onClick={() => setIsModalOpen(true)}
        />
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <label htmlFor="pageSize" className="text-sm text-gray-700">
            Show
          </label>
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
          className="border px-3 py-2 rounded text-sm w-56 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          placeholder="Search category..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow mb-8">
        <table className="min-w-full text-sm text-left table-auto">
          <thead className="bg-[var(--base-color)] text-gray-700 border-b border-gray-300">
            <tr>
              <th className="px-4 py-3 border-r border-gray-300">SL</th>
              <th className="px-4 py-3 border-r border-gray-300">
                Category Name
              </th>
              <th className="px-4 py-3 border-r border-gray-300">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentCategories.map((cat, index) => (
              <tr
                key={cat.id}
                className={`border-t border-gray-300 transition duration-200 ${
                  cat.status ? "hover:bg-gray-50" : "bg-red-50 text-gray-400"
                }`}
              >
                <td className="px-4 py-2 border-r border-gray-200">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="px-4 py-2 border-r border-gray-200">
                  {cat.name}
                </td>
                <td className="px-4 py-2 border-r border-gray-200">
                  <ToggleSwitch
                    checked={cat.status}
                    onChange={() => handleStatusToggle(cat.id)}
                  />
                </td>
                <td className="px-4 py-2">
                  <Button
                    icon={<FaRegEdit className="text-lg" />}
                    bgcolor="bg-gray-100"
                    border="border-2 border-gray-600"
                    textColor="text-blue-900"
                    hover="hover:bg-gray-200"
                    onClick={() => handleEdit(cat.id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination Footer */}
        <div className="flex justify-between items-center p-4 border-t border-b border-gray-300 bg-gray-50 text-sm text-gray-600">
          <div>
            Showing {startNumber} to {endNumber} of {filteredCategories.length}{" "}
            entries
          </div>
          <Stack spacing={2} direction="row" justifyContent="flex-end">
            <Pagination
              count={totalPages}
              page={currentPage}
              onChange={(_, page) => setCurrentPage(page)}
              variant="outlined"
              color="primary"
            />
          </Stack>
        </div>
      </div>

      {/* Add Category Modal */}
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box className="bg-white rounded-lg p-6 w-[90%] max-w-md mx-auto mt-40 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center text-[#035d67]">
            Add New Category
          </h2>
          {/* form tag e dite hobe  */}
          <input
            type="text"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            onBlur={() => {
              if (newCategory.trim().length > 0) {
                toast.success("Created Successfully");
              }
            }}
            placeholder="Enter category name"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          />
          <div className="col-span-4 mt-8 flex justify-end">
            <div className="mx-4">
              <Button
                bgcolor="bg-red-400"
                border="border-3 border-[--var(--base-color)]"
                textColor="text-black"
                hover="hover:bg-red-300"
                name="Close"
                onClick={() => setIsModalOpen(false)}
                icon={<IoIosCloseCircleOutline />}
              />
            </div>
            <div>
              <Button
                bgcolor="bg-green-400"
                border="border-3 border-[--var(--base-color)]"
                textColor="text-black"
                hover="hover:bg-green-300"
                name="Save"
                onClick={handleAddCategory}
                icon={<BiSave />}
              />
            </div>
          </div>
        </Box>
      </Modal>

      {/* Edit Category Modal */}
      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <Box className="bg-white rounded-lg p-6 w-[90%] max-w-md mx-auto mt-40 shadow-lg">
          <h2 className="text-xl font-semibold mb-4 text-center text-[#035d67]">
            Edit Category
          </h2>
          <input
            type="text"
            value={editedName}
            onChange={(e) => {
              setEditedName(e.target.value);
            }}
            onBlur={() => {
              if (editedName.trim().length > 0) {
                toast.success("Updated Successfully");
              }
            }}
            placeholder="Edit category name"
            className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          />
          <div className="col-span-4 mt-8 flex justify-end">
            <div className="mx-4">
              <Button
                bgcolor="bg-red-400"
                border="border-3 border-[--var(--base-color)]"
                textColor="text-black"
                hover="hover:bg-red-300"
                name="Close"
                onClick={() => setIsEditModalOpen(false)}
                icon={<IoIosCloseCircleOutline />}
              />
            </div>
            <div>
              <Button
                bgcolor="bg-green-400"
                border="border-3 border-[--var(--base-color)]"
                textColor="text-black"
                hover="hover:bg-green-300"
                name="Update"
                onClick={handleUpdateCategory}
                icon={<BiSave />}
              />
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ItemCategoryPage;
