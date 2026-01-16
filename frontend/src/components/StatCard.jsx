export default function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white bg-opacity-80 backdrop-blur-md p-5 rounded-xl shadow-md flex flex-col items-center justify-center hover:scale-105 transform transition">
      <div className="text-4xl">{icon}</div>
      <div className="text-xl font-bold mt-2">{title}</div>
      <div className="text-2xl mt-1 text-gray-700">{value}</div>
    </div>
  );
}
