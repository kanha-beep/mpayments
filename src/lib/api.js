const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || "http://localhost:4000").replace(/\/+$/, "");
const TOKEN_KEY = "dashboard_session_token";
const API_TOKEN_KEY = "dashboard_api_token";

function getStoredToken() {
  return window.localStorage.getItem(TOKEN_KEY);
}

function setStoredToken(token) {
  if (token) {
    window.localStorage.setItem(TOKEN_KEY, token);
  }
}

function setApiToken(token) {
  if (token) {
    window.localStorage.setItem(API_TOKEN_KEY, token);
  }
}

export function clearSession() {
  window.localStorage.removeItem(TOKEN_KEY);
  window.localStorage.removeItem(API_TOKEN_KEY);
}

export function hasSession() {
  return Boolean(getStoredToken());
}

export function getMerchantApiToken() {
  return window.localStorage.getItem(API_TOKEN_KEY) || "";
}

export async function loginRequest(credentials) {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(credentials),
  });

  const data = await response.json().catch(() => ({ message: "Login failed" }));

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  setStoredToken(data.token);
  setApiToken(data.merchant?.apiToken);
  return data;
}

export async function fetchMe() {
  return authFetch("/api/auth/me");
}

export async function authFetch(path, options = {}) {
  const token = getStoredToken();

  if (!token) {
    const error = new Error("Unauthorized");
    error.code = 401;
    throw error;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.status === 401) {
    clearSession();
    const error = new Error("Unauthorized");
    error.code = 401;
    throw error;
  }

  const data = await response.json().catch(() => ({ message: "Request failed" }));

  if (!response.ok) {
    throw new Error(data.message || "Request failed");
  }

  return data;
}

export async function publicApiFetch(path, body) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  return response.json();
}

export { API_BASE_URL };
