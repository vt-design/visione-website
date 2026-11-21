import React from "react";
import { Link } from "react-router-dom";

export function Footer() {
  const handleNav = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  
  return (
    <footer className="bg-[#1a1c18] text-white pt-16 pb-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-4 gap-12 mb-8">
        {/* BRAND COLUMN */}
        <div className="space-y-4 md:col-span-1">
          <Link to="/" onClick={handleNav}
            className="ff-display font-['Audiowide'] text-2xl font-bold tracking-wider text-white hover:text-[#a5cd38] transition-colors text-left"
          >
            <img alt="Visione Publicidad" src= "/images/logos/texto-logo-visione.png" className="w-3/4"></img>
          </Link>
          <p className="text-md text-white/60 leading-normal pt-2">
            Desarrollamos soluciones integrales de revestimientos, cartelería y gráfica corporativa para empresas de todo el país.
          </p>
        </div>

        {/* SERVICIOS LINKS */}
        <div className="space-y-3">
          <h2 className="ff-display font-['Audiowide'] text-xs font-bold uppercase tracking-widest text-[#a5cd38]">
            Soluciones
          </h2>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li>
              <Link to="/soluciones/revestimientos" onClick={handleNav} className="cursor-pointer text-start hover:text-[#a5cd38] transition-colors">
                Revestimientos
              </Link>
            </li>
            <li>
              <Link to="/soluciones/carteleria" onClick={handleNav} className="cursor-pointer text-start hover:text-[#a5cd38] transition-colors">
                Cartelería y Corporeos
              </Link>
            </li>
            <li>
              <Link to="/soluciones/grafica" onClick={handleNav} className="cursor-pointer text-start hover:text-[#a5cd38] transition-colors">
                Gráfica Corporativa
              </Link>
            </li>
          </ul>
        </div>

        {/* NAVEGACIÓN */}
        <div className="space-y-3">
          <h2 className="ff-display font-['Audiowide'] text-xs font-bold uppercase tracking-widest text-[#a5cd38]">
            Navegación
          </h2>
          <ul className="space-y-2.5 text-sm text-white/70">
            <li>
              <Link to="/" onClick={handleNav} className="cursor-pointer hover:text-[#a5cd38] transition-colors">
                Inicio
              </Link>
            </li>
            <li>
              <Link to="/proyectos" onClick={handleNav} className="cursor-pointer hover:text-[#a5cd38] transition-colors">
                Galería de Trabajos
              </Link>
            </li>
            <li>
              <Link to="/sobre-nosotros" onClick={handleNav} className="cursor-pointer hover:text-[#a5cd38] transition-colors">
                Sobre Nosotros
              </Link>
            </li>
            <li>
              <Link to="/contacto" onClick={handleNav} className="cursor-pointer hover:text-[#a5cd38] transition-colors">
                Contacto Directo
              </Link>
            </li>
          </ul>
        </div>

        {/* CONTACTO INFO */}
        <div className="space-y-3">
          <h2 className="ff-display font-['Audiowide'] text-xs font-bold uppercase tracking-widest text-[#a5cd38]">
            Contacto & Planta
          </h2>
          <p className="text-sm text-white/70">
            Av. Triunvirato 3686, CABA, Argentina
          </p>
          <a href="mailto:info@visione.com.ar" className="block text-sm text-white/70 hover:text-[#a5cd38] transition-colors">
            info@visione.com.ar
          </a>
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
        <p className="font-mono">desarrollo: vt.design.contact@gmail.com</p>
      </div>
    </footer>
  );
}
