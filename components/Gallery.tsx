'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const initialPhotos = [
  { id: 1, seed: 'event-hall', alt: 'Salão de festas' },
  { id: 2, seed: 'wedding-setup', alt: 'Decoração de casamento' },
  { id: 3, seed: 'corporate-event', alt: 'Evento corporativo' },
  { id: 4, seed: 'birthday-party', alt: 'Festa de aniversário' },
];

const seeds = ['party', 'dance', 'lights', 'cake', 'music', 'flowers', 'balloons', 'champagne'];

export default function Gallery() {
  const [photos, setPhotos] = useState(initialPhotos);

  const randomizePhotos = () => {
    setPhotos(prev => prev.map(p => ({
      ...p,
      seed: seeds[Math.floor(Math.random() * seeds.length)] + Math.random()
    })));
  };

  return (
    <section className="w-full max-w-4xl my-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Galeria do Salão</h2>
        <button 
          onClick={randomizePhotos}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
        >
          Trocar Fotos
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="relative aspect-square overflow-hidden rounded-lg shadow-md">
            <Image
              src={`https://picsum.photos/seed/${photo.seed}/400/400`}
              alt={photo.alt}
              fill
              className="object-cover hover:scale-105 transition-transform duration-300"
              referrerPolicy="no-referrer"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
