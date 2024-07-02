import { useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Menu from '../components/Menu';
import { UserContext } from '../context/UserContext';

export default function RegistrarSaida() {
  const { userId } = useContext(UserContext);
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [dataSaida, setDataSaida] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const novaSaida = {
        descricao,
        valor: parseFloat(valor),
        dataSaida: new Date(dataSaida),
        usuarioId: userId,
      };
      await axios.post('http://localhost:5182/api/Saida/RegistrarSaida', novaSaida);
      router.push('/saidas/lista');
    } catch (error) {
      console.error('Erro ao registrar saida:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <Menu />
      </header>
      <div className="content">
        <h1>Registrar Saída</h1>
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
            <label htmlFor="dataSaida">Data</label>
            <input
              type="date"
              id="dataSaida"
              value={dataSaida}
              onChange={(e) => setDataSaida(e.target.value)}
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