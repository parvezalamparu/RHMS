import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import Button from "../../general/Button";
import { FaPlus } from "react-icons/fa";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";

// Interfaces
interface ChargeItem {
  chargeName: string;
  rate: number;
  qty: number;
  disRs?: number;
  disPercent?: number;
  amount: number;
}

interface FormInputs {
  appointmentDate: string;
  department: string;
  consultant: string;
  uhid: string;
  phone: string;
  patientName: string;
  gender: string;
  referredBy: string;
  provider: string;
  marketedBy: string;
  year?: string;
  month?: string;
  day?: string;
  age?: number;
  address?: string;
  state: string;
  district: string;
  pin?: string;

  chargeName?: string;
  rate?: number;
  qty?: number;
  disRs?: number;
  disPercent?: number;
  amount?: number;

  paymentMode?: string;
  paymentAmount?: number;
  paymentSecondaryMode?: string;
  paymentBank?: string;
  paymentBankAmount?: number;

  overallDiscountType?: "rs" | "percent";
  overallDiscountValue?: number;
}

interface Totals {
  subTotal: number;
  discountAmt: number;
  grandTotal: number;
}

interface OPDRegisterFormProps {
  mode?: "new" | "appointment"; // default "new"
  initialData?: Partial<FormInputs>;
}

// Sample dropdown lists
const departmentList = ["General", "Cardiology", "Orthopedics", "Dermatology"];
const consultantList = ["Dr. A", "Dr. B", "Dr. C"];
const genderList = ["Male", "Female", "Other"];
const referredByList = ["Self", "Doctor Ref.", "Campaign"];
const providerList = ["Provider A", "Provider B"];
const marketedByList = ["Staff A", "Staff B"];
const stateList = ["State X", "State Y"];
const districtList = ["District 1", "District 2"];
const chargeList = ["Consultation", "X-Ray", "Blood Test", "ECG"];
const paymentModes = ["Cash", "Card", "Online"];
const bankList = ["Bank A", "Bank B"];

const formatDateForInput = (d: Date) => {
  const pad = (n: number) => n.toString().padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(
    d.getHours()
  )}:${pad(d.getMinutes())}`;
};

const OPDRegisterForm: React.FC<OPDRegisterFormProps> = ({
  mode = "new",
  initialData = {},
}) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
    reset,
  } = useForm<FormInputs>({
    defaultValues: {
      appointmentDate: formatDateForInput(new Date()),
      department: "",
      consultant: "",
      uhid: "",
      phone: "",
      patientName: "",
      gender: "",
      referredBy: "",
      provider: "",
      marketedBy: "",
      year: new Date().getFullYear().toString(),
      month: (new Date().getMonth() + 1).toString(),
      day: new Date().getDate().toString(),
      age: undefined,
      address: "",
      state: "",
      district: "",
      pin: "",

      chargeName: "",
      rate: 0,
      qty: 0,
      disRs: 0,
      disPercent: 0,
      amount: 0,

      paymentMode: "",
      paymentAmount: 0,
      paymentSecondaryMode: "",
      paymentBank: "",
      paymentBankAmount: 0,

      overallDiscountType: "rs",
      overallDiscountValue: 0,
    },
  });

  const [items, setItems] = useState<ChargeItem[]>([]);
  const [totals, setTotals] = useState<Totals>({
    subTotal: 0,
    discountAmt: 0,
    grandTotal: 0,
  });

  // Apply pre-filled data when mode = "appointment"
  useEffect(() => {
    if (mode === "appointment" && initialData) {
      reset({
        ...getValues(),
        ...initialData,
      });
    }
  }, [mode, initialData, reset]);

  // --- Amount calculations ---
  const watchQty = watch("qty");
  const watchRate = watch("rate");
  const watchDisPercent = watch("disPercent");
  const watchDisRs = watch("disRs");

  useEffect(() => {
    const qty = Number(watchQty) || 0;
    const rate = Number(watchRate) || 0;
    const dPercent = Number(watchDisPercent) || 0;
    const dRs = Number(watchDisRs) || 0;

    const net = qty * rate;
    const discFromPercent = net * (dPercent / 100);
    const disc = dRs > 0 ? dRs : discFromPercent;
    const finalAmt = Math.max(0, net - disc);

    setValue("amount", Number(finalAmt.toFixed(2)));
  }, [watchQty, watchRate, watchDisPercent, watchDisRs, setValue]);

  // Add charge row
  const addRow = () => {
    const newItem: ChargeItem = {
      chargeName: getValues("chargeName") || "",
      rate: Number(getValues("rate")) || 0,
      qty: Number(getValues("qty")) || 0,
      disRs: Number(getValues("disRs")) || 0,
      disPercent: Number(getValues("disPercent")) || 0,
      amount: Number(getValues("amount")) || 0,
    };

    if (!newItem.chargeName || newItem.rate <= 0 || newItem.qty <= 0) {
      alert("Please provide Charge Name, Rate and Qty for the item.");
      return;
    }

    setItems((prev) => [newItem, ...prev]);

    // Clear row inputs only
    setValue("chargeName", "");
    setValue("rate", 0);
    setValue("qty", 0);
    setValue("disRs", 0);
    setValue("disPercent", 0);
    setValue("amount", 0);
  };

  const deleteItem = (indexToDelete: number) => {
    setItems((prev) => prev.filter((_, i) => i !== indexToDelete));
  };

  // Totals calculation
  const overallDiscountType = watch("overallDiscountType");
  const overallDiscountValue = Number(watch("overallDiscountValue")) || 0;

  useEffect(() => {
    const sub = items.reduce((acc, it) => acc + (it.amount || 0), 0);
    const discountAmt =
      overallDiscountType === "percent"
        ? (sub * overallDiscountValue) / 100
        : overallDiscountValue;
    const grand = sub - discountAmt;

    setTotals({
      subTotal: sub,
      discountAmt: Number(discountAmt.toFixed(2)),
      grandTotal: Number(grand.toFixed(2)),
    });
  }, [items, overallDiscountType, overallDiscountValue]);

  // Submit
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    if (items.length === 0) {
      alert("Please add at least one charge row.");
      return;
    }

    const payload = {
      mode,
      header: {
        appointmentDate: data.appointmentDate,
        department: data.department,
        consultant: data.consultant,
        uhid: data.uhid,
        phone: data.phone,
        patientName: data.patientName,
        gender: data.gender,
        referredBy: data.referredBy,
        provider: data.provider,
        marketedBy: data.marketedBy,
        year: data.year,
        month: data.month,
        day: data.day,
        age: data.age,
        address: data.address,
        state: data.state,
        district: data.district,
        pin: data.pin,
      },
      items,
      payments: {
        paymentMode: data.paymentMode,
        paymentAmount: data.paymentAmount,
        paymentSecondaryMode: data.paymentSecondaryMode,
        paymentBank: data.paymentBank,
        paymentBankAmount: data.paymentBankAmount,
      },
      totals,
    };

    console.log("OPD Register Submitted:", payload);
    alert(
      mode === "appointment"
        ? "Appointment registered successfully"
        : "New OPD registration submitted"
    );
  };

  return (
    <div className="pl-2 mb-6">
      <h2 className="text-2xl font-bold text-[#035d67] mb-6 bg-[var(--base-color)] p-2">
        {mode === "appointment" ? "APPOINTMENT REGISTER" : "OPD REGISTER"}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 gap-2 mb-6">
          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Date <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={new Date().toLocaleString()}
              disabled
              className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
            />
            {errors.appointmentDate && <p className="text-red-500 text-xs mt-1">{errors.appointmentDate.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Department <span className="text-red-500">*</span></label>
            <select {...register("department", { required: "Department is required" })} className={`w-full border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.department ? "border-red-500" : "border-gray-300"}`}>
              <option value="">Select Dept</option>
              {departmentList.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            {errors.department && <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Consultant Doctor <span className="text-red-500">*</span></label>
            <select {...register("consultant", { required: "Consultant is required" })} className={`w-full border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.consultant ? "border-red-500" : "border-gray-300"}`}>
              <option value="">Select Doctor</option>
              {consultantList.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            {errors.consultant && <p className="text-red-500 text-xs mt-1">{errors.consultant.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">UHID</label>
            <input type="text" {...register("uhid")} className="w-full border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Phone</label>
            <input type="text" {...register("phone")} className="w-full border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm" />
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Patient Name <span className="text-red-500">*</span></label>
            <input type="text" {...register("patientName", { required: "Patient name is required" })} className={`w-full border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.patientName ? "border-red-500" : "border-gray-300"}`} />
            {errors.patientName && <p className="text-red-500 text-xs mt-1">{errors.patientName.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Gender <span className="text-red-500">*</span></label>
            <select {...register("gender", { required: "Gender is required" })} className={`w-full border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm ${errors.gender ? "border-red-500" : "border-gray-300"}`}>
              <option value="">Select Gender</option>
              {genderList.map((g) => (
                <option key={g} value={g}>{g}</option>
              ))}
            </select>
            {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender.message}</p>}
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Referred By</label>
            <select {...register("referredBy")} className="w-full border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm">
              <option value="">Select</option>
              {referredByList.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Provider</label>
            <select {...register("provider")} className="w-full border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm">
              <option value="">Select</option>
              {providerList.map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Marketed By</label>
            <select {...register("marketedBy")} className="w-full border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm">
              <option value="">Select</option>
              {marketedByList.map((m) => (
                <option key={m} value={m}>{m}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Year</label>
            <input type="text" {...register("year")} className="w-full border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Month</label>
            <input type="text" {...register("month")} className="w-full border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Day</label>
            <input type="text" {...register("day")} className="w-full border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Age</label>
            <input type="number" {...register("age", { valueAsNumber: true })} className="w-full border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm" />
          </div>

          <div className="col-span-2">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Address</label>
            <input type="text" {...register("address")} className="w-full border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">State</label>
            <select {...register("state")} className="w-full border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm">
              <option value="">Select State</option>
              {stateList.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">District</label>
            <select {...register("district")} className="w-full border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm">
              <option value="">Select District</option>
              {districtList.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">PIN</label>
            <input type="text" {...register("pin")} className="w-full border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm" />
          </div>
        </div>

        {/* Charges Table */}
        <div className="overflow-auto border rounded">
          <table className="min-w-[1200px] w-full border border-gray-300-collapse text-sm">
            <thead className="bg-[var(--base-color)] text-gray-900">
              <tr>
                {["Charge Name", "Rate", "#", "Qty", "Discount(₹)", "Discount(%)", "Amount", "#"]
                  .map((label, i) => (
                    <th key={i} className="border px-2 py-1 text-center whitespace-nowrap">{label}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {/* input row */}
              <tr>
                <td className="border p-1 w-[20rem]">
                  <select {...register("chargeName")} className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm">
                    <option value="">Select Charge</option>
                    {chargeList.map((c) => (<option key={c} value={c}>{c}</option>))}
                  </select>
                </td>
                <td className="border p-1">
                  <input type="number" {...register("rate", { valueAsNumber: true })} className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm" />
                </td>
                <td className="border p-1 text-center">
                  <Button type="button" onClick={addRow} bgcolor="" border="border-3 border-[--var(--base-color)]" textColor="text-blue-800" hover="hover:text-blue-600" icon={<FaPlus />} />
                </td>
                <td className="border p-1">
                  <input type="number" {...register("qty", { valueAsNumber: true })} className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm" />
                </td>
                <td className="border p-1">
                  <input type="number" {...register("disRs", { valueAsNumber: true })} className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm" />
                </td>
                <td className="border p-1">
                  <input type="number" {...register("disPercent", { valueAsNumber: true })} className="w-full border rounded px-2 py-1 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm" />
                </td>
                <td className="border p-1">
                  <input type="number" {...register("amount", { valueAsNumber: true })} readOnly className="w-full border rounded px-2 py-1 bg-gray-100 cursor-not-allowed" />
                </td>
                <td className="border p-1 text-center">
                  <Button type="button" onClick={addRow} bgcolor="" border="border-3 border-[--var(--base-color)]" textColor="text-blue-800" hover="hover:text-blue-600" icon={<FaPlus />} />
                </td>
              </tr>

              {/* added rows */}
              {items.map((it, idx) => (
                <tr key={idx} className="bg-gray-100">
                  <td className="border p-1 text-center">{it.chargeName}</td>
                  <td className="border p-1 text-center">{it.rate.toFixed(2)}</td>
                  <td className="border p-1 text-center">
                    <Button type="button" onClick={() => deleteItem(idx)} bgcolor="" border="border-3" textColor="text-red-500" hover="hover:text-red-700" icon={<MdOutlineDeleteForever />} />
                  </td>
                  <td className="border p-1 text-center">{it.qty}</td>
                  <td className="border p-1 text-center">{it.disRs?.toFixed(2) || "0.00"}</td>
                  <td className="border p-1 text-center">{it.disPercent?.toFixed(2) || "0.00"}</td>
                  <td className="border p-1 text-center">{it.amount.toFixed(2)}</td>
                  <td className="border p-1 text-center">
                    <Button type="button" onClick={() => deleteItem(idx)} bgcolor="" border="border-3" textColor="text-red-500" hover="hover:text-red-700" icon={<MdOutlineDeleteForever />} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Payment - Left and Totals - Right */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Left - Payments */}
          <div className="space-y-3">
            <h3 className="font-bold">Payments</h3>
            <div className="flex gap-2">
              <select {...register("paymentMode")} className="border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm">
                <option value="">Payment Mode</option>
                {paymentModes.map((p) => (<option key={p} value={p}>{p}</option>))}
              </select>
              <input type="number" {...register("paymentAmount", { valueAsNumber: true })} placeholder="Amount" className="border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm w-36" />
            </div>

            <div className="flex gap-2">
              <select {...register("paymentSecondaryMode")} className="border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm">
                <option value="">Mode</option>
                {paymentModes.map((p) => (<option key={p} value={p}>{p}</option>))}
              </select>
              <select {...register("paymentBank")} className="border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm">
                <option value="">Bank</option>
                {bankList.map((b) => (<option key={b} value={b}>{b}</option>))}
              </select>
              <input type="number" {...register("paymentBankAmount", { valueAsNumber: true })} placeholder="Amount" className="border border-gray-300 rounded px-3 h-10 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm w-36" />
            </div>
          </div>

          {/* Right - Totals */}
          <div className="flex justify-end">
            <div className="w-full max-w-md">
              <div className="flex items-center gap-4 mb-2">
                <label className="w-50 font-bold text-gray-700 text-right">Total :</label>
                <input readOnly value={totals.subTotal.toFixed(2)} className="border border-gray-300 rounded p-2 w-48 focus:outline-none text-blue-600" />
              </div>

              <div className="flex items-center gap-4 mb-2">
                <label className="w-50 font-bold text-gray-700 text-right">Discount :</label>
                <div className="flex gap-2 items-center">
                  <select {...register("overallDiscountType")} className="border border-gray-300 rounded w-12 p-2 font-bold focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm">
                    <option value="rs">₹</option>
                    <option value="percent">%</option>
                  </select>
                  <input type="number" {...register("overallDiscountValue", { valueAsNumber: true })} className="border border-gray-300 rounded p-2 w-34 focus:outline-none focus:ring-2 focus:ring-cyan-200 shadow-sm" />
                </div>
              </div>

              <div className="flex items-center gap-4 mt-4">
                <label className="w-50 font-bold text-gray-700 text-right">Grand Total :</label>
                <input readOnly value={totals.grandTotal.toFixed(2)} className="border border-gray-300 rounded p-2 w-48 focus:outline-none text-blue-600 font-bold" />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-8 flex justify-end gap-2">
          <Button type="submit" bgcolor="" border="border-3 border" textColor="text-green-900" hover="hover:text-green-800" 
          name="Save & New" />
          <Button type="submit" bgcolor="" border="border-3 border" textColor="text-green-900" hover="hover:text-green-800" name="Save & Close" />
          <Button type="submit" bgcolor="" border="border-3 border" textColor="text-green-900" hover="hover:text-green-800" name="Save & Bill Print" />
          <Button type="submit" bgcolor="" border="border-3 border" textColor="text-green-900" hover="hover:text-green-800" name="Save & Bill Prescription Print" />
        </div>
      </form>
    </div>
  );
};

export default OPDRegisterForm;
