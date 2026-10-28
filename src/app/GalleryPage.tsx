
import React, { useState, useEffect, useRef } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Button } from "./components/ui/button";
import { X } from "lucide-react";
import { motion } from "motion/react";

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
}

interface GalleryResponse {
  images: GalleryImage[];
  nextCursor: string | null;
}

type GalleryCategory = (typeof FILTERS)[number]["value"];

const TILES_PER_CYCLE = 10;

const FILTERS = [
  { label: "Todos los trabajos", value: "all" },
  { label: "Revestimientos", value: "revestimientos" },
  { label: "Cartelería y Corpóreos", value: "carteleria" },
  { label: "Gráfica y Corporativas", value: "grafica" }
] as const;

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [nextCursor, setNextCursor] = useState<string | null>(null);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);

  const [activeFilter, setActiveFilter] =  useState<GalleryCategory>("all");

  const selectFilter = (filter: GalleryCategory) => {
    setActiveFilter(filter)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  async function loadImages(cursor?: string | null) {
    // Evita solicitudes duplicadas simultáneas.
    if (loadingRef.current) return;
    if (cursor === null && images.length > 0) return;

    loadingRef.current = true;
    setLoading(true);
    setError(null);

    try {
      const params = new URLSearchParams();

      if (cursor) {
        params.set("cursor", cursor);
      }

      if (activeFilter !== "all") {
        console.log(`active filer: ${activeFilter}`)
        params.set('tag', activeFilter)
      }

      const response = await fetch(
        `/.netlify/functions/galeria?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("No se pudieron cargar las imágenes.");
      }

      const data: GalleryResponse = await response.json();

      setImages((previous) => {
        // La primera solicitud reemplaza las imágenes;
        // las siguientes agregan otras 10.
        if (!cursor) return data.images;

        // Evita duplicados si la API devuelve algún recurso repetido.
        const existingIds = new Set(previous.map((image) => image.id));
        const newImages = data.images.filter(
          (image) => !existingIds.has(image.id)
        );

        return [...previous, ...newImages];
      });

      setNextCursor(data.nextCursor);
      setHasMore(Boolean(data.nextCursor));
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Ocurrió un error inesperado."
      );
    } finally {
      loadingRef.current = false;
      setLoading(false);
    }
  }

  // Carga las primeras 10 imágenes al abrir la página.
  useEffect(() => {
    void loadImages();
  }, [activeFilter]);

  // Carga otras 10 cuando el visitante se acerca al final.
  useEffect(() => {
    const sentinel = loadMoreRef.current;

    if (!sentinel || !images.length || !hasMore || loading) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();
        void loadImages(nextCursor);
      },
      { rootMargin: "600px" }
    );

    observer.observe(sentinel);

    return () => observer.disconnect();
  }, [images.length, nextCursor, hasMore, loading]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1a1c18] ff-body flex flex-col justify-between">
      <div>
        <Navbar activePage="galeria"/>

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

        <div className="sticky top-16 z-40 border-b border-border/70 bg-background/90 backdrop-blur-xl">
          <nav
            aria-label="Filtrar trabajos"
            className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-6 py-3 md:justify-center md:px-12 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {FILTERS.map((filter) => {
              const isActive = activeFilter === filter.value;
              return (
                <Button
                  key={filter.value}
                  type="button"
                  variant="ghost"
                  aria-pressed={isActive}
                  onClick={() => selectFilter(filter.value)}
                  className={`relative h-9 shrink-0 overflow-hidden  px-4 text-xs font-semibold tracking-wide transition-colors duration-300 rounded-xs ${
                    isActive ? "text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="gallery-active-filter"
                      className="absolute inset-0 bg-primary"
                      transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    />
                  )}
                  <span className="relative z-10">{filter.label}</span>
                </Button>
              );
            })}
          </nav>
        </div>


        <section className="py-12 max-w-7xl mx-auto px-6 md:px-12">
          <div className="gallery-mosaic">
            {images.map((item, index) => (
              <Button
                key={item.id}
                variant="ghost"
                aria-label={`Ampliar obra ${index + 1}`}
                onClick={() => setSelectedImg(item.url)}
                className={`gallery-mosaic-tile gallery-mosaic-t${(index % TILES_PER_CYCLE) + 1} group block h-auto w-full min-w-0 overflow-hidden rounded-none p-0 bg-transparent hover:bg-transparent`}
                style={{
                  "--gallery-cycle": Math.floor(index / TILES_PER_CYCLE),
                } as React.CSSProperties}
              >
                <img
                  src={item.url}
                  alt={item.alt || `Obra ${index + 1}`}
                  className="block w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
                  loading="lazy"
                  draggable={false}
                />
              </Button>
            ))}
          </div>

          <div
            ref={loadMoreRef}
            className="h-2"
            aria-hidden="true"
          />

          {loading && (
            <p className="py-6 text-center text-sm text-gray-500">
              Cargando imágenes...
            </p>
          )}

          {error && (
            <div className="py-6 text-center" role="alert">
              <p className="text-red-600 mb-3">Error al cargas las imágenes</p>
              <Button
                variant="ghost"
                onClick={() => void loadImages(nextCursor)}
              >
                Reintentar
              </Button>
            </div>
          )}

          {!loading && images.length === 0 && !error && (
            <p className="py-6 text-center text-gray-500">
              Todavía no hay imágenes disponibles.
            </p>
          )}

          {!hasMore && images.length > 0 && (
            <p className="py-6 text-center text-sm text-gray-500">
              Ya viste todas las imágenes.
            </p>
          )}
        </section>

        {selectedImg && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelectedImg(null)}
          >
            <div
              className="relative max-w-5xl w-full bg-[#1a1c18] border border-white/20 rounded-sm overflow-hidden"
              onClick={(event) => event.stopPropagation()}
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

      <Footer />
    </div>
  );
}
