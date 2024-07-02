import React, { useState } from 'react';
import axios from 'axios';
import Menu from '../components/Menu';
import api from '../api/axiosConfig';


const RegisterUser = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmSenha, setConfirmSenha] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (senha !== confirmSenha) {
      setMessage('As senhas não coincidem');
      return;
    }

    try {
      const response = await api.post('/api/usuario/RegistrarUsuario', { nome, email, senha });
      setMessage('Usuário registrado com sucesso');
      setNome('');
      setEmail('');
      setSenha('');
      setConfirmSenha('');
    } catch (error) {
      console.error('Error registering user:', error);
      setMessage('Erro ao registrar usuário');
    }
  };

  return (
    <div className="container">
      <header className="header">
        <Menu />
      </header>
      <div className="register-container">
        <h2>Cadastro de Usuário</h2>
        {message && <p className="error-msg">{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Nome:</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Senha:</label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label>Confirmar Senha:</label>
            <input
              type="password"
              value={confirmSenha}
              onChange={(e) => setConfirmSenha(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-register">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterUser;