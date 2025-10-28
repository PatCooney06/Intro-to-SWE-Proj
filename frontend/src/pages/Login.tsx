import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";

export default function Login() {
  const { login } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!email.includes("@") || password.length < 6) { setErr("Check your email and password."); return; }
    setLoading(true);
    try { await login(email, password); nav("/"); }
    catch (e: any) { setErr(e?.data?.error || "Login failed"); }
    finally { setLoading(false); }
  }

  return (
    <form onSubmit={onSubmit} style={{ maxWidth: 360, margin: "40px auto", display: "grid", gap: 8 }}>
      <h2>SmartFit Login</h2>
      <input value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" />
      <input value={password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="Password" />
      {err && <div style={{ color: "crimson", fontSize: 12 }}>{err}</div>}
      <button disabled={loading}>{loading ? "Logging in..." : "Log in"}</button>
    </form>
  );
}
