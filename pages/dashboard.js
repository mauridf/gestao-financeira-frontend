import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Menu from './components/Menu';
import { UserContext } from './context/UserContext'; // Importe o UserContext

export default function Dashboard() {
  const { userId } = useContext(UserContext); // Use o useContext para acessar o userId do UserContext

  const [entradas, setEntradas] = useState(0);
  const [saidas, setSaidas] = useState(0);
  const [saldo, setSaldo] = useState(0);
  const [reserva, setReserva] = useState(0);
  const [reservasUsadas, setReservasUsadas] = useState(0);

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;

  const [anoInicio, setAnoInicio] = useState(currentYear);
  const [mesInicio, setMesInicio] = useState(currentMonth);
  const [anoFim, setAnoFim] = useState(currentYear);
  const [mesFim, setMesFim] = useState(currentMonth);

  const fetchData = async (anoInicio, mesInicio, anoFim, mesFim, usuarioId) => {
    try {
      console.log('Parâmetros enviados na requisição:', {
        usuarioId: parseInt(usuarioId),
        mesInicio: mesInicio,
        anoInicio: anoInicio,
        mesFim: mesFim,
        anoFim: anoFim,
      });
  
      const response = await axios.get('http://localhost:5182/api/Dashboard/Resumo', {
        params: {
          usuarioId: parseInt(usuarioId),
          mesInicio: mesInicio,
          anoInicio: anoInicio,
          mesFim: mesFim,
          anoFim: anoFim,
        },
      });
  
      console.log('Dados recebidos do backend:', response.data); // Debug para verificar os dados recebidos
  
      const data = response.data;
      setEntradas(data.totalEntradas);
      setSaidas(data.totalSaidas);
      setSaldo(data.saldo);
      setReserva(data.totalReservas);
      setReservasUsadas(data.totalReservasUsadas);
    } catch (error) {
      console.error('Erro ao buscar dados da API:', error);
    }
  };   

  useEffect(() => {
    console.log('userId no useEffect:', userId); // Debug para verificar o valor de userId
    fetchData(anoInicio, mesInicio, anoFim, mesFim, userId);
  }, [userId, anoInicio, mesInicio, anoFim, mesFim]); // Certifique-se de colocar todas as dependências

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('userId ao submeter o formulário:', userId); // Debug para verificar o valor de userId ao submeter o formulário
    fetchData(anoInicio, mesInicio, anoFim, mesFim, userId);
  };  

  return (
    <div className="dashboard-container">
      <header className="header">
        <Menu />
      </header>
      <div className="content">
        <h1>Dashboard</h1>
        <p>Período de referência: {anoInicio}/{mesInicio} - {anoFim}/{mesFim}</p>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              Mês Início:
              <input
                type="number"
                value={mesInicio}
                onChange={(e) => setMesInicio(parseInt(e.target.value))}
                min="1"
                max="12"
              />
            </label>
            <label>
              Ano Início:
              <input
                type="number"
                value={anoInicio}
                onChange={(e) => setAnoInicio(parseInt(e.target.value))}
                min="2000"
              />
            </label>
          </div>
          <div>
            <label>
              Mês Fim:
              <input
                type="number"
                value={mesFim}
                onChange={(e) => setMesFim(parseInt(e.target.value))}
                min="1"
                max="12"
              />
            </label>
            <label>
              Ano Fim:
              <input
                type="number"
                value={anoFim}
                onChange={(e) => setAnoFim(parseInt(e.target.value))}
                min="2000"
              />
            </label>
          </div>
          <button type="submit">Carregar Dashboard</button>
        </form>
        <div className="info-card">
          <p>Total Entradas: {entradas}</p>
          <p>Total Saídas: {saidas}</p>
          <p>Saldo: {saldo}</p>
          <p>Total Reservas: {reserva}</p>
          <p>Total Reservas Usadas: {reservasUsadas}</p>
        </div>
      </div>
    </div>
  );
}