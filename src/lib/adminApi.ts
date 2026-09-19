import { API_URL } from "@/lib/api";

export const ADMIN_TOKEN_KEY = "pkf-admin-token";

export function getAdminToken() {
  return window.sessionStorage.getItem(ADMIN_TOKEN_KEY) ?? "";
}

export async function adminRequest<T>(path: string, init: RequestInit = {}) {
  const token = getAdminToken();
  if (!token) throw new Error("กรุณาเข้าสู่ระบบแอดมินก่อน");
  const headers = new Headers(init.headers);
  headers.set("Authorization", `Bearer ${token}`);
  if (init.body && !(init.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }
  const response = await fetch(`${API_URL}${path}`, { ...init, headers });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 401) window.sessionStorage.removeItem(ADMIN_TOKEN_KEY);
    throw new Error(data.message || "เชื่อมต่อระบบไม่สำเร็จ");
  }
  return data as T;
}
