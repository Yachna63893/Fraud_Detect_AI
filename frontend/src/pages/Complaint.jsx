import { useState } from "react";

export default function Complaint() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    description: ""
  });

  const submit = () => {
    alert("Complaint submitted to Cyber Crime Portal 🚨");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">📄 File Fraud Complaint</h1>

      <div className="grid grid-cols-2 gap-10 bg-white p-10 rounded-xl shadow">

        {/* Form */}
        <div>
          <input
            placeholder="Your Name"
            className="border p-4 w-full mb-4 rounded"
            onChange={e => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Phone Number"
            className="border p-4 w-full mb-4 rounded"
            onChange={e => setForm({ ...form, phone: e.target.value })}
          />

          <textarea
            placeholder="Describe the fraud"
            className="border p-4 w-full mb-4 rounded"
            rows="5"
            onChange={e => setForm({ ...form, description: e.target.value })}
          />

          <button
            onClick={submit}
            className="bg-red-600 text-white px-8 py-3 rounded shadow hover:bg-red-700"
          >
            Submit Complaint
          </button>
        </div>

        {/* Illustration */}
        <div className="flex items-center justify-center">
          <img
            src="/images/mail.svg"
            className="w-[80%]"
            alt="Complaint Illustration"
          />
        </div>

      </div>
    </div>
  );
}
