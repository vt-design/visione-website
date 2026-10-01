import React, { useState } from "react";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import {
  Mail,
  MapPin,
  Clock,
  CheckCircle2,
} from "lucide-react";

interface ContactPageProps {
  onNavigate: (page: string) => void;
}

function WhatsAppSVG({ size = 20 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export default function ContactPage({ onNavigate }: ContactPageProps) {
  const [nombre, setNombre] = useState("");
  const [empresa, setEmpresa] = useState("");
  const [consulta, setConsulta] = useState("");
  const [servicio, setServicio] = useState("Cartelería");
  const [submitted, setSubmitted] = useState(false);

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nombre.trim()) return;
    const msg = [
      `Hola Visione, soy *${nombre.trim()}*${empresa.trim() ? ` de *${empresa.trim()}*` : ""}.`,
      `\nInterés: *${servicio}*`,
      consulta.trim() ? `\n\nConsulta: ${consulta.trim()}` : "",
    ].join("");
    window.open(`https://wa.me/5491148897180?text=${encodeURIComponent(msg)}`, "_blank");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1a1c18] ff-body flex flex-col justify-between">
      <div>
        <Navbar activePage="contacto" onNavigate={onNavigate} />

        {/* COMPACT HERO HEADER SECTION */}
        <section className="relative pt-28 pb-10 bg-[#1a1c18] text-white border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 space-y-3">
            <span className="inline-block px-3 py-0.5 bg-[#a5cd38]/20 border border-[#a5cd38]/40 text-[#a5cd38] text-[11px] font-mono font-bold tracking-widest uppercase rounded">
              ATENCIÓN B2B DIRECTA
            </span>
            <h1 className="ff-display font-['Audiowide'] text-3xl sm:text-5xl font-bold tracking-tight text-white uppercase leading-tight max-w-4xl">
              Contacto & Presupuestos
            </h1>
            <p className="text-sm md:text-base text-white/80 max-w-2xl font-light leading-relaxed">
              Hablá directamente con nuestro equipo para cotizaciones de obra, visitas técnicas o asesoramiento.
            </p>
          </div>
        </section>

        {/* MAIN CONTACT CONTENT */}
        <section className="py-16 max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* FORM SIDE */}
            <div className="lg:col-span-7 bg-white p-8 md:p-10 rounded-sm border border-black/10 shadow-lg space-y-6">
              <div className="space-y-1">
                <h2 className="ff-display font-['Audiowide'] text-xl font-bold uppercase text-[#1a1c18]">
                  Enviar Cotización por WhatsApp
                </h2>
                <p className="text-xs text-[#1a1c18]/70">
                  Completá el formulario para ser derivado inmediatamente con un asesor.
                </p>
              </div>

              <form onSubmit={handleWhatsApp} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold uppercase text-[#1a1c18]/80">
                      Nombre Completo *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ej: Martín Rodríguez"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-black/15 rounded-xs text-sm focus:outline-none focus:border-[#637f1d] transition-colors"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[11px] font-mono font-bold uppercase text-[#1a1c18]/80">
                      Empresa / Razón Social
                    </label>
                    <input
                      type="text"
                      placeholder="Ej: Constructora del Sur"
                      value={empresa}
                      onChange={(e) => setEmpresa(e.target.value)}
                      className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-black/15 rounded-xs text-sm focus:outline-none focus:border-[#637f1d] transition-colors"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-bold uppercase text-[#1a1c18]/80">
                    Servicio Requerido
                  </label>
                  <select
                    value={servicio}
                    onChange={(e) => setServicio(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-black/15 rounded-xs text-sm focus:outline-none focus:border-[#637f1d] transition-colors"
                  >
                    <option value="Cartelería">Cartelería Industrial / LED</option>
                    <option value="Gráfica">Gráfica Corporativa / Vinilos</option>
                    <option value="Revestimientos">Revestimiento Metal / Fachadas</option>
                    <option value="Proyecto Integral">Proyecto Integral / Asesoramiento</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[11px] font-mono font-bold uppercase text-[#1a1c18]/80">
                    Detalles de la Consulta / Medidas
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Contanos sobre la ubicación o especificaciones del trabajo..."
                    value={consulta}
                    onChange={(e) => setConsulta(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#F8F9FA] border border-black/15 rounded-xs text-sm focus:outline-none focus:border-[#637f1d] transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="btn-wipe btn-wipe-primary w-full py-3.5 bg-[#a5cd38] text-[#1a1c18] font-bold text-xs uppercase tracking-wider rounded-xs shadow-md flex items-center justify-center gap-3"
                >
                  <WhatsAppSVG size={18} />
                  <span>Enviar Consulta Directa a WhatsApp</span>
                </button>

                {submitted && (
                  <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-green-600" />
                    <span>Redirigiendo a WhatsApp...</span>
                  </div>
                )}
              </form>
            </div>

            {/* INFO & MAP SIDE */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-[#1a1c18] text-white p-6 md:p-8 rounded-sm border border-white/10 space-y-5 shadow-lg">
                <h3 className="ff-display font-['Audiowide'] text-lg font-bold uppercase text-[#a5cd38]">
                  Oficinas & Planta Industrial
                </h3>

                <div className="space-y-4 text-xs text-white/80">
                  <div className="flex items-start gap-3">
                    <MapPin size={18} className="text-[#a5cd38] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Dirección</p>
                      <p>Av. Triunvirato 3686, Buenos Aires, Argentina</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail size={18} className="text-[#a5cd38] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Correo Electrónico</p>
                      <p>info@visione.com.ar</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={18} className="text-[#a5cd38] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold text-white">Horarios de Atención</p>
                      <p>Lunes a Viernes: 08:00 hs - 18:00 hs</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* GOOGLE MAPS WIDGET */}
              <div className="bg-white p-2 border border-black/10 rounded-sm shadow-lg overflow-hidden h-[260px]">
                <iframe
                  title="Ubicación Visione Buenos Aires"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.874776774225!2d-58.47590652409925!3d-34.58203495635373!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb6728626288b%3A0xbadc5a9c36254ab4!2sVisione%20Publicidad!5e0!3m2!1sen!2sar!4v1790878845736!5m2!1sen!2sar"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </div>
          </div>
        </section>
      </div>

      <Footer onNavigate={onNavigate} />
    </div>
  );
}
