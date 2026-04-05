'use client';

import React, { useState } from 'react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, addMonths, subMonths, isToday, isBefore, startOfToday } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ReservationForm from './ReservationForm';
import ReservationDetails from './ReservationDetails';

interface CalendarProps {
  reservations: { id: string; date: Date; name: string; phone: string; email: string; guests: string; eventType: string; recurrence: 'none' | 'weekly' | 'monthly'; status: 'confirmed' | 'cancelled' }[];
  setReservations: React.Dispatch<React.SetStateAction<{ id: string; date: Date; name: string; phone: string; email: string; guests: string; eventType: string; recurrence: 'none' | 'weekly' | 'monthly'; status: 'confirmed' | 'cancelled' }[]>>;
}

export default function Calendar({ reservations, setReservations }: CalendarProps) {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [selectedReservation, setSelectedReservation] = useState<any>(null);

  const days = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const handleDateClick = (day: Date) => {
    if (isBefore(day, startOfToday())) return;
    
    const reservation = reservations.find(r => isSameDay(r.date, day));
    if (reservation) {
      setSelectedReservation(reservation);
      return;
    }
    
    setSelectedDate(day);
    setShowForm(true);
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100"><ChevronLeft /></button>
        <h2 className="text-xl font-bold">{format(currentMonth, 'MMMM yyyy')}</h2>
        <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100"><ChevronRight /></button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'].map(day => (
          <div key={day} className="text-center font-semibold text-gray-500">{day}</div>
        ))}
        {days.map((day, idx) => {
          const isReserved = reservations.some(r => {
            if (r.status !== 'confirmed') return false;
            if (r.recurrence === 'none') return isSameDay(r.date, day);
            if (r.recurrence === 'weekly') return day.getDay() === r.date.getDay() && isBefore(r.date, day);
            if (r.recurrence === 'monthly') return day.getDate() === r.date.getDate() && isBefore(r.date, day);
            return false;
          });
          const isPast = isBefore(day, startOfToday());
          
          return (
            <button
              key={idx}
              onClick={() => handleDateClick(day)}
              disabled={isPast}
              className={`p-2 rounded-md text-center ${
                isReserved ? 'bg-red-200 text-red-800' : 
                isPast ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 
                'bg-green-100 text-green-800 hover:bg-green-200'
              }`}
            >
              {format(day, 'd')}
            </button>
          );
        })}
      </div>
      {showForm && selectedDate && (
        <ReservationForm 
          date={selectedDate} 
          onClose={() => setShowForm(false)} 
          onAddReservation={(newRes) => setReservations([...reservations, newRes])}
        />
      )}
      {selectedReservation && (
        <ReservationDetails 
          reservation={selectedReservation} 
          selectedDate={selectedDate || selectedReservation.date}
          onClose={() => setSelectedReservation(null)}
          onUpdate={(updated) => {
            setReservations(reservations.map(r => r.id === updated.id ? updated : r));
            setSelectedReservation(null);
          }}
          onCancel={(id) => {
            setReservations(reservations.map(r => r.id === id ? {...r, status: 'cancelled'} : r));
            setSelectedReservation(null);
          }}
        />
      )}
    </div>
  );
}
