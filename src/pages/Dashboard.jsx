import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function Dashboard() {
    

    return (
         <div className="home-container pt-28">
            <Navbar />
            <header>
                <h1>Dashboard</h1>
            </header>
            <main>
                <p>Contenido principal de la página de dashboard</p>
            </main>
        </div>
    );
}