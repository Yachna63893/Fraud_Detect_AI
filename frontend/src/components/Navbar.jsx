export default function Navbar() {
  return (
    <nav className="bg-white bg-opacity-80 backdrop-blur-md shadow-md fixed w-full z-10">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        <div className="text-xl font-bold text-gray-800">AI Public Fraud Detection</div>
        <div className="flex items-center space-x-4">
          <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">
            Demo
          </button>
          <div className="text-gray-600">Team ICP Infinity</div>
        </div>
      </div>
    </nav>
  );
}
