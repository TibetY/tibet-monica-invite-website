// Server-side password verification — password never reaches the client bundle.
// GUESTLIST_PASSWORD is set in Netlify UI (without VITE_ prefix so Vite won't
// inject it into the JS bundle).
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
  const correct = process.env.GUESTLIST_PASSWORD;

  if (!correct) {
    console.error('GUESTLIST_PASSWORD environment variable is not set');
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
