export default async function handler(req, res) {
  console.log("Login API triggered");
  console.log("Method:", req.method);
  console.log("Body received:", req.body);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // JANGAN pakai await req.json() → ini bukan fetch
  const { email, password } = req.body;
  console.log("Parsed email:", email);
  console.log("Parsed password:", password);

  try {
    const response = await fetch(process.env.VITE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    console.log("Response from Apps Script:", data);

    return res.status(200).json(data);
  } catch (err) {
    console.error('Proxy Error:', err);
    return res.status(500).json({ error: 'Proxy login failed' });
  }
}
