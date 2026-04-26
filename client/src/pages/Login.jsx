import { useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Field from "../components/Field.jsx";
import { apiRequest } from "../lib/api.js";
import { setAuth } from "../lib/authStorage.js";

function mapServerMessageToField(message = "") {
  const m = String(message).toLowerCase();
  if (m.includes("not registered") || m.includes("register")) return { email: message };
  if (m.includes("invalid credentials") || m.includes("password")) return { password: message };
  if (m.includes("no token")) return { form: message };
  return { form: message };
}

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = useMemo(() => location.state?.from?.pathname || "/", [location.state]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "", form: "" });

  const onSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = { email: "", password: "", form: "" };
    if (!email.trim()) nextErrors.email = "Email is required";
    if (!password) nextErrors.password = "Password is required";
    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) return;

    try {
      setSubmitting(true);
      setErrors({ email: "", password: "", form: "" });

      const data = await apiRequest("/api/auth/login", {
        method: "POST",
        body: { email: email.trim(), password },
      });

      setAuth({ token: data?.token, user: data?.user });
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err?.message || "Login failed";
      setErrors((prev) => ({ ...prev, ...mapServerMessageToField(msg) }));
    } finally {
      setSubmitting(false);
    }
  };

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
      <div style={{ maxWidth: 420, margin: "0 auto" }}>
        <div
          style={{
            background: "#141414",
            borderRadius: 16,
            border: "1px solid #1e1e1e",
            padding: 18,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 10 }}>
            <h1 style={{ margin: 0, fontSize: 22, fontWeight: 850, letterSpacing: "-0.3px", color: "#fff" }}>
              Login
            </h1>
            <Link to="/" style={{ color: "#F7DF1E", textDecoration: "none", fontSize: 12, fontWeight: 800 }}>
              Back to Home
            </Link>
          </div>
          <p style={{ margin: "6px 0 0", color: "#666", fontSize: 13 }}>
            Use your email + password to continue.
          </p>

          <form onSubmit={onSubmit} style={{ display: "flex", flexDirection: "column", gap: 12, marginTop: 14 }}>
            <Field
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              error={errors.email}
              disabled={submitting}
            />
            <Field
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              autoComplete="current-password"
              error={errors.password}
              disabled={submitting}
            />

            {errors.form ? (
              <div
                style={{
                  background: "#1a0f0f",
                  border: "1px solid #3a1a1a",
                  color: "#ff6655",
                  padding: "10px 12px",
                  borderRadius: 12,
                  fontSize: 12,
                  fontWeight: 650,
                }}
              >
                {errors.form}
              </div>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              style={{
                marginTop: 4,
                width: "100%",
                padding: "12px 12px",
                borderRadius: 12,
                border: "none",
                cursor: submitting ? "not-allowed" : "pointer",
                fontWeight: 900,
                letterSpacing: "0.2px",
                background: "linear-gradient(90deg, #F7DF1E, #ff4444)",
                color: "#0c0c0c",
                boxShadow: "0 0 18px #F7DF1E22",
                opacity: submitting ? 0.8 : 1,
              }}
            >
              {submitting ? "Logging in..." : "Login"}
            </button>

            <div style={{ marginTop: 6, fontSize: 12, color: "#666" }}>
              Don’t have an account yet?{" "}
              <span style={{ color: "#888" }}>Register UI can be added next.</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

