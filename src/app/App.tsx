import React, { useState, useEffect, useRef } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Building,
  Factory,
  Layers,
} from "lucide-react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ServicePage } from "./components/ServicePage";
import AboutPage from "./AboutPage";
import GalleryPage from "./GalleryPage";
import ContactPage from "./ContactPage";
import NotFoundPage from "./NotFoundPage";
import logoImg from "../assets/logo-visione.png";
import { Avatar, AvatarImage, AvatarFallback } from "./components/ui/avatar";

// ─── DATA & CONSTANTS ────────────────────────────────────────────────────────

const HERO_IMAGES = [
  "src/assets/images/test-hero/test-hero-1.webp",
  "src/assets/images/test-hero/test-hero-2.webp",
  "src/assets/images/test-hero/test-hero-3.webp",
];

const CLIENT_LOGOS = [
  { name: "VISIONE S.A.", src: logoImg },
  { name: "MERIDIAN S.A.", src: logoImg },
  { name: "NORDESTE CORP", src: logoImg },
  { name: "PALERMO DESARROLLOS", src: logoImg },
  { name: "CONSTRUCTORA SUR", src: logoImg },
  { name: "BANCO CAPITAL", src: logoImg },
  { name: "AERO BUENOS AIRES", src: logoImg },
  { name: "INDUSTRIAS GLOBAL", src: logoImg },
];

const SERVICE_CARDS = [
  {
    num: "01",
    title: "FABRICACIÓN DE CARTELES",
    desc: "Desde letras corpóreas hasta monumentales de gran formato. Aluminio, acero, acrílico y tecnología LED para máxima visibilidad corporativa.",
    tags: "METAL · ACRÍLICO · DIMENSIONAL · LED",
    photo: "src/assets/images/imagen-servicio-carteleria.webp",
    page: "carteleria",
  },
  {
    num: "02",
    title: "REVESTIMIENTO DE METAL",
    desc: "Paneles de aluminio compuesto (ACM) y fachadas ventiladas. Soluciones estructurales de vanguardia con alta resistencia al clima.",
    tags: "FACHADAS · ACM · ESTRUCTURA · RESISTENTE",
    photo: "src/assets/images/imagen-servicio-revestimiento.webp",
    page: "revestimientos",
  },
  {
    num: "03",
    title: "GRÁFICA CORPORATIVA",
    desc: "Impresión de alta resolución, vinilos de seguridad, microperforados y decoración de vidrieras para puntos de venta e industrias.",
    tags: "VINILOS · MICROS · MARCA · VEHÍCULOS",
    photo: "src/assets/images/imagen-servicio-grafica.webp",
    page: "grafica",
  },
];

const MOSAIC_TILES = [
  {
    id: "t1",
    url: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=800&h=520&fit=crop&auto=format",
    alt: "Family portrait",
  },
  {
    id: "t2",
    url: "https://images.unsplash.com/photo-1511895426328-dc8714191011?w=800&h=540&fit=crop&auto=format",
    alt: "Family outdoors",
  },
  {
    id: "t3",
    url: "https://images.unsplash.com/photo-1575793762813-5a94a5f6800a?w=600&h=500&fit=crop&auto=format",
    alt: "People gathering",
  },
  {
    id: "t4",
    url: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&h=800&fit=crop&auto=format",
    alt: "Team at workplace",
  },
  {
    id: "t5",
    url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=900&h=520&fit=crop&auto=format",
    alt: "Professional at work",
  },
  {
    id: "t6",
    url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=600&h=900&fit=crop&auto=format",
    alt: "Portrait tall",
  },
  {
    id: "t7",
    url: "https://images.unsplash.com/photo-1551836022-4c4c79ecde51?w=700&h=520&fit=crop&auto=format",
    alt: "Group scene",
  },
  {
    id: "t8",
    url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=600&h=900&fit=crop&auto=format",
    alt: "Portrait tall",
  },
  {
    id: "t9",
    url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=700&h=420&fit=crop&auto=format",
    alt: "Office landscape",
  },
  {
    id: "t10",
    url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=700&fit=crop&auto=format",
    alt: "Person portrait",
  },
];

const REVIEWS = [
  {
    quote:
      "Exclente trabajo!! Hemos hecho trabajos con Visione desde el año 2009, siempre excelente y este ultimo recien instalado muestra una empresa con amplia experiencia y profesionalismo. Lo mejor, no solo cumplen los plazos sino que los mejoran. Gracias Cristian por tu impecable atención y trabajo.",
    name: "Sebastián",
    company: "Todo Tartas",
    photo: "src/assets/images/imagen-review-1.webp",
  },
  {
    quote:
      "Excelente servicio y calidad. Hace años que realizamos trabajos con Visione y cumplen con todo en tiempo y forma. De primera la atención de Cristian y de Ariel, lo recomendamos.",
    name: "Martín",
    company: "Hus Realty",
    photo: "src/assets/images/imagen-review-2.webp",
  },
  {
    quote:
      "Excepcional servicio como siempre. Completamente agradecidos por el trabajo realizado en nuestra nueva oficina. ¡Muchas gracias Visione Publicidad!",
    name: "Tomas",
    company: "Salaya Romera",
    photo: "src/assets/images/imagen-review-3.webp",
  },
];

const SERVICE_PAGES_DATA = {
  carteleria: {
    title: "Cartelería Industrial & LED",
    subtitle: "Diseño, ingeniería y fabricación de carteles corpóreos, marquesinas y señalética de gran formato.",
    heroImg: "https://images.unsplash.com/photo-1780385187604-4663a1d7c6e6?w=1920&h=1080&fit=crop&auto=format",
    features: [
      {
        title: "Corpóreos en Acero & Acrílico",
        description: "Letras en relieve en acero inoxidable, chapa galvanizada o acrílico con iluminación frontal, posterior (halo light) o combinada con matrices LED de alta durabilidad.",
        image: "https://images.unsplash.com/photo-1780385187604-4663a1d7c6e6?w=900&h=700&fit=crop&auto=format",
        tag: "CORPÓREOS 3D",
      },
      {
        title: "Marquesinas & Totems Monumentales",
        description: "Estructuras de gran porte para estaciones de servicio, parques industriales y shoppings. Cálculos estructurales homologados e ingeniería antiviento.",
        image: "https://images.unsplash.com/photo-1779614800682-0c0cea8e0cd5?w=900&h=700&fit=crop&auto=format",
        tag: "GRAN FORMATO",
      },
      {
        title: "Iluminación LED de Alta Eficiencia",
        description: "Módulos LED sellados con protección IP67 para exterior, fuentes con protección térmica y bajo consumo energético sostenido.",
        image: "https://images.unsplash.com/photo-1780565081532-0f68d721e44a?w=900&h=700&fit=crop&auto=format",
        tag: "TECNOLOGÍA LED",
      },
    ],
  },
  grafica: {
    title: "Gráfica Corporativa & Vinilos",
    subtitle: "Soluciones de impresión digital de alta fidelidad, vinilos decorativos y rotulación de vehículos.",
    heroImg: "https://images.unsplash.com/photo-1608126841830-53832c4b326f?w=1920&h=1080&fit=crop&auto=format",
    features: [
      {
        title: "Rotulación & Ploteo de Flotas",
        description: "Transformamos vehículos corporativos e industriales en vehículos publicitarios con vinilos autoadhesivos de alta durabilidad y resistencia UV.",
        image: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=900&h=700&fit=crop&auto=format",
        tag: "FLOTAS & VEHÍCULOS",
      },
      {
        title: "Vinilos Decorativos & Esmerilados",
        description: "Privacidad y diseño para oficinas, salas de reunión y vidrieras comerciales mediante vinilos de corte, esmerilados y microperforados.",
        image: "https://images.unsplash.com/photo-1608126841830-53832c4b326f?w=900&h=700&fit=crop&auto=format",
        tag: "OFICINAS & VIDRIERAS",
      },
      {
        title: "Impresión Gigantografía Gran Formato",
        description: "Lonas de alta resistencia para frentes de obra, banners publicitarios y vallas con tintas ecológicas de secado UV.",
        image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=900&h=700&fit=crop&auto=format",
        tag: "IMPRESIÓN GIGANTE",
      },
    ],
  },
  revestimientos: {
    title: "Revestimientos Metal & Fachadas",
    subtitle: "Paneles de Aluminio Compuesto (ACM), chapa perforada y fachadas arquitectónicas modernas.",
    heroImg: "https://images.unsplash.com/photo-1551520692-7cdc7dc041b1?w=1920&h=1080&fit=crop&auto=format",
    features: [
      {
        title: "Paneles de Aluminio Compuesto (ACM)",
        description: "Placas rígidas y livianas para renovación de fachadas comerciales. Acabados mate, metalizados y textura madera con nulo mantenimiento.",
        image: "https://images.unsplash.com/photo-1760787545864-b468b6fe2c92?w=900&h=700&fit=crop&auto=format",
        tag: "FACHADAS ACM",
      },
      {
        title: "Chapa Perforada & Metal Desplegado",
        description: "Parasoles, cerramientos decorativos y revestimientos industriales con corte láser computarizado a medida según plano de arquitectura.",
        image: "https://images.unsplash.com/photo-1551520692-7cdc7dc041b1?w=900&h=700&fit=crop&auto=format",
        tag: "DISEÑO A MEDIDA",
      },
      {
        title: "Montaje & Estructuras Portantes",
        description: "Subestructuras de tubo de acero galvanizado, cálculo de cargas de viento e instalación con equipos de elevación en altura.",
        image: "https://images.unsplash.com/photo-1564182842834-681b7be6de4b?w=900&h=700&fit=crop&auto=format",
        tag: "INGENIERÍA ESTRUCTURAL",
      },
    ],
  },
};

const VALID_PAGES = ["home", "carteleria", "grafica", "revestimientos", "nosotros", "galeria", "contacto"];

// ─── PHOTO MOSAIC SECTION ────────────────────────────────────────────────────

function PhotoMosaicSection({ onNavigate }: { onNavigate: (page: string) => void }) {
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visible, setVisible] = useState<boolean[]>(new Array(MOSAIC_TILES.length).fill(false));

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    tileRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              setVisible((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * 75);
            obs.disconnect();
          }
        },
        { threshold: 0.05 }
      );
      obs.observe(ref);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <section className="bg-[#1a1c18] text-white py-20 lg:py-28 border-t border-white/10">
      <style>{`
        .mosaic-grid {
          display: grid;
          grid-template-columns: repeat(12, 1fr);
          grid-auto-rows: 20px;
          gap: 8px;
          max-height: 590px;
          overflow: hidden;
        }
        .mosaic-t1  { grid-column: 1 / 4;  grid-row: 3 / 11;  }
        .mosaic-t2  { grid-column: 1 / 4;  grid-row: 12 / 22; }
        .mosaic-t3  { grid-column: 1 / 3;  grid-row: 23 / 33; }
        .mosaic-t4  { grid-column: 4 / 8;  grid-row: 1 / 13;  }
        .mosaic-t5  { grid-column: 4 / 8;  grid-row: 14 / 20; }
        .mosaic-t6  { grid-column: 4 / 7;  grid-row: 21 / 35; }
        .mosaic-t7  { grid-column: 8 / 11; grid-row: 4 / 14;  }
        .mosaic-t8  { grid-column: 8 / 11; grid-row: 15 / 35; }
        .mosaic-t9  { grid-column: 11 / 13; grid-row: 2 / 7;  }
        .mosaic-t10 { grid-column: 11 / 13; grid-row: 12 / 20; }

        @media (max-width: 1023px) and (min-width: 768px) {
          .mosaic-grid {
            grid-template-columns: repeat(8, 1fr);
            max-height: none;
            overflow: visible;
          }
          .mosaic-t1  { grid-column: 1 / 4;  grid-row: 3 / 10;  }
          .mosaic-t2  { grid-column: 1 / 4;  grid-row: 11 / 20; }
          .mosaic-t3  { grid-column: 1 / 3;  grid-row: 21 / 29; }
          .mosaic-t4  { grid-column: 4 / 7;  grid-row: 1 / 12;  }
          .mosaic-t5  { grid-column: 4 / 7;  grid-row: 13 / 19; }
          .mosaic-t6  { grid-column: 4 / 7;  grid-row: 20 / 30; }
          .mosaic-t7  { grid-column: 7 / 9;  grid-row: 4 / 12;  }
          .mosaic-t8  { grid-column: 7 / 9;  grid-row: 13 / 24; }
          .mosaic-t9  { grid-column: 3 / 4;  grid-row: 20 / 25; }
          .mosaic-t10 { grid-column: 3 / 5;  grid-row: 25 / 31; }
        }

        @media (max-width: 767px) {
          .mosaic-grid {
            grid-template-columns: repeat(2, 1fr);
            max-height: none;
            overflow: visible;
          }
          .mosaic-t1  { grid-column: 1 / 2; grid-row: 1 / 9;   }
          .mosaic-t2  { grid-column: 2 / 3; grid-row: 3 / 13;  }
          .mosaic-t3  { grid-column: 1 / 2; grid-row: 10 / 17; }
          .mosaic-t4  { grid-column: 2 / 3; grid-row: 14 / 25; }
          .mosaic-t5  { grid-column: 1 / 2; grid-row: 18 / 24; }
          .mosaic-t6  { grid-column: 1 / 2; grid-row: 25 / 36; }
          .mosaic-t7  { grid-column: 2 / 3; grid-row: 26 / 34; }
          .mosaic-t8  { grid-column: 2 / 3; grid-row: 35 / 46; }
          .mosaic-t9  { grid-column: 1 / 2; grid-row: 37 / 43; }
          .mosaic-t10 { grid-column: 1 / 2; grid-row: 44 / 52; }
        }
      `}</style>

      <div className="max-w-7xl mx-auto px-[48px] space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="text-xs font-mono font-bold text-[#a5cd38] uppercase tracking-widest">
            Obras Realizadas
          </span>
          <h2 className="font-['Audiowide'] text-3xl md:text-5xl font-bold tracking-tight text-white uppercase">
            Nuestra Galería
          </h2>
          <div className="w-16 h-1 bg-[#a5cd38] mx-auto" />
          <p className="text-white/70 text-base md:text-lg font-light">
            Proyectos de cartelería, gráfica y revestimiento entregados en todo el país.
          </p>
        </div>

        <div className="mosaic-grid">
          {MOSAIC_TILES.map((tile, i) => (
            <div
              key={tile.id}
              ref={(el) => { tileRefs.current[i] = el; }}
              className={`mosaic-${tile.id} transition-all duration-700 ease-out ${
                visible[i] ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"
              }`}
              style={{ transitionDelay: visible[i] ? "0ms" : `${i * 50}ms` }}
            >
              <img
                src={tile.url}
                alt={tile.alt}
                className="w-full h-full object-cover block"
                loading="lazy"
                draggable={false}
              />
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <button
            onClick={() => onNavigate("galeria")}
            className="btn-wipe btn-wipe-primary px-8 py-4 bg-[#a5cd38] text-[#1a1c18] font-bold text-xs tracking-wider uppercase rounded-xs shadow-lg inline-flex items-center gap-3"
          >
            <span>Ver Galería Completa</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </section>
  );
}

// ─── MAIN APP COMPONENT ───────────────────────────────────────────────────────

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [heroIndex, setHeroIndex] = useState(0);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [incoming, setIncoming] = useState<{ idx: number; key: number } | null>(null);
  const heroIndexRef = useRef(0);

  useEffect(() => {
    if (activePage !== "home") return;
    const interval = setInterval(() => {
      const next = (heroIndexRef.current + 1) % HERO_IMAGES.length;
      setIncoming({ idx: next, key: Date.now() });
      setTimeout(() => {
        heroIndexRef.current = next;
        setHeroIndex(next);
        setIncoming(null);
      }, 850);
    }, 3800);
    return () => clearInterval(interval);
  }, [activePage]);

  const handleNavigate = (page: string) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  // ROUTING & FALLBACK TO 404
  if (!VALID_PAGES.includes(activePage)) {
    return <NotFoundPage onNavigate={handleNavigate} />;
  }

  if (activePage === "contacto") {
    return <ContactPage onNavigate={handleNavigate} />;
  }

  if (activePage === "nosotros") {
    return <AboutPage onNavigate={handleNavigate} />;
  }

  if (activePage === "galeria") {
    return <GalleryPage onNavigate={handleNavigate} />;
  }

  if (["carteleria", "grafica", "revestimientos"].includes(activePage)) {
    const data = SERVICE_PAGES_DATA[activePage as keyof typeof SERVICE_PAGES_DATA];
    return (
      <ServicePage
        title={data.title}
        subtitle={data.subtitle}
        heroImg={data.heroImg}
        features={data.features}
        onNavigate={handleNavigate}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1a1c18] ff-body selection:bg-[#a5cd38] selection:text-[#1a1c18] flex flex-col justify-between">
      <div>
        <Navbar activePage="home" onNavigate={handleNavigate} />

        {/* HERO SECTION */}
        <section className="relative h-screen bg-[#1a1c18] overflow-hidden flex items-center">
          <div className="absolute inset-0 overflow-hidden">
            <style>{`
              @keyframes heroWipeIn {
                from { transform: translateX(100%); }
                to   { transform: translateX(0); }
              }
              .hero-wipe-in {
                animation: heroWipeIn 0.82s cubic-bezier(0.77, 0, 0.175, 1) forwards;
              }
            `}</style>
            {/* Base layer — current image, stays in place */}
            <img
              src={HERO_IMAGES[heroIndex]}
              alt="Visione Cartelería Industrial"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Incoming layer — mounts off-screen right, slides in, then unmounts */}
            {incoming && (
              <img
                key={incoming.key}
                src={HERO_IMAGES[incoming.idx]}
                alt="Visione Cartelería Industrial"
                className="absolute inset-0 w-full h-full object-cover hero-wipe-in"
              />
            )}
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c18] via-transparent to-black/30" />

          <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full pt-16">
            <div className="max-w-3xl space-y-6">
              <span className="inline-block px-3.5 py-1.5 bg-[#a5cd38]/20 border border-[#a5cd38]/50 text-[#a5cd38] text-xs font-mono font-bold tracking-widest uppercase rounded">
                FABRICANTE INDUSTRIAL EN BUENOS AIRES
              </span>

              <h1 className="ff-display font-['Audiowide'] text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white uppercase leading-[1.05]">
                VISIONE <br />
                <span className="text-[#a5cd38]">INGENIERÍA</span> VISUAL
              </h1>

              <p className="text-base sm:text-xl text-white/90 leading-relaxed font-light max-w-2xl">
                Diseñamos, fabricamos e instalamos cartelería monumental, revestimientos de aluminio y gráfica corporativa para grandes empresas y marcas.
              </p>

              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => handleNavigate("contacto")}
                  className="btn-wipe btn-wipe-primary px-8 py-4 bg-[#a5cd38] text-[#1a1c18] font-bold text-xs tracking-wider uppercase rounded-xs shadow-lg flex items-center gap-3"
                >
                  <span>Solicitar Cotización</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-8 right-8 z-20 flex items-center gap-2">
            {HERO_IMAGES.map((_, i) => (
              <button
                key={i}
                onClick={() => setHeroIndex(i)}
                className={`h-2 transition-all rounded-full ${
                  heroIndex === i ? "w-8 bg-[#a5cd38]" : "w-2 bg-white/40 hover:bg-white/70"
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </section>

        {/* TRUST BAR */}
        <section className="bg-white border-y border-black/10 py-8 shadow-sm overflow-hidden">
          <div className="max-w-7xl mx-auto px-6 md:px-12 mb-4 text-center">
            <span className="text-[11px] font-mono font-bold text-[#637f1d] uppercase tracking-widest">
              CONFIAN EN NUESTRA INGENIERÍA VISUAL
            </span>
          </div>

          <div className="relative w-full overflow-hidden">
            <div className="animate-marquee flex items-center gap-12 md:gap-16">
              {[...CLIENT_LOGOS, ...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center p-3 bg-[#F8F9FA] border border-black/10 rounded-sm filter grayscale hover:grayscale-0 opacity-75 hover:opacity-100 transition-all duration-300 shrink-0 cursor-pointer max-w-[180px] max-h-[90px] h-20 w-44"
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
            <span className="text-xs font-mono font-bold text-[#637f1d] uppercase tracking-wider">
              Soluciones Especializadas
            </span>
            <h2 className="ff-display font-['Audiowide'] text-3xl md:text-5xl font-bold tracking-tight text-[#1a1c18] uppercase">
              Nuestros Servicios
            </h2>
            <div className="w-16 h-1 bg-[#637f1d] mx-auto"></div>
            <p className="text-[#1a1c18]/80 text-base md:text-lg">
              Ofrecemos soluciones integrales de señalética corporativa, fachadas y gráfica industrial de alta precisión.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICE_CARDS.map((card, idx) => (
              <div
                key={idx}
                onClick={() => handleNavigate(card.page)}
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

        {/* GALERÍA / PHOTO MOSAIC */}
        <PhotoMosaicSection onNavigate={handleNavigate} />

        {/* TESTIMONIOS CAROUSEL */}
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="text-xs font-mono font-bold text-[#637f1d] uppercase tracking-wider">
              Confianza Empresarial
            </span>
            <h2 className="ff-display font-['Audiowide'] text-3xl md:text-4xl font-bold text-[#1a1c18] uppercase">
              Lo que dicen nuestros clientes
            </h2>
            <div className="w-16 h-1 bg-[#637f1d] mx-auto"></div>
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
                  className="p-2 border border-black/15 hover:bg-[#a5cd38] hover:border-[#a5cd38] text-[#1a1c18] transition-colors rounded-xs"
                  aria-label="Anterior"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  onClick={() => setReviewIndex((prev) => (prev + 1) % REVIEWS.length)}
                  className="p-2 border border-black/15 hover:bg-[#a5cd38] hover:border-[#a5cd38] text-[#1a1c18] transition-colors rounded-xs"
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
                onClick={() => handleNavigate("contacto")}
                className="btn-wipe btn-wipe-primary px-9 py-4 bg-[#a5cd38] text-[#1a1c18] font-bold text-xs uppercase tracking-wider rounded-xs shadow-xl"
              >
                Contactar a Asesor Comercial
              </button>
            </div>
          </div>
        </section>
      </div>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
