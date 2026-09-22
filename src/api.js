const API_BASE_URL = '';

export async function submitRegistration(payload) {
  if (!API_BASE_URL.trim()) {
    return { connected: false };
  }

  const response = await fetch(`${API_BASE_URL.replace(/\/$/, '')}/api/registrations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error('Registration request failed');
  }

  return { connected: true, data: await response.json() };
}
