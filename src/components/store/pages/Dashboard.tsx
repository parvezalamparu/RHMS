import { useRef } from "react";
// import DatePicker from "react-datepicker";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import CustomDatePicker from "../../general/CustomDatePicker";
import { DatePicker } from 'rsuite';
// import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  // const [selectedDate, setSelectedDate] = useState(new Date());
  const scrollRef = useRef<HTMLDivElement>(null);

  const topItems = [
    {
      name: "Thermometer",
      image: "/images/thermo.jpg",
      sold: 16,
      unit: "sets",
    },
    { name: "Sweater", image: "/images/sweater.jpg", sold: 12, unit: "pcs" },
    { name: "Pants", image: "/images/pants.jpg", sold: 2, unit: "pcs" },
    { name: "Box", image: "/images/box.jpg", sold: 2, unit: "sets" },
    { name: "Shoes", image: "/images/shoes.jpg", sold: 7, unit: "pcs" },
    { name: "Gloves", image: "/images/gloves.jpg", sold: 4, unit: "pairs" },
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
    <div className="p-6 space-y-6">
      {/* Top Stats */}
      <div className="bg-blue-50 p-4 rounded grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:col-span-4 gap-4">
          {[
            { label: "To Be Packed", count: 25, unit: "Qty" },
            { label: "To Be Shipped", count: 1, unit: "Pkgs" },
            { label: "To Be Delivered", count: 3, unit: "Pkgs" },
            { label: "To Be Invoiced", count: 4, unit: "Qty" },
          ].map((item, idx) => (
            <div key={idx} className="bg-white p-12 rounded shadow text-center">
              <p className="text-2xl text-blue-600 font-bold">{item.count}</p>
              <p className="text-xs text-gray-500">{item.unit}</p>
              <p className="text-sm mt-1 font-medium text-gray-700">
                {item.label}
              </p>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 rounded shadow space-y-3">
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Product Summary */}
        <div className="bg-white p-4 rounded shadow flex">
          <div className="w-1/2 border-r pr-4">
            <h4 className="font-semibold mb-2">Product Details</h4>
            <ul className="text-sm space-y-2">
              <li>
                <span className="text-red-600 font-semibold">
                  Low Stock Items:
                </span>{" "}
                2
              </li>
              <li>All Item Groups: 5</li>
              <li>All Items: 16</li>
            </ul>
          </div>
          {/* <div className="w-1/2 pl-4 flex items-center justify-center">
            <div className="text-center">
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 36 36" className="w-full h-full">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="#e6e6e6"
                    strokeWidth="3.8"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 12.76 25.132"
                    fill="none"
                    stroke="#00c292"
                    strokeWidth="3.8"
                    strokeDasharray="81, 100"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-sm font-bold">81%</div>
              </div>
              <p className="text-sm mt-2">Active Items</p>
            </div>
          </div> */}
        </div>

        {/* Top Selling Items with Scroll */}
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-3">
            <h4 className="font-semibold">Top Selling Items</h4>
            {/* <DatePicker
              selected={selectedDate}
              onChange={(date) => setSelectedDate(date!)}
              className="border px-2 py-1 rounded text-sm"
              dateFormat="MMMM yyyy"
              showMonthYearPicker
            /> */}

            <CustomDatePicker />
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
        <div className="bg-white p-4 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">Purchase Order</h4>
            <CustomDatePicker />
          </div>
          <div className="text-center space-y-2">
            <p className="text-gray-600">Quantity Ordered</p>
            <p className="text-xl font-bold">519.00</p>
            <hr />
            <p className="text-gray-600">Total Cost</p>
            <p className="text-xl font-bold text-blue-600">$12,760.16</p>
          </div>
        </div>

        {/* Sales Order */}
        <div className="bg-white p-4 rounded shadow overflow-auto">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-semibold">Sales Order</h4>
            < DatePicker />
          </div>
          <table className="w-full text-sm text-left border-t">
            <thead className="text-gray-600">
              <tr>
                <th className="py-1">Channel</th>
                <th className="py-1">Draft</th>
                <th className="py-1">Confirmed</th>
                <th className="py-1">Packed</th>
                <th className="py-1">Shipped</th>
                <th className="py-1">Invoiced</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  name: "Others",
                  draft: 0,
                  confirmed: 42,
                  packed: 5,
                  shipped: 27,
                  invoiced: 75,
                },
                {
                  name: "Etsy",
                  draft: 0,
                  confirmed: 3,
                  packed: 0,
                  shipped: 6,
                  invoiced: 6,
                },
                {
                  name: "Shopify",
                  draft: 0,
                  confirmed: 12,
                  packed: 0,
                  shipped: 0,
                  invoiced: 2,
                },
              ].map((row, idx) => (
                <tr key={idx} className="border-t">
                  <td className="py-1">{row.name}</td>
                  <td className="py-1">{row.draft}</td>
                  <td className="py-1">{row.confirmed}</td>
                  <td className="py-1">{row.packed}</td>
                  <td className="py-1">{row.shipped}</td>
                  <td className="py-1">{row.invoiced}</td>
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
