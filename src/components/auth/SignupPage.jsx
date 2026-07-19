import { useState } from "react";
import Input from "../atoms/Input";
import { GoldBtn } from "../atoms/Button";
import { signup, isValidEmail } from "../../utils/auth";

/* ══════════════════════════════════════════════════════════════════════════
   AUTH — SignupPage
══════════════════════════════════════════════════════════════════════════ */
export default function SignupPage({ onSignup, onSwitchToLogin }) {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm]   = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !confirm) { setError("Please fill in all fields."); return; }
    if (!isValidEmail(email)) { setError("Please enter a valid email address."); return; }
    if (password.length < 6) { setError("Password must be at least 6 characters."); return; }
    if (password !== confirm) { setError("Passwords do not match."); return; }

    setLoading(true);
    try {
      const session = signup({ name, email, password });
      onSignup(session);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fade-up" style={{ padding: "64px 20px", minHeight: "60vh", display: "flex", alignItems: "center" }}>
      <div className="auth-card">
        <p style={{ fontSize: 11, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--gold)", fontWeight: 600, marginBottom: 8, textAlign: "center" }}>
          Join Luxe
        </p>
        <h1 className="serif" style={{ fontSize: 26, fontWeight: 700, marginBottom: 26, textAlign: "center" }}>
          Create your account
        </h1>

        <form onSubmit={handleSubmit}>
          <Input
            label="Full name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ayesha Khan"
            autoComplete="name"
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            autoComplete="email"
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            autoComplete="new-password"
          />
          <Input
            label="Confirm password"
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="••••••••"
            autoComplete="new-password"
          />

          {error && (
            <p className="field-error" style={{ marginBottom: 14, textAlign: "center" }}>{error}</p>
          )}

          <GoldBtn fullWidth disabled={loading} style={{ padding: 13, marginTop: 6 }}>
            {loading ? "Creating account…" : "Create account"}
          </GoldBtn>
        </form>

        <p style={{ textAlign: "center", fontSize: 13, color: "var(--muted)", marginTop: 22 }}>
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            style={{ background: "none", border: "none", cursor: "pointer", color: "var(--gold-d)", fontWeight: 600, fontSize: 13 }}
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
