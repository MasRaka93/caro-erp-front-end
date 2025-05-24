export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ error: 'Method not allowed' });
    }
  
    try {
      const { token, userId, device, ip, location } = req.body;
  
      const response = await fetch(process.env.VITE_SCRIPT_URL + '?action=logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, userId, device, ip, location }),
      });
  
      const result = await response.json();
      return res.status(200).json(result);
    } catch (err) {
      console.error('Logout error:', err);
      return res.status(500).json({ error: 'Logout failed' });
    }
  }
  