import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Auth({ onSuccess }) {
  const [mode, setMode] = useState("login");
  const navigate = useNavigate();

  const handleSuccess = () => {
    onSuccess();
    navigate("/");
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">

      {/* Background */}
      <img
        src="/images/img1.jpg"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Center Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6">

        <div className="relative w-full max-w-md h-[560px] perspective">

          <div
            className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
              mode === "signup" ? "rotate-y-180" : ""
            }`}
          >

            {/* LOGIN */}
            <div className="card front">
              <Brand subtitle="National Fraud Intelligence Portal" />

              <div className="mt-8 space-y-5">
                <GlassInput placeholder="Email" />
                <GlassInput placeholder="Password" type="password" />

                <button onClick={handleSuccess} className="btn-primary">
                  Login
                </button>

                <p className="text-center text-gray-300 text-sm">
                  Don’t have an account?{" "}
                  <span onClick={() => setMode("signup")} className="link">
                    Sign Up
                  </span>
                </p>
              </div>
            </div>

            {/* SIGNUP */}
            <div className="card back">
              <Brand subtitle="Create secure government account" />

              <div className="mt-8 space-y-5">
                <GlassInput placeholder="Full Name" />
                <GlassInput placeholder="Email" />
                <GlassInput placeholder="Password" type="password" />

                <button onClick={handleSuccess} className="btn-primary">
                  Create Account
                </button>

                <p className="text-center text-gray-300 text-sm">
                  Already have an account?{" "}
                  <span onClick={() => setMode("login")} className="link">
                    Login
                  </span>
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* CSS */}
      <style>{`
        .perspective {
          perspective: 1400px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }

        .card {
          position: absolute;
          inset: 0;
          border-radius: 30px;
          padding: 2.5rem;
          background: linear-gradient(135deg, #0f172a, #020617);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255,255,255,0.1);
          backface-visibility: hidden;
          box-shadow: 0 40px 100px rgba(0,0,0,0.8);
          color: white;
        }

        .front {
          transform: rotateY(0deg);
        }

        .back {
          transform: rotateY(180deg);
        }

        .btn-primary {
          width: 100%;
          padding: 14px;
          border-radius: 16px;
          background: linear-gradient(135deg,#2563eb,#1d4ed8);
          font-weight: 600;
          transition: 0.3s;
        }

        .btn-primary:hover {
          box-shadow: 0 0 25px rgba(59,130,246,.7);
          transform: translateY(-2px);
        }

        .link {
          color: #60a5fa;
          cursor: pointer;
          font-weight: 600;
        }
      `}</style>
    </div>
  );
}

/* Dark Glass Input */
function GlassInput({ placeholder, type = "text" }) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className="
        w-full px-5 py-4 rounded-2xl
        bg-gradient-to-r from-[#334155]/80 to-[#020617]/80
        border border-white/20
        text-white placeholder-gray-400
        backdrop-blur-xl
        shadow-inner
        outline-none
        focus:ring-2 focus:ring-blue-500
        focus:border-blue-500
        transition
      "
    />
  );
}

/* Brand */
function Brand({ subtitle }) {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-extrabold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
        FRAUD-AI
      </h1>
      <p className="mt-1 text-gray-400 text-sm">{subtitle}</p>
    </div>
  );
}
