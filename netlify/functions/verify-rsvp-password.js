// Server-side RSVP password verification — used to unlock registration after
// the deadline. Set RSVP_PASSWORD in the Netlify UI (no VITE_ prefix).
exports.handler = async function (event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Bad request' }) };
  }

  const { password } = body;
  const correct = process.env.RSVP_PASSWORD;

  if (!correct) {
    console.error('RSVP_PASSWORD environment variable is not set');
    return {
      statusCode: 500,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: 'Server configuration error' }),
    };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ authorized: password === correct }),
  };
};
