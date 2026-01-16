import { useState } from "react";
import api from "../services/api";

export default function Ecom() {
  const [res, setRes] = useState(null);

  async function check() {
    const tx = {
      orderId: "ORD98231",
      seller: "TechStore99",
      amount: 45000,
      refundCount: 5,
    };

    try {
      const r = await api.post("/fraud/predict/ecom", tx);
      setRes(r);
    } catch (err) {
      console.error(err);
      setRes({ probability: 0, risk: "LOW", amount: tx.amount, reason: "Prediction failed" });
    }
  }

  return (
    <div
      className="min-h-screen p-8 bg-cover bg-center"
      style={{ backgroundImage: "url('/images/grw.jpg')" }}
    >
      <div className="backdrop-blur-sm bg-white/80 min-h-screen p-8 rounded-xl">

        <h1 className="text-3xl font-bold mb-6">🛒 E-Commerce Fraud Intelligence</h1>

        <div className="bg-white grid grid-cols-2 rounded-xl shadow overflow-hidden mb-6">
          <div className="h-[300px] bg-gray-100 flex items-center justify-center">
            <img src="/images/ecom.jpg" className="max-h-full max-w-full object-contain" />
          </div>

          <div className="p-6 flex flex-col justify-center">
            <h2 className="text-2xl font-bold">Online Seller Risk Engine</h2>
            <p className="text-gray-600 mt-2">AI detects refund abuse, fake sellers, and order manipulation.</p>
            <button onClick={check} className="mt-6 bg-black text-white px-6 py-3 rounded w-fit">
              Analyze Order
            </button>
          </div>
        </div>

        {res && (
          <div className="grid grid-cols-4 gap-6">
            <Metric title="Seller" value={res.seller} />
            <Metric title="Order Amount" value={`₹${res.amount}`} />
            <Metric title="Risk Level" value={res.risk} color={res.risk} />
            <Metric title="Fraud Probability" value={`${Math.round(res.probability * 100)}%`} />

            <div className="col-span-4 bg-white p-6 rounded shadow">
              <h3 className="font-bold mb-2">AI Explanation</h3>
              <p>{res.reason}</p>
            </div>
          </div>
        )}

      </div>
    </div>
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
