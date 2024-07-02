import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Menu from '../components/Menu';
import { UserContext } from '../context/UserContext';

export default function EditarReserva() {
  const { userId } = useContext(UserContext);
  const router = useRouter();
  const { id } = router.query; // Obtém o ID da reserva da URL dinâmica
  const [tipoReserva, setTipoReserva] = useState('');
  const [valor, setValor] = useState('');
  const [dataReserva, setDataReserva] = useState('');

  useEffect(() => {
    if (userId && id) {
      fetchReserva();
    }
  }, [userId, id]);

  const fetchReserva = async () => {
    try {
      console.log('UserId:', userId);
      const response = await axios.get(`http://localhost:5182/api/Reserva/Reserva/${userId}/${id}`);
      console.log('Dados recebidos do backend:', response.data);
      const reserva = response.data;
      setTipoReserva(reserva.tipoReserva);
      setValor(reserva.valor);
      setDataReserva(new Date(reserva.dataReserva).toISOString().substr(0, 10)); // Formato yyyy-mm-dd para o input type date
    } catch (error) {
      console.error('Erro ao buscar reserva:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const reservaAtualizada = {
        reservaId: id,
        tipoReserva,
        valor: parseFloat(valor),
        dataReserva: new Date(dataReserva),
        usuarioId: userId,
      };
      await axios.put(`http://localhost:5182/api/Reserva/EditarReserva/${userId}/${id}`, reservaAtualizada);
      router.push('/reservas/lista');
    } catch (error) {
      console.error('Erro ao editar reserva:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <Menu />
      </header>
      <div className="content">
        <h1>Editar Reserva</h1>
        <form onSubmit={handleSubmit} className="form-registro">
          <div className="form-group">
            <label htmlFor="descricao">Tipo de Reserva</label>
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
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}