'use client';

import React, { useState, useEffect } from 'react';
import Calendar from '../components/Calendar';
import ReservationsList from '../components/ReservationsList';
import Gallery from '../components/Gallery';

const initialReservations: { id: string; date: Date; name: string; phone: string; email: string; guests: string; eventType: string; recurrence: 'none' | 'weekly' | 'monthly'; status: 'confirmed' | 'cancelled' }[] = [
  { id: '1', date: new Date(2026, 3, 10), name: 'João', phone: '123', email: 'joao@email.com', guests: '10', eventType: 'Aniversário', recurrence: 'none', status: 'confirmed' },
  { id: '2', date: new Date(2026, 3, 15), name: 'Maria', phone: '456', email: 'maria@email.com', guests: '20', eventType: 'Casamento', recurrence: 'weekly', status: 'confirmed' },
];

export default function Home() {
  const [reservations, setReservations] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('reservations');
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.map((r: any) => ({ ...r, date: new Date(r.date) }));
      }
    }
    return initialReservations;
  });
  const [showList, setShowList] = useState(false);

  useEffect(() => {
    localStorage.setItem('reservations', JSON.stringify(reservations));
  }, [reservations]);

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <header className="max-w-4xl mx-auto mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Espaço Sophia</h1>
        <p className="text-xl text-gray-600">O lugar perfeito para celebrar seus momentos especiais.</p>
      </header>
      
      <div className="flex flex-col items-center">
        <Gallery />
        <Calendar reservations={reservations} setReservations={setReservations} />
        
        <button 
          onClick={() => setShowList(!showList)}
          className="mt-8 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition"
        >
          {showList ? 'Ocultar Lista de Reservas' : 'Listar Todas as Reservas'}
        </button>

        {showList && <ReservationsList reservations={reservations} />}
      </div>

      <footer className="max-w-4xl mx-auto mt-16 pt-8 border-t text-center text-gray-500">
        <p>&copy; 2026 Espaço Sophia. Todos os direitos reservados.</p>
      </footer>
    </main>
  );
}
