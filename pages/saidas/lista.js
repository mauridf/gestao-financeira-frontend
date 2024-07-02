import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Menu from '../components/Menu';
import { UserContext } from '../context/UserContext';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

export default function ListaSaidas() {
  const [saidas, setSaidas] = useState([]);
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
      const response = await axios.get(`http://localhost:5182/api/Saida/Saidas/${userId}`);
      setSaidas(response.data);
    } catch (error) {
      console.error('Erro ao buscar saidas:', error);
    }
  };

  const handleDelete = async (usuarioId, saidaId) => {
    if (confirm('Tem certeza que deseja excluir esta saída?')) {
      try {
        await axios.delete(`http://localhost:5182/api/Saida/DeletarSaida/${usuarioId}/${saidaId}`);
        fetchData(); // Atualiza a lista após exclusão
      } catch (error) {
        console.error('Erro ao excluir saida:', error);
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
        <h1>Lista de Saídas</h1>
        <Link href="/saidas/novo">
          <button className="btn-register">
            <i className="bi bi-plus"></i> Registrar Saída
          </button>
        </Link>
        {saidas.length === 0 ? (
          <p>Nenhuma Saída Cadastrada</p>
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
                {saidas.map((saida) => (
                  <tr key={saida.saidaId}>
                    <td>{saida.saidaId}</td>
                    <td>{saida.descricao}</td>
                    <td>{saida.valor}</td>
                    <td>{new Date(saida.dataSaida).toLocaleDateString()}</td>
                    <td className="action-buttons">
                      <Link href={`/saidas/${saida.saidaId}`}>
                        <span className="action-icon">
                          <PencilSquare /> {/* Ícone de lápis para editar */}
                        </span>
                      </Link>{' '}
                      <span className="action-icon">
                        <Trash onClick={() => handleDelete(saida.usuarioId, saida.saidaId)} /> {/* Ícone de lixeira para excluir */}
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