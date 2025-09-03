import { useRef } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MonthSelect from "../../components/general/MonthSelect";
import CircularProgressBar from "../../components/store/general/CircularProgressBar";
import RichTextEditor from "../../components/general/RichTextEditor";
import { useState } from "react";
import Badge from "../../components/general/Badge";

const Dashboard = () => {
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const [content, setContent] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const topItems = [
    {
      name: "Thermometer",
      image: "/src/assets/thermometer.jpeg",
      sold: 16,
      unit: "sets",
    },
    { name: "Chair", image: "/src/assets/chair.jpeg", sold: 12, unit: "pcs" },
    { name: "Gloves", image: "/src/assets/gloves.jpg", sold: 2, unit: "pcs" },
    {
      name: "Injection",
      image: "/src/assets/injection.jpeg",
      sold: 2,
      unit: "sets",
    },
    {
      name: "A4 Paper",
      image: "/src/assets/a4paper.jpg",
      sold: 7,
      unit: "pcs",
    },
    {
      name: "Prescription",
      image: "/src/assets/prescription.png",
      sold: 4,
      unit: "pairs",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="pl-4 mb-2 space-y-6">
      {/* Top Stats */}
      <div className="bg-blue-50 p-4 rounded grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="grid grid-cols-2  sm:grid-cols-4 lg:col-span-4 gap-4">
          {[
            { label: "Today Purchase", count: 25, unit: "Qty" },
            { label: "Canceled Requisition", count: 1, unit: "Pkgs" },
            { label: "Partial Requisition", count: 3, unit: "Pkgs" },
            { label: "Pending Requisition", count: 4, unit: "Qty" },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-12 border-5 border-gray-300 rounded-xl shadow text-center hover:shadow-2xl"
            >
              <p className="text-2xl text-blue-600 font-bold">{item.count}</p>
              <p className="text-xs text-gray-500">{item.unit}</p>
              <p className="text-sm mt-1 font-medium text-gray-700">
                {item.label}
              </p>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 shadow space-y-3  border-5 border-gray-300 rounded-xl hover:shadow-2xl">
          <h3 className="text-gray-600 font-medium">Inventory Summary</h3>
          <div className="text-sm">
            <p className="text-gray-600">Quantity In Hand</p>
            <p className="text-lg font-bold">421</p>
          </div>
          <div className="text-sm">
            <p className="text-gray-600">Quantity To Be Received</p>
            <p className="text-lg font-bold">216</p>
          </div>
        </div>
      </div>

      {/* Product Details & Top Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 ">
        {/* Product Summary */}
        <div className="bg-white p-4 rounded shadow flex border-3 border-gray-300 hover:shadow-2xl">
          <div className="w-1/2 border-r pr-4 m-auto">
            <h4 className="font-semibold mb-2">Product Details</h4>
            <ul className="text-sm space-y-2">
              <li>
                <span className="text-red-600 font-semibold">
                  Low Stock Items:
                </span>{" "}
                <span className="text-xl font-semibold text-red-500 ml-1">
                  2
                </span>
              </li>
              <li>
                All Item Groups:{" "}
                <span className="text-xl font-semibold text-blue-500 ml-1">
                  5
                </span>
              </li>
              <li>
                All Items:{" "}
                <span className="text-xl font-semibold text-blue-500 ml-1">
                  16
                </span>
              </li>
            </ul>
          </div>
          <div className="flex flex-col gap-3 justify-center items-center mx-auto ">
            <span className="text-lg text-gray-600 font-semibold tracking-tight">
              Active Items
            </span>
            <CircularProgressBar value={90} strokeWidth={15} />
          </div>
        </div>
        {/* Top Selling Items with Scroll */}
        <div className="bg-white p-4 rounded shadow border-3 border-gray-300 hover:shadow-2xl">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold">Most requisition item</h4>
            {/* <DateRangePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date!)}
              className="border px-2 py-1 rounded text-sm"
              dateFormat="MMMM yyyy"
              showMonthYearPicker
            /> */}

            <MonthSelect />
          </div>
          <div className="relative">
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10"
            >
              <FaChevronLeft />
            </button>

            <div
              ref={scrollRef}
              className="flex space-x-4 overflow-x-auto px-8 no-scrollbar"
            >
              {topItems.map((item, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 p-3 rounded shadow min-w-[120px] text-center"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover mx-auto rounded mb-2"
                  />
                  <p className="text-sm font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">
                    {item.sold} {item.unit}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-white p-2 rounded-full shadow z-10"
            >
              <FaChevronRight />
            </button>
          </div>
        </div>
      </div>

      {/* Purchase Order & Sales Order */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Purchase Order */}
        <div className="bg-white p-4 rounded shadow border-3 border-gray-300 hover:shadow-2xl">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">Purchase Order</h4>
            <MonthSelect />
          </div>
          <div className="text-center space-y-2">
            <p className="text-gray-600">Quantity Ordered</p>
            <p className="text-xl font-bold">519.00</p>
            <hr />
            <p className="text-gray-600">Total Cost</p>
            <p className="text-xl font-bold text-blue-600">$12,760.16</p>
          </div>
        </div>

        {/* Requisitions */}
        <div className="bg-white p-4 rounded shadow overflow-auto border-3 border-gray-300 hover:shadow-2xl">
          <div className="flex justify-between items-center mb-2 ">
            <h4 className="font-semibold">Requisitions</h4>
            {/* <MonthSelect /> */}
          </div>
          <table className="w-full text-sm text-left border-t border-collapse">
            <thead className="text-gray-600">
              <tr>
                <th className="py-1 px-2">Req. ID</th>
                <th className="py-1 px-2">Department</th>
                <th className="py-1 px-2">Date</th>
                <th className="py-1 px-2">Issued By</th>
                <th className="py-1 px-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  reqId: "3",
                  department: "OPD",
                  date: "06-08-2025",
                  issuedBy: "",
                  status: <Badge label="Pending" color="bg-red-400" text="text-white" />,
                },
                {
                  reqId: "2",
                  department: "OT",
                  date: "06-08-2025",
                  issuedBy: "Parvez Alam",
                  status: <Badge label="Approved" color="bg-green-400" text="text-white" />,
                },
                {
                  reqId: "1",
                  department: "Reception",
                  date: "06-08-2025",
                  issuedBy: "Parvez Alam",
                  status: <Badge label="Approved" color="bg-green-400" text="text-white" />,
                },
              ].map((row, idx) => (
                <tr key={idx} className="border-t border-gray-400">
                  <td className="py-1 px-2">
                    {row.reqId}
                  </td>
                  <td className="py-1 px-2">
                    {row.department}
                  </td>
                  <td className="py-1 px-2">
                    {row.date}
                  </td>
                  <td className="py-1 px-2">
                    {row.issuedBy}
                  </td>
                  <td className="py-1 px-2">
                    {row.status}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
