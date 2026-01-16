import { useEffect, useState } from "react";
import { Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

export default function Anomaly() {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get("/fraud/anomaly")
      .then((d) => setData(d))
      .catch(() => setData([]));
  }, []);

  const high = data.filter((d) => (d.risk_level || "").toLowerCase() === "high").length;
  const med = data.filter((d) => (d.risk_level || "").toLowerCase() === "medium").length;
  const low = data.filter((d) => (d.risk_level || "").toLowerCase() === "low").length;

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      <h1 className="text-3xl font-bold mb-6">Fraud Risk Intelligence</h1>

      {/* Top Risk Cards */}
      <div className="grid grid-cols-3 gap-6 mb-6">
        <Stat title="High Risk" value={high} color="red" />
        <Stat title="Medium Risk" value={med} color="orange" />
        <Stat title="Low Risk" value={low} color="green" />
      </div>

      {/* Main Panel */}
      <div className="grid grid-cols-4 gap-6">

        {/* Left Table */}
        <div className="col-span-3 bg-white rounded-xl shadow">
          <div className="p-4 border-b font-bold">Live Fraud Transactions</div>

          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3">Origin</th>
                <th className="p-3">Destination</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Score</th>
                <th className="p-3">Risk</th>
                <th className="p-3">Reason</th>
              </tr>
            </thead>

            <tbody>
              {data.map((d,i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-3">{d.nameOrig}</td>
                  <td className="p-3">{d.nameDest}</td>
                  <td className="p-3">₹{Number(d.amount || 0).toLocaleString()}</td>
                  <td className="p-3">{Number(d.anomaly_score || 0).toFixed(1)}%</td>
                  <td className={`p-3 font-bold ${
                    (d.risk_level || "").toLowerCase() === "high" ? "text-red-600" :
                    (d.risk_level || "").toLowerCase() === "medium" ? "text-orange-500" :
                    "text-green-600"
                  }`}>
                    {d.risk_level}
                  </td>
                  <td className="p-3">{d.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Panel with SVG */}
          <div className="bg-white rounded-xl shadow p-4 flex flex-col justify-between">
          <div>
            <h3 className="font-bold mb-4">Risk Overview</h3>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span>High Risk</span>
                <span className="text-red-600 font-bold">{high}</span>
              </div>
              <div className="flex justify-between">
                <span>Medium Risk</span>
                <span className="text-orange-500 font-bold">{med}</span>
              </div>
              <div className="flex justify-between">
                <span>Low Risk</span>
                <span className="text-green-600 font-bold">{low}</span>
              </div>
            </div>

            <div className="mt-6 border-t pt-4">
              <p className="text-xs text-gray-500">
                AI flags transactions using anomaly detection and historical patterns.
              </p>
            </div>
          </div>
          {/* Small histogram of anomaly scores */}
          <div className="mt-6">
            <h4 className="font-semibold mb-2 text-sm">Anomaly Score Distribution</h4>
            <Bar
              data={(() => {
                const scores = data.map(d => Number(d.anomaly_score || 0));
                const bins = Array.from({ length: 10 }, () => 0);
                const labels = bins.map((_, i) => `${i*10}-${i*10+9}`);
                scores.forEach(s => {
                  let idx = Math.floor(Math.min(Math.max(s, 0), 99) / 10);
                  if (idx < 0) idx = 0;
                  if (idx > 9) idx = 9;
                  bins[idx] += 1;
                });
                return {
                  labels,
                  datasets: [
                    {
                      label: 'Count',
                      data: bins,
                      backgroundColor: 'rgba(239, 68, 68, 0.8)'
                    }
                  ]
                }
              })()}
              options={{
                responsive: true,
                plugins: { legend: { display: false } },
                scales: { y: { beginAtZero: true } }
              }}
            />
          </div>
        </div>

      </div>
    </div>
  );
}

function Stat({ title, value, color }) {
  const colors = {
    red: "text-red-600",
    orange: "text-orange-500",
    green: "text-green-600"
  };

  return (
    <div className="bg-white rounded-xl shadow p-6">
      <p className="text-gray-500 text-sm">{title}</p>
      <p className={`text-4xl font-bold ${colors[color]}`}>{value}</p>
    </div>
  );
}
