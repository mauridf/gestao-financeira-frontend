import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Menu from '../components/Menu';
import { UserContext } from '../context/UserContext';
import { PencilSquare, Trash } from 'react-bootstrap-icons';

export default function ListaEntradas() {
  const [entradas, setEntradas] = useState([]);
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
      const response = await axios.get(`http://localhost:5182/api/Entrada/Entradas/${userId}`);
      setEntradas(response.data);
    } catch (error) {
      console.error('Erro ao buscar entradas:', error);
    }
  };

  const handleDelete = async (usuarioId, entradaId) => {
    if (confirm('Tem certeza que deseja excluir esta entrada?')) {
      try {
        await axios.delete(`http://localhost:5182/api/Entrada/DeletarEntrada/${usuarioId}/${entradaId}`);
        fetchData(); // Atualiza a lista após exclusão
      } catch (error) {
        console.error('Erro ao excluir entrada:', error);
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
        <h1>Lista de Entradas</h1>
        <Link href="/entradas/novo">
          <button className="btn-register">
            <i className="bi bi-plus"></i> Registrar Entrada
          </button>
        </Link>
        {entradas.length === 0 ? (
          <p>Nenhuma Entrada Cadastrada</p>
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
                {entradas.map((entrada) => (
                  <tr key={entrada.entradaId}>
                    <td>{entrada.entradaId}</td>
                    <td>{entrada.descricao}</td>
                    <td>{entrada.valor}</td>
                    <td>{new Date(entrada.dataEntrada).toLocaleDateString()}</td>
                    <td className="action-buttons">
                      <Link href={`/entradas/${entrada.entradaId}`}>
                        <span className="action-icon">
                          <PencilSquare /> {/* Ícone de lápis para editar */}
                        </span>
                      </Link>{' '}
                      <span className="action-icon">
                        <Trash onClick={() => handleDelete(entrada.usuarioId, entrada.entradaId)} /> {/* Ícone de lixeira para excluir */}
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