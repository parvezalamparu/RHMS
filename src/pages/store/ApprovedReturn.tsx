import { useState, useEffect } from "react";
import Button from "../../components/general/Button";
import { MdInfoOutline } from "react-icons/md";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import usePreviousPage from "../../hooks/usePreviousPage";
import Badge from "../../components/general/Badge";

interface ReturnItem {
  id: string;
  date: string;
  dept: string;
  qty: number;
  returnedBy: string;
  note: string;
}

const ApprovedReturn = () => {
  const navigate = useNavigate();
  usePreviousPage();

  useEffect(() => {
    document.title = "Rhds | Returned Items";
  }, []);

  // Dummy data
  const [items, setItems] = useState<ReturnItem[]>(
    Array.from({ length: 10 }, (_, i) => ({
      id: `RET00${i + 1}`,
      date: "12-8-2025",
      dept: i % 2 === 0 ? "OPD" : "OT",
      qty: 1,
      returnedBy: `User${i + 1}`,
      note: "Not working",
    }))
  );

  const [itemsPerPage, setItemsPerPage] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  // Filtering
  const filteredItems = items.filter(
    (item) =>
      item.dept.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.returnedBy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filteredItems.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const startNumber = startIndex + 1;
  const endNumber = startIndex + paginatedItems.length;

  return (
    <div className="flex flex-col pl-2">
      {/* Header */}
      <div className="flex justify-between items-center mb-4 bg-[var(--base-color)] max-h-12 p-2">
        <h2 className="text-2xl font-bold text-[#035d67] uppercase">
          Approved Return Items
        </h2>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
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
          className="border px-3 py-2 rounded border-gray-300 text-sm w-56 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>

      {/* Table */}
      <div className="overflow-auto bg-white rounded shadow-md border border-gray-200">
        <table className="w-full text-sm text-gray-800 border-collapse">
          <thead className="bg-[var(--base-color)] text-xs font-semibold">
            <tr>
              <th className="px-4 py-2 border border-gray-300 text-left w-[1rem] whitespace-nowrap">
                Sl. No.
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left w-[10rem]">
                Return ID
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Date
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Dept
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Qty
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left">
                Returned By
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left min-w-[6rem]">
                Note
              </th>
              <th className="px-4 py-2 border border-gray-300 text-left w-[3rem]">
                Status
              </th>
              <th className="px-4 py-3 border border-gray-300 text-left w-[1.5rem]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="text-center py-4 text-red-400 text-lg"
                >
                  No returned items found
                </td>
              </tr>
            )}
            {paginatedItems.map((item, index) => (
              <tr
                key={item.id}
                className="transition duration-150 border border-gray-300 hover:bg-gray-50"
              >
                <td className="px-4 border border-gray-300">
                  {startIndex + index + 1}
                </td>
                <td className="px-4 border border-gray-300">{item.id}</td>
                <td className="px-4 border border-gray-300">{item.date}</td>
                <td className="px-4 border border-gray-300">{item.dept}</td>
                <td className="px-4 border border-gray-300">{item.qty}</td>
                <td className="px-4 border border-gray-300">{item.returnedBy}</td>
                <td className="px-4 border border-gray-300">{item.note}</td>
                <td className="px-4 border border-gray-300">
                  <Badge 
                  label="Pending"
                  color="bg-yellow-300"
                  />
                </td>
                <td className="px-4 py-1.5 border-gray-300 flex gap-2 items-center">
                 
                  <Button
                    icon={<MdInfoOutline className="text-lg" />}
                    bgcolor="bg-blue-200"
                    border="border border-blue-500"
                    textColor="text-blue-900"
                    hover="hover:bg-blue-100"
                    onClick={() =>
                      navigate(`/store/approved-return-details/${item.id}`, {
                        state: item,
                      })
                    }
                    title="View Return"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center p-4 border-t border-b border-gray-300 bg-gray-50 text-sm text-gray-600">
        <div>
          {!searchTerm && (
            <p>
              Showing {startNumber} to {endNumber} of {items.length} entries
            </p>
          )}
          {searchTerm && (
            <p>
              Showing {startNumber} to {endNumber} of {filteredItems.length}{" "}
              items (Filtered from {items.length} items)
            </p>
          )}
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
  );
};

export default ApprovedReturn;
