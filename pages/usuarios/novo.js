import React from 'react';
import RegisterUser from '../components/RegisterUser';

const NovoUsuario = () => {
  // Verifique o estado de login e obtenha o nome de usuário
  let isLoggedIn = false;
  let username = '';

  if (typeof window !== 'undefined') {
    isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    username = localStorage.getItem('username') || '';
  }

  return (
    <div>
      <RegisterUser isLoggedIn={isLoggedIn} username={username} />
    </div>
  );
};

export default NovoUsuario;