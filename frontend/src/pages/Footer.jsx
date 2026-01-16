export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-300 text-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-14">

        {/* Govt Logos */}
        <div className="flex flex-wrap justify-between items-center gap-8 mb-10">
          <img src="/images/img.svg" alt="Govt Logo" className="h-12" />
          <img src="/images/secure.jpg" alt="Secure India" className="h-10" />
          <img src="/images/tranp.jpg" alt="Transparency" className="h-10" />
          <img src="/images/image.png" alt="Digital India" className="h-10" />
        </div>

        {/* National Slogan */}
        <div className="text-center mb-12">
          <h2 className="text-xl font-semibold tracking-wide text-black">
            “Securing Digital India with Intelligence & Integrity”
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            A National Platform for Fraud Prevention, Detection & Citizen Protection
          </p>
        </div>

        <hr className="border-gray-300 mb-12" />

        {/* Links Grid + QR */}
        <div className="grid grid-cols-2 md:grid-cols-7 gap-10 text-sm">

          {/* Column 1 */}
          <div>
            <h3 className="font-bold mb-4 uppercase tracking-wide">Fraud Categories</h3>
            <ul className="space-y-2 text-gray-700">
              <li>UPI & Digital Payment Fraud</li>
              <li>Banking & ATM Fraud</li>
              <li>SIM Swap Fraud</li>
              <li>Identity Theft</li>
              <li>Loan & Investment Scams</li>
              <li>Cyber Crime</li>
              <li>GST & Tax Fraud</li>
            </ul>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="font-bold mb-4 uppercase tracking-wide">Citizen Services</h3>
            <ul className="space-y-2 text-gray-700">
              <li>Report Cyber Fraud</li>
              <li>Track Complaint Status</li>
              <li>Verify Bank Account</li>
              <li>Block Suspicious Transaction</li>
              <li>Fraud Alerts</li>
              <li>Victim Assistance</li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="font-bold mb-4 uppercase tracking-wide">AI Intelligence</h3>
            <ul className="space-y-2 text-gray-700">
              <li>Real-Time Fraud Map</li>
              <li>Risk Scoring Engine</li>
              <li>Network & Link Analysis</li>
              <li>Pattern Recognition</li>
              <li>Predictive Case Analysis</li>
              <li>Digital Evidence Support</li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="font-bold mb-4 uppercase tracking-wide">Authorities</h3>
            <ul className="space-y-2 text-gray-700">
              <li>Police & Cyber Cells</li>
              <li>Banking Institutions</li>
              <li>Inter-State Coordination</li>
              <li>CBI & Enforcement Agencies</li>
              <li>National Fraud Registry</li>
              <li>Secure Govt Dashboard</li>
            </ul>
          </div>

          {/* Column 5 */}
          <div>
            <h3 className="font-bold mb-4 uppercase tracking-wide">About Fraud-AI</h3>
            <ul className="space-y-2 text-gray-700">
              <li>Mission & Vision</li>
              <li>How the Platform Works</li>
              <li>AI Technology Stack</li>
              <li>Ethical AI Framework</li>
              <li>Data Security Standards</li>
              <li>Privacy Policy</li>
            </ul>
          </div>

          {/* Column 6 */}
          <div>
            <h3 className="font-bold mb-4 uppercase tracking-wide">Emergency & Support</h3>
            <ul className="space-y-2 text-gray-700">
              <li><strong>Cyber Crime Helpline:</strong> 1930</li>
              <li><strong>National Emergency:</strong> 112</li>
              <li><strong>Women Safety:</strong> 181</li>
              <li>Help Center</li>
              <li>FAQs</li>
              <li>Contact Cyber Team</li>
            </ul>
          </div>

          {/* QR Code Column */}
          <div className="flex flex-col items-center text-center">
            <h3 className="font-bold mb-4 uppercase tracking-wide">
              View on Mobile
            </h3>

            <div className="bg-black p-4 rounded-lg">
              <img
  src="/images/QR.jpg"
  alt="QR Code"
  className="h-32 w-32 bg-white p-2 rounded"
/>

            </div>

            <h4 className="mt-6 font-bold uppercase tracking-wide">
              Follow Us
            </h4>

            <div className="flex gap-4 mt-3">
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-lg">
                f
              </div>
              <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-white text-lg">
                X
              </div>
            </div>
          </div>

        </div>

        {/* Trust Bar */}
        <div className="mt-14 border-t border-gray-300 pt-8 text-center">
          <p className="text-sm text-gray-600">
            Built under National Cyber Security Guidelines • ISO-Compliant • Data Encrypted & Audited
          </p>
          <p className="text-sm font-medium text-gray-700 mt-2">
            “Report Early • Act Fast • Stay Secure”
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center text-xs text-gray-600">
          <p>© 2026 Fraud-AI | Government of India Initiative</p>
          <p>Powered by Artificial Intelligence • Governed by Law • Trusted by Citizens</p>
        </div>

      </div>
    </footer>
  );
}
