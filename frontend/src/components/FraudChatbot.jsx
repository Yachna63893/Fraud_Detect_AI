import { useState } from "react";
import api from "../services/api";

export default function FraudChatbot({ close }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "🇮🇳 Hello! I am FraudShield AI. Ask me about fraud, cybercrime, or government safety." }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    try {
      const data = await api.chatPost("/chat", { message: userMsg.text });
      setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { sender: "bot", text: "⚠️ Server not reachable." }]);
    }
  };

  return (
    <div className="fixed bottom-20 right-6 z-50 w-[420px] h-[520px] bg-[#161b22] rounded-xl shadow-2xl flex flex-col text-white">

      {/* Header */}
      <div className="p-4 bg-black flex justify-between items-center rounded-t-xl border-b border-gray-700">
        <div>
          <h2 className="font-bold text-lg">FraudShield AI 🤖</h2>
          <p className="text-xs text-gray-400">National Cyber Safety Assistant</p>
        </div>
        <button onClick={close} className="text-xl hover:text-red-500">✕</button>
      </div>

      {/* Chat */}
      <div className="flex-1 p-4 overflow-y-auto space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`max-w-[75%] p-3 rounded-lg text-sm ${
              m.sender === "user"
                ? "bg-green-600 ml-auto"
                : "bg-gray-800"
            }`}
          >
            {m.text}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="p-3 border-t border-gray-700 flex gap-2">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Ask about fraud, Aadhaar, UPI, scams..."
          className="flex-1 bg-black border border-gray-700 rounded px-3 py-2 text-sm outline-none"
        />
        <button
          onClick={sendMessage}
          className="bg-green-600 px-4 rounded hover:bg-green-700"
        >
          Send
        </button>
      </div>

    </div>
  );
}
