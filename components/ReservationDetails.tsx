'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';

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

interface ReservationDetailsProps {
  reservation: Reservation;
  selectedDate: Date;
  onClose: () => void;
  onUpdate: (updatedReservation: Reservation) => void;
  onCancel: (id: string) => void;
}

export default function ReservationDetails({ reservation, selectedDate, onClose, onUpdate, onCancel }: ReservationDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState(reservation);

  const handleSave = () => {
    onUpdate(formData);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Detalhes da Reserva</h2>
        
        {isEditing ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Nome</label>
              <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Telefone</label>
              <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Número de Convidados</label>
              <input type="number" value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})} className="w-full border p-2 rounded" />
            </div>
            <div>
              <label className="block text-sm font-medium">Tipo de Evento</label>
              <select value={formData.eventType} onChange={e => setFormData({...formData, eventType: e.target.value})} className="w-full border p-2 rounded">
                <option value="Aniversário">Aniversário</option>
                <option value="Casamento">Casamento</option>
                <option value="Corporativo">Corporativo</option>
                <option value="Outro">Outro</option>
              </select>
            </div>
            <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded w-full">Salvar</button>
          </div>
        ) : (
          <div className="space-y-2">
            <p><strong>Data:</strong> {format(selectedDate, 'dd/MM/yyyy')}</p>
            <p><strong>Nome:</strong> {reservation.name}</p>
            <p><strong>Telefone:</strong> {reservation.phone}</p>
            <p><strong>Email:</strong> {reservation.email}</p>
            <p><strong>Convidados:</strong> {reservation.guests}</p>
            <p><strong>Tipo de Evento:</strong> {reservation.eventType}</p>
            <p><strong>Recorrência:</strong> {reservation.recurrence === 'weekly' ? 'Semanal' : reservation.recurrence === 'monthly' ? 'Mensal' : 'Nenhuma'}</p>
            <p><strong>Status:</strong> {reservation.status}</p>
            
            {reservation.status === 'confirmed' && (
              <div className="flex gap-2 mt-4">
                <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-yellow-500 text-white rounded">Editar</button>
                <button onClick={() => onCancel(reservation.id)} className="px-4 py-2 bg-red-600 text-white rounded">Cancelar Reserva</button>
              </div>
            )}
          </div>
        )}
        
        <button onClick={onClose} className="mt-4 px-4 py-2 bg-gray-200 rounded w-full">Fechar</button>
      </div>
    </div>
  );
}
