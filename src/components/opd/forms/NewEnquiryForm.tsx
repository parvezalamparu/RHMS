import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Button from "../../general/Button";
import CustomDateTimePicker from "../../general/CustomDateTimePicker";
import CustomDatePicker from "../../general/CustomDatePicker";

interface EnquiryFormInputs {
  department: string;
  doctor: string;
  appointmentDate: Date;
  slotTime: string;
  uhid: string;
  mobile: string;
  name: string;
  gender: string;
  dob: Date | null;
  age: string;
  address: string;
}

const calculateAge = (dob: Date | null) => {
  if (!dob) return "";
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const m = today.getMonth() - dob.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
    age--; // adjust if birthday not reached yet
  }
  return age.toString();
};

const calculateDOB = (age: number) => {
  const today = new Date();
  const dob = new Date(today);
  dob.setFullYear(today.getFullYear() - age);
  return dob;
};

const NewEnquiryForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<EnquiryFormInputs>({
    defaultValues: {
      dob: null,
      age: "",
    },
  });

  const navigate = useNavigate();

  const dob = watch("dob");
  const age = watch("age");

  // ✅ Sync Age when DOB changes
  useEffect(() => {
    if (dob) {
      const newAge = calculateAge(dob);
      if (newAge !== age) {
        setValue("age", newAge);
      }
    }
  }, [dob, age, setValue]);

  // ✅ Sync DOB when Age changes
  // useEffect(() => {
  //   if (age) {
  //     const parsedAge = parseInt(age, 10);
  //     if (!isNaN(parsedAge) && parsedAge > 0) {
  //       setValue("dob", calculateDOB(parsedAge));
  //     }
  //   }
  // }, [age, setValue]);

  const onSubmit = (data: EnquiryFormInputs) => {
    console.log("Enquiry Submitted:", data);
    reset();
  };

  return (
    <div className="pl-2">
      {/* Header */}
      <div className="flex justify-between items-center bg-[var(--base-color)] text-white p-2 rounded-t-md">
        <h2 className="text-2xl font-bold uppercase text-[#035d67]">
          New Enquiry
        </h2>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-4 gap-2 mt-4"
      >
        {/* Row 1 */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Department</label>
          <select
            {...register("department")}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200"
          >
            <option>All</option>
            <option>Cardiology</option>
            <option>Neurology</option>
          </select>
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Doctor <span className="text-red-500">*</span>
          </label>
          <select
            {...register("doctor", { required: "Doctor is required" })}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200"
          >
            <option value="">Select Doctor</option>
            <option>Dr. A</option>
            <option>Dr. B</option>
          </select>
          {errors.doctor && (
            <p className="text-red-500 text-sm">{errors.doctor.message}</p>
          )}
        </div>

        {/* Row 2 */}
        <div>
          <Controller
            name="appointmentDate"
            control={control}
            rules={{ required: "Appointment Date & Time is required" }}
            render={({ field }) => (
              <CustomDateTimePicker
                label="Appointment Date & Time *"
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
          {errors.appointmentDate && (
            <p className="text-red-500 text-xs mt-1">
              {errors.appointmentDate.message}
            </p>
          )}
        </div>

        {/* Row 3 */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">UHID</label>
          <input
            type="text"
            {...register("uhid")}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200"
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">Mobile No.</label>
          <input
            type="text"
            {...register("mobile", {
              pattern: {
                value: /^[0-9]{10}$/,
                message: "Enter a valid 10-digit number",
              },
            })}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200"
          />
          {errors.mobile && (
            <p className="text-red-500 text-sm">{errors.mobile.message}</p>
          )}
        </div>

        {/* Row 4 */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200"
          />
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Gender <span className="text-red-500">*</span>
          </label>
          <select
            {...register("gender", { required: "Gender is required" })}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200"
          >
            <option value="">Select Gender</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </select>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender.message}</p>
          )}
        </div>

        {/* Row 5 - DOB + Age */}
        <div>
          <label className="block text-sm text-gray-700 mb-1">Date of Birth</label>
          <Controller
            name="dob"
            control={control}
            render={({ field }) => (
              <CustomDatePicker
                defaultDate={
                  field.value ? new Date(field.value).toISOString() : undefined
                }
                onChange={(dateString) => {
                  if (dateString) {
                    const parsedDate = new Date(dateString);
                    field.onChange(parsedDate);
                  } else {
                    field.onChange(null);
                  }
                }}
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-1">
            Age <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register("age", { required: "Required" })}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200"
          />
          {errors.age && (
            <p className="text-red-500 text-sm">{errors.age.message}</p>
          )}
        </div>

        {/* Row 6 */}
        <div className="col-span-2">
          <label className="block text-sm text-gray-700 mb-1">Address</label>
          <input
            type="text"
            {...register("address")}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-cyan-200"
          />
        </div>

        {/* Action buttons */}
        <div className="col-span-4 flex justify-end mt-8 gap-2">
          <Button
            type="button"
            bgcolor="bg-white"
            textColor="text-red-700"
            hover="hover:text-red-500"
            border="border"
            name="Reset"
            onClick={() => reset()}
          />
          <Button
            type="submit"
            bgcolor="bg-white"
            textColor="text-green-800"
            hover="hover:text-green-600"
            border="border"
            name="Save & New"
          />
        </div>
      </form>
    </div>
  );
};

export default NewEnquiryForm;
