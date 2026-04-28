import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Perfil() {
    // Datos de ejemplo del usuario
    const [usuario] = useState({
        nombre: 'Juan Pérez',
        email: 'juan@example.com',
        telefono: '+34 612 345 678',
        imagen: 'https://via.placeholder.com/150',
        miembro_desde: '2024-01-15'
    });
    
    // Ejemplo de turnos reservados
    const [turnosReservados] = useState([
        {
            id: 1,
            fecha: '2026-04-25',
            hora: '10:00',
            servicio: 'Corte de cabello',
            peluquero: 'Carlos'
        },
        {
            id: 2,
            fecha: '2026-05-02',
            hora: '14:30',
            servicio: 'Afeitado y barba',
            peluquero: 'Miguel'
        }
    ]);

    // Datos de ejemplo de historial de turnos
    const [historialTurnos] = useState([
        {
            id: 101,
            fecha: '2026-04-18',
            hora: '11:00',
            servicio: 'Corte de cabello',
            peluquero: 'Carlos',
            estado: 'Completado'
        },
        {
            id: 102,
            fecha: '2026-04-11',
            hora: '15:00',
            servicio: 'Tratamiento capilar',
            peluquero: 'Sofia',
            estado: 'Completado'
        },
        {
            id: 103,
            fecha: '2026-04-04',
            hora: '09:30',
            servicio: 'Corte fade',
            peluquero: 'Miguel',
            estado: 'Completado'
        }
    ]);

    return (
        <div className="min-h-screen bg-[#0E0E0E] font-dm relative overflow-hidden px-4 py-10 pt-28">
            <Navbar />
            {/*Background*/}
            <div className="glow-red" />
            <div className="glow-blue" />
            <div className="stripe-texture" />

            {/* Contenido */}
            <div className="relative z-10 max-w-6xl mx-auto">
                {/* Header */}
                <header className="animate-slide-up delay-1 mb-12">
                    <h1 className="font-bebas text-5xl tracking-widest text-white leading-tight">
                        MI PERFIL
                    </h1>
                    <p className="text-xs tracking-[0.3em] uppercase text-white/40 mt-2">
                        Bienvenido a tu perfil personal
                    </p>
                </header>

                {/* Linea divisora  */}
                <div className="animate-slide-up delay-2 flex items-center gap-3 mb-12">
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-[#E8362A]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-white/30" />
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-[#2AACE8]" />
                </div>

                {/* Sección de Datos del Usuario */}
                <section className="animate-slide-up delay-3 bg-white/5 backdrop-blur-xl border border-white/8 rounded-3xl p-8 mb-8 shadow-2xl">
                    <div className="flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0">
                            <img
                                src={usuario.imagen}
                                
                                className="h-40 w-40 rounded-full object-cover border-4 border-[#2AACE8] ring-4 ring-[#2AACE8]/20 shadow-lg"
                            />
                        </div>
                        <div className="flex-grow w-full md:w-auto">
                            <h2 className="font-bebas text-3xl tracking-wider text-white mb-6">
                                {usuario.nombre}
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                <div>
                                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">Email</p>
                                    <p className="text-white/80">{usuario.email}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">Teléfono</p>
                                    <p className="text-white/80">{usuario.telefono}</p>
                                </div>
                                <div>
                                    <p className="text-[10px] tracking-[0.2em] uppercase text-white/50 mb-2">Miembro desde</p>
                                    <p className="text-white/80">{new Date(usuario.miembro_desde).toLocaleDateString('es-ES')}</p>
                                </div>
                            </div>
                            <button className="px-8 py-3 rounded-xl font-bebas text-lg tracking-[0.15em] text-white bg-[#2AACE8] hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(42,172,232,0.45)] transition-all">
                                EDITAR PERFIL
                            </button>
                        </div>
                    </div>
                </section>

                {/* Sección de Turnos Reservados */}
                <section className="animate-slide-up delay-4 bg-white/5 backdrop-blur-xl border border-white/8 rounded-3xl p-8 mb-8 shadow-2xl">
                    <h3 className="font-bebas text-2xl tracking-wider text-white mb-6">
                        PRÓXIMOS TURNOS
                    </h3>
                    {turnosReservados.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {turnosReservados.map((turno) => (
                                <div 
                                    key={turno.id} 
                                    className="bg-white/5 border border-[#2AACE8]/40 rounded-2xl p-6 hover:border-[#2AACE8]/80 hover:bg-[#2AACE8]/10 transition-all"
                                >
                                    <div className="flex justify-between items-start mb-4">
                                        <p className="font-bebas text-xl text-white tracking-wide">{turno.servicio}</p>
                                        <span className="bg-[#2AACE8]/20 text-[#2AACE8] text-xs px-3 py-1 rounded-full border border-[#2AACE8]/30">
                                            RESERVADO
                                        </span>
                                    </div>
                                    <div className="space-y-3">
                                        <p className="text-white/70 text-sm">
                                            📅 {new Date(turno.fecha).toLocaleDateString('es-ES')} a las {turno.hora}
                                        </p>
                                        <p className="text-white/70 text-sm">
                                            💈 Peluquero: <span className="text-white">{turno.peluquero}</span>
                                        </p>
                                    </div>
                                    <button className="mt-4 w-full py-2 text-sm text-[#E8362A] hover:text-white hover:bg-[#E8362A]/20 rounded-lg transition border border-transparent hover:border-[#E8362A] font-semibold">
                                        Cancelar turno
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="text-white/40">No tienes turnos reservados</p>
                    )}
                </section>

                {/* Historial de Turnos */}
                <section className="animate-slide-up delay-5 bg-white/5 backdrop-blur-xl border border-white/8 rounded-3xl p-8 shadow-2xl">
                    <h3 className="font-bebas text-2xl tracking-wider text-white mb-6">
                        HISTORIAL DE TURNOS
                    </h3>
                    {historialTurnos.length > 0 ? (
                        <div className="overflow-x-auto">
                            <table className="w-full text-left text-sm">
                                <thead>
                                    <tr className="border-b border-white/10">
                                        <th className="px-4 py-4 text-[10px] tracking-[0.2em] uppercase text-white/50 font-semibold">Fecha</th>
                                        <th className="px-4 py-4 text-[10px] tracking-[0.2em] uppercase text-white/50 font-semibold">Hora</th>
                                        <th className="px-4 py-4 text-[10px] tracking-[0.2em] uppercase text-white/50 font-semibold">Servicio</th>
                                        <th className="px-4 py-4 text-[10px] tracking-[0.2em] uppercase text-white/50 font-semibold">Peluquero</th>
                                        <th className="px-4 py-4 text-[10px] tracking-[0.2em] uppercase text-white/50 font-semibold">Estado</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {historialTurnos.map((turno) => (
                                        <tr 
                                            key={turno.id} 
                                            className="border-b border-white/5 hover:bg-white/5 transition-colors"
                                        >
                                            <td className="px-4 py-4 text-white/80">
                                                {new Date(turno.fecha).toLocaleDateString('es-ES')}
                                            </td>
                                            <td className="px-4 py-4 text-white/80">{turno.hora}</td>
                                            <td className="px-4 py-4 text-white/80">{turno.servicio}</td>
                                            <td className="px-4 py-4 text-white/80">{turno.peluquero}</td>
                                            <td className="px-4 py-4">
                                                <span className="bg-[#2AACE8]/20 text-[#2AACE8] text-xs px-3 py-1 rounded-full border border-[#2AACE8]/30">
                                                    {turno.estado}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-white/40">No hay historial de turnos</p>
                    )}
                </section>
            </div>
        </div>
    );
}