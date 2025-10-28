function delay<T>(v: T, ms = 300) { return new Promise<T>(r => setTimeout(() => r(v), ms)); }
type U = { id: string; name: string; email: string; password: string };
let users: U[] = JSON.parse(localStorage.getItem("sf_mock_users") || "[]");
function save() { localStorage.setItem("sf_mock_users", JSON.stringify(users)); }

export const mockApi = {
  async login(body: { email: string; password: string }) {
    const u = users.find(x => x.email === body.email && x.password === body.password);
    if (!u) throw { status: 401, data: { error: "INVALID_CREDENTIALS" } };
    return delay({ accessToken: "mock-" + u.id, user: { id: u.id, email: u.email, name: u.name } });
  },
  async register(body: { name: string; email: string; password: string }) {
    if (users.find(u => u.email === body.email)) throw { status: 409, data: { error: "EMAIL_TAKEN" } };
    const u = { id: crypto.randomUUID(), ...body }; users.push(u); save();
    return delay({ id: u.id, email: u.email, name: u.name });
  },
};
