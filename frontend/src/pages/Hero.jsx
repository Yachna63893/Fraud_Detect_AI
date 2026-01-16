import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { useTranslation } from "react-i18next";
import { Globe, Bell, UserCircle, MessageCircle } from "lucide-react";
import FraudChatbot from "../components/FraudChatbot";

const images = ["/images/img1.jpg", "/images/img2.jpg"];

const actions = [
  { label: "REPORT FRAUD", url: "https://cybercrime.gov.in" },
  { label: "BLOCK BANK", url: "https://www.onlinesbi.sbi" },
  { label: "FREEZE AADHAAR", url: "https://myaadhaar.uidai.gov.in" },
  { label: "BLOCK CARD", url: "https://www.onlinesbi.sbi" },
  { label: "FRAUD HELPLINE", url: "https://cybercrime.gov.in/Webform/helpline.aspx" },
  { label: "TRACK CASE", url: "https://cybercrime.gov.in" },
  { label: "CYBER CRIME PORTAL", url: "https://cybercrime.gov.in" }
];

export default function Hero() {
  const [index, setIndex] = useState(0);
  const { i18n } = useTranslation();
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setIndex((p) => (p + 1) % images.length);
    }, 6000);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden">

      <Sidebar showOnHero={true} />

      {/* 75% Image */}
      <div className="absolute top-0 left-0 w-full h-[75%]">
        <img src={images[index]} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/65" />
      </div>

      {/* Bottom white */}
      <div className="absolute bottom-0 left-0 w-full h-[25%] bg-white" />

      {/* Utility Bar */}
      <div className="absolute top-5 right-6 z-50 flex items-center gap-6 text-white">
        <button
          onClick={() => i18n.changeLanguage(i18n.language === "en" ? "hi" : "en")}
          className="flex items-center gap-2 hover:text-orange-400 transition"
        >
          <Globe size={20} />
          <span className="text-sm font-semibold">
            {i18n.language === "en" ? "हिंदी" : "EN"}
          </span>
        </button>

        <button className="relative hover:text-orange-400 transition">
          <Bell size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-white text-[10px] rounded-full flex items-center justify-center">
            3
          </span>
        </button>

        <button className="flex items-center gap-2 hover:text-orange-400 transition">
          <UserCircle size={22} />
          <span className="text-sm font-semibold">Sign In</span>
        </button>
      </div>

      {/* Center Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center text-center text-white px-6">
        <p className="uppercase tracking-widest text-sm text-white/80">
          Government of India
        </p>

        <h1 className="mt-3 text-5xl md:text-7xl font-extrabold">
          Fraud Detection
        </h1>

        <p className="mt-2 text-xl">
          National Portal of India
        </p>

        <div className="mt-8 w-full max-w-4xl bg-white rounded-xl flex overflow-hidden shadow-xl">
          <input
            placeholder="Search bank account, phone number, fraud case, Aadhaar..."
            className="flex-1 px-6 py-4 text-gray-800 outline-none"
          />
          <button className="bg-red-600 px-10 text-white font-semibold hover:bg-red-700">
            Search
          </button>
        </div>

        <p className="mt-4 text-[11px] text-white/80 uppercase tracking-widest">
          Prototype for research & innovation purposes only
        </p>
      </div>

      {/* Emergency Ribbon */}
      <div className="absolute bottom-6 w-full z-30">
        <div className="flex gap-4 animate-marquee px-10">
          {[...actions, ...actions].map((a, i) => (
            <a
              key={i}
              href={a.url}
              target="_blank"
              rel="noreferrer"
              className="px-8 py-4 bg-white border border-gray-300 shadow-lg text-gray-900 font-semibold hover:bg-red-600 hover:text-white transition whitespace-nowrap"
            >
              {a.label}
            </a>
          ))}
        </div>
      </div>

      {/* 🤖 Floating Chatbot Button */}
      <div
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-black text-white p-4 rounded-full shadow-xl cursor-pointer hover:scale-110 transition"
      >
        <MessageCircle size={28} />
      </div>

      {/* Chatbot Popup */}
      {chatOpen && <FraudChatbot close={() => setChatOpen(false)} />}

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 22s linear infinite;
        }
      `}</style>

    </section>
  );
}
