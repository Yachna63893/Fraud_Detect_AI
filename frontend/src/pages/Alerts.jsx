import { useState } from "react";
import api from "../services/api";

function Alerts() {
  const [score, setScore] = useState(65);
  const [res, setRes] = useState(null);
  const [err, setErr] = useState(null);

  const send = async () => {
    setErr(null);
    setRes(null);
    try {
      const r = await api.post("/alerts", score);
      setRes(r);
    } catch (e) {
      setErr(e.message || String(e));
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Alerts Simulator</h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-lg">
        <label className="block text-sm text-gray-600 mb-2">Risk score (0-100)</label>
        <input
          type="number"
          value={score}
          onChange={(e) => setScore(Number(e.target.value))}
          className="border p-3 rounded w-full mb-4"
        />

        <div className="flex gap-3">
          <button onClick={send} className="px-4 py-2 bg-red-600 text-white rounded">Generate Alert</button>
        </div>

        {res && (
          <div className="mt-4 p-4 bg-gray-50 rounded">
            <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(res, null, 2)}</pre>
          </div>
        )}

        {err && (
          <div className="mt-4 text-sm text-red-600">{err}</div>
        )}
      </div>
    </div>
  );
}

export default Alerts;
