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
  const sortedReservations = [...reservations].sort((a, b) => a.date.getTime() - b.date.getTime());

  return (
    <div className="mt-8 w-full max-w-4xl p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Todas as Reservas</h2>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="p-2">Dia da reserva</th>
            <th className="p-2">Reservado por</th>
          </tr>
        </thead>
        <tbody>
          {sortedReservations.map(r => (
            <tr key={r.id} className="border-t">
              <td className="p-2">{format(r.date, 'dd/MM/yyyy')}</td>
              <td className="p-2">{r.name}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
