import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Reservar() {
    const today = useMemo(() => {
        const now = new Date();
        const offset = now.getTimezoneOffset();
        const adjusted = new Date(now.getTime() - offset * 60 * 1000);
        return adjusted.toISOString().split('T')[0];
    }, []);

    const [selectedDate, setSelectedDate] = useState(today);

    const hours = useMemo(
        () => Array.from({ length: 13 }, (_, index) => `${String(8 + index).padStart(2, '0')}:00`),
        []
    );

    const reservedHours = ['10:00', '13:00', '17:00'];

    return (
        <div className="min-h-screen bg-[#111827] text-white px-4 py-10">
            <div className="max-w-4xl mx-auto">
                <header className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold">Reservar Cita</h1>
                        <p className="text-white/70 text-sm mt-1">Turnos entre las 08:00 y las 20:00 (1 hora por turno)</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <label htmlFor="reservationDate" className="text-sm text-white/70">
                            Fecha
                        </label>
                        <input
                            id="reservationDate"
                            type="date"
                            min={today}
                            value={selectedDate}
                            onChange={(event) => setSelectedDate(event.target.value)}
                            className="bg-white/10 border border-white/20 rounded-md px-3 py-2 text-sm"
                        />
                    </div>
                </header>

                <main className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {hours.map((time) => {
                        const isReserved = reservedHours.includes(time);

                        return (
                            <button
                                key={time}
                                type="button"
                                disabled={isReserved}
                                className={`rounded-lg px-3 py-4 text-sm transition border ${
                                    isReserved
                                        ? 'bg-gray-500/40 border-gray-400/30 text-gray-200 cursor-not-allowed'
                                        : 'bg-emerald-500/20 border-emerald-400/40 text-emerald-200 hover:bg-emerald-500/30'
                                }`}
                            >
                                <p className="font-semibold">{time}</p>
                                <p className="text-xs mt-1 opacity-85">{isReserved ? 'No disponible' : 'Disponible'}</p>
                            </button>
                        );
                    })}
                </main>

                <div className="mt-8 text-sm text-white/70">
                    <p className="mb-1">Referencias:</p>
                    <p>Verde: disponible</p>
                    <p>Gris: no disponible</p>
                </div>

                <div className="mt-6">
                    <Link to="/home" className="text-sky-300 hover:text-sky-200 text-sm underline">
                        Volver al inicio
                    </Link>
                </div>
            </div>
        </div>
    );
}