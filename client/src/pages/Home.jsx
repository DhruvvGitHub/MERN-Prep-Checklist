import { useEffect, useState } from "react";
import { loadProgress, saveProgress } from "../lib/progressStorage.js";

const topics = [
  {
    tech: "JavaScript",
    emoji: "⚡",
    color: "#F7DF1E",
    textColor: "#1a1a1a",
    items: [
      { topic: "Execution Context & Call Stack", priority: "must" },
      { topic: "Hoisting", priority: "must" },
      { topic: "Closures", priority: "must" },
      { topic: "Scope (global, block, function)", priority: "must" },
      { topic: "var / let / const — scope differences", priority: "must" },
      { topic: "this keyword", priority: "must" },
      { topic: "Event Loop (microtask vs macrotask)", priority: "must" },
      { topic: "Promises & async/await", priority: "must" },
      { topic: "Callback vs Promise vs Async/Await", priority: "must" },
      { topic: "Arrow functions vs Normal functions", priority: "must" },
      { topic: "== vs ===", priority: "must" },
      { topic: "Objects & Arrays (deep vs shallow copy)", priority: "must" },
      { topic: "Destructuring", priority: "must" },
      { topic: "Spread & Rest operators", priority: "must" },
      { topic: "Array methods: map, filter, reduce, find", priority: "must" },
      { topic: "Optional chaining & nullish coalescing", priority: "good" },
      { topic: "Debouncing vs Throttling", priority: "good" },
      { topic: "ES6 modules (import/export)", priority: "good" },
      { topic: "Prototype & prototype chain", priority: "good" },
    ],
  },
  {
    tech: "React",
    emoji: "⚛️",
    color: "#61DAFB",
    textColor: "#1a1a1a",
    items: [
      { topic: "JSX & virtual DOM", priority: "must" },
      { topic: "Functional components", priority: "must" },
      { topic: "Props vs State", priority: "must" },
      { topic: "useState & useEffect (VERY IMPORTANT)", priority: "must" },
      { topic: "Controlled vs Uncontrolled components", priority: "must" },
      { topic: "Conditional rendering", priority: "must" },
      { topic: "Lists & keys", priority: "must" },
      { topic: "Form handling", priority: "must" },
      { topic: "API calling (fetch / axios)", priority: "must" },
      { topic: "Loading states & error handling", priority: "must" },
      { topic: "React Router (v6) — navigation, params", priority: "must" },
      { topic: "Lifting state up", priority: "good" },
      { topic: "Prop drilling vs Context API (useContext)", priority: "good" },
      { topic: "useRef", priority: "good" },
      { topic: "useMemo & useCallback (basic idea)", priority: "good" },
      { topic: "Custom hooks", priority: "good" },
      { topic: "Basic performance optimization", priority: "good" },
      { topic: "Folder structure best practices", priority: "good" },
    ],
  },
  {
    tech: "Node.js",
    emoji: "🟢",
    color: "#68A063",
    textColor: "#ffffff",
    items: [
      { topic: "What is Node.js & how it works (non-textbook answer)", priority: "must" },
      { topic: "Event-driven architecture", priority: "must" },
      { topic: "Non-blocking I/O", priority: "must" },
      { topic: "Single-threaded but still scalable — how?", priority: "must" },
      { topic: "How Node handles multiple requests", priority: "must" },
      { topic: "require vs import / CommonJS vs ES modules", priority: "must" },
      { topic: "Environment variables (.env)", priority: "must" },
      { topic: "npm & package.json", priority: "must" },
      { topic: "File system (fs) basics", priority: "good" },
      { topic: "Event emitter", priority: "good" },
      { topic: "Streams & buffers (basics)", priority: "good" },
    ],
  },
  {
    tech: "Express.js",
    emoji: "🚂",
    color: "#888888",
    textColor: "#ffffff",
    items: [
      { topic: "What is Express & why use it", priority: "must" },
      { topic: "Setting up Express server", priority: "must" },
      { topic: "Routing — GET, POST, PUT, DELETE", priority: "must" },
      { topic: "Middleware (VERY IMPORTANT — big red flag if weak)", priority: "must" },
      { topic: "Request & Response cycle", priority: "must" },
      { topic: "Error handling middleware", priority: "must" },
      { topic: "Status codes", priority: "must" },
      { topic: "Building REST APIs", priority: "must" },
      { topic: "Handling params, query, body", priority: "must" },
      { topic: "CORS — what it is & how to fix", priority: "must" },
      { topic: "JWT authentication basics", priority: "good" },
      { topic: "express.Router() for modular routes", priority: "good" },
    ],
  },
  {
    tech: "MongoDB",
    emoji: "🍃",
    color: "#00ED64",
    textColor: "#1a1a1a",
    items: [
      { topic: "What is NoSQL & why MongoDB", priority: "must" },
      { topic: "Documents & Collections", priority: "must" },
      { topic: "BSON vs JSON", priority: "must" },
      { topic: "MongoDB vs SQL — key differences", priority: "must" },
      { topic: "When NOT to use MongoDB", priority: "must" },
      { topic: "CRUD operations (insertOne, find, updateOne, deleteOne)", priority: "must" },
      { topic: "Querying: $eq, $gt, $in, $and, $or", priority: "must" },
      { topic: "Mongoose — Schema & Model", priority: "must" },
      { topic: "Schema design basics", priority: "must" },
      { topic: "Indexing (basic concept)", priority: "good" },
      { topic: "Mongoose validators & defaults", priority: "good" },
      { topic: "Mongoose populate (relationships)", priority: "good" },
      { topic: "Aggregation pipeline ($match, $group)", priority: "good" },
    ],
  },
  {
    tech: "Full Stack",
    emoji: "🔗",
    color: "#a78bfa",
    textColor: "#1a1a1a",
    items: [
      { topic: "How frontend talks to backend (the full picture)", priority: "must" },
      { topic: "API flow: request → controller → DB → response", priority: "must" },
      { topic: "JWT auth flow end-to-end", priority: "must" },
      { topic: "How you handled errors in your project", priority: "must" },
      { topic: "CORS & why it matters in full stack", priority: "must" },
      { topic: "REST API design principles", priority: "must" },
      { topic: "Environment config across frontend & backend", priority: "good" },
    ],
  },
];

const Badge = ({ priority }) =>
  priority === "must" ? (
    <span
      style={{
        background: "#ff4444",
        color: "white",
        fontSize: "10px",
        padding: "2px 7px",
        borderRadius: "99px",
        fontWeight: "700",
        letterSpacing: "0.5px",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      MUST
    </span>
  ) : (
    <span
      style={{
        background: "#2a2a2a",
        color: "#888",
        fontSize: "10px",
        padding: "2px 7px",
        borderRadius: "99px",
        fontWeight: "600",
        letterSpacing: "0.5px",
        whiteSpace: "nowrap",
        flexShrink: 0,
      }}
    >
      GOOD
    </span>
  );

export default function Home() {
  const [checked, setChecked] = useState(() => loadProgress());
  const [activeTab, setActiveTab] = useState(0);

  const toggle = (key) => {
    setChecked((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      saveProgress(next);
      return next;
    });
  };

  // If user logs in/out (TopBar reloads currently), this is mostly redundant,
  // but it also keeps progress in sync if Home mounts again.
  useEffect(() => {
    const latest = loadProgress();
    setChecked(latest);
  }, []);

  const allMust = topics
    .flatMap((t, ti) => t.items.map((item, ii) => ({ key: `${ti}-${ii}`, priority: item.priority })))
    .filter((i) => i.priority === "must");

  const doneMust = allMust.filter((i) => checked[i.key]).length;
  const totalMust = allMust.length;

  const allItems = topics.flatMap((t, ti) => t.items.map((_, ii) => ({ key: `${ti}-${ii}` })));
  const doneAll = allItems.filter((i) => checked[i.key]).length;
  const totalAll = allItems.length;

  const current = topics[activeTab];
  const tabDone = current.items.filter((_, ii) => checked[`${activeTab}-${ii}`]).length;
  const tabTotal = current.items.length;

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0c0c0c",
        color: "#f0f0f0",
        fontFamily: "'Segoe UI', system-ui, sans-serif",
        padding: "24px 16px",
      }}
    >
      <div style={{ maxWidth: 660, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 24 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
            <h1
              style={{
                fontSize: 26,
                fontWeight: 800,
                margin: 0,
                letterSpacing: "-0.5px",
                color: "#fff",
              }}
            >
              MERN Internship Prep
            </h1>
            <span
              style={{
                background: "#1a1a1a",
                border: "1px solid #333",
                borderRadius: 8,
                fontSize: 12,
                padding: "3px 10px",
                color: "#aaa",
                fontWeight: 600,
              }}
            >
              {doneAll}/{totalAll} done
            </span>
          </div>
          <p style={{ margin: "0 0 14px", color: "#555", fontSize: 13 }}>Tap any topic to mark it studied ✓</p>

          {/* Must-know progress */}
          <div style={{ marginBottom: 10 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                color: "#777",
                marginBottom: 5,
              }}
            >
              <span>🔴 Must-know topics</span>
              <span style={{ color: "#ff6655", fontWeight: 700 }}>
                {doneMust} / {totalMust}
              </span>
            </div>
            <div style={{ height: 6, background: "#1e1e1e", borderRadius: 99, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${totalMust ? (doneMust / totalMust) * 100 : 0}%`,
                  background: "linear-gradient(90deg, #ff4444, #ff8800)",
                  borderRadius: 99,
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>

          {/* Overall progress */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: 12,
                color: "#555",
                marginBottom: 5,
              }}
            >
              <span>⬜ Overall progress</span>
              <span style={{ color: "#666", fontWeight: 700 }}>
                {doneAll} / {totalAll}
              </span>
            </div>
            <div style={{ height: 4, background: "#1e1e1e", borderRadius: 99, overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${totalAll ? (doneAll / totalAll) * 100 : 0}%`,
                  background: "#3a3a3a",
                  borderRadius: 99,
                  transition: "width 0.4s ease",
                }}
              />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 20,
            flexWrap: "wrap",
          }}
        >
          {topics.map((t, i) => {
            const tDone = t.items.filter((_, ii) => checked[`${i}-${ii}`]).length;
            const tTotal = t.items.length;
            const isActive = activeTab === i;
            return (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                style={{
                  padding: "7px 14px",
                  borderRadius: 99,
                  border: "none",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 12,
                  transition: "all 0.2s",
                  background: isActive ? t.color : "#1a1a1a",
                  color: isActive ? t.textColor : "#777",
                  boxShadow: isActive ? `0 0 14px ${t.color}44` : "none",
                }}
              >
                {t.emoji} {t.tech}
                {tDone === tTotal && tTotal > 0 ? (
                  <span style={{ marginLeft: 5 }}>✓</span>
                ) : tDone > 0 ? (
                  <span style={{ marginLeft: 5, fontSize: 10, opacity: 0.75 }}>
                    {tDone}/{tTotal}
                  </span>
                ) : null}
              </button>
            );
          })}
        </div>

        {/* Section header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
            paddingLeft: 2,
          }}
        >
          <span style={{ fontSize: 15, fontWeight: 700, color: current.color }}>
            {current.emoji} {current.tech}
          </span>
          <span style={{ fontSize: 12, color: "#444" }}>
            {tabDone}/{tabTotal} done
          </span>
        </div>

        {/* Topic list */}
        <div
          style={{
            background: "#141414",
            borderRadius: 16,
            overflow: "hidden",
            border: "1px solid #1e1e1e",
          }}
        >
          {current.items.map((item, ii) => {
            const key = `${activeTab}-${ii}`;
            const done = !!checked[key];
            return (
              <div
                key={ii}
                onClick={() => toggle(key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: "13px 16px",
                  cursor: "pointer",
                  borderBottom: ii < current.items.length - 1 ? "1px solid #1a1a1a" : "none",
                  background: done ? "#181f18" : "transparent",
                  transition: "background 0.15s",
                }}
              >
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 6,
                    border: done ? "none" : "2px solid #2e2e2e",
                    background: done ? current.color : "transparent",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "all 0.2s",
                  }}
                >
                  {done && <span style={{ fontSize: 11, color: current.textColor, fontWeight: 900 }}>✓</span>}
                </div>

                <span
                  style={{
                    flex: 1,
                    fontSize: 13.5,
                    color: done ? "#444" : "#ccc",
                    textDecoration: done ? "line-through" : "none",
                    transition: "all 0.2s",
                    lineHeight: 1.4,
                  }}
                >
                  {item.topic}
                </span>

                <Badge priority={item.priority} />
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 16,
            fontSize: 12,
            color: "#444",
            justifyContent: "center",
            flexWrap: "wrap",
          }}
        >
          <span>
            <span style={{ color: "#ff4444", fontWeight: 700 }}>MUST</span> = asked in almost every interview
          </span>
          <span>
            <span style={{ color: "#555", fontWeight: 700 }}>GOOD</span> = bonus points
          </span>
        </div>
      </div>
    </div>
  );
}

