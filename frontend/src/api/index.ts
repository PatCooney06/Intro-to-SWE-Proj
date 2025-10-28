import { realApi } from "./client";
import { mockApi } from "./mock";
const USE_MOCK = import.meta.env.VITE_USE_MOCK === "true";
export const api = USE_MOCK ? mockApi : realApi;
