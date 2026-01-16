import { useEffect, useState } from "react";

const fraudHotspots = [
  { name: "Delhi", x: 48, y: 28, risk: "high" },
  { name: "Mumbai", x: 33, y: 52, risk: "high" },
  { name: "Bengaluru", x: 42, y: 68, risk: "medium" },
  { name: "Hyderabad", x: 45, y: 62, risk: "medium" },
  { name: "Kolkata", x: 60, y: 40, risk: "low" }
];

export default function IndiaMap() {
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setPulse(p => !p), 800);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="relative w-full max-w-4xl mx-auto">

      {/* INDIA MAP */}
     <img
  src="/images/India.jpg"
  alt="India Map"
  className="w-full rounded-xl shadow-lg object-contain"
 />


      {/* Hotspots */}
      {fraudHotspots.map((s, i) => (
        <div
          key={i}
          className={`absolute rounded-full transition-all duration-700 ${
            s.risk === "high"
              ? "bg-red-600"
              : s.risk === "medium"
              ? "bg-yellow-400"
              : "bg-green-500"
          }`}
          style={{
            width: pulse ? "18px" : "14px",
            height: pulse ? "18px" : "14px",
            left: `${s.x}%`,
            top: `${s.y}%`,
            transform: "translate(-50%, -50%)",
            boxShadow: pulse
              ? "0 0 18px rgba(255,0,0,0.8)"
              : "0 0 10px rgba(0,0,0,0.4)"
          }}
          title={`${s.name} Fraud Zone`}
        />
      ))}
    </div>
  );
}
