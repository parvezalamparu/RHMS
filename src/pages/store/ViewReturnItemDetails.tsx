import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "../../components/general/Button";

// Simulated API fetch
const fetchReturnDetails = async (id: string) => {
  // Replace with real API call
  return {
    header: {
      id,
      returnId: "RET-7001",
      returnDate: "2025-08-18",
      department: "Pharmacy",
      returnedBy: "Jane Smith",
      note: "Damaged items returned.",
    },
    items: [
      {
        slNo: 1,
        itemName: "Paracetamol",
        batchNo: "B123",
        qty: 50,
        reason: "Expired",
      },
      {
        slNo: 2,
        itemName: "Amoxicillin",
        batchNo: "A987",
        qty: 30,
        reason: "Damaged",
      },
    ],
  };
};

const ViewReturnItemDetails = () => {
  const { id } = useParams<{ id: string }>();
  const [returnData, setReturnData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchReturnDetails(id).then((data) => setReturnData(data));
    }
  }, [id]);

  if (!returnData) return <p>Loading return details...</p>;

  const { header, items } = returnData;

  return (
    <div className="pl-2">
      <div>
        <h2 className="text-2xl font-bold text-[#035d67] mb-6 bg-[var(--base-color)] p-2">
          VIEW RETURN DETAILS
        </h2>
      </div>

      {/* HEADER */}
      <div className="mt-4 bg-gray-100 p-3 rounded">
        <div className="grid grid-cols-3 gap-2">
          <p>
            <strong>
              <span className="text-red-600 font-semibold mr-2">☮</span>Return
              ID:
            </strong>{" "}
            {header.returnId}
          </p>
          <p>
            <strong>
              <span className="text-red-600 font-semibold mr-2">☮</span>Date:
            </strong>{" "}
            {header.returnDate}
          </p>
          <p>
            <strong>
              <span className="text-red-600 font-semibold mr-2">☮</span>
              Department:
            </strong>{" "}
            {header.department}
          </p>
          <p>
            <strong>
              <span className="text-red-600 font-semibold mr-2">☮</span>
              Returned By:
            </strong>{" "}
            {header.returnedBy}
          </p>
          {header.note && (
            <p className="col-span-3">
              <strong>
                <span className="text-red-600 font-semibold mr-2">☮</span>Note:
              </strong>{" "}
              {header.note}
            </p>
          )}
        </div>
      </div>

      {/* ITEMS TABLE */}
      <div className="mt-6 overflow-auto border border-gray-300 rounded">
        <table className="min-w-[800px] w-full border-collapse text-sm">
          <thead className="bg-[#2fe2fe] text-gray-900 text-left">
            <tr>
              {["Sl. No.", "Item Name", "Batch No", "Qty", "Reason"].map(
                (col, i) => (
                  <th key={i} className="border border-gray-300 px-2 py-1">
                    {col}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {items.map((row: any, index: number) => (
              <tr key={index} className="bg-white">
                {["slNo", "itemName", "batchNo", "qty", "reason"].map(
                  (key, i) => (
                    <td key={i} className="border border-gray-300 px-2 py-1">
                      {row[key]}
                    </td>
                  )
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-end gap-4 my-8">
          <Button
            bgcolor=""
            border="border-3"
            textColor="text-red-700"
            hover="hover:text-red-500"
            name="Reject"
          />
          <Button
            bgcolor=""
            border="border-3"
            textColor="text-green-700"
            hover="hover:text-green-800"
            name="Approve"
          />

        </div>
    </div>
  );
};

export default ViewReturnItemDetails;
