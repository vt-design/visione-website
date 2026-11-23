// Entrada para el prerender en build (ver scripts/prerender.mjs).
// Genera el HTML de cada ruta para que la página se vea antes de que cargue el JS.
import { Writable } from "node:stream";
import { StrictMode } from "react";
import { renderToPipeableStream } from "react-dom/server";
import { StaticRouter } from "react-router-dom";
import App from "./app/App";
import { FloatingWhatsApp } from "./app/components/FloatingWhatsApp";
import { takeServerMeta, type PageMeta } from "./app/seo";

export function render(url: string): Promise<{ html: string; meta: PageMeta | null }> {
  return new Promise((resolve, reject) => {
    let html = "";
    const sink = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      },
      final(callback) {
        resolve({ html, meta: takeServerMeta() });
        callback();
      },
    });

    const { pipe } = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={url}>
          <App />
          <FloatingWhatsApp />
        </StaticRouter>
      </StrictMode>,
      {
        // Esperar a que carguen las páginas lazy para tener el HTML completo.
        onAllReady() {
          pipe(sink);
        },
        onShellError: reject,
        onError: reject,
      },
    );
  });
}
