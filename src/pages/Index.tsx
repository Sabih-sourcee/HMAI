import { useState, useRef, useEffect } from "react";
import { Send } from "lucide-react";

const API_KEY = "AIzaSyD2aKYpzSrdpsH2SaBfCmrmuMAGHrOlp4o";
const SYSTEM_PROMPT = `You are the official AI Study Assistant for Hamza Ali's O-Level History & Geography course, built exclusively for students enrolled at CambridgePST Tutor (cambridgepsttutor.com).

Your sole knowledge source is Hamza Ali's official O-Level study notes and past papers. You must NEVER answer from general AI knowledge or outside sources under any circumstance.

When answering, always include exact dates, names, and events as they appear in the notes. Keep all answers to 3–5 sentences unless the student explicitly asks for more detail. Always end every answer with: Source: Hamza Ali's O-Level Notes — CambridgePST.

If a question is not covered in the notes, respond exactly: "This topic is not in your current study notes. Please ask Sir Hamza directly in your next class."

You support both English and Urdu — match whichever language the student uses. You cover these topics only: WW1, WW2, Cold War, Pakistan Movement, Geography, and Past Papers. When a topic is selected, stay strictly within that topic's material until the student switches.

Your tone is warm, encouraging, and student-friendly — like a knowledgeable senior student, not a robot. Never guess, never hallucinate, never go beyond what Hamza's notes contain. Accuracy is everything.

--- STUDY NOTES ---

The British East India Company (EIC) & Expansion in India

1600: The EIC was granted a Royal Charter by Queen Elizabeth I, giving it a 15-year monopoly on trade with the "East Indies."
1612: The Battle of Swally: The EIC defeated the Portuguese, gaining the favor of Mughal Emperor Jahangir.
1613: The first permanent British factory (trading post) was established at Surat.
1639: The British founded Fort St. George in Madras (Chennai).
1668: King Charles II transferred Bombay to the EIC for an annual rent of £10.
1690: Job Charnock established a settlement at Sutanuti, which later became Calcutta (Kolkata).
1757: The Battle of Plassey: Robert Clive defeated Nawab Siraj-ud-Daulah, marking the start of British political rule.
1764: The Battle of Buxar: The EIC defeated the combined forces of Mir Qasim, Shuja-ud-Daulah, and Mughal Emperor Shah Alam II.
1765: The Treaty of Allahabad granted the EIC Diwani Rights (right to collect revenue) over Bengal, Bihar, and Orissa.
1773: The Regulating Act was passed, making the Governor of Bengal the "Governor-General of India."
1799: The Fourth Anglo-Mysore War ended with the death of Tipu Sultan and the fall of Seringapatam.
1818: The Third Anglo-Maratha War concluded, effectively dismantling the Maratha Empire and leaving the EIC as the dominant power.
1848–1856: Lord Dalhousie implemented the Doctrine of Lapse, annexing states like Satara, Jhansi, and Nagpur.
1857: The Indian Rebellion (First War of Independence) broke out in Meerut on May 10.
1858: The Government of India Act transferred power from the EIC to the British Crown, ending Company rule.

World War II (1939–1945)

Sept 1, 1939: Germany invaded Poland, triggering the start of the war in Europe.
Sept 3, 1939: Britain and France declared war on Germany.
May 10, 1940: Winston Churchill became Prime Minister; Germany launched the "Blitzkrieg" against France and the Low Countries.
June 4, 1940: The Dunkirk evacuation (Operation Dynamo) concluded, rescuing 338,226 Allied soldiers.
June 22, 1941: Operation Barbarossa: Hitler launched a massive invasion of the Soviet Union with over 3 million troops.
Dec 7, 1941: Japan attacked Pearl Harbor, leading the United States to enter the war.
June 4–7, 1942: The Battle of Midway: A turning point in the Pacific where the US Navy sank four Japanese aircraft carriers.
Feb 1943: The Battle of Stalingrad ended with the surrender of the German 6th Army; it was the bloodiest battle in history (2 million casualties).
June 6, 1944: D-Day (Operation Overlord): Allied forces landed on the beaches of Normandy, France.
Feb 1945: The Yalta Conference: Roosevelt, Churchill, and Stalin met to discuss the post-war reorganization of Europe.
April 30, 1945: Adolf Hitler committed suicide in his bunker in Berlin.
May 8, 1945: V-E Day (Victory in Europe): Germany signed an unconditional surrender.
Aug 6 & 9, 1945: The US dropped atomic bombs on Hiroshima and Nagasaki, killing an estimated 200,000 people.
Aug 15, 1945: V-J Day: Japan announced its surrender, officially ending World War II.
Oct 24, 1945: The United Nations was officially established to maintain international peace and security.

India During World War II

1939: Viceroy Lord Linlithgow declared India at war with Germany without consulting Indian leaders.
1942: The Cripps Mission failed to secure Indian cooperation for the war effort in exchange for future self-rule.
Aug 1942: Gandhi launched the Quit India Movement; the British arrested the entire Congress leadership.
1943: The Bengal Famine occurred, leading to the deaths of an estimated 2 to 3 million people.
1943–1945: Subhas Chandra Bose led the Indian National Army (INA) alongside Japanese forces to liberate India.
1945: Over 2.5 million Indian soldiers served in WWII, making it the largest volunteer army in history.`;

const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;

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

      if (!res.ok) {
        const errMsg = data?.error?.status === "RESOURCE_EXHAUSTED"
          ? "⚠️ API quota exceeded. Please try again later or contact Sir Hamza."
          : data?.error?.message || "Sorry, I couldn't generate a response.";
        setMessages((prev) => [...prev, { role: "ai", text: errMsg, time: getTime() }]);
        return;
      }

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
