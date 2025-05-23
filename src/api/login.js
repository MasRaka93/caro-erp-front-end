export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    const { email, password } = req.body;
  
    try {
      const response = await fetch(process.env.VITE_SCRIPT_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      return res.status(200).json(data);
    } catch (err) {
      console.error('Proxy Error:', err);
      return res.status(500).json({ error: 'Proxy login failed' });
    }
  }
  