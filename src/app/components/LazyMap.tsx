import { useEffect, useRef, useState } from "react";

type LazyMapProps = {
  src: string;
  title: string;
  className?: string;
};

/**
 * Inserta el iframe de Google Maps recién cuando el contenedor entra en
 * pantalla. Así la carga inicial de la página no descarga el mapa ni recibe
 * cookies de terceros de Google si el usuario no llega a esa sección.
 */
export function LazyMap({ src, title, className }: LazyMapProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el || visible) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px" },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={ref} className="h-full w-full bg-[#e5e7e3]">
      {visible && (
        <iframe
          src={src}
          title={title}
          className={className}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          // iframe "credentialless": Google Maps se carga en un almacenamiento
          // efímero, sin leer ni guardar cookies de terceros.
          {...{ credentialless: "" }}
        />
      )}
    </div>
  );
}
