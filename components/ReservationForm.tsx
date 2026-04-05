'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';

interface ReservationFormProps {
  date: Date;
  onClose: () => void;
  onAddReservation: (reservation: any) => void;
}

export default function ReservationForm({ date, onClose, onAddReservation }: ReservationFormProps) {
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', guests: '', eventType: '', recurrence: 'none' });
  const [errors, setErrors] = useState({ name: '', phone: '', email: '', guests: '', eventType: '', recurrence: '' });

  const validate = () => {
    let isValid = true;
    const newErrors = { name: '', phone: '', email: '', guests: '', eventType: '', recurrence: '' };

    if (!formData.name) { newErrors.name = 'Nome é obrigatório'; isValid = false; }
    if (!formData.phone) { newErrors.phone = 'Telefone é obrigatório'; isValid = false; }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email inválido';
      isValid = false;
    }
    if (!formData.guests || parseInt(formData.guests) <= 0) { newErrors.guests = 'Número de convidados inválido'; isValid = false; }
    if (!formData.eventType) { newErrors.eventType = 'Tipo de evento é obrigatório'; isValid = false; }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onAddReservation({
        id: Date.now().toString(),
        date: date,
        ...formData,
        status: 'confirmed'
      });
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Reservar para {format(date, 'dd/MM/yyyy')}</h2>
        
        <div className="mb-4">
          <label className="block text-sm font-medium">Nome</label>
          <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full border p-2 rounded" />
          {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Telefone</label>
          <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full border p-2 rounded" />
          {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Email</label>
          <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full border p-2 rounded" />
          {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Número de Convidados</label>
          <input type="number" value={formData.guests} onChange={e => setFormData({...formData, guests: e.target.value})} className="w-full border p-2 rounded" />
          {errors.guests && <p className="text-red-500 text-xs">{errors.guests}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Tipo de Evento</label>
          <select value={formData.eventType} onChange={e => setFormData({...formData, eventType: e.target.value})} className="w-full border p-2 rounded">
            <option value="">Selecione...</option>
            <option value="Aniversário">Aniversário</option>
            <option value="Casamento">Casamento</option>
            <option value="Corporativo">Corporativo</option>
            <option value="Outro">Outro</option>
          </select>
          {errors.eventType && <p className="text-red-500 text-xs">{errors.eventType}</p>}
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Recorrência</label>
          <select value={formData.recurrence} onChange={e => setFormData({...formData, recurrence: e.target.value})} className="w-full border p-2 rounded">
            <option value="none">Nenhuma</option>
            <option value="weekly">Semanal</option>
            <option value="monthly">Mensal</option>
          </select>
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-200 rounded">Cancelar</button>
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded">Confirmar Reserva</button>
        </div>
      </form>
    </div>
  );
}
