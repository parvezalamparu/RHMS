import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


// Simulated API fetch
const fetchPurchaseDetails = async (id: string) => {
  // Replace with real API call
  return {
    header: {
      id,
      vendor: "ABC Corp",
      invoiceNo: "INV-1001",
      poNo: "PO-2001",
      date: "2025-08-10",
      purchaseType: "Direct",
    },
    items: [
      {
        item: "Paracetamol",
        batchNo: "B123",
        expDate: "2026-05-01",
        unitQty: 10,
        unit: "Box",
        subUnitQty: 100,
        subUnit: "Tablet",
        mrpQty: 1.5,
        rateQty: 1.2,
        netAmt: 120,
        disPercent: 5,
        disAmount: 6,
        cgst: 3,
        sgst: 3,
        igst: 0,
        amount: 117,
      },
      {
        item: "Amoxicillin",
        batchNo: "B124",
        expDate: "2026-08-15",
        unitQty: 5,
        unit: "Box",
        subUnitQty: 50,
        subUnit: "Capsule",
        mrpQty: 2,
        rateQty: 1.7,
        netAmt: 85,
        disPercent: 0,
        disAmount: 0,
        cgst: 2.5,
        sgst: 2.5,
        igst: 0,
        amount: 90,
      },
    ],
    footer: {
      note: "Urgent delivery required.",
      paymentTerms: "Cash",
      subTotal: 205,
      cgstAmt: 5.5,
      sgstAmt: 5.5,
      igstAmt: 0,
      discount: 6,
      total: 205,
    },
  };
};

const ViewPurchase = () => {
  const { id } = useParams<{ id: string }>();
//   const navigate = useNavigate();
  const [purchase, setPurchase] = useState<any>(null);

  useEffect(() => {
    if (id) {
      fetchPurchaseDetails(id).then((data) => setPurchase(data));
    }
  }, [id]);

  if (!purchase) return <p>Loading purchase details...</p>;

  const { header, items, footer } = purchase;

  return (
    <div className="pl-2">
        <div>
      <h2 className="text-2xl font-bold text-[#035d67] mb-6 bg-[var(--base-color)] p-2">
        VIEW PURCHASE
      </h2>
      </div>
      {/* HEADER */}
      <div className="mt-4 bg-gray-100">
        <div className="grid grid-cols-3 gap-2">
          <p>
            <strong><span className="text-red-600 font-semibold mr-2">☮</span>Purchase ID:</strong> {header.id}
          </p>
          <p>
            <strong><span className="text-red-600 font-semibold mr-2">☮</span>Date:</strong> {header.date}
          </p>
          <p>
            <strong><span className="text-red-600 font-semibold mr-2">☮</span>Vendor:</strong> {header.vendor}
          </p>
          <p>
            <strong><span className="text-red-600 font-semibold mr-2">☮</span>Invoice No:</strong> {header.invoiceNo}
          </p>
          <p>
            <strong><span className="text-red-600 font-semibold mr-2">☮</span>Purchase Type:</strong> {header.purchaseType}
          </p>
          <p>
            <strong><span className="text-red-600 font-semibold mr-2">☮</span>PO No:</strong> {header.poNo}
          </p>
        </div>
      </div>

      {/* ITEMS TABLE */}
      <div className="mt-6 overflow-auto border border-gray-300 rounded">
        <table className="min-w-[1000px] w-full border-collapse text-sm">
          <thead className="bg-[#2fe2fe] text-gray-900">
            <tr>
              {[
                "Item",
                "Batch No",
                "Exp. Date",
                "Unit Qty",
                "Unit",
                "Sub Unit Qty",
                "Sub Unit",
                "MRP/QTY",
                "Rate/QTY",
                "Net Amt.",
                "Dis(%)",
                "Dis(₹)",
                "CGST",
                "SGST",
                "IGST",
                "Amount",
              ].map((col, i) => (
                <th key={i} className="border border-gray-300 px-2 py-1">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {items.map((row: any, index: number) => (
              <tr key={index} className="bg-white">
                {[
                  "item",
                  "batchNo",
                  "expDate",
                  "unitQty",
                  "unit",
                  "subUnitQty",
                  "subUnit",
                  "mrpQty",
                  "rateQty",
                  "netAmt",
                  "disPercent",
                  "disAmount",
                  "cgst",
                  "sgst",
                  "igst",
                  "amount",
                ].map((key, i) => (
                  <td key={i} className="border border-gray-300 px-2 py-1 text-center">
                    {row[key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* FOOTER */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        <div className="col-span-1">
          {footer.note && (
            <p className="mt-1">
              <strong>Note:</strong> {footer.note}
            </p>
          )}
        </div>
        <div className="col-span-1">
          {footer.paymentTerms && (
            <p className="mt-2">
              <strong>Payment Terms:</strong> {footer.paymentTerms}
            </p>
          )}
        </div>
      </div>
      <div className="w-full flex justify-end mt-6">
        <div className="grid grid-cols-1 md:grid-rows-6 gap-1">
          <p>
            <strong>Sub Total:</strong> ₹{footer.subTotal}
          </p>
          <p>
            <strong>CGST Amount:</strong> ₹{footer.cgstAmt}
          </p>
          <p>
            <strong>SGST Amount:</strong> ₹{footer.sgstAmt}
          </p>
          <p>
            <strong>IGST Amount:</strong> ₹{footer.igstAmt}
          </p>
          <p>
            <strong>Discount:</strong> ₹{footer.discount}
          </p>
          <p className="font-bold text-lg">
            <strong>Total:</strong> ₹{footer.total}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ViewPurchase;
