import { useForm } from "react-hook-form";
import CustomDatePicker from "../../components/general/CustomDatePicker";
import Button from "../../components/general/Button";
import { BiSave } from "react-icons/bi";


export default function AddUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data:any) => {
    console.log(data);
  };

  return (
    <div className="pl-2">
      <h1 className="text-3xl font-bold mb-6 p-2 bg-[var(--base-color)] text-[#035d67]">Add User</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <h2 className="text-xl font-bold bg-gray-300 p-2 text-[#035d67]">Personal Information</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          <div>
            <label>Role <span className="text-red-500">*</span></label>
            <select {...register("role", { required: true })} className="w-full h-[2.12rem] border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300">
              <option value="">Select Role</option>
              <option value="doctor">Doctor</option>
              <option value="nurse">Nurse</option>
            </select>
            {errors.role && <span className="text-red-500 text-sm">Role is required</span>}
          </div>

          <div>
            <label>Employee ID <span className="text-red-500">*</span></label>
            <input {...register("employeeId", { required: true })} className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300" />
            {errors.employeeId && <span className="text-red-500 text-sm">Employee ID is required</span>}
          </div>

          <div>
            <label>Salutation</label>
            <select {...register("salutation")} className="w-full h-[2.12rem] border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300">
              <option value="">Select Salutation</option>
              <option value="Mr">Mr</option>
              <option value="Ms">Ms</option>
              <option value="Ms">Mrs</option>
              <option value="Dr">Dr</option>
            </select>
          </div>

          <div>
            <label>Name <span className="text-red-500">*</span></label>
            <input {...register("name", { required: true })} className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300" />
            {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
          </div>

          <div>
            <label>Father Name</label>
            <input {...register("fatherName")} className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300" />
          </div>

          <div>
            <label>Mother Name</label>
            <input {...register("motherName")} className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300" />
          </div>

          <div>
            <label>Gender <span className="text-red-500">*</span></label>
            <select {...register("gender", { required: true })} className="w-full h-[2.12rem] border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300">
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {errors.gender && <span className="text-red-500 text-sm">Gender is required</span>}
          </div>

          <div>
            <label>Marital Status</label>
            <select {...register("maritalStatus")} className="w-full h-[2.12rem] border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300">
              <option value="">Marital Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
          </div>

          <div>
            <label>Blood Group</label>
            <select {...register("bloodGroup")} className="w-full h-[2.12rem] border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300">
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
            </select>
          </div>

          <div>
            <label>Date of Birth</label>
            <CustomDatePicker />
          </div>

          <div>
            <label>Date of Joining</label>
            <CustomDatePicker />
          </div>

          <div>
            <label>Phone <span className="text-red-500">*</span></label>
            <input type="tel" {...register("phone", { required: true })} className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300" />
            {errors.phone && <span className="text-red-500 text-sm">Phone is required</span>}
          </div>

          <div>
            <label>Whatsapp No</label>
            <input type="tel" {...register("whatsappNo")} className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300" />
          </div>

          <div>
            <label>Emergency Phone No</label>
            <input type="tel" {...register("emergencyPhone")} className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300" />
          </div>

          <div>
            <label>Email <span className="text-red-500">*</span></label>
            <input type="email" {...register("email", { required: true })} className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300" />
            {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
          </div>

          <div>
            <label>Photo</label>
            <input type="file" {...register("photo")} className="w-full min-h-[2.12rem] border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300" />
          </div>
        </div>

        <h2 className="text-xl font-bold mt-6 bg-gray-300 p-2 text-[#035d67]">Address</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label>Current Address</label>
            <textarea {...register("currentAddress")} className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300" />
          </div>

          <div>
            <label>Permanent Address</label>
            <textarea {...register("permanentAddress")} className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300" />
          </div>
        </div>

        <h2 className="text-xl font-bold mt-6 bg-gray-300 p-2 text-[#035d67]">Work and Education</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <div>
            <label>Qualification</label>
            <input {...register("qualification")} className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300" />
          </div>

          <div>
            <label>Experience</label>
            <input {...register("experience")} className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300" />
          </div>

          <div>
            <label>Specialization</label>
            <input {...register("specialization")} className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300" />
          </div>

          <div>
            <label>Note</label>
            <input {...register("note")} className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300" />
          </div>
        </div>

        <h2 className="text-xl font-bold mt-6 bg-gray-300 p-2 text-[#035d67]">Identification Details</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <div>
            <label>PAN Number</label>
            <input {...register("panNumber")} className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300" />
          </div>

          <div>
            <label>Identification Name</label>
            <input {...register("idName")} className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300" />
          </div>

          <div>
            <label>Identification Number</label>
            <input {...register("idNumber")} className="w-full border px-3 py-1 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300" />
          </div>
        </div>
        <div className="col-span-4 m-8 flex justify-end">
              <Button
                onClick={handleSubmit(onSubmit)}
                bgcolor="bg-green-400"
                border="border-3 border-[--var(--base-color)]"
                textColor="text-black"
                hover="hover:bg-green-300"
                name="Create New User"
                icon={<BiSave />}
              />
            </div>
        {/* <button type="submit" className="mt-6 px-4 py-2 bg-blue-600 text-white rounded focus:outline-none focus:ring-2 focus:ring-cyan-200 border-gray-300">Submit</button> */}
      </form>
    </div>
  );
}
