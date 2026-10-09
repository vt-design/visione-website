import React from "react";

export interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const handleNav = (page: string, e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#1a1c18] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        {/* BRAND COLUMN */}
        <div className="space-y-4 md:col-span-1">
          <button
            onClick={(e) => handleNav("home", e)}
            className="ff-display font-['Audiowide'] text-2xl font-bold tracking-wider text-white hover:text-[#a5cd38] transition-colors text-left"
          >
            <img alt="logo visione" src= "/images/imagenes-clientes/visione-cliente-nuevos/texto-logo-visione.png" className="w-3/4"></img>
          </button>
          <p className="text-sm text-white/60 leading-relaxed">
            Fabricación industrial de cartelería, revestimientos metálicos y soluciones gráficas de alta precisión en Buenos Aires.
          </p>
          <div className="pt-2">
            <span className="inline-block px-3 py-1 bg-white/5 border border-white/10 text-xs text-[#a5cd38] font-mono rounded">
              BUENOS AIRES · ARGENTINA
            </span>
          </div>
        </div>

        {/* SERVICIOS LINKS */}
        <div className="space-y-3">
          <h4 className="ff-display font-['Audiowide'] text-xs font-bold uppercase tracking-widest text-[#a5cd38]">
            Servicios
          </h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li>
              <button onClick={(e) => handleNav("carteleria", e)} className="cursor-pointer text-start hover:text-[#a5cd38] transition-colors">
                Cartelería Industrial & LED
              </button>
            </li>
            <li>
              <button onClick={(e) => handleNav("grafica", e)} className="cursor-pointer text-start hover:text-[#a5cd38] transition-colors">
                Gráfica Corporativa & Vinilos
              </button>
            </li>
            <li>
              <button onClick={(e) => handleNav("revestimientos", e)} className="cursor-pointer text-start hover:text-[#a5cd38] transition-colors">
                Revestimientos de Metal & Fachadas
              </button>
            </li>
          </ul>
        </div>

        {/* NAVEGACIÓN */}
        <div className="space-y-3">
          <h4 className="ff-display font-['Audiowide'] text-xs font-bold uppercase tracking-widest text-[#a5cd38]">
            Navegación
          </h4>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li>
              <button onClick={(e) => handleNav("home", e)} className="cursor-pointer hover:text-[#a5cd38] transition-colors">
                Inicio
              </button>
            </li>
            <li>
              <button onClick={(e) => handleNav("galeria", e)} className="cursor-pointer hover:text-[#a5cd38] transition-colors">
                Galería de Trabajos
              </button>
            </li>
            <li>
              <button onClick={(e) => handleNav("nosotros", e)} className="cursor-pointer hover:text-[#a5cd38] transition-colors">
                Sobre Nosotros
              </button>
            </li>
            <li>
              <button onClick={(e) => handleNav("contacto", e)} className="cursor-pointer hover:text-[#a5cd38] transition-colors">
                Contacto Directo
              </button>
            </li>
          </ul>
        </div>

        {/* CONTACTO INFO */}
        <div className="space-y-3">
          <h4 className="ff-display font-['Audiowide'] text-xs font-bold uppercase tracking-widest text-[#a5cd38]">
            Contacto & Planta
          </h4>
          <p className="text-sm text-white/70">
            Av. Triunvirato 3686, CABA, Argentina
          </p>
          <p className="text-sm text-white/70">
            Atención Lunes a Viernes: 10:00 hs - 17:00 hs
          </p>
          <div className="pt-1">
            <a
              href="https://wa.me/5491148897180"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-[#a5cd38] hover:text-white transition-colors font-semibold"
            >
              <span>+54 9 11 4889 7180 (WhatsApp)</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 gap-4">
        <p>© {new Date().getFullYear()} VISIONE PUBLICIDAD. Todos los derechos reservados.</p>
        <p className="font-mono">INGENIERÍA VISUAL Y FABRICACIÓN</p>
      </div>
    </footer>
  );
}
