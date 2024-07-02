import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Menu from '../components/Menu';
import { UserContext } from '../context/UserContext';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

export default function ListaReservas() {
  const [reservas, setReservas] = useState([]);
  const router = useRouter();
  const { userId } = useContext(UserContext);

  useEffect(() => {
    if (!userId) {
      // Se userId não estiver definido, redirecione para a página de login
      //router.push('/dashboard');
    } else {
      fetchData();
    }
  }, [userId]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:5182/api/Reserva/Reservas/${userId}`);
      setReservas(response.data);
    } catch (error) {
      console.error('Erro ao buscar reservas:', error);
    }
  };

  const handleDelete = async (usuarioId, reservaId) => {
    if (confirm('Tem certeza que deseja excluir esta reserva?')) {
      try {
        await axios.delete(`http://localhost:5182/api/Reserva/DeletarReserva/${usuarioId}/${reservaId}`);
        fetchData(); // Atualiza a lista após exclusão
      } catch (error) {
        console.error('Erro ao excluir reserva:', error);
      }
    }
  };

  // Renderiza um loader ou uma mensagem enquanto o userId não está disponível
  if (!userId) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="dashboard-container">
      <header className="header">
        <Menu />
      </header>
      <div className="content">
        <h1>Lista de Reservas</h1>
        <Link href="/reservas/novo">
          <button className="btn-register">
            <i className="bi bi-plus"></i> Registrar Reserva
          </button>
        </Link>
        {reservas.length === 0 ? (
          <p>Nenhuma Reserva Cadastrada</p>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Descrição</th>
                  <th>Valor</th>
                  <th>Data</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {reservas.map((reserva) => (
                  <tr key={reserva.reservaId}>
                    <td>{reserva.reservaId}</td>
                    <td>{reserva.tipoReserva}</td>
                    <td>{reserva.valor}</td>
                    <td>{new Date(reserva.dataReserva).toLocaleDateString()}</td>
                    <td className="action-buttons">
                      <Link href={`/reservas/${reserva.reservaId}`}>
                        <span className="action-icon">
                          <PencilSquare /> {/* Ícone de lápis para editar */}
                        </span>
                      </Link>{' '}
                      <span className="action-icon">
                        <Trash onClick={() => handleDelete(reserva.usuarioId, reserva.reservaId)} /> {/* Ícone de lixeira para excluir */}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}