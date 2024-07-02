import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from './context/UserContext';
import Menu from './components/Menu';

export default function Home() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { login } = useContext(UserContext); // Usando o contexto de usuário

  const handleLogin = async (e) => {
    e.preventDefault();

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, senha })
    });

    if (res.ok) {
      const data = await res.json();
      login(data.nome, data.usuarioId); // Chama a função login do contexto

      router.push('/dashboard');
    } else {
      setError('Usuário inválido');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <Menu />
      </header>
      <div className="login-container">
        <h1>Login</h1>
        <form onSubmit={handleLogin}>
          <div className="form-control">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-control">
            <input
              type="password"
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-login">Entrar</button>
        </form>
        {error && <p className="error-msg">{error}</p>}
      </div>
    </div>
  );
}