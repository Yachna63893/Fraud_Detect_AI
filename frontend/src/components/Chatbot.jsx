import { useState } from "react";
import api from "../services/api";

export default function FraudChatbot() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello 👋 I am FraudShield AI. Ask me about fraud detection, audits, or government spending." }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages(prev => [...prev, userMsg]);
    setInput("");

    try {
      const data = await api.chatPost("/chat", { message: input });
      setMessages(prev => [...prev, { sender: "bot", text: data.reply }]);
    } catch (e) {
      setMessages(prev => [...prev, { sender: "bot", text: "⚠️ Server not reachable." }]);
    }
  };

  return (
    <div className="chat-wrapper">
      <div className="chat-header">
        FraudShield AI 🤖
        <span>Government Fraud Intelligence Assistant</span>
      </div>

      <div className="chat-box">
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.sender}`}>
            {m.text}
          </div>
        ))}
      </div>

      <div className="chat-input">
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Ask about fraud detection..."
          onKeyDown={e => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>

      {/* Inline CSS */}
      <style>{`
        body {
          background: #0d1117;
          font-family: Arial, sans-serif;
        }

        .chat-wrapper {
          width: 420px;
          height: 90vh;
          margin: 20px auto;
          background: #161b22;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          color: white;
        }

        .chat-header {
          padding: 14px;
          background: #0d1117;
          border-bottom: 1px solid #30363d;
          font-weight: bold;
        }

        .chat-header span {
          display: block;
          font-size: 12px;
          color: #8b949e;
        }

        .chat-box {
          flex: 1;
          padding: 12px;
          overflow-y: auto;
        }

        .message {
          max-width: 75%;
          padding: 10px;
          margin-bottom: 10px;
          border-radius: 8px;
          font-size: 14px;
        }

        .message.bot {
          background: #21262d;
          align-self: flex-start;
        }

        .message.user {
          background: #238636;
          align-self: flex-end;
          margin-left: auto;
        }

        .chat-input {
          display: flex;
          padding: 10px;
          border-top: 1px solid #30363d;
        }

        .chat-input input {
          flex: 1;
          padding: 10px;
          border-radius: 6px;
          border: none;
          outline: none;
          background: #0d1117;
          color: white;
        }

        .chat-input button {
          margin-left: 8px;
          padding: 10px 16px;
          background: #238636;
          border: none;
          border-radius: 6px;
          color: white;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}