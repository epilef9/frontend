import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { turnosAPI, serviciosAPI, usuariosAPI } from '../services/api';

export default function Reservar() {
    const { user } = useAuth();

    const today = useMemo(() => {
        const now = new Date();
        const offset = now.getTimezoneOffset();
        const adjusted = new Date(now.getTime() - offset * 60 * 1000);
        return adjusted.toISOString().split('T')[0];
    }, []);

    const [selectedDate, setSelectedDate] = useState(today);
    const [selectedHour, setSelectedHour] = useState('');
    const [cliente, setCliente] = useState('');
    const [telefono, setTelefono] = useState('');
    const [servicio, setServicio] = useState('');
    const [peluquero, setPeluquero] = useState('');

    const [serviciosList, setServiciosList] = useState([]);
    const [peluquerosList, setPeluquerosList] = useState([]);
    const [turnos, setTurnos] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    // Rellenar previamente los datos del usuario cuando este cambie o se cargue.
    useEffect(() => {
        if (user) {
            setCliente(user.nombre || '');
            setTelefono(user.telefono || '');
        }
    }, [user]);

    // Obtiene la lista inicial de servicios, barberos y turnos
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resServicios, resUsuarios, resTurnos] = await Promise.all([
                    serviciosAPI.getAll(),
                    usuariosAPI.getAll(),
                    turnosAPI.getAll()
                ]);
                setServiciosList(resServicios.data);
                
                const admins = resUsuarios.data.filter(u => u.rol === 'ADMIN');
                setPeluquerosList(admins);
                setTurnos(resTurnos.data);

                if (resServicios.data.length > 0) {
                    setServicio(resServicios.data[0].nombre);
                }
                if (admins.length > 0) {
                    setPeluquero(admins[0].nombre);
                }
            } catch (err) {
                console.error('Error al cargar datos:', err);
                setError('Error al cargar la información requerida.');
            }
        };
        fetchData();
    }, []);

    const hours = useMemo(
        () => Array.from({ length: 13 }, (_, index) => `${String(8 + index).padStart(2, '0')}:00`),
        []
    );

    // Calcula las horas reservadas para la fecha y peluquero seleccionados
    const reservedHours = useMemo(() => {
        if (!peluquero) return [];
        return turnos
            .filter(
                (t) =>
                    t.fecha === selectedDate &&
                    t.peluquero.toLowerCase() === peluquero.toLowerCase() &&
                    t.estado !== 'Cancelado'
            )
            .map((t) => t.hora);
    }, [turnos, selectedDate, peluquero]);

    const handleHourSelect = (time) => {
        setSelectedHour(time);
        setError('');
        setSuccess('');
    };

    const handleReservar = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!cliente.trim()) {
            setError('El nombre del cliente es obligatorio.');
            return;
        }
        if (!telefono.trim()) {
            setError('El teléfono es obligatorio.');
            return;
        }
        if (!servicio) {
            setError('Debe seleccionar un servicio.');
            return;
        }
        if (!peluquero) {
            setError('Debe seleccionar un peluquero.');
            return;
        }
        if (!selectedHour) {
            setError('Debe seleccionar una hora disponible.');
            return;
        }

        try {
            setLoading(true);
            const nuevoTurno = {
                clienteId: user?.id || null,
                cliente,
                telefono,
                fecha: selectedDate,
                hora: selectedHour,
                servicio,
                peluquero,
                estado: 'Pendiente'
            };
            await turnosAPI.create(nuevoTurno);
            setSuccess('¡Turno reservado exitosamente! Queda pendiente de confirmación.');
            setSelectedHour('');
            
            // Recarga los turnos para actualizar la vista de disponibilidad inmediatamente
            const resTurnos = await turnosAPI.getAll();
            setTurnos(resTurnos.data);
        } catch (err) {
            console.error('Error al reservar turno:', err);
            setError('Error al realizar la reserva. Por favor, intente nuevamente.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#0E0E0E] text-white relative overflow-hidden px-4 py-10 pt-28 font-dm">
            <Navbar />
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=DM+Sans:wght@400;500;700&display=swap');

                .glow-red {
                    position: fixed;
                    top: -210px;
                    right: -210px;
                    width: 620px;
                    height: 620px;
                    border-radius: 50%;
                    background: #E8362A;
                    filter: blur(125px);
                    opacity: 0.14;
                    pointer-events: none;
                    z-index: 0;
                }

                .glow-blue {
                    position: fixed;
                    bottom: -210px;
                    left: -210px;
                    width: 620px;
                    height: 620px;
                    border-radius: 50%;
                    background: #2AACE8;
                    filter: blur(125px);
                    opacity: 0.14;
                    pointer-events: none;
                    z-index: 0;
                }

                .stripe-texture {
                    position: fixed;
                    inset: 0;
                    background-image: repeating-linear-gradient(
                        -55deg,
                        transparent 0px,
                        transparent 1px,
                        rgba(255, 255, 255, 0.02) 1px,
                        rgba(255, 255, 255, 0.02) 2px
                    );
                    pointer-events: none;
                    z-index: 0;
                }

                .barber-pole {
                    background: repeating-linear-gradient(
                        -45deg,
                        #e8362a 0px,
                        #e8362a 8px,
                        #f4f4f5 8px,
                        #f4f4f5 16px,
                        #2aace8 16px,
                        #2aace8 24px,
                        #f4f4f5 24px,
                        #f4f4f5 32px
                    );
                }

                .slot-blue {
                    position: relative;
                    overflow: hidden;
                    background: rgba(42, 172, 232, 0.2);
                    border-color: rgba(42, 172, 232, 0.5);
                }

                .slot-red {
                    position: relative;
                    overflow: hidden;
                    background: rgba(232, 54, 42, 0.2);
                    border-color: rgba(232, 54, 42, 0.52);
                }

                .slot-selected {
                    position: relative;
                    overflow: hidden;
                    background: rgba(34, 197, 94, 0.3);
                    border-color: rgb(34, 197, 94);
                    box-shadow: 0 0 15px rgba(34, 197, 94, 0.3);
                }

                .slot-time {
                    text-shadow: 0 0 16px rgba(255, 255, 255, 0.18);
                }
            `}</style>

            <div className="glow-red" />
            <div className="glow-blue" />
            <div className="stripe-texture" />

            <div className="relative z-10 max-w-5xl mx-auto">
                <header className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <div className="inline-flex items-center gap-3 rounded-2xl border border-white/20 bg-white/5 px-3 py-2 backdrop-blur-xl">
                            <div className="h-10 w-2 rounded-full barber-pole shadow-[0_0_12px_rgba(42,172,232,0.35)]" />
                            <div className="h-12 w-12 rounded-full border border-white/25 bg-black/35 flex items-center justify-center shadow-[0_0_18px_rgba(232,54,42,0.25)]">
                                <svg viewBox="0 0 24 24" className="h-6 w-6 text-white/90" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                                    <circle cx="6" cy="6" r="2.5" />
                                    <circle cx="18" cy="6" r="2.5" />
                                    <path d="M8 8L16 16" />
                                    <path d="M16 8L8 16" />
                                    <path d="M3.5 20L10.5 13" />
                                    <path d="M20.5 20L13.5 13" />
                                </svg>
                            </div>
                            <div>
                                <p className="text-[10px] uppercase tracking-[0.28em] text-white/45">Barberia Premium</p>
                                <p className="font-bebas text-xl leading-none tracking-[0.12em]">Classic Cuts</p>
                            </div>
                        </div>

                        <h1 className="font-bebas text-5xl tracking-[0.12em] leading-none mt-4">Reservar Turno</h1>
                        <p className="text-sm text-white/70 mt-3 font-dm">Complete sus datos y seleccione fecha, barbero y un horario disponible.</p>
                    </div>
                </header>

                {error && (
                    <div className="mb-6 p-4 bg-red-950/40 border border-red-500/40 text-red-200 text-sm rounded-xl">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-6 p-4 bg-emerald-950/40 border border-emerald-500/40 text-emerald-200 text-sm rounded-xl">
                        {success}
                    </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Formulario */}
                    <div className="lg:col-span-1 bg-white/5 border border-white/10 rounded-3xl p-6 backdrop-blur-xl shadow-2xl h-fit">
                        <h2 className="font-bebas text-2xl tracking-[0.1em] mb-4">Sus Datos</h2>
                        <form onSubmit={handleReservar} className="space-y-4">
                            <div>
                                <label className="text-[10px] uppercase tracking-[0.2em] text-white/55 block mb-1">
                                    Nombre del Cliente
                                </label>
                                <input
                                    type="text"
                                    value={cliente}
                                    onChange={(e) => setCliente(e.target.value)}
                                    placeholder="Nombre completo"
                                    className="w-full bg-black/30 border border-white/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#2AACE8] focus:ring-2 focus:ring-[#2AACE8]/25"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-[10px] uppercase tracking-[0.2em] text-white/55 block mb-1">
                                    Teléfono
                                </label>
                                <input
                                    type="tel"
                                    value={telefono}
                                    onChange={(e) => setTelefono(e.target.value)}
                                    placeholder="Número de contacto"
                                    className="w-full bg-black/30 border border-white/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#2AACE8] focus:ring-2 focus:ring-[#2AACE8]/25"
                                    required
                                />
                            </div>

                            <div>
                                <label className="text-[10px] uppercase tracking-[0.2em] text-white/55 block mb-1">
                                    Servicio
                                </label>
                                <select
                                    value={servicio}
                                    onChange={(e) => setServicio(e.target.value)}
                                    className="w-full bg-black/30 border border-white/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#2AACE8] focus:ring-2 focus:ring-[#2AACE8]/25"
                                    required
                                >
                                    <option value="" disabled className="bg-[#0E0E0E]">Seleccione un servicio</option>
                                    {serviciosList.map((s) => (
                                        <option key={s.id} value={s.nombre} className="bg-[#0E0E0E]">
                                            {s.nombre} (${s.precio})
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-[10px] uppercase tracking-[0.2em] text-white/55 block mb-1">
                                    Peluquero / Barbero
                                </label>
                                <select
                                    value={peluquero}
                                    onChange={(e) => setPeluquero(e.target.value)}
                                    className="w-full bg-black/30 border border-white/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#2AACE8] focus:ring-2 focus:ring-[#2AACE8]/25"
                                    required
                                >
                                    <option value="" disabled className="bg-[#0E0E0E]">Seleccione un barbero</option>
                                    {peluquerosList.map((p) => (
                                        <option key={p.id} value={p.nombre} className="bg-[#0E0E0E]">
                                            {p.nombre}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="text-[10px] uppercase tracking-[0.2em] text-white/55 block mb-1">
                                    Fecha
                                </label>
                                <input
                                    type="date"
                                    min={today}
                                    value={selectedDate}
                                    onChange={(e) => {
                                        setSelectedDate(e.target.value);
                                        setSelectedHour('');
                                    }}
                                    className="w-full bg-black/30 border border-white/20 rounded-xl px-3 py-2 text-sm outline-none focus:border-[#2AACE8] focus:ring-2 focus:ring-[#2AACE8]/25"
                                    required
                                />
                            </div>

                            {selectedHour && (
                                <div className="p-3 bg-green-950/20 border border-green-500/30 rounded-xl text-xs text-green-200">
                                    Horario seleccionado: <strong className="text-sm">{selectedHour} hs</strong>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:opacity-90 text-white font-bold py-3 px-4 rounded-xl transition duration-150 shadow-[0_4px_20px_-2px_rgba(34,197,94,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? 'Reservando...' : 'Confirmar Reserva'}
                            </button>
                        </form>
                    </div>

                    {/* Horarios */}
                    <div className="lg:col-span-2 space-y-6">
                        <section className="bg-white/5 border border-white/10 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
                            <h3 className="font-bebas text-2xl tracking-[0.1em] mb-4">Horarios para el {selectedDate}</h3>
                            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                                {hours.map((time) => {
                                    const isReserved = reservedHours.includes(time);
                                    const isSelected = selectedHour === time;
                                    return (
                                        <button
                                            key={time}
                                            type="button"
                                            disabled={isReserved}
                                            onClick={() => handleHourSelect(time)}
                                            className={`rounded-2xl px-3 py-4 text-sm border transition-all ${
                                                isReserved
                                                    ? 'slot-red text-white cursor-not-allowed'
                                                    : isSelected
                                                    ? 'slot-selected text-white scale-105'
                                                    : 'slot-blue text-white hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(42,172,232,0.28)]'
                                            }`}
                                        >
                                            <p className="slot-time font-semibold tracking-wide">{time}</p>
                                            <p className="text-[11px] mt-1 opacity-90">
                                                {isReserved ? 'No disponible' : isSelected ? 'Seleccionado' : 'Disponible'}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="mt-7 flex flex-wrap items-center gap-3 text-xs text-white/70">
                                <span className="uppercase tracking-[0.2em] text-white/45">Referencias</span>
                                <span className="inline-flex items-center gap-2 rounded-full border border-[#2AACE8]/40 bg-[#2AACE8]/20 px-3 py-1">
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#2AACE8]" />
                                    Disponible
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full border border-green-500/40 bg-green-500/20 px-3 py-1">
                                    <span className="h-2.5 w-2.5 rounded-full bg-green-500" />
                                    Seleccionado
                                </span>
                                <span className="inline-flex items-center gap-2 rounded-full border border-zinc-300/25 bg-zinc-500/30 px-3 py-1">
                                    <span className="h-2.5 w-2.5 rounded-full bg-[#E8362A]" />
                                    No disponible
                                </span>
                            </div>
                        </section>

                        <div className="mt-6 flex justify-between items-center">
                            <Link
                                to="/home"
                                className="inline-flex items-center rounded-xl border border-white/20 bg-white/5 px-4 py-2 text-sm text-white/80 hover:text-white hover:bg-white/10 transition"
                            >
                                Volver al inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
