export default function HowItWorks() {
  const steps = [
    {
      title: "Anomaly Detection",
      desc: "Fraud-AI constantly watches transactions, logins, SIM usage and digital activity to catch anything unusual."
    },
    {
      title: "Risk Scoring",
      desc: "Every action is checked using device, location and history to calculate how risky it is."
    },
    {
      title: "Fraud Detection",
      desc: "If something looks dangerous, the system immediately alerts banks and cyber cells to block the fraud."
    },
    {
      title: "Historical Analysis",
      desc: "Your case is compared with millions of past frauds to find scam patterns and repeat criminals."
    },
    {
      title: "AI Assistance",
      desc: "You get real-time updates, guidance and case status through AI support."
    }
  ];

  return (
    <section className="bg-[#f6faf7] py-28">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
          How <span className="text-green-600">Fraud-AI</span> Works
        </h2>

        <p className="text-center text-gray-600 max-w-4xl mx-auto mb-20">
          A national-scale AI system that protects your money, identity and digital life in real-time.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

          {/* LEFT — Steps */}
          <div className="space-y-6">
            {steps.map((s, i) => (
              <div
                key={i}
                className="flex gap-6 bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-xl transition"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-full bg-green-600 text-white font-bold shrink-0">
                  {i + 1}
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    {s.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT — Visual Zone */}
          <div className="flex flex-col items-center gap-10">

            {/* BIG workflow */}
            <img
              src="/images/work.svg"
              alt="Fraud-AI Workflow"
              className="w-full max-w-[520px] object-contain"
            />

            {/* Small human-friendly card */}
            <img
              src="/images/image.png"
              alt="Fraud AI Protection"
              className="w-[360px] rounded-xl shadow-xl border bg-white p-2"
            />

          </div>

        </div>
      </div>
    </section>
  );
}
