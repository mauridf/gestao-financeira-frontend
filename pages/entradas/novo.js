import { useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Menu from '../components/Menu';
import { UserContext } from '../context/UserContext';

export default function RegistrarEntrada() {
  const { userId } = useContext(UserContext);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [dataEntrada, setDataEntrada] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const novaEntrada = {
        descricao,
        valor: parseFloat(valor),
        dataEntrada: new Date(dataEntrada),
        usuarioId: userId,
      };
      await axios.post('http://localhost:5182/api/Entrada/RegistrarEntrada', novaEntrada);
      router.push('/entradas/lista');
    } catch (error) {
      console.error('Erro ao registrar entrada:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <Menu />
      </header>
      <div className="content">
        <h1>Registrar Entrada</h1>
        <form onSubmit={handleSubmit} className="form-registro">
          <div className="form-group">
            <label htmlFor="descricao">Descrição</label>
            <input
              type="text"
              id="descricao"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="form-control input-padrao"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="valor">Valor</label>
            <input
              type="number"
              id="valor"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              className="form-control input-padrao"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="dataEntrada">Data</label>
            <input
              type="date"
              id="dataEntrada"
              value={dataEntrada}
              onChange={(e) => setDataEntrada(e.target.value)}
              className="form-control input-padrao"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary btn-padrao">
            Registrar
          </button>
        </form>
      </div>
    </div>
  );
}