import React from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { ArrowRight } from "lucide-react";

interface ServicePageProps {
  title: string;
  subtitle: string;
  heroImg: string;
  features: Array<{
    title: string;
    description: string;
    image: string;
    tag: string;
  }>;
  onNavigate: (page: string) => void;
}

export function ServicePage({ title, subtitle, heroImg, features, onNavigate }: ServicePageProps) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1a1c18] ff-body flex flex-col justify-between">
      <div>
        <Navbar activePage="" onNavigate={onNavigate} />

        {/* FULL SCREEN HERO WITH BACKGROUND PHOTO */}
        <section className="relative h-screen flex items-center justify-center bg-[#1a1c18] overflow-hidden">
          <img
            src={heroImg}
            alt={title}
            className="absolute inset-0 w-full h-full object-cover opacity-35 filter brightness-90"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c18] via-[#1a1c18]/40 to-[#1a1c18]/70" />

          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center text-white space-y-6">
            <span className="inline-block px-4 py-1.5 bg-[#a5cd38]/20 border border-[#a5cd38]/40 text-[#a5cd38] text-xs font-mono font-bold tracking-widest uppercase rounded">
              SERVICIOS ESPECIALIZADOS
            </span>
            <h1 className="ff-display font-['Audiowide'] text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase leading-tight">
              {title}
            </h1>
            <p className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed">
              {subtitle}
            </p>
            <div className="pt-6">
              <button
                onClick={() => onNavigate("contacto")}
                className="btn-wipe btn-wipe-primary px-8 py-4 bg-[#a5cd38] text-[#1a1c18] font-bold text-sm tracking-wider uppercase rounded-xs shadow-lg inline-flex items-center gap-3"
              >
                <span>Solicitar Presupuesto para este Servicio</span>
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </section>

        {/* ZIG ZAG FEATURES SECTION */}
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-24">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="ff-display font-['Audiowide'] text-2xl md:text-4xl font-bold tracking-tight text-[#1a1c18] uppercase">
              Capacidades & Características
            </h2>
            <div className="w-16 h-1 bg-[#637f1d] mx-auto"></div>
            <p className="text-[#1a1c18]/70 text-base">
              Conocé en detalle la tecnología, materiales y estándares de ejecución que aplicamos en cada proyecto.
            </p>
          </div>

          <div className="space-y-20 md:space-y-32">
            {features.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row items-center gap-12 md:gap-16 ${
                    isEven ? "" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="w-full md:w-1/2 group overflow-hidden rounded-sm border border-black/10 shadow-lg bg-white">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-[350px] md:h-[450px] object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="w-full md:w-1/2 space-y-5">
                    <span className="text-xs font-mono font-bold text-[#637f1d] bg-[#a5cd38]/20 px-3 py-1 rounded tracking-wider uppercase">
                      {item.tag}
                    </span>
                    <h3 className="ff-display font-['Audiowide'] text-2xl md:text-3xl font-bold text-[#1a1c18] uppercase leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-base text-[#1a1c18]/80 leading-relaxed font-normal">
                      {item.description}
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => onNavigate("contacto")}
                        className="text-xs font-bold tracking-wider uppercase text-[#637f1d] hover:text-[#1a1c18] inline-flex items-center gap-2 border-b-2 border-[#637f1d] pb-1 transition-colors"
                      >
                        <span>Consultar por esta especificación</span>
                        <ArrowRight size={14} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="bg-[#1a1c18] text-white py-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="ff-display font-['Audiowide'] text-2xl font-bold uppercase text-white">
                ¿Tenés un proyecto en mente?
              </h3>
              <p className="text-white/70 text-sm max-w-xl">
                Nuestro equipo técnico asesora desde el plano inicial hasta el montaje final en cualquier punto del país.
              </p>
            </div>
            <button
              onClick={() => onNavigate("contacto")}
              className="btn-wipe btn-wipe-primary px-8 py-3.5 bg-[#a5cd38] text-[#1a1c18] font-bold text-xs tracking-wider uppercase rounded-xs shadow-md whitespace-nowrap"
            >
              Contactar Asesor Técnico
            </button>
          </div>
        </section>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
