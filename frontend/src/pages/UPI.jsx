import { useEffect, useState } from "react";

export default function UPI() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/fraud/upi")
      .then((d) => setData(d))
      .catch(() => setData([]));
  }, []);

  const highCount = data.filter((d) => Number(d.fraud_probability || 0) >= 0.8).length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">UPI Fraud Predictions</h1>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">High Risk (≥ 80%)</p>
          <p className="text-3xl font-bold text-red-600">{highCount}</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow">
          <p className="text-gray-500 text-sm">Total Records</p>
          <p className="text-3xl font-bold">{data.length}</p>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="p-4 border-b font-bold">UPI Predictions (sample)</div>
        <table className="w-full text-sm">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3">Origin</th>
              <th className="p-3">Dest</th>
              <th className="p-3">Probability</th>
            </tr>
          </thead>
          <tbody>
            {data.slice(0, 200).map((d, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">{d.nameOrig || d.origin || "-"}</td>
                <td className="p-3">{d.nameDest || d.dest || "-"}</td>
                <td className="p-3">{(Number(d.fraud_probability || 0)).toFixed(3)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
