import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Button } from "./components/ui/button";
import { X } from "lucide-react";

interface GalleryPageProps {
  onNavigate: (page: string) => void;
}

// ASYMMETRIC / MASONRY PLACEHOLDERS & IMAGES (VARIED RATIOS & ORIENTATIONS)
const INITIAL_IMAGES = [
  { url: "https://images.unsplash.com/photo-1780385187604-4663a1d7c6e6?w=800&h=1200&fit=crop&auto=format" },
  { url: "https://images.unsplash.com/photo-1760787545864-b468b6fe2c92?w=800&h=500&fit=crop&auto=format" },
  { url: "https://images.unsplash.com/photo-1564182842834-681b7be6de4b?w=800&h=900&fit=crop&auto=format" },
  { url: "https://images.unsplash.com/photo-1780565081532-0f68d721e44a?w=800&h=1300&fit=crop&auto=format" },
  { url: "https://images.unsplash.com/photo-1779614800682-0c0cea8e0cd5?w=800&h=600&fit=crop&auto=format" },
  { url: "https://images.unsplash.com/photo-1608126841830-53832c4b326f?w=800&h=1000&fit=crop&auto=format" },
  { url: "https://images.unsplash.com/photo-1551520692-7cdc7dc041b1?w=800&h=750&fit=crop&auto=format" },
  { url: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=800&h=1150&fit=crop&auto=format" },
  { url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&h=650&fit=crop&auto=format" },
];

const MORE_IMAGES = [
  { url: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=1100&fit=crop&auto=format" },
  { url: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop&auto=format" },
  { url: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&h=1200&fit=crop&auto=format" },
  { url: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&h=700&fit=crop&auto=format" },
  { url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&h=1050&fit=crop&auto=format" },
  { url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=800&fit=crop&auto=format" },
];

const GALLERY_IMAGES = [...INITIAL_IMAGES, ...MORE_IMAGES];
const TILES_PER_CYCLE = 10;

export default function GalleryPage({ onNavigate }: GalleryPageProps) {
  const [cycles, setCycles] = useState(2);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Append full patterns in one grid so existing photos never reflow.
  useEffect(() => {
    const sentinel = loadMoreRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        setCycles((previous) => previous + 1);
      },
      { rootMargin: "600px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [cycles]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1a1c18] ff-body flex flex-col justify-between">
      <div>
        <Navbar activePage="galeria" onNavigate={onNavigate} />

        {/* COMPACT HERO HEADER SECTION */}
        <section className="relative pt-28 pb-10 bg-[#1a1c18] text-white border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-3">
            <h1 className="ff-display font-['Audiowide'] text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight max-w-4xl">
              Galería
            </h1>
            <p className="text-sm md:text-base text-white/80 max-w-2xl font-light leading-relaxed">
              En esta página mostramos los resultados de nuestros trabajos.
            </p>
          </div>
        </section>

        {/* Continuous, staggered mosaic with no captions or clipped tiles. */}
        <section className="py-12 max-w-7xl mx-auto px-12">
          <div className="gallery-mosaic">
            {Array.from({ length: cycles * TILES_PER_CYCLE }, (_, index) => {
              const item = GALLERY_IMAGES[index % GALLERY_IMAGES.length];
              return (
                <Button
                  key={index}
                  variant="ghost"
                  aria-label={`Ampliar obra ${index + 1}`}
                  onClick={() => setSelectedImg(item.url)}
                  className={`gallery-mosaic-tile gallery-mosaic-t${(index % TILES_PER_CYCLE) + 1} group block h-auto w-full min-w-0 overflow-hidden rounded-none p-0 bg-transparent hover:bg-transparent`}
                  style={{ "--gallery-cycle": Math.floor(index / TILES_PER_CYCLE) } as React.CSSProperties}
                >
                  <img
                    src={item.url}
                    alt={`Obra ${index + 1}`}
                    className="block w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
                    loading="lazy"
                    draggable={false}
                  />
                </Button>
              );
            })}
          </div>
          <div ref={loadMoreRef} className="h-2" aria-hidden="true" />
        </section>

        {/* LIGHTBOX MODAL */}
        {selectedImg && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImg(null)}
          >
            <div
              className="relative max-w-5xl w-full bg-[#1a1c18] border border-white/20 rounded-sm overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <Button
                variant="ghost"
                size="icon"
                aria-label="Cerrar vista ampliada"
                onClick={() => setSelectedImg(null)}
                className="absolute top-4 right-4 z-10 bg-foreground/60 hover:bg-primary hover:text-primary-foreground text-white rounded-full transition-colors"
              >
                <X size={20} />
              </Button>
              <img
                src={selectedImg}
                alt="Vista ampliada"
                className="w-full max-h-[82vh] object-contain bg-black"
              />
            </div>
          </div>
        )}
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
