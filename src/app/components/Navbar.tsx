import React, { useState, useEffect, useRef } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import logoImg from "/images/logos/logo-visione-compuesto.png";
import { Link } from 'react-router-dom'

export interface NavbarProps {
  activePage: string;
}

const SERVICIOS_LINKS = [
  { label: "Revestimientos", page: "/soluciones/revestimientos" },
  { label: "Cartelería y Corpóreos", page: "/soluciones/carteleria" },
  { label: "Gráfica Corporativa", page: "/soluciones/grafica" },
];

export function Navbar({ activePage }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [servDropOpen, setServDropOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
        setServDropOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleNavClick = () => {
    setMenuOpen(false);
    setServDropOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#1a1c18]/95 backdrop-blur-md py-3 shadow-xl"
          : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* LOGO + COMPANY NAME (AUDIOWIDE) */}
        <Link
          to="/"
          onClick={handleNavClick}
          className="flex items-center gap-3.5 group text-left focus:outline-none"
        >
          <div className="h-10 w-auto rounded-sm overflow-hidden flex items-center justify-center p-0.5">
            <img
              src={logoImg}
              alt="Visione Publicidad"
              className="h-full w-5/6 object-contain"
            />
          </div>
          {/*
          group-hover:scale-105 transition-transform duration-300
          <span className="ff-display font-['Audiowide'] text-xl font-bold tracking-wider text-white group-hover:text-[#a5cd38] transition-colors">
            VISIONE
          </span>
          */}
        </Link>

        {/* DESKTOP NAV */}
        <nav className="hidden md:flex items-center gap-8">
          <Link
          to="/"
          onClick={handleNavClick}
            className={`text-sm font-medium font-['Archivo'] tracking-wide transition-colors duration-200 cursor-pointer ${
              activePage === "home" ? "text-[#a5cd38]" : "text-white/80 hover:text-[#a5cd38]"
            }`}
          >
            Inicio
          </Link>

          {/* DROPDOWN SERVICIOS */}
          <div className="relative" ref={dropRef}>
            <button
              onClick={() => setServDropOpen(!servDropOpen)}
              className={`flex items-center gap-1.5 text-sm font-medium font-['Archivo'] tracking-wide transition-colors duration-200 cursor-pointer ${
                ["carteleria", "grafica", "revestimientos"].includes(activePage)
                  ? "text-[#a5cd38]"
                  : "text-white/80 hover:text-[#a5cd38]"
              }`}
            >
              Soluciones
              <ChevronDown
                size={15}
                className={`transition-transform duration-200 ${servDropOpen ? "rotate-180 text-[#a5cd38]" : ""}`}
              />
            </button>

            {servDropOpen && (
              <div className="absolute top-full left-0 mt-3 w-56 bg-[#1a1c18] border border-white/10 rounded-md shadow-2xl py-2 z-50 backdrop-blur-xl">
                {SERVICIOS_LINKS.map((sub) => (
                  <Link
                    key={sub.page}
          to={sub.page}
          onClick={handleNavClick}
                    className={`w-full text-left px-4 py-2.5 text-sm font-medium transition-colors font-['Archivo'] hover:bg-white/5 flex items-center justify-between cursor-pointer ${
                      activePage === sub.page ? "text-[#a5cd38] bg-white/5" : "text-white/80 hover:text-[#a5cd38]"
                    }`}
                  >
                    <span>{sub.label}</span>
                    {activePage === sub.page && <span className="w-1.5 h-1.5 rounded-full bg-[#a5cd38]"></span>}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
          to="/proyectos"
          onClick={handleNavClick}
            className={`text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer font-['Archivo'] ${
              activePage === "galeria" ? "text-[#a5cd38]" : "text-white/80 hover:text-[#a5cd38]"
            }`}
          >
            Proyectos
          </Link>

          <Link
          to="/sobre-nosotros"
          onClick={handleNavClick}
            className={`text-sm font-medium tracking-wide transition-colors duration-200 cursor-pointer font-['Archivo'] ${
              activePage === "nosotros" ? "text-[#a5cd38]" : "text-white/80 hover:text-[#a5cd38]"
            }`}
          >
            Sobre Nosotros
          </Link>

          {/* BUTTON WITH L-R WIPE HOVER EFFECT */}
          <Link
          to="/contacto"
          onClick={handleNavClick}
            // Translucent nav at the top → black wipe; solid black nav once scrolled → white wipe.
            className={`btn-wipe ${scrolled ? "btn-wipe-light" : "btn-wipe-primary"} inline-block px-5 py-2.5 bg-[#a5cd38] text-[#1a1c18] font-bold text-xs tracking-wider uppercase rounded-xs shadow-md cursor-pointer font-['Archivo']`}
          >
            Contacto
          </Link>
        </nav>

        {/* MOBILE MENU TOGGLE */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-white hover:text-[#a5cd38] p-2 transition-colors"
          aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* MOBILE DROPDOWN MENU */}
      {menuOpen && (
        <div className="md:hidden bg-[#1a1c18] px-6 py-6 space-y-4 shadow-2xl animate-fadeIn">
          <Link
          to="/"
          onClick={handleNavClick}
            className={`block w-full text-left py-2 font-medium text-base font-['Archivo'] ${
              activePage === "home" ? "text-[#a5cd38]" : "text-white/80 hover:text-[#a5cd38]"
            }`}
          >
            Inicio
          </Link>

          <div className="space-y-2 pl-3 border-l-2 border-[#a5cd38]/40">
            <div className="text-xs uppercase tracking-wider text-white/40 font-bold mb-1">Soluciones</div>
            {SERVICIOS_LINKS.map((sub) => (
              <Link
                key={sub.page}
          to={sub.page}
          onClick={handleNavClick}
                className={`block w-full text-left py-1.5 text-sm font-['Archivo'] ${
                  activePage === sub.page ? "text-[#a5cd38] font-bold" : "text-white/70 hover:text-[#a5cd38]"
                }`}
              >
                {sub.label}
              </Link>
            ))}
          </div>

          <Link
          to="/proyectos"
          onClick={handleNavClick}
            className={`block w-full text-left py-2 font-medium text-base font-['Archivo'] ${
              activePage === "galeria" ? "text-[#a5cd38]" : "text-white/80 hover:text-[#a5cd38]"
            }`}
          >
            Proyectos
          </Link>

          <Link
          to="/sobre-nosotros"
          onClick={handleNavClick}
            className={`block w-full text-left py-2 font-medium text-base font-['Archivo'] ${
              activePage === "nosotros" ? "text-[#a5cd38]" : "text-white/80 hover:text-[#a5cd38]"
            }`}
          >
            Sobre Nosotros
          </Link>

          <Link
          to="/contacto"
          onClick={handleNavClick}
            className="btn-wipe btn-wipe-light w-full mt-2 py-3 bg-[#a5cd38] text-[#1a1c18] font-bold text-sm tracking-wider uppercase rounded-xs text-center block font-['Archivo']"
          >
            Contacto
          </Link>
        </div>
      )}
    </header>
  );
}
