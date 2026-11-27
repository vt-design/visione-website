import { useEffect, useRef, useState, type ImgHTMLAttributes, type RefObject } from "react";

// Pixel transparente: evita que el navegador muestre el texto alternativo
// mientras la imagen real todavía no se pidió.
export const PLACEHOLDER = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

/**
 * Devuelve `true` (y lo mantiene) cuando el elemento queda a menos de
 * `rootMargin` de la pantalla. Más ajustado que `loading="lazy"`, que en
 * mobile descarga imágenes hasta ~2500px por debajo de lo visible.
 */
export function useNearViewport(ref: RefObject<Element | null>, rootMargin = "300px") {
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || near) return;
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [ref, rootMargin, near]);

  return near;
}

/** `<img>` que pide la imagen recién cuando está por entrar en pantalla. */
export function LazyImg({
  src,
  srcSet,
  eager = false,
  fade = false,
  className,
  onLoad,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & {
  /** Cargar de inmediato (por ejemplo, la primera imagen visible). */
  eager?: boolean;
  /** Aparecer con un fundido al terminar de cargar (no aplica a las `eager`,
   *  que ya vienen visibles en el HTML prerenderizado). */
  fade?: boolean;
}) {
  const ref = useRef<HTMLImageElement>(null);
  const near = useNearViewport(ref) || eager;
  const [loaded, setLoaded] = useState(false);
  const fading = fade && !eager;

  // Si la imagen ya estaba en caché, puede terminar antes de que React escuche onLoad.
  useEffect(() => {
    const img = ref.current;
    if (fading && near && img?.complete && img.naturalWidth > 1) setLoaded(true);
  }, [fading, near]);

  return (
    <img
      ref={ref}
      {...props}
      className={fading ? `${className ?? ""} lazy-fade` : className}
      data-loaded={fading && loaded ? "" : undefined}
      onLoad={(event) => {
        if (near && event.currentTarget.naturalWidth > 1) setLoaded(true);
        onLoad?.(event);
      }}
      src={near ? src : PLACEHOLDER}
      srcSet={near ? srcSet : undefined}
      decoding="async"
    />
  );
}
