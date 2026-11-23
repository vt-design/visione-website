import { useEffect } from "react";

// Dominio público del sitio. Cambiar acá (y en index.html, robots.txt,
// sitemap.xml y llms.txt) cuando el dominio propio esté activo.
export const SITE_URL = "https://euphonious-biscochitos-aa2e71.netlify.app";

const DEFAULT_IMAGE = "/images/imagen-hero-1-uca.webp";

export type PageMeta = {
  title: string;
  description: string;
  /** Ruta canónica, ej. "/contacto". Si se omite no se fija canonical. */
  path?: string;
  /** Imagen para redes (ruta absoluta del sitio o URL completa). */
  image?: string;
  noindex?: boolean;
};

function setMeta(attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setCanonical(href: string | null) {
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement("link");
    el.rel = "canonical";
    document.head.appendChild(el);
  }
  el.href = href;
}

export function absoluteImage(image?: string) {
  const img = image ?? DEFAULT_IMAGE;
  return img.startsWith("http") ? img : SITE_URL + img;
}

// Durante el prerender (sin `document`) la página registra acá sus metadatos,
// para que el script de build los escriba en el <head> del HTML estático.
let serverMeta: PageMeta | null = null;
export function takeServerMeta() {
  const meta = serverMeta;
  serverMeta = null;
  return meta;
}

/** Fija título, descripción, canonical y etiquetas Open Graph/Twitter de la página. */
export function usePageMeta(meta: PageMeta) {
  const { title, description, path, image, noindex } = meta;
  if (typeof document === "undefined") serverMeta = meta;

  useEffect(() => {
    const url = path !== undefined ? SITE_URL + path : null;
    const imageUrl = absoluteImage(image);

    document.title = title;
    setMeta("name", "description", description);
    setMeta("name", "robots", noindex ? "noindex, follow" : "index, follow");
    setCanonical(url);

    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:image", imageUrl);
    if (url) setMeta("property", "og:url", url);

    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
    setMeta("name", "twitter:image", imageUrl);
  }, [title, description, path, image, noindex]);
}
