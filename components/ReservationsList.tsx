'use client';

import React, { useState } from 'react';
import { format, isSameDay } from 'date-fns';

interface Reservation {
  id: string;
  date: Date;
  name: string;
  phone: string;
  email: string;
  guests: string;
  eventType: string;
  recurrence: 'none' | 'weekly' | 'monthly';
  status: 'confirmed' | 'cancelled';
}

interface ReservationsListProps {
  reservations: Reservation[];
}

export default function ReservationsList({ reservations }: ReservationsListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('');

  const filteredReservations = reservations.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.eventType.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          format(r.date, 'dd/MM/yyyy').includes(searchTerm);
    const matchesType = filterType === '' || r.eventType === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="mt-8 w-full max-w-4xl p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Lista de Reservas</h2>
      <div className="flex gap-4 mb-4">
        <input 
          type="text" 
          placeholder="Buscar por nome, data ou tipo..." 
          value={searchTerm} 
          onChange={e => setSearchTerm(e.target.value)} 
          className="border p-2 rounded flex-grow" 
        />
        <select value={filterType} onChange={e => setFilterType(e.target.value)} className="border p-2 rounded">
          <option value="">Todos os tipos</option>
          <option value="Aniversário">Aniversário</option>
          <option value="Casamento">Casamento</option>
          <option value="Corporativo">Corporativo</option>
          <option value="Outro">Outro</option>
        </select>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th>Data</th>
            <th>Nome</th>
            <th>Tipo</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredReservations.map(r => (
            <tr key={r.id} className="border-t">
              <td className="p-2">{format(r.date, 'dd/MM/yyyy')}</td>
              <td className="p-2">{r.name}</td>
              <td className="p-2">{r.eventType}</td>
              <td className="p-2">{r.status === 'confirmed' ? 'Confirmada' : 'Cancelada'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
