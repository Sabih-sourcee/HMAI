import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

const API_KEY = "API_KEY_HERE";
const SYSTEM_PROMPT = "You are HMA Study Assistant, an AI tutor for O-Level History and Geography students. You answer only from Sir Hamza Ali's official study material. Be helpful, concise, and accurate.";

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite-preview-06-17:generateContent?key=${API_KEY}`;

interface Message {
  role: "user" | "ai";
  text: string;
  time: string;
}

const getTime = () =>
  new Date().toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false });

const TypingIndicator = () => (
  <div className="flex items-end gap-2 mb-3">
    <div className="bg-chat-ai text-chat-ai-foreground rounded-2xl rounded-bl-sm px-4 py-3 max-w-[80%]">
      <div className="flex gap-1">
        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "0ms" }} />
        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "150ms" }} />
        <span className="w-2 h-2 rounded-full bg-muted-foreground animate-bounce" style={{ animationDelay: "300ms" }} />
      </div>
    </div>
  </div>
);

const ChatBubble = ({ msg }: { msg: Message }) => {
  const isUser = msg.role === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-3`}>
      <div
        className={`max-w-[80%] px-4 py-2.5 text-[15px] leading-relaxed whitespace-pre-wrap ${
          isUser
            ? "bg-primary text-primary-foreground rounded-2xl rounded-br-sm"
            : "bg-chat-ai text-chat-ai-foreground rounded-2xl rounded-bl-sm"
        }`}
      >
        {msg.text}
        <div
          className={`text-[11px] mt-1 ${
            isUser ? "text-primary-foreground/70 text-right" : "text-muted-foreground text-left"
          }`}
        >
          {msg.time}
        </div>
      </div>
    </div>
  );
};

const WELCOME_MSG: Message = {
  role: "ai",
  text: "Assalam o Alaikum! I am your HMA Study Assistant. Ask me anything from your O-Level History or Geography notes. I answer only from Sir Hamza's official study material.",
  time: getTime(),
};

export default function Index() {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MSG]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", text, time: getTime() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text }] }],
          systemInstruction: { parts: [{ text: SYSTEM_PROMPT }] },
        }),
      });
      const data = await res.json();
      const aiText =
        data?.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I couldn't generate a response.";
      setMessages((prev) => [...prev, { role: "ai", text: aiText, time: getTime() }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Something went wrong. Please try again.", time: getTime() },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[100dvh] bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground px-4 py-3 flex-shrink-0 shadow-md">
        <h1 className="text-lg font-bold leading-tight">HMA Study Assistant</h1>
        <p className="text-xs text-primary-foreground/70">Powered by Hamza Ali's Notes</p>
      </header>

      {/* Chat Area */}
      <main className="flex-1 overflow-y-auto px-3 py-4">
        {messages.map((msg, i) => (
          <ChatBubble key={i} msg={msg} />
        ))}
        {loading && <TypingIndicator />}
        <div ref={bottomRef} />
      </main>

      {/* Input Bar */}
      <div className="flex-shrink-0 border-t border-border bg-card px-3 py-2">
        <div className="flex items-end gap-2 max-w-2xl mx-auto">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your question..."
            rows={1}
            className="flex-1 resize-none rounded-xl border border-input bg-background px-4 py-2.5 text-[15px] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring max-h-32"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center disabled:opacity-40 transition-opacity"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
