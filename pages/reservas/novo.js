import { useState, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Menu from '../components/Menu';
import { UserContext } from '../context/UserContext';

export default function RegistrarReserva() {
  const { userId } = useContext(UserContext);
  const [tipoReserva, setTipoReserva] = useState('');
  const [valor, setValor] = useState('');
  const [dataReserva, setDataReserva] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const novaReserva = {
        tipoReserva,
        valor: parseFloat(valor),
        dataReserva: new Date(dataReserva),
        usuarioId: userId,
      };
      await axios.post('http://localhost:5182/api/Reserva/RegistrarReserva', novaReserva);
      router.push('/reservas/lista');
    } catch (error) {
      console.error('Erro ao registrar reserva:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <Menu />
      </header>
      <div className="content">
        <h1>Registrar Reserva</h1>
        <form onSubmit={handleSubmit} className="form-registro">
          <div className="form-group">
            <label htmlFor="tipoReserva">Tipo de Reserva</label>
            <input
              type="text"
              id="tipoReserva"
              value={tipoReserva}
              onChange={(e) => setTipoReserva(e.target.value)}
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
            <label htmlFor="dataReserva">Data</label>
            <input
              type="date"
              id="dataReserva"
              value={dataReserva}
              onChange={(e) => setDataReserva(e.target.value)}
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