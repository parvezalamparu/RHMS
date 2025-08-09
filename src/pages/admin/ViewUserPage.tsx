import { FaUserMd, FaMapMarkerAlt, FaPhoneAlt, FaWhatsapp, FaEnvelope } from "react-icons/fa";
import { GiGraduateCap } from "react-icons/gi";
import { HiOutlineIdentification } from "react-icons/hi";

export default function ViewUser() {
  const user = {
    name: "Parvez Alam",
    role: "SPECIAL",
    employeeId: "RHDS-9999",
    gender: "Male",
    dob: "02-01-2000",
    doj: "01/07/2025",
    fatherName: "",
    motherName: "",
    maritalStatus: "Single",
    bloodGroup: "",
    email: "parvezalamparu@gmail.com",
    phone: "8670047172",
    whatsappNo: "8670047172",
    emergencyPhone: "8670047172",
    currentAddress: "",
    permanentAddress: "",
    qualification: "MCA",
    experience: "",
    specialization: "",
    note: "",
    panNumber: "ABCDE1234F",
    idName: "Aadhar Card",
    idNumber: "1234 5678 9012"
  };

  return (
    <div className="w-full px-4">
      <h1 className="text-3xl font-bold mb-6 p-2 bg-[var(--base-color)] text-[#035d67]">User Profile</h1>
    <div className="w-full mx-auto bg-gray-100 grid grid-cols-1 lg:grid-cols-4 gap-2">
      {/* Left Side Panel */}
      <div className="bg-white rounded-lg shadow p-4 col-span-1 flex flex-col items-center">
        <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center text-4xl text-blue-500">
          <FaUserMd />
        </div>
        <h2 className="mt-4 text-xl font-bold">{user.name}</h2>
        <span className="text-sm text-gray-600">{user.role}</span>
        <div className="mt-6 w-full">
          <h3 className="text-lg font-semibold border-b pb-1 mb-2">Personal Details</h3>
          <ul className="text-sm space-y-1">
            <li><strong>Employee ID:</strong> {user.employeeId}</li>
            <li><strong>Gender:</strong> {user.gender}</li>
            <li><strong>Date of Birth:</strong> {user.dob}</li>
            <li><strong>Joining Date:</strong> {user.doj}</li>
            <li><strong>Father's Name:</strong> {user.fatherName}</li>
            <li><strong>Mother's Name:</strong> {user.motherName}</li>
            <li><strong>Marital Status:</strong> {user.maritalStatus}</li>
            <li><strong>Blood Group:</strong> {user.bloodGroup}</li>
          </ul>
        </div>
      </div>

      {/* Right Side Info Sections */}
      <div className="col-span-1 lg:col-span-3 grid gap-2">
        {/* Address */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="flex items-center text-orange-600 font-bold text-lg mb-2"><FaMapMarkerAlt className="mr-2" />Address</h3>
          <div className="grid sm:grid-cols-2 gap-4 text-sm">
            <p><strong>Current Address:</strong> {user.currentAddress}</p>
            <p><strong>Permanent Address:</strong> {user.permanentAddress}</p>
          </div>
        </div>

        {/* Work & Education */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="flex items-center text-blue-600 font-bold text-lg mb-2"><GiGraduateCap className="mr-2" />Work & Education</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <p><strong>Qualification:</strong> {user.qualification}</p>
            <p><strong>Work Experience:</strong> {user.experience}</p>
            <p><strong>Specialist:</strong> {user.specialization}</p>
            <p><strong>Note:</strong> {user.note}</p>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="flex items-center text-green-600 font-bold text-lg mb-2"><FaPhoneAlt className="mr-2" />Contact</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <p className="flex items-center"><FaEnvelope className="mr-2" /> {user.email}</p>
            <p className="flex items-center"><FaPhoneAlt className="mr-2" /> {user.phone}</p>
            <p className="flex items-center"><FaWhatsapp className="mr-2" /> {user.whatsappNo}</p>
            <p className="flex items-center"><FaPhoneAlt className="mr-2" /> Emergency: {user.emergencyPhone}</p>
          </div>
        </div>

        {/* Identification */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="flex items-center text-purple-600 font-bold text-lg mb-2"><HiOutlineIdentification className="mr-2" />Identification</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <p><strong>PAN Number:</strong> {user.panNumber}</p>
            <p><strong>Identification Name:</strong> {user.idName}</p>
            <p><strong>Identification Number:</strong> {user.idNumber}</p>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
