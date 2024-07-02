import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Menu from '../components/Menu';
import { UserContext } from '../context/UserContext';

export default function EditarEntrada() {
  const { userId } = useContext(UserContext);
  const router = useRouter();
  const { id } = router.query; // Obtém o ID da entrada da URL dinâmica
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [dataEntrada, setDataEntrada] = useState('');

  useEffect(() => {
    if (userId && id) {
      fetchEntrada();
    }
  }, [userId, id]);

  const fetchEntrada = async () => {
    try {
      console.log('UserId:', userId);
      const response = await axios.get(`http://localhost:5182/api/Entrada/Entrada/${userId}/${id}`);
      console.log('Dados recebidos do backend:', response.data);
      const entrada = response.data;
      setDescricao(entrada.descricao);
      setValor(entrada.valor);
      setDataEntrada(new Date(entrada.dataEntrada).toISOString().substr(0, 10)); // Formato yyyy-mm-dd para o input type date
    } catch (error) {
      console.error('Erro ao buscar entrada:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const entradaAtualizada = {
        entradaId: id,
        descricao,
        valor: parseFloat(valor),
        dataEntrada: new Date(dataEntrada),
        usuarioId: userId,
      };
      await axios.put(`http://localhost:5182/api/Entrada/EditarEntrada/${userId}/${id}`, entradaAtualizada);
      router.push('/entradas/lista');
    } catch (error) {
      console.error('Erro ao editar entrada:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <Menu />
      </header>
      <div className="content">
        <h1>Editar Entrada</h1>
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
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}