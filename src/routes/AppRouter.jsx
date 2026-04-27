import { useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Home from '../pages/Home';
import Perfil from '../pages/Perfil';
import Reservar from '../pages/Reservar';
import Dashboard from '../pages/Dashboard';


function AppRouter() {
  useEffect(() => {
    localStorage.removeItem('barberia_users_v1');
    localStorage.removeItem('barberia_session_v1');
    localStorage.removeItem('barberia_reservas_v1');
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Rutas públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/reservar" element={<Reservar />} />
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Redirección por defecto */}
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRouter;