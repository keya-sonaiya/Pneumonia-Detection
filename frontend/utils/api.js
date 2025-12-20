const API_URL = "http://localhost:8000";

export async function callPredict(file) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_URL}/predict/`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) throw new Error("Prediction API error");

  return res.json();
}

export async function callOcclusion(file) {
  const form = new FormData();
  form.append("file", file);

  const res = await fetch(`${API_URL}/explain/occlusion`, {
    method: "POST",
    body: form,
  });

  if (!res.ok) throw new Error("Occlusion API error");

  return res.json();
}