import React, { useEffect, useState } from 'react';
import api from '../services/api';
import './Dashboard.css';
import { FaHotel, FaBed, FaCalendarCheck } from 'react-icons/fa';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line, Bar, Pie } from 'react-chartjs-2';

// Registrar los componentes de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement, //  Asegúrate de registrar PointElement
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const [reservas, setReservas] = useState([]);
  const [habitaciones, setHabitaciones] = useState([]);
  const [reservasVigentes, setReservasVigentes] = useState(0);
  const [alerta, setAlerta] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reservasResponse = await api.get('/reservas');
        const habitacionesResponse = await api.get('/habitacion');

        setReservas(reservasResponse.data);
        setHabitaciones(habitacionesResponse.data);

        const fechaActual = new Date();
        const reservasActivas = reservasResponse.data.filter((reserva) => {
          const fechaEntrada = new Date(reserva.fechaEntrada);
          const fechaSalida = new Date(reserva.fechaSalida);
          return fechaEntrada <= fechaActual && fechaSalida > fechaActual;
        });

        setReservasVigentes(reservasActivas.length);
        /* Alerta de sobre venta reservas activas mayor que habitaciones total */
        if (reservasActivas.length > habitacionesResponse.data.length) {
          setAlerta(
            `¡Alerta de sobreventa! Hay ${
              reservasActivas.length - habitacionesResponse.data.length
            } reservas activas más que habitaciones disponibles.`
          );
        } else {
          setAlerta('');
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };

    fetchData();
  }, []);

  // Filtrar reservas por año de creación
  const reservas2024 = reservas.filter((reserva) => {
    const fechaCreacion = new Date(reserva.createdAt);
    return fechaCreacion.getFullYear() === 2024;
  });

  const reservas2025 = reservas.filter((reserva) => {
    const fechaCreacion = new Date(reserva.createdAt);
    return fechaCreacion.getFullYear() === 2025;
  });

 // Calcular reservas por tipo de habitación
const reservasPorTipo = reservas.reduce((acc, reserva) => {
  if (reserva.habitacion && reserva.habitacion.tipo) {
    acc[reserva.habitacion.tipo] = (acc[reserva.habitacion.tipo] || 0) + 1;
  }
  return acc;
}, {});

  // Calcular reservas por estado
  const reservasPorEstado = reservas.reduce((acc, reserva) => {
    acc[reserva.estado] = (acc[reserva.estado] || 0) + 1;
    return acc;
  }, {});

  // Datos para el gráfico de barras
  const barChartData = {
    labels: Object.keys(reservasPorTipo),
    datasets: [
      {
        label: 'Reservas por Tipo de Habitación',
        data: Object.values(reservasPorTipo),
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  // Datos para el gráfico de pastel
  const pieChartData = {
    labels: Object.keys(reservasPorEstado),
    datasets: [
      {
        label: 'Reservas por Estado',
        data: Object.values(reservasPorEstado),
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56', '#4BC0C0', '#9966FF'],
      },
    ],
  };

  // Función para calcular reservas por mes
  const calcularReservasPorMes = (reservas) => {
    const reservasPorMes = reservas.reduce((acc, reserva) => {
      const mes = new Date(reserva.createdAt).getMonth();
      acc[mes] = (acc[mes] || 0) + 1;
      return acc;
    }, {});

    const mesesCompletos = Array(12).fill(0);
    Object.keys(reservasPorMes).forEach((mes) => {
      mesesCompletos[mes] = reservasPorMes[mes];
    });

    return mesesCompletos;
  };

  // Datos para los gráficos de línea
  const lineChartData2024 = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Reservas por Mes (2024)',
        data: calcularReservasPorMes(reservas2024),
        borderColor: '#36A2EB',
        fill: false,
      },
    ],
  };

  const lineChartData2025 = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Reservas por Mes (2025)',
        data: calcularReservasPorMes(reservas2025),
        borderColor: '#FF6384',
        fill: false,
      },
    ],
  };

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      {alerta && <div className="alerta">{alerta}</div>}
      <div className="tarjetas">
        <div className="tarjeta">
          <FaHotel className="icono" />
          <h2>Total Reservas</h2>
          <p>{reservas.length}</p>
        </div>
        <div className="tarjeta">
          <FaBed className="icono" />
          <h2>Habitaciones Disponibles</h2>
          <p>{habitaciones.length}</p>
        </div>
        <div className="tarjeta">
          <FaCalendarCheck className="icono" />
          <h2>Reservas Vigentes</h2>
          <p>{reservasVigentes}</p>
        </div>
      </div>

      {/* Gráficos de linea  en la misma fila */}
      <div className="graficos">
        <div className="grafico">
          <h2>Reservas por Mes (2024)</h2>
          <Line data={lineChartData2024} options={{ responsive: true, aspectRatio: 2 }} />
        </div>
        <div className="grafico">
          <h2>Reservas por Mes (2025)</h2>
          <Line data={lineChartData2025} options={{ responsive: true, aspectRatio: 2 }} />
        </div>
      </div>

{/* Gráficos de Barras y Pastel */}
<div className="graficos">
  <div className="grafico">
    <h2>Reservas por Tipo de Habitación</h2>
    <Bar data={barChartData} options={{ responsive: true, aspectRatio: 2 }} />
  </div>
  <div className="grafico">
    <h2>Reservas por Estado</h2>
    <Pie data={pieChartData} options={{ responsive: true, aspectRatio: 2 }} />
  </div>
</div>
    </div>
  );
};

export default Dashboard;
