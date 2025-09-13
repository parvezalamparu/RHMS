import { useState } from "react";
import Button from "./Button";
import { AiOutlineSearch } from "react-icons/ai";

interface Patient {
  uhid: string;
  name: string;
  phone: string;
}

const PatientSearch: React.FC = () => {
  const [uhid, setUhid] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);

  const searchPatients = async () => {
    setLoading(true);
    try {
      // Replace with your actual API call
      const response = await fetch(
        `/api/patients?uhid=${uhid}&name=${name}&phone=${phone}`
      );
      const data = await response.json();
      setPatients(data);
    } catch (error) {
      console.error("Error fetching patients:", error);
      setPatients([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Search Any Bill */}
      <div className="mb-4">
        <h3 className="font-semibold text-sm mb-2 flex items-center gap-2 text-[#035d67]">
          <AiOutlineSearch className="text-lg" /> Search Any Bill
        </h3>
        <div className="flex gap-2">
          <select className="border rounded px-2 py-1 w-[8rem] border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-md">
            <option>OPD</option>
            <option>IPD</option>
            <option>LAB</option>
          </select>
          <input
            type="text"
            placeholder="By Bill No"
            className="border rounded px-3 py-1 max-w-50 flex-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-200 
            shadow-md"
          />
          <Button
            icon={<AiOutlineSearch className="text-xl text-blue-700"/>}
            bgcolor="bg-gray-100"
            border="border-2 border-gray-500"
            textColor=""
            hover="hover:bg-gray-200"
            onClick={searchPatients}
            title="Edit Item"
          />
        </div>
      </div>

      {/* Global Search */}
      <div className="mb-4">
        <h3 className="font-semibold text-sm mb-2 flex items-center gap-2 text-[#035d67]">
           <AiOutlineSearch className="text-lg" /> Global Search
        </h3>
        <div className="grid grid-cols-6 gap-2">
  <input
    type="text"
    placeholder="UHID"
    className="border rounded px-3 py-1 border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-md"
    value={uhid}
    onChange={(e) => setUhid(e.target.value)}
  />
  <input
    type="text"
    placeholder="Name"
    className="border rounded px-3 py-1 col-span-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-md"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
  <input
    type="text"
    placeholder="Ph. no."
    className="border rounded px-3 py-1 col-span-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-md"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
  />
</div>

      </div>

      {/* Patient Details */}
      <div>
        <h3 className="bg-[var(--base-color)] text-[#035d67] text-center font-bold py-2">
          PATIENT DETAILS
        </h3>
        {loading ? (
          <p className="bg-green-100 p-2 text-center">Loading...</p>
        ) : patients.length === 0 ? (
          <p className="bg-green-100 p-2 text-center">... No data found ...</p>
        ) : (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-2 py-1">UHID</th>
                <th className="border px-2 py-1">Name</th>
                <th className="border px-2 py-1">Phone</th>
              </tr>
            </thead>
            <tbody>
              {patients.map((p, i) => (
                <tr key={i}>
                  <td className="border px-2 py-1">{p.uhid}</td>
                  <td className="border px-2 py-1">{p.name}</td>
                  <td className="border px-2 py-1">{p.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default PatientSearch;
