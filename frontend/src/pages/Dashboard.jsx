import { useEffect, useState } from "react";
import IndiaMap from "../components/IndiaMap";

const states = ["Maharashtra", "Delhi", "Karnataka", "Tamil Nadu", "Gujarat", "UP"];

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 12458,
    highRisk: 3201,
    underReview: 1087,
    resolved: 8170,
    aiConfidence: 87
  });

  const [feed, setFeed] = useState([
    "🚨 Spike in UPI fraud detected in Maharashtra",
    "🧠 AI linked 5 accounts to an international scam",
    "📊 Cyber fraud down 12% this week",
    "🔍 84 cases escalated to investigation teams"
  ]);

  const [heat, setHeat] = useState({
    Maharashtra: 1200,
    Delhi: 860,
    Karnataka: 540,
    "Tamil Nadu": 430,
    Gujarat: 390,
    UP: 980
  });

  useEffect(() => {
    const t = setInterval(() => {
      setStats(s => ({
        total: s.total + Math.floor(Math.random() * 8),
        highRisk: s.highRisk + Math.floor(Math.random() * 3),
        underReview: s.underReview + Math.floor(Math.random() * 4),
        resolved: s.resolved + Math.floor(Math.random() * 6),
        aiConfidence: 80 + Math.floor(Math.random() * 15)
      }));

      setHeat(h => ({
        ...h,
        Maharashtra: h.Maharashtra + Math.floor(Math.random() * 5),
        Delhi: h.Delhi + Math.floor(Math.random() * 3),
        UP: h.UP + Math.floor(Math.random() * 4)
      }));

      setFeed(f => [
        `🚨 ${Math.floor(Math.random() * 50) + 20} new fraud attempts blocked`,
        `🧠 AI detected pattern in ${states[Math.floor(Math.random() * states.length)]}`,
        `🔍 ${Math.floor(Math.random() * 120)} cases auto-escalated`,
        ...f.slice(0, 3)
      ]);
    }, 3500);

    return () => clearInterval(t);
  }, []);

  return (
    <section className="bg-[#f6f7fb] min-h-screen p-10">

      {/* Header */}
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-[#7f1d1d]">
          🇮🇳 National Fraud-AI Command Center
        </h1>
        <div className="text-green-600 font-semibold animate-pulse">
          ● LIVE DATA FEED
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-14">
        <Stat title="Total Frauds Today" value={stats.total} />
        <Stat title="High Risk Alerts" value={stats.highRisk} danger />
        <Stat title="Under Review" value={stats.underReview} />
        <Stat title="Resolved" value={stats.resolved} success />
        <Stat title="AI Confidence" value={stats.aiConfidence + "%"} ai />
      </div>

      {/* Map + Right Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-16">

        {/* MAP */}
        <div className="mt-6">
          <IndiaMap />
        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6">

          {/* State Heat */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="font-bold text-lg text-[#7f1d1d] mb-4">
              🔥 State-Wise Fraud Activity
            </h2>

            {Object.entries(heat).map(([state, value]) => (
              <div key={state} className="mb-3">
                <div className="flex justify-between text-sm font-semibold">
                  <span>{state}</span>
                  <span>{value}</span>
                </div>
                <div className="w-full h-3 bg-gray-200 rounded">
                  <div
                    className="h-3 bg-green-500 rounded"
                    style={{ width: `${Math.min(100, value / 15)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          {/* Search Panel */}
          <div className="bg-white p-4 rounded-xl shadow-xl flex justify-center">
            <img
              src="/images/Search.png"
              alt="Fraud Search Panel"
              className="w-full max-w-md rounded-xl"
            />
          </div>

        </div>
      </div>

      {/* AI Live Feed */}
      <div className="bg-[#e6f3db] text-black-400 p-6 rounded-xl shadow font-mono mb-16">
        <h2 className="font-bold text-lg mb-4 text-black-500">
          🧠 AI Live Intelligence
        </h2>
        {feed.map((f, i) => (
          <div key={i} className="mb-3 border-b border-green-800 pb-2">
            {f}
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <Action label="🚨 Report Fraud" />
        <Action label="📄 Track Case" />
        <Action label="🔍 Verify Account" />
        <Action label="🤖 AI Assistant" />
      </div>

    </section>
  );
};

/* Components */

const Stat = ({ title, value, danger, success, ai }) => (
  <div
    className={`p-6 rounded-xl text-center shadow-xl ${
      danger
        ? "bg-red-100 text-red-700"
        : success
        ? "bg-green-100 text-green-700"
        : ai
        ? "bg-indigo-100 text-indigo-700"
        : "bg-white text-[#7f1d1d]"
    }`}
  >
    <div className="text-3xl font-extrabold">{value}</div>
    <div className="text-sm mt-2 font-semibold">{title}</div>
  </div>
);

const Action = ({ label }) => (
  <button className="bg-red-600 hover:bg-red-700 text-white font-bold p-5 rounded-xl shadow-xl transition transform hover:scale-105">
    {label}
  </button>
);

export default Dashboard;
