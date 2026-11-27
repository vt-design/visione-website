
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { Button } from "./components/ui/button";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { usePageMeta } from "./seo";
import { LazyImg } from "./components/LazyImg";
import { useSearchParams } from "react-router-dom";
import { LAYOUT_COLUMNS, layoutMosaic, type Placement } from "./galleryMosaic";

// Variables CSS con la ubicación de una foto en cada tamaño de pantalla
// (index.css elige cuál usar según el ancho).
function placementStyle(layouts: Placement[][], index: number) {
  const style: Record<string, number> = {};
  LAYOUT_COLUMNS.forEach((columns, layout) => {
    const p = layouts[layout][index];
    style[`--c${columns}`] = p.col;
    style[`--w${columns}`] = p.cols;
    style[`--r${columns}`] = p.row;
    style[`--h${columns}`] = p.rows;
  });
  return style as React.CSSProperties;
}

const mosaicLayouts = (ratios: number[]) =>
  LAYOUT_COLUMNS.map((columns) => layoutMosaic(ratios, columns));
const SKELETON_LAYOUTS = mosaicLayouts([1.5, 0.75, 1.33, 1, 1.78, 0.8, 1.5, 1.25, 0.67, 1.5]);

interface GalleryImage {
  id: string;
  url: string;
  alt: string;
  tags: string[];
  width?: number;
  height?: number;
}

// Relación de aspecto real de la foto (si falta, una apaisada típica).
const aspectOf = (image: GalleryImage) =>
  image.width && image.height ? image.width / image.height : 1.5;

interface GalleryResponse {
  images: GalleryImage[];
  nextCursor: string | null;
}

type GalleryCategory = (typeof FILTERS)[number]["value"];

// Primeras imágenes incluidas en el HTML prerenderizado (scripts/prerender.mjs
// las deja en window.__GALLERY__). La página igual las vuelve a pedir al cargar,
// así que lo que se suba a Cloudinary aparece sin tener que volver a publicar.
function getInitialGallery(): GalleryResponse | null {
  const data = (globalThis as { __GALLERY__?: GalleryResponse }).__GALLERY__;
  return data && Array.isArray(data.images) ? data : null;
}


// Cloudinary: pedir la imagen redimensionada y en el mejor formato (AVIF/WebP)
// en lugar del original.
const cld = (url: string, width: number) =>
  url.replace("/image/upload/", `/image/upload/f_auto,q_auto,c_limit,w_${width}/`);
const tileSrcSet = (url: string) =>
  [400, 600, 800, 1200].map((w) => `${cld(url, w)} ${w}w`).join(", ");
const LIGHTBOX_WIDTH = 1600;
const lightboxSrc = (url: string) => cld(url, LIGHTBOX_WIDTH);

// Pide la versión grande apenas el visitante apunta a una foto, para que al
// abrirla ya esté (o casi) descargada.
const prefetched = new Set<string>();
function prefetchLightbox(url: string) {
  const src = lightboxSrc(url);
  if (prefetched.has(src)) return;
  prefetched.add(src);
  const img = new Image();
  img.decoding = "async";
  img.src = src;
}

type Selected = { image: GalleryImage; previewSrc: string };

const FILTERS = [
  { label: "Todos los trabajos", value: "all" },
  { label: "Revestimientos", value: "revestimientos" },
  { label: "Cartelería y Corpóreos", value: "carteleria" },
  { label: "Gráfica y Corporativas", value: "grafica" }
] as const;

export default function GalleryPage() {
  usePageMeta({
    title: "Proyectos y Trabajos Realizados | Visione Publicidad",
    description: "Galería de proyectos de cartelería, letras corpóreas, revestimientos y gráfica corporativa realizados por Visione Publicidad para empresas y locales.",
    path: "/proyectos",
  });

  const [initialGallery] = useState(getInitialGallery);
  const [images, setImages] = useState<GalleryImage[]>(initialGallery?.images ?? []);
  const [nextCursor, setNextCursor] = useState<string | null>(initialGallery?.nextCursor ?? null);
  const [selected, setSelected] = useState<Selected | null>(null);
  const [fullLoaded, setFullLoaded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(initialGallery ? Boolean(initialGallery.nextCursor) : true);

  const loadMoreRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(false);
  // Sube cada vez que termina una carga, para volver a mirar si el final de
  // la galería está a la vista (si lo estaba mientras otra carga seguía en
  // curso, el pedido se descartó y el observador no vuelve a avisar solo).
  const [loadsFinished, setLoadsFinished] = useState(0);

  const [activeFilter, setActiveFilter] =  useState<GalleryCategory>("all");

  const [searchParams, setSearchParams] = useSearchParams();

  // "Ver más fotos" en cada servicio llega con ?filtro=<servicio>. Se aplica
  // después de hidratar porque el HTML prerenderizado muestra "Todos".
  const filterParam = searchParams.get("filtro");
  useEffect(() => {
    const match = FILTERS.find((f) => f.value === filterParam);
    setActiveFilter(match ? match.value : "all");
  }, [filterParam]);

  const openImage = (image: GalleryImage, tile: HTMLElement) => {
    // Se muestra al instante la miniatura que ya está en pantalla y encima
    // aparece la versión grande cuando termina de llegar.
    const thumb = tile.querySelector("img");
    const previewSrc = thumb?.currentSrc && !thumb.currentSrc.startsWith("data:")
      ? thumb.currentSrc
      : cld(image.url, 800);
    prefetchLightbox(image.url);
    setFullLoaded(false);
    setSelected({ image, previewSrc });
  };

  useEffect(() => {
    if (!selected) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelected(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  const visibleImages = useMemo(
    () => images.filter((item) => activeFilter === "all" || item.tags.includes(activeFilter)),
    [images, activeFilter],
  );
  const layouts = useMemo(() => mosaicLayouts(visibleImages.map(aspectOf)), [visibleImages]);

  const selectFilter = (filter: GalleryCategory) => {
    setActiveFilter(filter)
    setSearchParams(filter === "all" ? {} : { filtro: filter }, { replace: true });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  async function loadImages(cursor?: string | null) {
    // Evita solicitudes duplicadas simultáneas.
    if (loadingRef.current) return;
    if (cursor === null && images.length > 0) return;

    loadingRef.current = true;
    // El refresco inicial de imágenes ya mostradas no muestra "Cargando…"
    // (evita que el pie de página salte).
    setLoading(Boolean(cursor) || images.length === 0);
    setError(null);

    try {
      const params = new URLSearchParams();

      if (cursor) {
        params.set("cursor", cursor);
      }

      if (activeFilter !== "all") {
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
      setLoadsFinished((count) => count + 1);
      setLoading(false);
    }
  }

  // Carga las primeras 10 imágenes al abrir la página.
  useEffect(() => {
    void loadImages();
  }, []);

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
  }, [images.length, nextCursor, hasMore, loading, loadsFinished]);

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1a1c18] ff-body flex flex-col justify-between">
      <div>
        <Navbar activePage="galeria"/>
        <main>

        <section className="relative pt-28 pb-10 bg-[#1a1c18] text-white border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-3">
            <h1 className="ff-display font-['Audiowide'] text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight max-w-4xl">
              Galería
            </h1>

            <p className="text-sm md:text-base text-white/80 max-w-2xl font-light leading-relaxed">
              En esta página mostramos los resultados de nuestros trabajos.
            </p>
            <p className="text-sm md:text-base text-white/70 max-w-3xl font-light leading-relaxed">
              Proyectos de revestimientos de frentes en ACM y chapa, letras y logos
              corpóreos, marquesinas, carteles salientes, tótems con iluminación LED,
              gráfica corporativa y vinilos que diseñamos, fabricamos e instalamos para
              empresas, comercios y locales en CABA y en todo el país. Filtrá por tipo de
              trabajo y tocá cualquier foto para verla ampliada.
            </p>
          </div>
        </section>

        <div className="sticky top-16 z-40 border-b border-border/70 bg-background/95 md:bg-background/90 md:backdrop-blur-xl">
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
          <div className="gallery-mosaic-wrap">
          <div className="gallery-mosaic">
            {/* Mientras llegan las imágenes, se reservan casilleros parecidos
                para que el resto de la página no salte al cargarlas. */}
            {images.length === 0 && hasMore && !error &&
              SKELETON_LAYOUTS[0].map((_, index) => (
                <div
                  key={index}
                  aria-hidden="true"
                  className="gallery-mosaic-tile animate-pulse bg-black/5"
                  style={placementStyle(SKELETON_LAYOUTS, index)}
                />
              ))}
            {visibleImages.map((item, index) => {
              const featured = layouts.some((layout) => layout[index].cols > 1);
              return (
              <button
                key={item.id}
                type="button"
                aria-label={`Ampliar obra ${index + 1}`}
                onPointerEnter={() => prefetchLightbox(item.url)}
                onPointerDown={() => prefetchLightbox(item.url)}
                onClick={(event) => openImage(item, event.currentTarget)}
                className="gallery-mosaic-tile group relative block cursor-pointer overflow-hidden bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a5cd38] focus-visible:ring-offset-2"
                style={placementStyle(layouts, index)}
              >
                <LazyImg
                  src={cld(item.url, 800)}
                  srcSet={tileSrcSet(item.url)}
                  sizes={featured
                    ? "(max-width: 767px) 100vw, (max-width: 1023px) 66vw, 50vw"
                    : "(max-width: 767px) 50vw, (max-width: 1023px) 33vw, 25vw"}
                  alt={item.alt || `Obra ${index + 1}`}
                  width={item.width}
                  height={item.height}
                  className="block h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-focus-visible:scale-105"
                  eager={index < 4}
                  {...(index < 2 ? { fetchpriority: "high" } : {})}
                  draggable={false}
                />
              </button>
              );
            })}
          </div>
          </div>

          <div
            ref={loadMoreRef}
            className="h-2"
            aria-hidden="true"
          />

          {loading && images.length > 0 && (
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

        {selected && (
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Vista ampliada"
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 md:p-12"
            onClick={() => setSelected(null)}
          >
            <div
              className="relative overflow-hidden rounded-sm bg-black shadow-2xl"
              style={{
                aspectRatio: aspectOf(selected.image),
                // Lo más grande posible sin pasar el 100% del ancho ni el 85% del alto.
                width: `min(100%, ${aspectOf(selected.image) * 85}vh)`,
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={selected.previewSrc}
                alt=""
                aria-hidden="true"
                className="absolute inset-0 h-full w-full object-contain"
              />
              <img
                key={selected.image.id}
                src={lightboxSrc(selected.image.url)}
                alt={selected.image.alt || "Vista ampliada"}
                onLoad={() => setFullLoaded(true)}
                className={`absolute inset-0 h-full w-full object-contain transition-opacity duration-300 ${fullLoaded ? "opacity-100" : "opacity-0"}`}
              />
              <Button
                variant="ghost"
                size="icon"
                aria-label="Cerrar vista ampliada"
                onClick={() => setSelected(null)}
                className="absolute top-3 right-3 z-10 bg-black/55 hover:bg-primary hover:text-primary-foreground text-white rounded-full transition-colors"
              >
                <X size={20} />
              </Button>
            </div>
          </div>
        )}
      </main>
      </div>

      <Footer />
    </div>
  );
}
