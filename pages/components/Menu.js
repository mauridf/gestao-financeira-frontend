import { useContext } from 'react';
import { useRouter } from 'next/router';
import { UserContext } from '../context/UserContext';

export default function Menu() {
  const { nomeUsuario, logout } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const menuStyle = {
    display: 'flex',
    gap: '10px',
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    cursor: 'pointer',
  };

  const activeLinkStyle = {
    color: 'white', // Cor dos links ativos (visitados)
    textDecoration: 'none', // Remover sublinhado dos links
    cursor: 'pointer',
  };

  return (
    <div className="menu" style={menuStyle}>
      {nomeUsuario ? (
        <>
          <a
            href="/dashboard"
            style={router.pathname === '/dashboard' ? activeLinkStyle : linkStyle}
          >
            Dashboard
          </a>
          <a
            href="/entradas/lista"
            style={router.pathname === '/entradas/lista' ? activeLinkStyle : linkStyle}
          >
            Entradas
          </a>
          <a
            href="/saidas/lista"
            style={router.pathname === '/saidas/lista' ? activeLinkStyle : linkStyle}
          >
            Saídas
          </a>
          <a
            href="/reservas/lista"
            style={router.pathname === '/reservas/lista' ? activeLinkStyle : linkStyle}
          >
            Reservas
          </a>
          <div className="user-info">
            <span>Bem-vindo, {nomeUsuario}!</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </>
      ) : (
        <>
          <a href="/" style={router.pathname === '/' ? activeLinkStyle : linkStyle}>Login</a>
          <a href="/usuarios/novo" style={router.pathname === '/usuarios/novo' ? activeLinkStyle : linkStyle}>Cadastro</a>
        </>
      )}
    </div>
  );
}