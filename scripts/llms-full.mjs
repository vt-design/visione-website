// Arma public llms-full.txt (https://llmstxt.org): el texto completo de cada página
// en Markdown, a partir del HTML prerenderizado. Lo usa scripts/prerender.mjs.

const ENTITIES = { amp: "&", lt: "<", gt: ">", quot: '"', apos: "'", nbsp: " " };
const decode = (s) =>
  s
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&([a-z]+);/gi, (m, n) => ENTITIES[n.toLowerCase()] ?? m);

const BLOCK = "address|article|aside|blockquote|br|dd|div|dl|dt|figcaption|figure|footer|header|hr|li|main|nav|ol|p|section|table|td|th|tr|ul";

const UI_ONLY =
  /^(\S|\d{2}|Saber más del servicio|Ver más fotos|Solicitar (Cotización|Presupuesto.*)|Contactar (a )?Asesor.*|Antes Después|Día Noche)$/;

/** Convierte el <main> de una página prerenderizada a Markdown simple. */
export function mainToMarkdown(html) {
  const match = html.match(/<main[^>]*>([\s\S]*)<\/main>/);
  if (!match) return "";
  let s = match[1]
    .replace(/<!--[\s\S]*?-->/g, "")
    // Elementos sin texto útil para leer: iconos, imágenes, controles y formularios.
    .replace(/<(svg|script|style|button|select|textarea|iframe|form)\b[\s\S]*?<\/\1>/g, "")
    .replace(/<(img|input|image)\b[^>]*>/g, "")
    .replace(/<h([1-6])[^>]*>/g, (_, n) => `\n\n${"#".repeat(Math.min(Number(n) + 1, 6))} `)
    .replace(/<\/h[1-6]>/g, "\n\n")
    .replace(/<li[^>]*>/g, "\n- ")
    .replace(new RegExp(`</?(${BLOCK})\\b[^>]*>`, "g"), "\n")
    // Etiquetas en línea (span, a, strong…): se quitan, con un espacio entre palabras.
    .replace(/<[^>]+>/g, "\u0001");
  s = decode(s)
    .replace(/(\S)\u0001+(?=[\p{L}\p{N}])/gu, (_, c) => (/[\p{L}\p{N}.,:;!?)]/u.test(c) ? `${c} ` : c))
    .replace(/\u0001/g, "");
  return s
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    // Fuera: textos de botones/enlaces, numeración de pasos y etiquetas de sliders.
    .filter((line) => !UI_ONLY.test(line))
    .filter((line, i, all) => !(line === "-" || (line === "" && all[i - 1] === "")))
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export function buildLlmsFull({ site, pages, intro }) {
  const parts = [intro.trim()];
  for (const { url, title, description, html } of pages) {
    const body = mainToMarkdown(html);
    if (!body) continue;
    parts.push(`---\n\n# ${title}\n\nURL: ${url}\n\n> ${description}\n\n${body}`);
  }
  return parts.join("\n\n") + "\n";
}
