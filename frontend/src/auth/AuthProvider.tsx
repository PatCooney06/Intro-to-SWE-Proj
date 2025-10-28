import { createContext, useContext, useMemo, useState } from "react";
import { api } from "../api";

type User = { id: string; email: string; name: string };
type Ctx = {
  user: User | null;
  token: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const C = createContext<Ctx | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => JSON.parse(localStorage.getItem("sf_user") || "null"));
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("sf_token"));

  async function login(email: string, password: string) {
    const { accessToken, user } = await api.login({ email, password });
    setUser(user);
    setToken(accessToken);
    localStorage.setItem("sf_user", JSON.stringify(user));
    localStorage.setItem("sf_token", accessToken);
  }

  async function register(name: string, email: string, password: string) {
    await api.register({ name, email, password });
    await login(email, password);
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem("sf_user");
    localStorage.removeItem("sf_token");
  }

  const value = useMemo(() => ({ user, token, login, register, logout }), [user, token]);
  return <C.Provider value={value}>{children}</C.Provider>;
}

export function useAuth() {
  const v = useContext(C);
  if (!v) throw new Error("useAuth must be used within AuthProvider");
  return v;
}
