'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

interface GalleryPhoto {
  id: string;
  url: string;
  alt: string;
  isUploaded?: boolean;
}

const initialPhotos: GalleryPhoto[] = [
  { id: '1', url: 'https://picsum.photos/seed/event-hall/400/400', alt: 'Salão de festas' },
  { id: '2', url: 'https://picsum.photos/seed/wedding-setup/400/400', alt: 'Decoração de casamento' },
  { id: '3', url: 'https://picsum.photos/seed/corporate-event/400/400', alt: 'Evento corporativo' },
  { id: '4', url: 'https://picsum.photos/seed/birthday-party/400/400', alt: 'Festa de aniversário' },
];

export default function Gallery() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>(initialPhotos);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedPhotos = localStorage.getItem('gallery_photos');
    if (savedPhotos) {
      try {
        const parsed = JSON.parse(savedPhotos);
        // Merge initial photos with saved ones, or just use saved ones if they exist
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setPhotos(parsed);
      } catch (e) {
        console.error('Error loading gallery photos', e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('gallery_photos', JSON.stringify(photos));
  }, [photos]);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        const newPhoto: GalleryPhoto = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
          url: base64String,
          alt: file.name,
          isUploaded: true
        };
        setPhotos(prev => [newPhoto, ...prev]);
      };
      reader.readAsDataURL(file);
    });
  };

  const deletePhoto = (id: string) => {
    setPhotos(prev => prev.filter(p => p.id !== id));
  };

  return (
    <section className="w-full max-w-4xl my-8 px-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Galeria do Salão</h2>
          <p className="text-gray-500 mt-1">Compartilhe os melhores momentos do Espaço Sophia.</p>
        </div>
        
        <div className="flex gap-2">
          <input 
            type="file" 
            ref={fileInputRef}
            onChange={handleUpload}
            accept="image/*"
            multiple
            className="hidden"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            className="px-6 py-2.5 bg-purple-600 text-white rounded-full font-medium hover:bg-purple-700 transition-all shadow-md hover:shadow-lg flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
            Adicionar Fotos
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div key={photo.id} className="group relative aspect-square overflow-hidden rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300">
            <Image
              src={photo.url}
              alt={photo.alt}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
              unoptimized={photo.url.startsWith('data:')}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <button 
                onClick={() => deletePhoto(photo.id)}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300"
                title="Excluir foto"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {photos.length === 0 && (
        <div className="text-center py-12 border-2 border-dashed border-gray-200 rounded-3xl">
          <p className="text-gray-400">Nenhuma foto na galeria. Adicione algumas!</p>
        </div>
      )}
    </section>
  );
}
