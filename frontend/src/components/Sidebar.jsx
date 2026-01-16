import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ showOnHero }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  if (!showOnHero) return null;

  const links = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Fraud", path: "/fraud" },
    { label: "Anomaly", path: "/anomaly" },
    { label: "E-Commerce", path: "/ecom" },
    { label: "Heatmap", path: "/heatmap" },
    { label: "Complaint", path: "/complaint" }
  ];

  function nav(path) {
    setOpen(false);
    navigate(path);
  }

  return (
    <>
      {/* Hover Edge */}
      <div className="sidebar-trigger" onMouseEnter={() => setOpen(true)} />

      {/* Sidebar */}
      <div
        className={`gov-sidebar ${open ? "open" : ""}`}
        onMouseLeave={() => setOpen(false)}
      >
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-extrabold tracking-wide text-red-600">
            FRAUD-AI
          </h2>
          <p className="text-xs text-gray-400 mt-1">
            National Command Panel
          </p>
        </div>

        {/* Links */}
        <nav className="flex flex-col gap-2">
          {links.map((l, i) => (
            <button
              key={i}
              onClick={() => nav(l.path)}
              className="sidebar-link"
            >
              {l.label}
            </button>
          ))}
        </nav>

        {/* Status */}
        <div className="mt-auto pt-6 border-t border-gray-200">
          <div className="text-xs text-gray-500">System Status</div>
          <div className="mt-1 text-sm font-semibold text-green-600">
            ● Online & Secure
          </div>
          <div className="mt-2 text-xs text-gray-400">
            Government of India
          </div>
        </div>
      </div>

      {/* Styles */}
      <style>{`
        .sidebar-trigger {
          position: fixed;
          top: 0;
          left: 0;
          width: 20px;
          height: 100vh;
          z-index: 1000;
        }

        .gov-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          width: 280px;
          height: 100vh;
          background: linear-gradient(180deg, #ffffff, #f9fafb);
          padding: 2rem 1.5rem;
          transform: translateX(-260px);
          transition: transform 0.35s ease;
          z-index: 999;
          display: flex;
          flex-direction: column;
          box-shadow: 15px 0 50px rgba(0,0,0,0.15);
          border-right: 1px solid #e5e7eb;
        }

        .gov-sidebar.open {
          transform: translateX(0);
        }

        .sidebar-link {
          padding: 0.75rem 1rem;
          border-radius: 12px;
          font-weight: 600;
          color: #374151;
          background: rgba(255,255,255,0.7);
          border: 1px solid #e5e7eb;
          cursor: pointer;
          transition: all 0.25s ease;
          text-align: left;
        }

        .sidebar-link:hover {
          background: linear-gradient(90deg, #dc2626, #ef4444);
          color: white;
          border-color: #dc2626;
          box-shadow: 0 10px 25px rgba(220,38,38,0.35);
          transform: translateX(6px);
        }
      `}</style>
    </>
  );
};

export default Sidebar;
