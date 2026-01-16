import { ShieldCheck, Cpu, BarChart3, Globe, Users, Lock } from "lucide-react";

export default function About() {
  return (
    <section className="bg-[#f6faf7] py-24 overflow-hidden">

      {/* Header */}
      <div className="text-center mb-16 px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
          About <span className="text-green-600">Fraud-AI</span>
        </h2>
        <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
          Fraud-AI is India’s national AI-powered digital platform for detecting,
          preventing and investigating financial, cyber and identity frauds in real-time.
        </p>
      </div>

      {/* Main grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 px-6">

        {/* LEFT SIDE */}
        <div className="flex flex-col justify-center space-y-8">

          {/* SVG Illustration */}
          <div className="w-full flex justify-center lg:justify-start">
            <img
              src="/images/img.svg"
              alt="Fraud AI Illustration"
              className="w-[90%] max-w-md drop-shadow-xl"
            />
          </div>

          <div>
            <h3 className="text-3xl font-semibold text-gray-800">
              A Digital Shield for Every Citizen
            </h3>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Fraud-AI integrates Artificial Intelligence, national banking networks,
              telecom data and cyber-crime systems into one unified platform.
              This allows the Government of India to detect fraud patterns instantly,
              block suspicious transactions, and protect citizens before damage occurs.
            </p>

            <p className="mt-4 text-gray-600 leading-relaxed">
              Whether it is a phishing attack, fake loan, SIM fraud or digital wallet theft —
              Fraud-AI acts as India’s central command system to monitor, analyze and respond
              at scale.
            </p>

            <div className="flex items-center gap-4 pt-6">
              <div className="h-1 w-16 bg-green-500 rounded-full"></div>
              <span className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
                Powered by National AI Infrastructure
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE – Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

          <Feature
            icon={<ShieldCheck />}
            title="National Protection Layer"
            desc="A centralized AI-based fraud defense system protecting every citizen and institution."
          />

          <Feature
            icon={<Cpu />}
            title="AI-Driven Detection"
            desc="Machine learning models detect fraud networks, anomalies and emerging threats."
          />

          <Feature
            icon={<BarChart3 />}
            title="Live Risk Monitoring"
            desc="Real-time dashboards for government agencies to track fraud, cases and trends."
          />

          <Feature
            icon={<Lock />}
            title="Secure by Design"
            desc="Government-grade encryption and authentication ensure data privacy and integrity."
          />

          <Feature
            icon={<Users />}
            title="Citizen First"
            desc="Instant tools to block bank accounts, freeze Aadhaar and report frauds in one click."
          />

          <Feature
            icon={<Globe />}
            title="Nationwide Integration"
            desc="Banks, telecoms, cyber cells and regulators connected through one intelligent platform."
          />

        </div>
      </div>
    </section>
  );
}

/* Feature Card */
function Feature({ icon, title, desc }) {
  return (
    <div className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
      <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-green-100 text-green-600 mb-4 group-hover:bg-green-600 group-hover:text-white transition">
        {icon}
      </div>
      <h4 className="text-lg font-semibold text-gray-800 mb-2">
        {title}
      </h4>
      <p className="text-sm text-gray-600 leading-relaxed">
        {desc}
      </p>
    </div>
  );
}
