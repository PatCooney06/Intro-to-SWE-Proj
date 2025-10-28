import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { AuthProvider } from "./auth/AuthProvider";
import Protected from "./auth/Protected";
import Login from "./pages/Login";

function Dashboard() {
  return (
    <div style={{ maxWidth: 640, margin: "40px auto" }}>
      <h1>SmartFit Dashboard</h1>
      <p>Private area</p>
    </div>
  );
}

function Home() {
  return (
    <div style={{ maxWidth: 640, margin: "40px auto" }}>
      <h1>SmartFit</h1>
      <Link to="/login">Login</Link>
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <nav style={{ display: "flex", gap: 12, padding: 12 }}>
          <Link to="/">Home</Link>
          <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Protected><Dashboard/></Protected>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/home" element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
