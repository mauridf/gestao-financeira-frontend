export default async (req, res) => {
    if (req.method === 'POST') {
      const { email, senha } = req.body;
  
      const response = await fetch('http://localhost:5182/api/usuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, senha })
      });
  
      if (response.ok) {
        const data = await response.json();
        res.status(200).json(data);
      } else {
        res.status(401).json({ error: 'Usuário inválido' });
      }
    } else {
      res.status(405).json({ error: 'Método não permitido' });
    }
  };
  