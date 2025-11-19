import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { globalStyles, PRIMARY_COLOR, LIGHT_GREY, TEXT_COLOR } from "../styles";

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

    if (!email.includes("@") || password.length < 6) {
      setErr("Check your email and password.");
      return;
    }

    setLoading(true);
    try {
      await login(email, password); 
      nav("/"); 
    } catch (e: any) {
      setErr(e?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  const loginButtonStyles = {
    ...globalStyles.button,
    ...(loading ? globalStyles.buttonDisabled : {}),
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        backgroundColor: LIGHT_GREY,
      }}
    >
      <div style={{ ...globalStyles.card, margin: "auto" }}>
        <h2
          style={{
            fontSize: "28px",
            color: TEXT_COLOR,
            marginBottom: "5px",
          }}
        >
          SmartFit
        </h2>

        <p style={{ color: "#757575", marginBottom: "25px", fontSize: "16px" }}>
          Welcome back! Log in to your account
        </p>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: "10px" }}>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            style={globalStyles.input}
          />
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            style={globalStyles.input}
          />

          {err && (
            <div
              style={{
                color: "crimson",
                fontSize: "14px",
                marginTop: "10px",
              }}
            >
              {err}
            </div>
          )}

          <button disabled={loading} style={loginButtonStyles}>
            {loading ? "Logging in..." : "Log In"}
          </button>
        </form>

        <p style={{ marginTop: "20px", color: "#757575" }}>
          Don’t have an account?
          <a
            href="/signup"
            style={{
              color: PRIMARY_COLOR,
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            {" "}
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
