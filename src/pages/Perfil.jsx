import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { usuariosAPI, turnosAPI } from '../services/api';
import { Save, X, Edit3, Phone, Mail, FileText, Image, User, Shield, Calendar, Clock } from 'lucide-react';

export default function Perfil() {
    const { user, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const [perfil, setPerfil] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editando, setEditando] = useState(false);
    const [formData, setFormData] = useState({});
    const [success, setSuccess] = useState('');
    const [error, setError] = useState('');
    const [turnosUsuario, setTurnosUsuario] = useState([]);

    // Cargar datos del perfil desde el backend
    useEffect(() => {
        if (!isAuthenticated || !user) {
            navigate('/login');
            return;
        }

        const fetchPerfil = async () => {
            try {
                setLoading(true);
                // Usar el id del usuario si está disponible, sino buscar por email
                let response;
                if (user.id) {
                    response = await usuariosAPI.getById(user.id);
                } else if (user.email) {
                    response = await usuariosAPI.getByEmail(user.email);
                }
                
                if (response?.data) {
                    setPerfil(response.data);
                    setFormData({
                        nombre: response.data.nombre || '',
                        email: response.data.email || '',
                        telefono: response.data.telefono || '',
                        descripcion: response.data.descripcion || '',
                        imagenUrl: response.data.imagenUrl || ''
                    });
                }

                // Cargar turnos del usuario
                try {
                    const turnosRes = await turnosAPI.getAll();
                    const misTurnos = turnosRes.data.filter(t => 
                        t.peluquero === response?.data?.nombre || 
                        t.cliente === response?.data?.nombre
                    );
                    setTurnosUsuario(misTurnos);
                } catch (e) {
                    console.error('Error cargando turnos:', e);
                }
            } catch (err) {
                console.error('Error cargando perfil:', err);
                setError('Error al cargar datos del perfil');
                // Fallback a datos del contexto
                setPerfil({
                    nombre: user.nombre,
                    email: user.email,
                    telefono: user.telefono || '',
                    descripcion: user.descripcion || '',
                    imagenUrl: user.imagenUrl || '',
                    rol: user.rol
                });
                setFormData({
                    nombre: user.nombre || '',
                    email: user.email || '',
                    telefono: user.telefono || '',
                    descripcion: user.descripcion || '',
                    imagenUrl: user.imagenUrl || ''
                });
            } finally {
                setLoading(false);
            }
        };

        fetchPerfil();
    }, [user, isAuthenticated, navigate]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        try {
            setError('');
            const userId = perfil?.id || user?.id;
            if (!userId) {
                setError('No se pudo identificar el usuario');
                return;
            }

            await usuariosAPI.update(userId, formData);
            
            // Actualizar perfil local
            setPerfil(prev => ({ ...prev, ...formData }));
            
            // Actualizar localStorage para que el Navbar refleje cambios
            const stored = localStorage.getItem('user');
            if (stored) {
                const parsed = JSON.parse(stored);
                localStorage.setItem('user', JSON.stringify({ ...parsed, ...formData }));
            }

            setEditando(false);
            setSuccess('Perfil actualizado correctamente');
            setTimeout(() => setSuccess(''), 3000);
        } catch (err) {
            console.error(err);
            setError('Error al guardar los cambios');
        }
    };

    const handleCancel = () => {
        setFormData({
            nombre: perfil?.nombre || '',
            email: perfil?.email || '',
            telefono: perfil?.telefono || '',
            descripcion: perfil?.descripcion || '',
            imagenUrl: perfil?.imagenUrl || ''
        });
        setEditando(false);
        setError('');
    };

    const getEstadoColor = (estado) => {
        switch (estado) {
            case 'Pendiente': return 'border-yellow-500/40 text-yellow-500 bg-yellow-500/10';
            case 'Confirmado': return 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10';
            case 'Completado': return 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10';
            case 'Cancelado': return 'border-red-500/40 text-red-500 bg-red-500/10';
            default: return 'border-zinc-500/40 text-zinc-400 bg-zinc-500/10';
        }
    };

    const getRolBadge = (rol) => {
        switch (rol) {
            case 'ADMIN': return { label: 'Administrador', color: 'border-red-500/40 text-red-400 bg-red-500/10' };
            case 'BARBERO': return { label: 'Barbero', color: 'border-cyan-500/40 text-cyan-400 bg-cyan-500/10' };
            case 'CLIENTE': return { label: 'Cliente', color: 'border-emerald-500/40 text-emerald-400 bg-emerald-500/10' };
            default: return { label: rol, color: 'border-zinc-500/40 text-zinc-400 bg-zinc-500/10' };
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-[#050505] flex items-center justify-center">
                <Navbar />
                <div className="flex flex-col items-center gap-4">
                    <div className="w-10 h-10 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.2em]">Cargando perfil...</p>
                </div>
            </div>
        );
    }

    const rolBadge = getRolBadge(perfil?.rol);

    return (
        <div className="min-h-screen bg-[#050505] font-sans relative overflow-hidden">
            <Navbar />
            
            {/* Luces de fondo */}
            <div className="absolute top-0 right-0 w-[50vw] h-[100vh] bg-gradient-to-l from-red-900/10 via-transparent to-transparent pointer-events-none z-0 fixed"></div>
            <div className="absolute top-0 left-0 w-[50vw] h-[100vh] bg-gradient-to-r from-cyan-900/10 via-transparent to-transparent pointer-events-none z-0 fixed"></div>
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:100%_40px] pointer-events-none z-0 fixed"></div>

            {/* Contenido */}
            <div className="relative z-10 max-w-5xl mx-auto px-4 py-10 pt-28">
                {/* Header */}
                <header className="mb-12">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="h-[2px] w-12 bg-cyan-500"></span>
                        <span className="text-cyan-400 font-bold uppercase tracking-[0.3em] text-sm">Mi Perfil</span>
                    </div>
                    <h1 className="text-[2.5rem] md:text-[3.5rem] font-black text-white leading-[0.9] tracking-tighter uppercase">
                        {perfil?.nombre || 'Usuario'}<span className="text-red-500">.</span>
                    </h1>
                    <p className="text-xs text-zinc-500 font-bold tracking-[0.2em] uppercase mt-4">
                        Gestiona tu información personal
                    </p>
                </header>

                {/* Alertas */}
                {success && (
                    <div className="mb-6 p-4 border border-emerald-500/30 bg-emerald-500/10 backdrop-blur-xl">
                        <p className="text-emerald-400 text-xs font-bold uppercase tracking-[0.2em]">{success}</p>
                    </div>
                )}
                {error && (
                    <div className="mb-6 p-4 border border-red-500/30 bg-red-500/10 backdrop-blur-xl">
                        <p className="text-red-400 text-xs font-bold uppercase tracking-[0.2em]">{error}</p>
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Panel lateral - Avatar y Rol */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="bg-[#0A0A0A]/80 border border-zinc-800/50 p-8 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-900/20 rounded-full blur-[50px] -z-10 pointer-events-none"></div>
                            
                            {/* Avatar */}
                            <div className="flex flex-col items-center mb-8">
                                <div className="relative group">
                                    {perfil?.imagenUrl ? (
                                        <img 
                                            src={perfil.imagenUrl} 
                                            alt={perfil.nombre}
                                            className="w-32 h-32 rounded-full object-cover border-4 border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.15)]"
                                        />
                                    ) : (
                                        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center border-4 border-cyan-500/30 shadow-[0_0_30px_rgba(34,211,238,0.15)]">
                                            <span className="text-4xl font-black text-white">
                                                {perfil?.nombre?.charAt(0)?.toUpperCase() || '?'}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <h2 className="text-xl font-black text-white tracking-tight uppercase mt-4 text-center">
                                    {perfil?.nombre}
                                </h2>

                                {/* Badge de Rol */}
                                <span className={`mt-3 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.2em] border rounded-none ${rolBadge.color}`}>
                                    <Shield size={10} className="inline mr-1.5 -mt-0.5" />
                                    {rolBadge.label}
                                </span>
                            </div>

                            {/* Info rápida */}
                            <div className="space-y-4 border-t border-zinc-800/50 pt-6">
                                <div className="flex items-center gap-3">
                                    <Mail size={14} className="text-cyan-500 flex-shrink-0" />
                                    <span className="text-zinc-400 text-xs font-semibold truncate">{perfil?.email}</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Phone size={14} className="text-cyan-500 flex-shrink-0" />
                                    <span className="text-zinc-400 text-xs font-semibold">{perfil?.telefono || 'Sin teléfono'}</span>
                                </div>
                            </div>
                        </div>

                        {/* Estadísticas */}
                        <div className="bg-[#0A0A0A]/80 border border-zinc-800/50 p-6 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                            <h3 className="text-sm font-black text-white uppercase tracking-[0.15em] mb-5 flex items-center gap-2">
                                <Calendar size={14} className="text-cyan-500" />
                                Resumen
                                <span className="h-[1px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></span>
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-[#050505] border border-zinc-800/50 p-4 text-center">
                                    <p className="text-2xl font-black text-white tracking-tighter">{turnosUsuario.length}</p>
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500 mt-1">Total Turnos</p>
                                </div>
                                <div className="bg-[#050505] border border-emerald-500/20 p-4 text-center">
                                    <p className="text-2xl font-black text-emerald-400 tracking-tighter">{turnosUsuario.filter(t => t.estado === 'Completado').length}</p>
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-emerald-500/60 mt-1">Completados</p>
                                </div>
                                <div className="bg-[#050505] border border-yellow-500/20 p-4 text-center">
                                    <p className="text-2xl font-black text-yellow-500 tracking-tighter">{turnosUsuario.filter(t => t.estado === 'Pendiente').length}</p>
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-yellow-500/60 mt-1">Pendientes</p>
                                </div>
                                <div className="bg-[#050505] border border-cyan-500/20 p-4 text-center">
                                    <p className="text-2xl font-black text-cyan-400 tracking-tighter">{turnosUsuario.filter(t => t.estado === 'Confirmado').length}</p>
                                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-500/60 mt-1">Confirmados</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Panel principal - Datos editables */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="bg-[#0A0A0A]/80 border border-zinc-800/50 p-8 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)] relative">
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-red-900/10 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-xl font-black tracking-widest uppercase text-white flex items-center gap-3">
                                    <User size={18} className="text-cyan-500" />
                                    Información Personal
                                    <span className="h-[1px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></span>
                                </h2>
                                {!editando ? (
                                    <button
                                        onClick={() => setEditando(true)}
                                        className="flex items-center gap-2 px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] bg-white text-black hover:bg-cyan-400 transition-all hover:shadow-[0_0_15px_rgba(34,211,238,0.4)]"
                                    >
                                        <Edit3 size={12} />
                                        Editar
                                    </button>
                                ) : (
                                    <div className="flex gap-2">
                                        <button
                                            onClick={handleSave}
                                            className="flex items-center gap-2 px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] bg-emerald-500 text-white hover:bg-emerald-400 transition-all"
                                        >
                                            <Save size={12} />
                                            Guardar
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="flex items-center gap-2 px-4 py-2.5 text-[10px] font-black uppercase tracking-[0.2em] bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 transition-all"
                                        >
                                            <X size={12} />
                                            Cancelar
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-6">
                                {/* Nombre */}
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">
                                        <User size={10} />
                                        Nombre completo
                                    </label>
                                    {editando ? (
                                        <input
                                            name="nombre"
                                            value={formData.nombre}
                                            onChange={handleChange}
                                            className="w-full bg-[#050505] border border-zinc-800/80 text-white px-4 py-3 text-sm outline-none focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all"
                                        />
                                    ) : (
                                        <p className="text-white font-semibold text-sm px-4 py-3 bg-[#050505]/50 border border-zinc-800/30">{perfil?.nombre || '—'}</p>
                                    )}
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">
                                        <Mail size={10} />
                                        Email
                                    </label>
                                    {editando ? (
                                        <input
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            type="email"
                                            className="w-full bg-[#050505] border border-zinc-800/80 text-white px-4 py-3 text-sm outline-none focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all"
                                        />
                                    ) : (
                                        <p className="text-white font-semibold text-sm px-4 py-3 bg-[#050505]/50 border border-zinc-800/30">{perfil?.email || '—'}</p>
                                    )}
                                </div>

                                {/* Teléfono */}
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">
                                        <Phone size={10} />
                                        Teléfono
                                    </label>
                                    {editando ? (
                                        <input
                                            name="telefono"
                                            value={formData.telefono}
                                            onChange={handleChange}
                                            className="w-full bg-[#050505] border border-zinc-800/80 text-white px-4 py-3 text-sm outline-none focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all"
                                            placeholder="Ej: 099 123 456"
                                        />
                                    ) : (
                                        <p className="text-white font-semibold text-sm px-4 py-3 bg-[#050505]/50 border border-zinc-800/30">{perfil?.telefono || 'Sin teléfono'}</p>
                                    )}
                                </div>

                                {/* Descripción */}
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">
                                        <FileText size={10} />
                                        Descripción / Bio
                                    </label>
                                    {editando ? (
                                        <textarea
                                            name="descripcion"
                                            value={formData.descripcion}
                                            onChange={handleChange}
                                            rows={4}
                                            className="w-full bg-[#050505] border border-zinc-800/80 text-white px-4 py-3 text-sm outline-none focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all resize-none"
                                            placeholder="Cuéntanos sobre ti..."
                                        />
                                    ) : (
                                        <p className="text-white font-semibold text-sm px-4 py-3 bg-[#050505]/50 border border-zinc-800/30 min-h-[80px] whitespace-pre-wrap">
                                            {perfil?.descripcion || 'Sin descripción'}
                                        </p>
                                    )}
                                </div>

                                {/* URL de imagen */}
                                <div>
                                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">
                                        <Image size={10} />
                                        URL de foto de perfil
                                    </label>
                                    {editando ? (
                                        <input
                                            name="imagenUrl"
                                            value={formData.imagenUrl}
                                            onChange={handleChange}
                                            className="w-full bg-[#050505] border border-zinc-800/80 text-white px-4 py-3 text-sm outline-none focus:border-cyan-500/50 focus:bg-cyan-950/10 transition-all"
                                            placeholder="https://ejemplo.com/mi-foto.jpg"
                                        />
                                    ) : (
                                        <p className="text-white font-semibold text-sm px-4 py-3 bg-[#050505]/50 border border-zinc-800/30 truncate">
                                            {perfil?.imagenUrl || 'Sin imagen'}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Últimos turnos */}
                        {turnosUsuario.length > 0 && (
                            <div className="bg-[#0A0A0A]/80 border border-zinc-800/50 p-8 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                                <h3 className="text-sm font-black text-white uppercase tracking-[0.15em] mb-6 flex items-center gap-2">
                                    <Clock size={14} className="text-cyan-500" />
                                    Últimos Turnos
                                    <span className="h-[1px] flex-1 bg-gradient-to-r from-zinc-800 to-transparent"></span>
                                </h3>
                                <div className="overflow-x-auto border border-zinc-800/50 bg-[#050505]/50">
                                    <table className="w-full text-left text-sm">
                                        <thead className="bg-[#111] border-b border-zinc-800/80">
                                            <tr>
                                                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Fecha</th>
                                                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Hora</th>
                                                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Servicio</th>
                                                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500">Estado</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-zinc-800/50">
                                            {turnosUsuario.slice(0, 5).map((turno) => (
                                                <tr key={turno.id} className="hover:bg-zinc-900/50 transition-colors">
                                                    <td className="px-5 py-3 text-zinc-300 text-xs font-bold tracking-wider">{turno.fecha}</td>
                                                    <td className="px-5 py-3 text-cyan-500 text-xs font-black tracking-wider">{turno.hora}</td>
                                                    <td className="px-5 py-3 text-zinc-300 text-xs font-bold tracking-wider">{turno.servicio}</td>
                                                    <td className="px-5 py-3">
                                                        <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest border rounded-none ${getEstadoColor(turno.estado)}`}>
                                                            {turno.estado}
                                                        </span>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}