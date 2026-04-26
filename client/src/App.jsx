import { Link, Route, Routes, useLocation } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import { clearAuth, getToken, getUser } from "./lib/authStorage.js";

function TopBar() {
  const location = useLocation();
  const user = getUser();
  const token = getToken();
  const authed = Boolean(token);

  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "linear-gradient(180deg, #0c0c0c 70%, rgba(12,12,12,0))",
        padding: "12px 16px 10px",
      }}
    >
      <div style={{ maxWidth: 660, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
        <Link
          to="/"
          style={{
            textDecoration: "none",
            color: "#fff",
            fontWeight: 900,
            letterSpacing: "-0.3px",
            fontSize: 13,
          }}
        >
          MERN Prep
        </Link>

        <div style={{ flex: 1 }} />

        {authed ? (
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ fontSize: 12, color: "#777" }}>
              {user?.email ? `Signed in: ${user.email}` : "Signed in"}
            </div>
            <button
              onClick={() => {
                clearAuth();
                if (location.pathname === "/login") return;
                window.location.reload();
              }}
              style={{
                padding: "8px 12px",
                borderRadius: 12,
                border: "1px solid #2a2a2a",
                background: "#141414",
                color: "#F7DF1E",
                cursor: "pointer",
                fontWeight: 850,
                fontSize: 12,
              }}
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            to="/login"
            state={{ from: location }}
            style={{
              padding: "8px 12px",
              borderRadius: 12,
              border: "1px solid #2a2a2a",
              background: "#141414",
              color: "#F7DF1E",
              textDecoration: "none",
              fontWeight: 850,
              fontSize: 12,
            }}
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div style={{ minHeight: "100vh", background: "#0c0c0c" }}>
      <TopBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
}
