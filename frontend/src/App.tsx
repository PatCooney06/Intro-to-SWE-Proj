import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function Login() {
  return (
    <form style={{ maxWidth: 360, margin: "40px auto", display: "grid", gap: 8 }}>
      <h2>SmartFit Login</h2>
      <input placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button>Log in</button>
    </form>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <nav style={{ padding: 12, display: "flex", gap: 12 }}>
        <Link to="/">Home</Link>
        <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/" element={<div style={{ padding: 24 }}><h1>Home</h1></div>} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}
