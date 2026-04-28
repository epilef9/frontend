import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scissors, HelpCircle, LogIn } from 'lucide-react';

export default function Navbar() {
    // por ahora hardcodeado 
    // cambiar el usestate a true para simular que esta logueado y ponerlo en false para anonimo
    const [isLogged, setIsLogged] = useState(false);

    // nav arriba, lo puse fixed asi te persigue
    return (
        <nav className="fixed top-0 left-0 w-full z-[100] px-6 md:px-12 py-5 flex items-center justify-between border-b border-zinc-800/30 bg-[#050505]/70 backdrop-blur-xl">
            {/* logo  fachero con link para volver al inicio */}
            <Link to="/" className="text-2xl md:text-3xl font-black text-white tracking-tighter uppercase flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform">
                <Scissors size={26} className="text-cyan-400 -rotate-90 drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] hidden sm:block" />
                BARBER<span className="text-red-500">.</span>
            </Link>
            
            {/* links centrales */}
            <div className="hidden md:flex items-center justify-center absolute left-1/2 -translate-x-1/2 gap-10 text-[11px] font-extrabold uppercase tracking-[0.2em] text-zinc-500">
                <a href="/" className="text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)]">Inicio</a>
                <a href="/reservar" className="hover:text-cyan-400 hover:-translate-y-0.5 transition-all duration-300">Reservar</a>
            </div>

            {/* zona derecha: botonera de sesion o modo anonimo  */}
            <div className="flex items-center gap-4">
                {isLogged ? (
                    // si metio clave y esta logueado mostramos foto y nombre
                    <a href="/perfil" className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 px-4 py-2 rounded-full hover:border-cyan-500/50 hover:bg-cyan-900/20 transition-all cursor-pointer group">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 p-1 flex items-center justify-center border border-zinc-700 overflow-hidden">
                            <img src="https://i.pravatar.cc/100?img=33" className="rounded-full w-full h-full object-cover" alt="Usuario" />
                        </div>
                        <span className="text-white text-xs font-bold uppercase tracking-wider group-hover:text-cyan-400 transition-colors">Matías</span>
                    </a>
                ) : (
                    // si no inicio sesion mostramos el modo anonimo con un iconito y el boton de login
                    <div className="flex items-center gap-4">
                        <div className="hidden sm:flex items-center gap-2 text-zinc-500 bg-zinc-900/40 border border-zinc-800 px-3 py-1.5 rounded-full" title="Usted no ha iniciado sesión">
                            <HelpCircle size={18} className="text-zinc-600" />
                            <span className="text-[10px] font-bold uppercase tracking-widest">Anónimo</span>
                        </div>
                        <a href="/login" className="flex items-center gap-2 bg-white text-black px-5 py-2.5 rounded-none text-xs font-black uppercase tracking-widest hover:bg-cyan-400 hover:text-black transition-all">
                            <LogIn size={16} />
                            Acceder
                        </a>
                    </div>
                )}

                {/* boton */}
                <div className="flex md:hidden text-white cursor-pointer group ml-3">
                    <div className="space-y-1.5 flex flex-col items-end">
                        <div className="w-8 h-[2px] bg-white group-hover:bg-cyan-400 transition-colors"></div>
                        <div className="w-6 h-[2px] bg-white group-hover:bg-cyan-400 transition-colors"></div>
                        <div className="w-4 h-[2px] bg-red-500 group-hover:w-8 transition-all"></div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
