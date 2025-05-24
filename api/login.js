export default async function handler(req, res) {
  console.log("Login API triggered");
  console.log("Method:", req.method);

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Langsung gunakan req.body (jangan pakai req.json())
  const { email, password, device, ip, location } = req.body;
  console.log("Parsed email:", email);
  console.log("Parsed password:", password);
  console.log("Device:", device);
  console.log("IP:", ip);
  console.log("Location:", location);

  try {
    const response = await fetch(process.env.VITE_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, device, ip, location }),
    });

    const data = await response.json();
    console.log("Response from Apps Script:", data);

    return res.status(200).json(data);
  } catch (err) {
    console.error('Proxy Error:', err);
    return res.status(500).json({ error: 'Proxy login failed' });
  }
}
