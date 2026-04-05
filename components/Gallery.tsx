import Image from 'next/image';

export default function Gallery() {
  const photos = [
    { id: 1, seed: 'event-hall', alt: 'Salão de festas' },
    { id: 2, seed: 'wedding-setup', alt: 'Decoração de casamento' },
    { id: 3, seed: 'corporate-event', alt: 'Evento corporativo' },
    { id: 4, seed: 'birthday-party', alt: 'Festa de aniversário' },
  ];

  return (
    <section className="w-full max-w-4xl my-8">
      <h2 className="text-2xl font-bold mb-4">Galeria do Salão</h2>
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
