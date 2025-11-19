import { createContext, useContext, useMemo, useState } from "react";
import { api } from "../api/client";

type User = { id: string; email: string; name: string };

type Ctx = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    return JSON.parse(localStorage.getItem("sf_user") || "null");
  });
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("sf_token");
  });

  async function login(email: string, password: string) {
    const res = await api.login({ email, password });
    setUser(res.user);
    setToken(res.accessToken);
    localStorage.setItem("sf_user", JSON.stringify(res.user));
    localStorage.setItem("sf_token", res.accessToken);
  }

  async function register(name: string, email: string, password: string) {
    const { accessToken, user } = await api.register({ name, email, password });
    setUser(user);
    setToken(accessToken);
    localStorage.setItem("sf_user", JSON.stringify(user));
    localStorage.setItem("sf_token", accessToken);
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("sf_user");
    localStorage.removeItem("sf_token");
  }

  const value = useMemo(() => ({ user, token, login, register, logout }), [user, token]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
