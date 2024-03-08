import React, { useState } from "react";

interface Message {
  id: number;
  text: string;
  sender: "user" | "chatbox";
}

interface ChatBoxProps {
  onSendMessage: () => void;
}

const ChatBox: React.FC<ChatBoxProps> = ({ onSendMessage }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [nextId, setNextId] = useState(0);

  const addMessage = (text: string, sender: "user" | "chatbox") => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: nextId, text, sender },
    ]);
    setNextId(nextId + 1);

    if (sender === "user") {
      setMessage("");
    }
  };

  const handleSendMessage = () => {
    if (!message.trim()) return;

    addMessage(message, "user");
    onSendMessage();
    setTimeout(() => {
      // Add a timeout here
      if (message.trim().toLowerCase().includes("what is your name")) {
        addMessage("My name is Pramila, nice to meet you!", "chatbox");
      } else {
        addMessage("I am not sure I can help you with that", "chatbox");
      }
    }, 700); // 500 milliseconds delay
  };

  return (
    <div className="bg-gradient-to-r from-gray-400 to-slate-200 border border-black rounded-xl flex flex-col items-center justify-center h-full w-full">
      <div className="flex flex-col p-4 shadow w-full h-full">
        <div className="flex">
          <input
            type="text"
            className="border p-2 rounded-l flex-grow"
            placeholder="Chat with the AI bot here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <button
            className="bg-blue-500 text-white p-3 rounded-r hover:bg-blue-700 transition-colors"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </div>

        <div className="overflow-y-auto flex-grow max-h-96">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`text-left p-2 ${
                msg.sender === "chatbox" ? "text-sky-700" : "text-black"
              }`}
            >
              {/* Display "You:" or "ChatBox:" based on the sender */}
              <strong>
                {msg.sender === "user" ? "You: " : "Pramila Ai: "}
              </strong>
              {msg.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
