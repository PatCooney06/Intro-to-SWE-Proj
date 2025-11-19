import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthProvider";
import { globalStyles, PRIMARY_COLOR, LIGHT_GREY, TEXT_COLOR } from "../styles";

export default function SignUp() {
  const { register } = useAuth(); 
  const nav = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");

    if (!name.trim()) {
      setErr("Please enter your full name.");
      return;
    }
    if (!email.includes("@")) {
      setErr("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setErr("Password must be at least 6 characters long.");
      return;
    }
    if (password !== confirmPassword) {
      setErr("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      await register(name.trim(), email.trim(), password);
      nav("/"); 
    } catch (e: any) {
      setErr(e?.data?.error || "Registration failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const signupButtonStyles = {
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
          Create your account to get started
        </p>

        <form onSubmit={onSubmit} style={{ display: "grid", gap: "10px" }}>
          <label
            style={{
              textAlign: "left",
              fontSize: "14px",
              fontWeight: "600",
              color: TEXT_COLOR,
            }}
          >
            Full Name
          </label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            style={globalStyles.input}
            type="text"
          />
          <label
            style={{
              textAlign: "left",
              fontSize: "14px",
              fontWeight: "600",
              color: TEXT_COLOR,
            }}
          >
            Email
          </label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            style={globalStyles.input}
            type="email"
          />

          <label
            style={{
              textAlign: "left",
              fontSize: "14px",
              fontWeight: "600",
              color: TEXT_COLOR,
            }}
          >
            Password
          </label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
            style={globalStyles.input}
          />

          <label
            style={{
              textAlign: "left",
              fontSize: "14px",
              fontWeight: "600",
              color: TEXT_COLOR,
            }}
          >
            Confirm Password
          </label>
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="********"
            style={globalStyles.input}
          />

          {err && (
            <div
              style={{ color: "crimson", fontSize: "14px", marginTop: "10px" }}
            >
              {err}
            </div>
          )}

          <button disabled={loading} style={signupButtonStyles}>
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>

        <p style={{ marginTop: "20px", color: "#757575" }}>
          Already have an account?
          <Link
            to="/login"
            style={{
              color: PRIMARY_COLOR,
              textDecoration: "none",
              fontWeight: "600",
            }}
          >
            {" "}
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
