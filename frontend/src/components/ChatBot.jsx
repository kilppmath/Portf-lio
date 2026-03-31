import { useRef, useEffect, useState } from "react";
import { useChat } from "../hooks/useData";

const SUGGESTIONS = [
  "Como tomar decisões sob incerteza?",
  "Como penso sobre risco no mercado?",
  "O que diferencia um analista de um especulador?",
];

function Bubble({ msg }) {
  const isUser = msg?.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[88%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
          isUser
            ? "bg-blue text-white rounded-br-sm"
            : "bg-surface-3 text-content-md border border-surface-border rounded-bl-sm"
        }`}
      >
        {msg?.text || ""}
      </div>
    </div>
  );
}

function TypingDots() {
  return (
    <div className="flex justify-start">
      <div className="bg-surface-3 border border-surface-border rounded-2xl rounded-bl-sm px-4 py-3">
        <div className="flex gap-1 items-center">
          {[0, 150, 300].map((d) => (
            <span
              key={d}
              className="w-1.5 h-1.5 rounded-full bg-content-lo animate-live"
              style={{ animationDelay: `${d}ms` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ChatBot() {
  const { messages = [], send, loading } = useChat();
  const [input, setInput] = useState("");
  const bottomRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSend = () => {
    if (!input.trim() || loading) return;
    send(input.trim());
    setInput("");
    inputRef.current?.focus();
  };

  const handleSuggestion = (text) => {
    if (loading) return;
    send(text);
  };

  return (
    <div className="card flex flex-col" style={{ minHeight: 420 }}>
      {/* Header */}
      <div className="px-5 py-4 border-b border-surface-border flex items-center gap-3">
        <div className="w-7 h-7 rounded-full bg-blue-muted border border-blue/20 flex items-center justify-center shrink-0">
          <span className="font-mono text-xs text-blue font-medium">M</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-content-hi leading-none">Mentor</p>
          <p className="text-2xs text-content-lo font-mono mt-0.5">Naval · Dalio · Munger</p>
        </div>
        <div className="flex items-center gap-1.5 font-mono text-2xs text-content-lo shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-bull animate-live" />
          online
        </div>
      </div>

      {/* Mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, i) => (
          <Bubble key={i} msg={msg} />
        ))}

        {loading && <TypingDots />}

        {messages.length === 1 && !loading && (
          <div className="flex flex-wrap gap-1.5 pt-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => handleSuggestion(s)}
                className="text-2xs font-mono px-3 py-1.5 rounded-xl border border-surface-border-hi text-content-md hover:text-content-hi hover:border-blue/30 transition-all bg-surface-3"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-surface-border">
        <div className="flex gap-2 items-center">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              !e.shiftKey &&
              (e.preventDefault(), handleSend())
            }
            placeholder="Faça uma pergunta..."
            className="flex-1 bg-surface-3 text-content-hi text-sm px-4 py-2.5 rounded-xl border border-surface-border outline-none placeholder:text-content-lo focus:border-blue/40 transition-colors font-body"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-blue hover:bg-blue-dim disabled:opacity-30 disabled:cursor-not-allowed text-white w-10 h-10 rounded-xl flex items-center justify-center transition-all shrink-0"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}