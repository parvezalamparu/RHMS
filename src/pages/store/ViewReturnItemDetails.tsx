import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Button from "../../components/store/general/Button";
import { GiCardDiscard } from "react-icons/gi";
import { GrUpdate } from "react-icons/gr";


interface ReturnItemDetails {
  id: number;
  itemName: string;
  batchNo: string;
  department: string;
  returnedBy: string;
  qty: number;
  qtyUnit: string;
  date: string;
  reason: string;
  note: string;
}

// Dummy data (replace with API data later)
const dummyReturnItem: ReturnItemDetails = {
  id: 1,
  itemName: "Item 1",
  batchNo: "BATCH-100",
  department: "OPD",
  returnedBy: "User1",
  qty: 1,
  qtyUnit: "Pcs",
  date: "12-8-2025",
  reason: "Not Working",
  note: ""
};

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

const ViewReturnItemDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Replace with API fetch using `id`
  const returnItem = dummyReturnItem;

  return (
    <div className="pl-4">
      <div className="shadow rounded-lg p-2 bg-white border border-gray-200">
        <h2 className="text-xl p-2 font-semibold text-[#035d67] bg-[var(--base-color)] uppercase mb-4">
          Return Item Details
        </h2>

        <div className="grid grid-cols-4 gap-x-10 gap-y-2 p-6 text-sm">
          <Row label="Item Name" value={returnItem.itemName} />
          <Row label="Batch No" value={returnItem.batchNo} />
          <Row label="Department" value={returnItem.department} />
          <Row label="Returned By" value={returnItem.returnedBy} />
          <Row label="Quantity" value={returnItem.qty} />
          <Row label="Quantity Unit" value={returnItem.qtyUnit} />
          <Row label="Date" value={returnItem.date} />
          <Row label="Reason" value={returnItem.reason} />
          <Row label="Note" value={returnItem.note} />
        </div>
         <div className="col-span-4 mt-8 p-4 flex justify-end">
            <div className="mx-4">
              <Button
                bgcolor="bg-red-400"
                border="border-3 border-[--var(--base-color)]"
                textColor="text-black"
                hover="hover:bg-red-300"
                name="Discard"
                icon={<GiCardDiscard />}
              />
            </div>
            <div>
              <Button
                bgcolor="bg-green-400"
                border="border-3 border-[--var(--base-color)]"
                textColor="text-black"
                hover="hover:bg-green-300"
                name="Add to Item"
                icon={<GrUpdate />}
              />
            </div>
          </div>
      </div>
    </div>
  );
};

export default ViewReturnItemDetails;
