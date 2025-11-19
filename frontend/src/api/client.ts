const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";

async function fetchJSON(path: string, opts: RequestInit = {}) {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json", ...(opts.headers || {}) },
    ...opts,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw { status: res.status, data };
  return data;
}

export const api = {
  login(body: { email: string; password: string }) {
    return fetchJSON("/auth/login", { method: "POST", body: JSON.stringify(body) });
  },
  register(body: { name: string; email: string; password: string }) {
    return fetchJSON("/auth/register", { method: "POST", body: JSON.stringify(body) });
  },
};
