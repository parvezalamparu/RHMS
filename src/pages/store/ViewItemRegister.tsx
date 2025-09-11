import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const fetchItemRegister = async (id: string) => {
  return {
    itemInfo: {
      id,
      itemName: "Paracetamol",
      unit: "Box",
      subUnit: "Tablet",
      currentStock: 1200,
    },
    register: [
      {
        slNo: 1,
        date: "2025-08-01",
        department: "Pharmacy",
        vendor: "ABC Pharma",
        added: 500,
        removed: 0,
      },
      {
        slNo: 2,
        date: "2025-08-05",
        department: "General Ward",
        vendor: "-",
        added: 0,
        removed: 200,
      },
      {
        slNo: 3,
        date: "2025-08-10",
        department: "ICU",
        vendor: "-",
        added: 0,
        removed: 100,
      },
    ],
  };
};

const ViewItemRegister = () => {
  const { id } = useParams<{ id: string }>();
  const [itemData, setItemData] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchItemRegister(id).then((data) => setItemData(data));
    }
  }, [id]);

  if (!itemData) return <p>Loading item register...</p>;

  const { itemInfo, register } = itemData;

  return (
    <div className="pl-2">
      <div>
        <h2 className="text-2xl font-bold text-[#035d67] mb-6 bg-[var(--base-color)] p-2">
          VIEW ITEM REGISTER
        </h2>
      </div>

      {/* ITEM HEADER */}
      <div className="mt-4 bg-gray-100 p-3 rounded">
        <div className="grid grid-cols-3 gap-2">
          <p>
            <strong><span className="text-red-600 mr-2">☮</span>Item Name:</strong> {itemInfo.itemName}
          </p>
          <p>
            <strong><span className="text-red-600 mr-2">☮</span>Unit:</strong> {itemInfo.unit}
          </p>
          <p>
            <strong><span className="text-red-600 mr-2">☮</span>Sub Unit:</strong> {itemInfo.subUnit}
          </p>
          <p>
            <strong><span className="text-red-600 mr-2">☮</span>Current Stock:</strong> {itemInfo.currentStock}
          </p>
        </div>
      </div>

      {/* REGISTER TABLE */}
      <div className="mt-6 overflow-auto border border-gray-300 rounded">
        <table className="min-w-[800px] w-full border-collapse text-sm">
          <thead className="bg-[#2fe2fe] text-gray-900 text-left">
            <tr>
              {[
                "Sl. No.",
                "Date",
                "Department",
                "Vendor",
                "Added",
                "Removed",
              ].map((col, i) => (
                <th key={i} className="border border-gray-300 px-2 py-1">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {register.map((row: any, index: number) => (
              <tr key={index} className="bg-white">
                {[
                  "slNo",
                  "date",
                  "department",
                  "vendor",
                  "added",
                  "removed",
                ].map((key, i) => (
                  <td
                    key={i}
                    className="border border-gray-300 px-2 py-1"
                  >
                    {row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ViewItemRegister;
