import React from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { ArrowLeft, AlertTriangle } from "lucide-react";

interface NotFoundPageProps {
  onNavigate: (page: string) => void;
}

export default function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1a1c18] ff-body flex flex-col justify-between">
      <div>
        <Navbar activePage="" onNavigate={onNavigate} />

        {/* MAIN 404 HERO CONTENT */}
        <section className="relative pt-36 pb-24 bg-[#1a1c18] text-white border-b border-white/10 min-h-[70vh] flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-6 md:px-12 text-center space-y-6">
            <div className="inline-flex items-center justify-center p-4 bg-[#a5cd38]/10 border border-[#a5cd38]/30 rounded-full text-[#a5cd38] mb-2">
              <AlertTriangle size={36} />
            </div>

            <p className="ff-display font-['Audiowide'] text-6xl sm:text-8xl font-bold text-[#a5cd38] tracking-widest">
              404
            </p>

            <h1 className="ff-display font-['Audiowide'] text-2xl sm:text-4xl font-bold uppercase text-white tracking-tight">
              Página No Encontrada
            </h1>

            <p className="text-base sm:text-lg text-white/70 max-w-xl mx-auto font-light leading-relaxed">
              La página a la que intentás acceder no existe, ha sido movida o la dirección ingresada es incorrecta.
            </p>

            <div className="pt-6">
              <button
                onClick={() => onNavigate("home")}
                className="btn-wipe btn-wipe-dark px-8 py-4 bg-[#a5cd38] text-[#1a1c18] font-bold text-xs uppercase tracking-wider rounded-xs shadow-xl inline-flex items-center gap-3"
              >
                <ArrowLeft size={16} />
                <span>Volver a la Página Principal</span>
              </button>
            </div>
          </div>
        </section>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
