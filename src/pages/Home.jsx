import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import maquinitaImg from '../assets/images/maquinita.png';
import tijerasImg from '../assets/images/tijeras.png';
import cepilloImg from '../assets/images/cepillo.png';
            import { Star, Calendar, Sparkles, MoveRight, User, UserCircle } from 'lucide-react';

export default function Home() {
    return (
        <div className="home-container">
            <header>
                <h1>Bienvenido</h1>
            </header>
            <main>
                <p>Contenido principal de la página de inicio</p>
            </main>
        </div>
    );
}