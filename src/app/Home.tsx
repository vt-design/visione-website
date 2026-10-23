import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ServicePage } from "./components/ServicePage";
import AboutPage from "./AboutPage";
import GalleryPage from "./GalleryPage";
import ContactPage from "./ContactPage";
import NotFoundPage from "./NotFoundPage";
// import logoImg from "../assets/logo-visione.png";
import { Avatar, AvatarImage, AvatarFallback } from "./components/ui/avatar";
import { useNavigate } from "react-router-dom";

// ─── DATA & CONSTANTS ────────────────────────────────────────────────────────

const HERO_SLIDES = [
  {
    image: "/images/imagen-hero-1-uca.webp",
    title: "MÁS DE 25 AÑOS DE EXPERIENCIA",
    titleLines: [
      [{ text: "MÁS DE" }],
      [{ text: "25 AÑOS", accent: true }, { text: " DE" }],
      [{ text: "EXPERIENCIA" }],
    ],
    subtitle:
      "Soluciones combinando conocimiento, calidad y compromiso en cada proyecto.",
  },
  {
    image: "/images/imagen-hero-2-cronica.webp",
    title: "TRANSFORMAMOS ESPACIOS. POTENCIAMOS MARCAS",
    titleLines: [
      [{ text: "TRANS-" }],
      [{ text: "FORMAMOS.", accent: true}],
      [{ text: "POTENCIAMOS" }],
    ],
    subtitle:
      "Revestimientos y cartelería que transforman fachadas y destacan tu marca.",
  },
  {
    image: "/images/imagen-hero-3-continental.webp",
    title: "UNA MARCA, LA MISMA CALIDAD EN CADA PUNTO DEL PAÍS",
    titleLines: [
      [{ text: "UNA MARCA," }],
      [{ text: "CALIDAD", accent: true }, {text: " EN"}],
      [{text: "TODO EL PAIS"}]
    ],
    subtitle:
      "Llegamos a cada destino con la misma dedicación y excelencia.",
  },
];

const CLIENT_LOGOS = [
  { name: "ADIDAS", src: "/images/imagenes-clientes/adidas-com-logo.png" },
  { name: "BAYER S.A.", src: "/images/imagenes-clientes/bayer-com-logo.png" },
  { name: "MERCEDES BENZ", src: "/images/imagenes-clientes/mbfs-com-logo.png" },
  { name: "BRIDGESTONE", src: "/images/imagenes-clientes/logo-bridgestone.png" },
  { name: "GALENO", src: "/images/imagenes-clientes/logo-galeno.webp" },
  { name: "RENAULT", src: "/images/imagenes-clientes/logo-renault.png" },
  { name: "ROYAL ENFIELD", src: "/images/imagenes-clientes/logo-royal-enfield.webp" },
  { name: "MARKOVA", src: "/images/imagenes-clientes/logo-markova.svg" },
  { name: "ICBC", src: "/images/imagenes-clientes/logo-icbc.svg" },
  { name: "LEVIS", src: "/images/imagenes-clientes/logo-levis.svg" },
  { name: "SAO", src: "/images/imagenes-clientes/sao-logo.svg" },
  { name: "MONTAGNE", src: "/images/imagenes-clientes/montagne-logo.svg" },
];

const SERVICE_CARDS = [
  {
    num: "01",
    title: "REVESTIMIENTO DE FACHADAS",
    desc: "Renovamos fachadas con soluciones de revestimiento que combinan diseño, calidad y durabilidad.",
    tags: "ACM · CHAPA · PLEGADOS · CALADOS",
    photo: "/images/imagen-servicio-revestimiento.webp",
    page: "/servicios/revestimientos",
  },
  {
    num: "02",
    title: "CARTELERÍA Y LETRAS CORPOREAS",
    desc: "Diseñamos y producimos carteles y letras con y sin iluminación para destacar cada marca.",
    tags: "ACM · ACRILICO · CHAPA · ACERO · LED",
    photo: "/images/imagen-servicio-carteleria.webp",
    page: "/servicios/carteleria",
  },
  {
    num: "03",
    title: "GRÁFICA CORPORATIVA",
    desc: "Soluciones gráficas para comunicar la identidad de empresas e instituciones.",
    tags: "SEÑALETICA · VINILOS · PLOTEO ",
    photo: "/images/imagen-servicio-grafica.webp",
    page: "/servicios/grafica",
  },
];

const MOSAIC_TILES = [
  {
    id: "t1",
    url: "/images/mosaic-images/imagen-mosaico-1.webp",
    alt: "Cartelería exterior iluminada",
    points: "0,0 900,0 790,320 0,250",
    frame: { x: 0, y: 0, width: 900, height: 320 },
  },
  {
    id: "t2",
    url: "/images/mosaic-images/imagen-mosaico-2.webp",
    alt: "Fachada comercial revestida",
    points: "900,0 1600,0 1600,400 790,320",
    frame: { x: 790, y: 0, width: 810, height: 400 },
  },
  {
    id: "t3",
    url: "/images/mosaic-images/imagen-mosaico-3.webp",
    alt: "Montaje de estructura industrial",
    points: "0,250 790,320 650,740 0,810",
    frame: { x: 0, y: 250, width: 790, height: 560 },
  },
  {
    id: "t4",
    url: "/images/mosaic-images/imagen-mosaico-4.webp",
    alt: "Gráfica aplicada en espacio comercial",
    points: "790,320 1600,400 1600,650 650,740",
    frame: { x: 650, y: 320, width: 950, height: 420 },
  },
  {
    id: "t5",
    url: "/images/mosaic-images/imagen-mosaico-5.webp",
    alt: "Señalética urbana de gran formato",
    points: "0,810 650,740 560,1000 0,1000",
    frame: { x: 0, y: 740, width: 650, height: 260 },
  },
  {
    id: "t6",
    url: "/images/mosaic-images/imagen-mosaico-6.webp",
    alt: "Revestimiento arquitectónico contemporáneo",
    points: "650,740 1600,650 1600,1000 560,1000",
    frame: { x: 560, y: 650, width: 1040, height: 350 },
  },
];

const REVIEWS = [
  {
    quote:
      "Exclente trabajo!! Hemos hecho trabajos con Visione desde el año 2009, siempre excelente y este ultimo recien instalado muestra una empresa con amplia experiencia y profesionalismo. Lo mejor, no solo cumplen los plazos sino que los mejoran. Gracias Cristian por tu impecable atención y trabajo.",
    name: "Sebastián",
    company: "Todo Tartas",
    photo: "/images/imagen-review-1.webp",
  },
  {
    quote:
      "Excelente servicio y calidad. Hace años que realizamos trabajos con Visione y cumplen con todo en tiempo y forma. De primera la atención de Cristian y de Ariel, lo recomendamos.",
    name: "Martín",
    company: "Hus Realty",
    photo: "/images/imagen-review-2.webp",
  },
  {
    quote:
      "Excepcional servicio como siempre. Completamente agradecidos por el trabajo realizado en nuestra nueva oficina. ¡Muchas gracias Visione Publicidad!",
    name: "Tomas",
    company: "Salaya Romera",
    photo: "/images/imagen-review-3.webp",
  },
];

const VALID_PAGES = ["home", "carteleria", "grafica", "revestimientos", "nosotros", "galeria", "contacto"];

// ─── PHOTO MOSAIC SECTION ────────────────────────────────────────────────────

function PhotoMosaicSection() {
  const mosaicRef = useRef<SVGSVGElement | null>(null);
  const [visible, setVisible] = useState<boolean[]>(new Array(MOSAIC_TILES.length).fill(false));
  const navigate = useNavigate();

  const handleNav = (page: string, e: React.MouseEvent) => {
      e.preventDefault();
      navigate(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

  useEffect(() => {
    const mosaic = mosaicRef.current;
    if (!mosaic) return;

    const timers: ReturnType<typeof setTimeout>[] = [];
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        MOSAIC_TILES.forEach((_, i) => {
          timers.push(
            setTimeout(() => {
              setVisible((previous) => {
                const next = [...previous];
                next[i] = true;
                return next;
              });
            }, i * 110),
          );
        });
        observer.disconnect();
      },
      { threshold: 0.12 },
    );

    observer.observe(mosaic);
    return () => {
      observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);



  /**
   * bg-[#1a1c18]
   * text-white
   */
  return (
    <section className="bg-[#f8f9fa] text-white py-20 lg:py-28 border-t border-white/10 w-full flex justify-center">
      <div className="w-full px-[48px] space-y-12 max-w-7xl">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          {/* <span className="text-xs font-mono font-bold text-[#a5cd38] uppercase tracking-widest">
            Obras Realizadas
          </span> */}
          <h2 className="font-['Audiowide'] text-3xl md:text-5xl font-bold tracking-tight uppercase text-[#1a1c18]">
            Nuestra Galería
          </h2>
          <div className="w-16 h-1 bg-[#a5cd38] mx-auto" />
          <p className="text-[#1a1c18]/70 text-base md:text-lg font-light">
            Proyectos de cartelería, gráfica y revestimiento entregados en todo el país.
          </p>
        </div>

        <svg
          ref={mosaicRef}
          className="home-collage"
          viewBox="0 0 1600 1000"
          role="img"
          aria-labelledby="home-collage-title"
          preserveAspectRatio="xMidYMid meet"
        >
          <title id="home-collage-title">Selección de obras realizadas</title>
          <defs>
            {MOSAIC_TILES.map((tile) => (
              <clipPath key={tile.id} id={`home-collage-clip-${tile.id}`} clipPathUnits="userSpaceOnUse">
                <polygon points={tile.points} />
              </clipPath>
            ))}
          </defs>

          {MOSAIC_TILES.map((tile, i) => (
            <g
              key={tile.id}
              role="img"
              aria-label={tile.alt}
              className={`home-collage-tile ${visible[i]
                  ? "home-collage-visible"
                  : i % 2 === 0
                    ? "home-collage-enter-left"
                    : "home-collage-enter-right"
                }`}
            >
              <image
                href={tile.url}
                x={tile.frame.x}
                y={tile.frame.y}
                width={tile.frame.width}
                height={tile.frame.height}
                preserveAspectRatio="xMidYMid slice"
                clipPath={`url(#home-collage-clip-${tile.id})`}
              />
              <polygon
                className="home-collage-outline"
                points={tile.points}
                fill="none"
                stroke="#f8f9fa"
                strokeWidth="18"
                strokeLinejoin="round"
              />
            </g>
          ))}
        </svg>

        <div className="text-center pt-4">
          <button
            onClick={(e) => handleNav("/galeria", e)}
            className="btn-wipe btn-wipe-primary px-8 py-4 bg-[#a5cd38] text-[#1a1c18] font-bold text-xs tracking-wider uppercase rounded-xs shadow-lg inline-flex items-center gap-3 cursor-pointer"
          >
            <span>Ver Galería Completa</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>)
}

function HeroSlideCopy({
  slide,
}: {
  slide: (typeof HERO_SLIDES)[number];
}) {
  const navigate = useNavigate();
  const handleNav = (page: string, e: React.MouseEvent) => {
      e.preventDefault();
      navigate(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

  return (
    <>
      <div className="h-[11rem] sm:h-[12rem] lg:h-[18rem] flex items-center">
        <h1 className="ff-display font-['Audiowide'] text-[clamp(1.4rem,6vw,4.5rem)] font-bold tracking-tight text-white uppercase leading-[1.05]">
          {slide.titleLines.map((line, lineIndex) => (
            <span key={lineIndex} className="block whitespace-nowrap">
              {line.map((segment, segmentIndex) => (
                <span
                  key={segmentIndex}
                  className={segment.accent ? "text-[#a5cd38]" : undefined}
                >
                  {segment.text}
                </span>
              ))}
            </span>
          ))}
        </h1>
      </div>
      <div className="h-[4.5rem] sm:h-[3.5rem]">
        <p className="text-base sm:text-xl text-white/90 leading-relaxed font-light max-w-2xl">
          {slide.subtitle}
        </p>
      </div>
       <div className="pt-4 flex items-start">
        <button
          onClick={(e) => handleNav("/contacto", e)}
          className="btn-wipe btn-wipe-primary px-8 py-4 bg-[#a5cd38] text-[#1a1c18] font-bold text-xs tracking-wider uppercase rounded-xs shadow-lg flex items-center gap-3 whitespace-nowrap"
        >
          <span>Solicitar Cotización</span>
          <ArrowRight size={16} />
        </button>
      </div>
    </>
  );
}

// ─── MAIN APP COMPONENT ───────────────────────────────────────────────────────

export default function HomePage() {
  // const [activePage, setActivePage] = useState("home");
  const [heroIndex, setHeroIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [incoming, setIncoming] = useState<{ idx: number; key: number } | null>(null);
  const heroIndexRef = useRef(0);

  const navigate = useNavigate();
  const handleNav = (page: string, e: React.MouseEvent) => {
      e.preventDefault();
      navigate(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    };

  useEffect(() => {
    // if (activePage !== "home") return;
    const interval = setInterval(() => {
      const next = (heroIndexRef.current + 1) % HERO_SLIDES.length;
      setIncoming({ idx: next, key: Date.now() });
      setTimeout(() => {
        heroIndexRef.current = next;
        setHeroIndex(next);
        setIncoming(null);
      }, 850);
    }, 3800);
    return () => clearInterval(interval);
  }, []);

  
  /* 
    gradiente del hero

    <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
    <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c18] via-transparent to-black/30" />
  */

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1a1c18] ff-body selection:bg-[#a5cd38] selection:text-[#1a1c18] flex flex-col justify-between">
      <div>
        <Navbar activePage="home" />

        {/* HERO SECTION */}
        <section className="relative h-screen bg-[#1a1c18] overflow-hidden flex items-center">
          <div className="absolute inset-0 overflow-hidden">
            <style>{`
              @keyframes heroWipeIn {
                from { transform: translateX(100%); }
                to   { transform: translateX(0); }
              }
              @keyframes heroCopyWipeIn {
                from { transform: translateX(100vw); }
                to   { transform: translateX(0); }
              }
              @keyframes heroCopyWipeOut {
                from { transform: translateX(0); }
                to   { transform: translateX(-100vw); }
              }
              .hero-wipe-in {
                animation: heroWipeIn 0.82s cubic-bezier(0.77, 0, 0.175, 1) forwards;
              }
              .hero-copy-wipe-in {
                animation: heroCopyWipeIn 0.82s cubic-bezier(0.77, 0, 0.175, 1) forwards;
              }
              .hero-copy-wipe-out {
                animation: heroCopyWipeOut 0.82s cubic-bezier(0.77, 0, 0.175, 1) forwards;
              }
            `}</style>
            {/* Base layer — current image, stays in place */}
            <img
              src={HERO_SLIDES[heroIndex].image}
              alt={HERO_SLIDES[heroIndex].title}
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Incoming layer — mounts off-screen right, slides in, then unmounts */}
            {incoming && (
              <img
                key={incoming.key}
                src={HERO_SLIDES[incoming.idx].image}
                alt={HERO_SLIDES[incoming.idx].title}
                className="absolute inset-0 w-full h-full object-cover hero-wipe-in"
              />
            )}
          </div>

          { /* acá iba el gradiente */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />


          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-16">
            <div className="max-w-3xl space-y-6">
              { /*<span className="inline-block px-3.5 py-1.5 bg-[#a5cd38]/20 border border-[#a5cd38]/50 text-[#a5cd38] text-xs font-mono font-bold tracking-widest uppercase rounded">
                FABRICANTE INDUSTRIAL EN BUENOS AIRES
              </span> */}

              <div className="relative h-[23.5rem] sm:h-[23.75rem] lg:h-[29.75rem]">
                <div
                  className={`absolute inset-0 flex flex-col ${
                    incoming ? "hero-copy-wipe-out" : ""
                  }`}
                >
                <HeroSlideCopy
                    slide={HERO_SLIDES[heroIndex]}
                  />
                </div>

              {incoming && (
                  <div
                    key={`hero-copy-${incoming.key}`}
                    className="absolute inset-0 flex flex-col hero-copy-wipe-in"
                    aria-hidden="true"
                  >
                  <HeroSlideCopy
                      slide={HERO_SLIDES[incoming.idx]}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2">
            {HERO_SLIDES.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  heroIndexRef.current = i;
                  setHeroIndex(i);
                  setIncoming(null);
                }}
                className={`h-2 transition-all rounded-full ${heroIndex === i ? "w-8 bg-[#a5cd38]" : "w-2 bg-white/40 hover:bg-white/70"
                  }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="bg-white border-y border-black/10 py-8 shadow-sm overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-4 text-center">
            {/*<span className="text-[11px] font-mono font-bold text-[#637f1d] uppercase tracking-widest">
              CONFIAN EN NUESTRA INGENIERÍA VISUAL
            </span>*/}
          </div>

          <div className="relative w-full overflow-hidden">
            <div className="animate-marquee flex items-center gap-12 md:gap-16">
              {/*filter grayscale hover:grayscale-0 opacity-75 hover:opacity-100 transition-all duration-300 shrink-0 */}
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center p-3 bg-[#F8F9FA] border border-black/10 rounded-sm cursor-pointer max-w-[180px] max-h-[90px] h-20 w-44"
                >
                  <img
                    src={logo.src}
                    alt={logo.name}
                    className="max-w-[150px] max-h-[60px] w-auto h-auto object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SERVICIOS DESTACADOS SECTION */}
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            {/*<span className="text-xs font-mono font-bold text-[#637f1d] uppercase tracking-wider">
              Soluciones Especializadas
            </span>*/}
            <h2 className="ff-display font-['Audiowide'] text-3xl md:text-5xl font-bold tracking-tight text-[#1a1c18] uppercase">
              SOLUCIONES
            </h2>
            <div className="w-16 h-1 bg-[#a5cd38] mx-auto"></div>
            <p className="text-[#1a1c18]/80 text-base md:text-lg">
              Ofrecemos soluciones integrales de fachadas, señalética corporativa, y gráfica industrial de alta precisión.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICE_CARDS.map((card, idx) => (
              <div
                key={idx}
                onClick={(e) => handleNav(card.page, e)}
                className="group bg-white border border-black/10 rounded-sm overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <div className="relative h-60 overflow-hidden bg-black">
                    <img
                      src={card.photo}
                      alt={card.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                    />
                    <span className="absolute top-4 left-4 ff-display font-['Audiowide'] text-2xl font-bold text-white bg-black/60 backdrop-blur-md px-3 py-1 border border-white/20">
                      {card.num}
                    </span>
                  </div>

                  <div className="p-8 space-y-4">
                    <span className="text-[11px] font-mono font-bold text-[#637f1d] tracking-wider block">
                      {card.tags}
                    </span>
                    <h3 className="ff-display font-['Audiowide'] text-xl font-bold text-[#1a1c18] uppercase leading-tight whitespace-pre-line">
                      {card.title}
                    </h3>
                    <p className="text-sm text-[#1a1c18]/80 leading-relaxed font-normal">
                      {card.desc}
                    </p>
                  </div>
                </div>

                <div className="px-8 pb-8 pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#637f1d] group-hover:text-[#1a1c18] inline-flex items-center gap-2 transition-colors">
                    <span>Saber más del servicio</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <hr></hr>

        {/* GALERÍA / PHOTO MOSAIC */}
        <PhotoMosaicSection />

        <hr></hr>

        {/* TESTIMONIOS CAROUSEL */}
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            {/*<span className="text-xs font-mono font-bold text-[#637f1d] uppercase tracking-wider">
              Confianza Empresarial
            </span>*/}
            <h2 className="ff-display font-['Audiowide'] text-3xl md:text-5xl font-bold text-[#1a1c18] uppercase">
              Lo que dicen nuestros clientes
            </h2>
            <div className="w-16 h-1 bg-[#a5cd38] mx-auto"></div>
          </div>

          <div className="max-w-4xl mx-auto bg-card p-6 md:p-10 border border-border rounded-sm shadow-lg relative flex items-start gap-4 md:gap-8">
            <Avatar key={reviewIndex} className="w-20 h-28 sm:w-32 sm:h-44 md:w-40 md:h-52 rounded-sm border border-border">
              <AvatarImage
                src={REVIEWS[reviewIndex].photo}
                alt="Retrato ilustrativo de cliente"
                className="object-cover"
              />
              <AvatarFallback className="rounded-sm bg-secondary text-foreground font-bold text-xl">
                {REVIEWS[reviewIndex].name.split(" ").map((part) => part[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div className="min-w-0 flex-1">
              <p className="text-lg md:text-xl text-[#1a1c18]/90 font-light italic leading-relaxed mb-8">
                "{REVIEWS[reviewIndex].quote}"
              </p>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/10 pt-6">
                <div>
                  <p className="ff-display font-['Audiowide'] text-base font-bold text-[#1a1c18]">
                    {REVIEWS[reviewIndex].name}
                  </p>
                  <p className="text-xs text-[#637f1d] font-semibold">
                    {REVIEWS[reviewIndex].company}
                  </p>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() =>
                      setReviewIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1))
                    }
                    className="p-2 border border-black/15 hover:bg-[#a5cd38] hover:border-[#a5cd38] text-[#1a1c18] transition-colors rounded-xs cursor-pointer"
                    aria-label="Anterior"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() => setReviewIndex((prev) => (prev + 1) % REVIEWS.length)}
                    className="p-2 border border-black/15 hover:bg-[#a5cd38] hover:border-[#a5cd38] text-[#1a1c18] transition-colors rounded-xs cursor-pointer"
                    aria-label="Siguiente"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA FINAL */}
        <section className="bg-[#1a1c18] text-white py-20 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 text-center space-y-6">
            <h2 className="ff-display font-['Audiowide'] text-3xl md:text-5xl font-bold uppercase text-white">
              ¿Listo para renovar la imagen de tu empresa?
            </h2>
            <p className="text-base md:text-xl text-white/70 max-w-2xl mx-auto font-light">
              Coordinemos una visita técnica o envianos los planos de tu proyecto para una cotización inmediata.
            </p>
            <div className="pt-4">
              <button
                onClick={(e) => handleNav("/contacto", e)}
                className="btn-wipe btn-wipe-primary px-9 py-4 bg-[#a5cd38] text-[#1a1c18] font-bold text-xs uppercase tracking-wider rounded-xs shadow-xl"
              >
                Contactar a Asesor Comercial
              </button>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
}
