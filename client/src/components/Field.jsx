export default function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  error,
  autoComplete,
  disabled,
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, color: "#9ca3af", fontWeight: 700 }}>
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        autoComplete={autoComplete}
        disabled={disabled}
        style={{
          width: "100%",
          background: "#0f0f0f",
          color: "#fff",
          borderRadius: 12,
          border: `1px solid ${error ? "#ff4444" : "#242424"}`,
          padding: "12px 12px",
          outline: "none",
          fontSize: 14,
          boxShadow: error ? "0 0 0 3px #ff44441f" : "none",
        }}
      />
      {error ? (
        <div style={{ color: "#ff6655", fontSize: 12, fontWeight: 650 }}>
          {error}
        </div>
      ) : null}
    </div>
  );
}

