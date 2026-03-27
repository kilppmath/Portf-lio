import { useRef, useEffect, useState } from "react";
import { useChat } from "../hooks/useData";

function Message({ msg }) {
  const isUser = msg.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
          isUser
            ? "bg-accent-blue text-white rounded-br-sm"
            : "bg-bg-border text-text-secondary rounded-bl-sm"
        }`}
      >
        {msg.text}
      </div>
    </div>
  );
}

export default function ChatBot() {
  const { messages, send, loading } = useChat();
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);

  // Scroll automático para última mensagem
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim()) return;
    send(input);
    setInput("");
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="card flex flex-col h-full min-h-[420px]">
      {/* Header */}
      <div className="px-5 py-4 border-b border-bg-border flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-accent-blue-glow border border-accent-blue/30 flex items-center justify-center">
          <span className="text-accent-blue text-sm">M</span>
        </div>
        <div>
          <div className="text-sm font-medium text-text-primary">Mentor</div>
          <div className="text-xs text-text-muted">Naval · Dalio · Munger</div>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-xs text-bull font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-bull animate-pulse2" />
          online
        </div>
      </div>

      {/* Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <Message key={i} msg={msg} />
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-bg-border px-4 py-2.5 rounded-2xl rounded-bl-sm">
              <div className="flex gap-1 items-center">
                <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 rounded-full bg-text-muted animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-4 pb-4 pt-2 border-t border-bg-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Pergunte sobre carreira, decisões..."
            className="flex-1 bg-bg-border text-text-primary text-sm px-4 py-2.5 rounded-xl outline-none placeholder:text-text-muted focus:ring-1 focus:ring-accent-blue/40 transition-all"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-accent-blue hover:bg-accent-blue-dim disabled:opacity-40 disabled:cursor-not-allowed text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          >
            →
          </button>
        </div>
        <p className="text-xs text-text-muted mt-2 text-center">
          Fins educacionais. Não constitui recomendação financeira.
        </p>
      </div>
    </div>
  );
}
