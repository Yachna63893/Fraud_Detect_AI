import { useEffect, useState } from "react";
import api from "../services/api";

export default function Credit() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/fraud/credit")
      .then((d) => setData(d))
      .catch(() => setData([]));
  }, []);

  const top = data.slice(0, 200);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Credit Card Fraud Predictions</h1>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-4 border-b font-bold">Predicted Probabilities</div>

        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3">Index</th>
              <th className="p-3">Fraud Probability</th>
            </tr>
          </thead>

          <tbody>
            {top.map((d, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{i + 1}</td>
                <td className="p-3">{(Number(d.fraud_probability || d.fraud_prob || 0) * 1).toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
