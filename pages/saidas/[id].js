import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import Menu from '../components/Menu';
import { UserContext } from '../context/UserContext';

export default function EditarSaida() {
  const { userId } = useContext(UserContext);
  const router = useRouter();
  const { id } = router.query; // Obtém o ID da saida da URL dinâmica
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [dataSaida, setDataSaida] = useState('');

  useEffect(() => {
    if (userId && id) {
      fetchSaida();
    }
  }, [userId, id]);

  const fetchSaida = async () => {
    try {
      console.log('UserId:', userId);
      const response = await axios.get(`http://localhost:5182/api/Saida/Saida/${userId}/${id}`);
      console.log('Dados recebidos do backend:', response.data);
      const saida = response.data;
      setDescricao(saida.descricao);
      setValor(saida.valor);
      setDataSaida(new Date(saida.dataSaida).toISOString().substr(0, 10)); // Formato yyyy-mm-dd para o input type date
    } catch (error) {
      console.error('Erro ao buscar saida:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const saidaAtualizada = {
        saidaId: id,
        descricao,
        valor: parseFloat(valor),
        dataSaida: new Date(dataSaida),
        usuarioId: userId,
      };
      await axios.put(`http://localhost:5182/api/Saida/EditarSaida/${userId}/${id}`, saidaAtualizada);
      router.push('/saidas/lista');
    } catch (error) {
      console.error('Erro ao editar saida:', error);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <Menu />
      </header>
      <div className="content">
        <h1>Editar Saida</h1>
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
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
}