import { useEffect, useMemo, useState } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function Heatmap() {
  const [anomaly, setAnomaly] = useState([]);
  const [upi, setUpi] = useState([]);
  const [credit, setCredit] = useState([]);
  const [ecom, setEcom] = useState([]);
  const [loading, setLoading] = useState(true);
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    setLoading(true);
    Promise.all([
      fetch("http://127.0.0.1:8000/api/fraud/anomaly").then((r) => (r.ok ? r.json() : [])),
      fetch("http://127.0.0.1:8000/api/fraud/upi").then((r) => (r.ok ? r.json() : [])),
      fetch("http://127.0.0.1:8000/api/fraud/credit").then((r) => (r.ok ? r.json() : [])),
      fetch("http://127.0.0.1:8000/api/fraud/ecom").then((r) => (r.ok ? r.json() : [])),
    ])
      .then(([a, u, c, e]) => {
        setAnomaly(a || []);
        setUpi(u || []);
        setCredit(c || []);
        setEcom(e || []);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  // Merge datasets into unified table rows
  const rows = useMemo(() => {
    const out = [];
    anomaly.forEach((r) =>
      out.push({ domain: "anomaly", origin: r.nameOrig || "-", dest: r.nameDest || "-", amount: Number(r.amount || 0), score: Number(r.anomaly_score || 0) / 100, risk: r.risk_level || "" })
    );
    upi.forEach((r) => out.push({ domain: "upi", origin: r.nameOrig || r.origin || "-", dest: r.nameDest || r.dest || "-", amount: Number(r.amount || 0), score: Number(r.fraud_probability || 0), risk: r.risk || r.risk_level || "" }));
    credit.forEach((r) => out.push({ domain: "credit", origin: r.nameOrig || r.card_num || "-", dest: "-", amount: Number(r.amount || 0), score: Number(r.fraud_probability || 0), risk: r.risk || "" }));
    ecom.forEach((r) => out.push({ domain: "ecom", origin: r.order_id || r.transaction_id || r.seller || "-", dest: r.seller || "-", amount: Number(r.amount || 0), score: Number(r.fraud_probability || 0), risk: r.risk || "" }));
    // sort by score desc
    return out.sort((a, b) => b.score - a.score);
  }, [anomaly, upi, credit, ecom]);

  const counts = useMemo(() => {
    const c = { HIGH: 0, MEDIUM: 0, LOW: 0 };
    rows.forEach((r) => {
      const risk = (r.risk || "").toString().toUpperCase();
      if (risk.includes("HIGH")) c.HIGH++;
      else if (risk.includes("MEDIUM")) c.MEDIUM++;
      else c.LOW++;
    });
    return c;
  }, [rows]);

  // Chart data: show top domains by average score
  const chartData = useMemo(() => {
    const buckets = {};
    rows.forEach((r) => {
      buckets[r.domain] = buckets[r.domain] || { sum: 0, n: 0 };
      buckets[r.domain].sum += Number(r.score || 0);
      buckets[r.domain].n += 1;
    });
    const labels = Object.keys(buckets);
    const data = labels.map((l) => (buckets[l].n ? buckets[l].sum / buckets[l].n : 0));
    return {
      labels,
      datasets: [
        {
          label: "Average Fraud/Anomaly Score",
          data,
          backgroundColor: labels.map((l) => (l === "anomaly" ? "rgba(239,68,68,0.9)" : l === "upi" ? "rgba(59,130,246,0.9)" : l === "credit" ? "rgba(99,102,241,0.9)" : "rgba(34,197,94,0.9)")),
        },
      ],
    };
  }, [rows]);

  // Action helpers for three image cards
  async function analyzeOrderId() {
    const id = window.prompt("Enter Order ID to analyze:");
    if (!id) return;
    const res = await fetch("http://127.0.0.1:8000/api/fraud/predict/ecom", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId: id }),
    });
    const json = await (res.ok ? res.json() : Promise.resolve({ error: true }));
    setAnalysisResult({ title: `Order ${id}`, result: json });
  }

  async function analyzeTxn() {
    const amt = window.prompt("Enter amount for quick UPI/Txn analysis:");
    if (!amt) return;
    const res = await fetch("http://127.0.0.1:8000/api/fraud/predict/upi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount: Number(amt) }),
    });
    const json = await (res.ok ? res.json() : Promise.resolve({ error: true }));
    setAnalysisResult({ title: `Txn ₹${amt}`, result: json });
  }

  async function detectArtifact() {
    const k = window.prompt("Enter origin id to check for anomalies:");
    if (!k) return;
    const res = await fetch("http://127.0.0.1:8000/api/fraud/predict/anomaly", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nameOrig: k }),
    });
    const json = await (res.ok ? res.json() : Promise.resolve({ error: true }));
    setAnalysisResult({ title: `Origin ${k}`, result: json });
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-2">🔥 National Fraud Heatmap & Live Analysis</h1>
      <p className="text-gray-600 mb-6">Click an action image to run a quick analysis; table shows merged live/predicted results.</p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-6">
        {/* Three action cards + small 4th image */}
        <Card title="Analyze Order ID" img="/images/order.png" onClick={analyzeOrderId} />
        <Card title="Analyze Transaction" img="/images/txn.png" onClick={analyzeTxn} />
        <Card title="Detect Artifact" img="/images/artifact.png" onClick={detectArtifact} />
        <div className="bg-white rounded-xl shadow p-4 flex items-center justify-center">
          <img src="/images/logo-small.png" className="w-20 opacity-90" alt="small" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large Chart - occupies two columns on wide screens */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold mb-4">Live Domain Score Overview</h3>
          <div style={{ height: 520 }}>
            <Bar data={chartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
          </div>
        </div>

        {/* Right side summary + table toggle */}
        <div className="bg-white p-6 rounded-xl shadow">
          <h3 className="font-bold mb-4">Risk Summary</h3>
          <div className="space-y-3 mb-4">
            <div className="flex justify-between"><span>High Risk</span><span className="text-red-600 font-bold">{counts.HIGH}</span></div>
            <div className="flex justify-between"><span>Medium Risk</span><span className="text-orange-500 font-bold">{counts.MEDIUM}</span></div>
            <div className="flex justify-between"><span>Low Risk</span><span className="text-green-600 font-bold">{counts.LOW}</span></div>
          </div>
          <div className="mt-6 border-t pt-4 text-xs text-gray-500">Risk scores combine model outputs and heuristics. Use action cards for targeted checks.</div>
        </div>
      </div>

      {/* Full-width table */}
      <div className="mt-6 bg-white p-4 rounded-xl shadow">
        <div className="p-4 border-b font-bold">Merged Live Predictions (Top 500)</div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3">Domain</th>
                <th className="p-3">Origin / ID</th>
                <th className="p-3">Destination / Seller</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Score</th>
                <th className="p-3">Risk</th>
              </tr>
            </thead>
            <tbody>
              {(loading ? [] : rows.slice(0, 500)).map((r, i) => (
                <tr key={i} className="border-b hover:bg-gray-50">
                  <td className="p-3 font-medium">{r.domain}</td>
                  <td className="p-3">{r.origin}</td>
                  <td className="p-3">{r.dest}</td>
                  <td className="p-3">₹{Number(r.amount || 0).toLocaleString()}</td>
                  <td className="p-3">{(Number(r.score || 0) * 100).toFixed(1)}%</td>
                  <td className={`p-3 font-bold ${((r.risk||"").toLowerCase().includes("high")?"text-red-600":(r.risk||"").toLowerCase().includes("medium")?"text-orange-500":"text-green-600")}`}>
                    {r.risk || (Number(r.score||0)>=0.8?"High":Number(r.score||0)>=0.5?"Medium":"Low")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analysis modal-ish area */}
      {analysisResult && (
        <div className="fixed right-6 bottom-6 w-96 bg-white rounded-xl shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-bold">{analysisResult.title}</h4>
            <button onClick={() => setAnalysisResult(null)} className="text-gray-500">Close</button>
          </div>
          <pre className="text-xs max-h-64 overflow-auto">{JSON.stringify(analysisResult.result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

function Card({ title, img, onClick }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center text-center">
      <img src={img} alt={title} className="w-32 h-28 object-contain mb-3" />
      <div className="font-semibold mb-2">{title}</div>
      <button onClick={onClick} className="mt-auto bg-black text-white px-4 py-2 rounded">Analyze</button>
    </div>
  );
}


