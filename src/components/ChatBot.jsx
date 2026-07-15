import React, { useState } from "react";
import axios from "axios";
import "./Auth.css"; // external CSS

const ChatBot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const sendMessage = async () => {
  if (!input.trim()) return;
  const userMsg = { role: "user", content: input };

  // Always use functional update
  setMessages((prev) => [...prev, userMsg]);

  try {
    const res = await axios.post("http://localhost:8080/api/chat", { message: input });
    const botMsg = { role: "bot", content: res.data };

    // Again use functional update
    setMessages((prev) => [...prev, botMsg]);
  } catch (err) {
    console.error(err);
  }
  setInput("");
};


  return (
    <div className="chatbot-container">
      {isOpen && (
        <div className="chat-window">
          <h3>☕ CoffeeCoop ChatBot</h3>
          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.role}`}>
                <b>{msg.role === "user" ? "You" : "Bot"}:</b> {msg.content}
              </div>
            ))}
          </div>
          <div className="chat-footer">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
      <button className="chat-toggle" onClick={() => setIsOpen(!isOpen)}>
        💬
      </button>
    </div>
  );
};

export default ChatBot;
