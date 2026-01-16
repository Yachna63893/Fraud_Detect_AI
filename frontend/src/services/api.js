const BASE =
  import.meta.env.VITE_API_BASE || "http://127.0.0.1:8000/api";

const CHAT_BASE =
  import.meta.env.VITE_CHAT_BASE || "http://127.0.0.1:5000";

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`GET ${path} failed`);
  return res.json();
}

async function post(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`POST ${path} failed: ${res.status} ${txt}`);
  }

  return res.json();
}

async function chatPost(path, body) {
  const url = `${CHAT_BASE}${path}`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const txt = await res.text().catch(() => "");
    throw new Error(`CHAT POST ${path} failed: ${res.status} ${txt}`);
  }

  return res.json();
}

export default { get, post, chatPost, BASE, CHAT_BASE };
