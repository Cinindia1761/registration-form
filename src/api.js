const API_BASE_URL = '';

function isPreviewMode() {
  return new URLSearchParams(window.location.search).get('preview') === 'success';
}

export async function submitRegistration(payload) {
  if (!API_BASE_URL.trim()) {
    // This provides an explicit front-end-only test path. It never sends or stores data.
    if (isPreviewMode()) return { connected: true, preview: true };
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
