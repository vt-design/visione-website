import React from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";

interface AboutPageProps {
  onNavigate: (page: string) => void;
}

const STEPS = [
  {
    num: "01",
    title: "Relevamiento & Muestreo",
    desc: "Inspeccionamos la locación, tomamos mediciones láser de precisión y analizamos la incidencia de viento, sol y visibilidad peatonal/vehicular.",
  },
  {
    num: "02",
    title: "Ingeniería & Render 3D",
    desc: "Desarrollamos el modelado técnico tridimensional y el cálculo de estructuras, asegurando estética impactante y durabilidad reglamentaria.",
  },
  {
    num: "03",
    title: "Fabricación Industrial",
    desc: "Corte CNC router y láser, plegado automatizado y pintura horneada en nuestras propias instalaciones con control de calidad certificado.",
  },
  {
    num: "04",
    title: "Montaje & Garantía",
    desc: "Instalación en altura por profesionales capacitados, con sistemas de anclaje sísmico y garantía escrita sobre materiales y componentes LED.",
  },
];

const TIMELINE = [
  {
    year: "2010",
    title: "Fundación de Visione",
    desc: "Comenzamos como un taller artesanal de gráfica publicitaria en Buenos Aires con una visión clara: elevar el estándar industrial del rubro.",
  },
  {
    year: "2015",
    title: "Inauguración de Planta Industrial",
    desc: "Adquisición de maquinaria CNC de gran formato e incorporación de departamento propio de ingeniería de fachadas y revestimientos.",
  },
  {
    year: "2019",
    title: "Expansión Corporativa Nacional",
    desc: "Llegada a proyectos monumentales para entidades bancarias, aeropuertos y torres corporativas a lo largo de todo el país.",
  },
  {
    year: "2023",
    title: "Innovación Sostenible & Iluminación LED",
    desc: "Certificación de procesos de pintura eco-amigables y actualización total de matrices de LED a alta eficiencia energética.",
  },
  {
    year: "ACTUALIDAD",
    title: "Líderes en Señalética & Fachadas",
    desc: "Más de 1.200 proyectos completados con éxito y un equipo interdisciplinario que une diseño, ingeniería y montaje extremo.",
  },
];

export default function AboutPage({ onNavigate }: AboutPageProps) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1a1c18] ff-body flex flex-col justify-between">
      <div>
        <Navbar activePage="nosotros" onNavigate={onNavigate} />

        {/* COMPACT HERO HEADER SECTION */}
        <section className="relative pt-28 pb-10 bg-[#1a1c18] text-white border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-3">
            <span className="inline-block px-3 py-0.5 bg-[#a5cd38]/20 border border-[#a5cd38]/40 text-[#a5cd38] text-[11px] font-mono font-bold tracking-widest uppercase rounded">
              TRAYECTORIA & COMPROMISO
            </span>
            <h1 className="ff-display font-['Audiowide'] text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight max-w-4xl">
              Sobre Nosotros
            </h1>
            <p className="text-sm md:text-base text-white/80 max-w-2xl font-light leading-relaxed">
              Somos ingenieros y artesanos de la comunicación visual urbana. Transformamos materiales nobles en marcas tridimensionales duraderas.
            </p>
          </div>
        </section>

        {/* CÓMO TRABAJAMOS SECTION */}
        <section className="py-20 bg-white border-b border-black/5">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-12">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <span className="text-xs font-mono font-bold text-[#637f1d] uppercase tracking-wider">
                Proceso Riguroso
              </span>
              <h2 className="ff-display font-['Audiowide'] text-2xl md:text-4xl font-bold tracking-tight text-[#1a1c18] uppercase">
                Cómo Transformamos
              </h2>
              <div className="w-12 h-1 bg-[#637f1d] mx-auto"></div>
              <p className="text-[#1a1c18]/70 text-sm">
                De la idea inicial en plano hasta el último tornillo en altura, garantizamos un flujo de trabajo estructurado.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {STEPS.map((s, idx) => (
                <div
                  key={idx}
                  className="bg-[#F8F9FA] p-6 border border-black/10 rounded-sm relative group hover:border-[#637f1d] transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <span className="ff-display font-['Audiowide'] text-3xl font-bold text-[#a5cd38] opacity-80 block mb-3">
                    {s.num}
                  </span>
                  <h3 className="ff-display font-['Audiowide'] text-base font-bold uppercase text-[#1a1c18] mb-2">
                    {s.title}
                  </h3>
                  <p className="text-xs text-[#1a1c18]/75 leading-relaxed font-normal">
                    {s.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE SECTION */}
        <section className="py-20 max-w-7xl mx-auto px-6 md:px-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs font-mono font-bold text-[#637f1d] uppercase tracking-wider">
              Nuestra Historia
            </span>
            <h2 className="ff-display font-['Audiowide'] text-2xl md:text-4xl font-bold tracking-tight text-[#1a1c18] uppercase">
              Línea de Tiempo
            </h2>
            <div className="w-12 h-1 bg-[#637f1d] mx-auto"></div>
          </div>

          <div className="relative border-l-2 border-[#637f1d]/30 ml-4 md:ml-32 space-y-8 py-2">
            {TIMELINE.map((item, idx) => (
              <div key={idx} className="relative pl-6 md:pl-10 group">
                <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-[#637f1d] border-4 border-[#F8F9FA] group-hover:scale-125 transition-transform duration-300"></div>

                <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 bg-white p-6 rounded-sm border border-black/10 shadow-sm">
                  <span className="ff-display font-['Audiowide'] text-xl font-bold text-[#637f1d] min-w-[110px]">
                    {item.year}
                  </span>
                  <div className="space-y-1">
                    <h3 className="ff-display font-['Audiowide'] text-lg font-bold text-[#1a1c18] uppercase">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-[#1a1c18]/80 leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* STATS */}
        <section className="bg-[#1a1c18] text-white py-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="space-y-2">
              <span className="ff-display font-['Audiowide'] text-4xl font-bold text-[#a5cd38] block">+1200</span>
              <h4 className="ff-display font-['Audiowide'] text-xs font-bold uppercase tracking-wider text-white">
                Obras Entregadas
              </h4>
              <p className="text-xs text-white/60">Cartelería y fachadas en todo el país.</p>
            </div>
            <div className="space-y-2">
              <span className="ff-display font-['Audiowide'] text-4xl font-bold text-[#a5cd38] block">100%</span>
              <h4 className="ff-display font-['Audiowide'] text-xs font-bold uppercase tracking-wider text-white">
                Fabricación Propia
              </h4>
              <p className="text-xs text-white/60">Corte, soldadura, pintura y armado sin intermediarios.</p>
            </div>
            <div className="space-y-2">
              <span className="ff-display font-['Audiowide'] text-4xl font-bold text-[#a5cd38] block">14+</span>
              <h4 className="ff-display font-['Audiowide'] text-xs font-bold uppercase tracking-wider text-white">
                Años de Experiencia
              </h4>
              <p className="text-xs text-white/60">Compromiso contínuo con la calidad visual.</p>
            </div>
          </div>
        </section>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
