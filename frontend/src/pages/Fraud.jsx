import { useState } from "react";
import api from "../services/api";

export default function Fraud() {
  const [tab, setTab] = useState("upi");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  async function run() {
    setLoading(true);

    const tx = {
      nameOrig: "C1023",
      nameDest: "M884",
      amount: 82000,
      oldbalanceOrg: 90000,
      newbalanceOrig: 8000
    };

    try {
      const r = await api.post(`/fraud/predict/${tab}`, tx);
      setResult(r);
    } catch (e) {
      console.error(e);
      setResult({ probability: 0, risk: "LOW", fraud: false, amount: tx.amount, reason: "Prediction failed" });
    }
    setLoading(false);
  }

  return (
    <div
      className="min-h-screen p-8 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/grw.jpg')" }}
    >
      <div className="backdrop-blur-sm bg-white/80 min-h-screen p-8 rounded-xl">

        <h1 className="text-3xl font-bold mb-6">💳 Digital Payment Fraud</h1>

        {/* Tabs */}
        <div className="flex gap-6 mb-8">
          <Tab name="UPI Fraud" active={tab==="upi"} onClick={()=>setTab("upi")} />
          <Tab name="Credit Card Fraud" active={tab==="card"} onClick={()=>setTab("card")} />
        </div>

        {/* Banner */}
        <div className="bg-white rounded-xl shadow grid grid-cols-2 overflow-hidden mb-6">
          <div className="h-[300px] bg-gray-100 flex items-center justify-center">
            <img
              src={`/images/${tab === "upi" ? "upi.jpg" : "credit.jpg"}`}
              className="max-h-full max-w-full object-contain"
            />
          </div>

          <div className="p-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold">
              {tab === "upi" ? "UPI Transaction Risk Engine" : "Card Fraud Detection Engine"}
            </h2>
            <p className="text-gray-600 mt-2">
              AI-powered fraud detection trained on PaySim transaction behavior.
            </p>
            <button
              onClick={run}
              className="mt-6 bg-red-600 text-white px-6 py-3 rounded w-fit"
            >
              {loading ? "Analyzing..." : "Run Fraud Analysis"}
            </button>
          </div>
        </div>

        {/* Result */}
        {result && (
          <div className="grid grid-cols-4 gap-6">
            <Metric title="Fraud Probability" value={`${Math.round(result.probability*100)}%`} />
            <Metric title="Risk Level" value={result.risk} color={result.risk} />
            <Metric title="Status" value={result.fraud ? "FRAUD 🚨" : "SAFE ✅"} />
            <Metric title="Amount" value={`₹${result.amount.toLocaleString()}`} />

            <div className="col-span-4 bg-white p-6 rounded shadow">
              <h3 className="font-bold mb-2">Explainable AI</h3>
              <p>{result.reason}</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

function Tab({name, active, onClick}) {
  return (
    <button
      onClick={onClick}
      className={`px-6 py-2 rounded-full font-semibold ${
        active ? "bg-black text-white" : "bg-white shadow"
      }`}
    >
      {name}
    </button>
  );
}

function Metric({title,value,color}) {
  const c = color==="HIGH"?"text-red-600":color==="MEDIUM"?"text-orange-500":"text-green-600";
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className={`text-3xl font-bold ${c}`}>{value}</p>
    </div>
  );
}
