// Datos de contacto compartidos (página de contacto y herramientas WebMCP).
export const WHATSAPP_NUMBER = "5491148897180";

export const CONTACT_INFO = {
  name: "Visione Publicidad",
  address: "Av. Triunvirato 3686, Ciudad Autónoma de Buenos Aires, Argentina",
  whatsapp: "+54 9 11 4889 7180",
  whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}`,
  email: "info@visione.com.ar",
  hours: "Lunes a viernes, 10:00 a 17:00 hs",
  areaServed: "Todo el país (Argentina)",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.+Triunvirato+3686,+CABA",
};

export type QuoteRequest = {
  nombre: string;
  ubicacion: string;
  servicio: string;
  iluminado: string;
  consulta?: string;
};

/** Arma el enlace de WhatsApp con el mensaje del pedido de presupuesto. */
export function buildWhatsAppQuoteUrl({ nombre, ubicacion, servicio, iluminado, consulta }: QuoteRequest) {
  const msg = [
    `Hola Visione, soy *${nombre.trim()}*`,
    `\nInterés: *${servicio}*`,
    `\nUbicación: *${ubicacion}*`,
    `\nEs iluminado?: *${iluminado}*`,
    consulta?.trim() ? `\n\nConsulta: ${consulta.trim()}` : "",
  ].join("");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;
}
