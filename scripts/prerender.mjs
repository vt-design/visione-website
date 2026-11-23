// Prerender: después de `vite build` (cliente) y `vite build --ssr` (servidor),
// escribe un HTML estático por ruta con el contenido y el <head> de esa página.
// El navegador muestra ese HTML de inmediato y React lo "hidrata" al cargar el JS.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const { render } = await import(pathToFileURL(path.join(root, "dist-ssr", "entry-server.js")).href);

const servicios = JSON.parse(fs.readFileSync(path.join(root, "src", "data", "servicios.json"), "utf8"));

const ROUTES = [
  "/",
  "/sobre-nosotros",
  "/proyectos",
  "/contacto",
  ...Object.keys(servicios).map((s) => `/soluciones/${s}`),
];

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");

const escapeAttr = (v) => String(v).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const escapeText = (v) => String(v).replace(/&/g, "&amp;").replace(/</g, "&lt;");

function setTag(html, regex, replacement) {
  if (!regex.test(html)) throw new Error(`No se encontró ${regex} en index.html`);
  return html.replace(regex, replacement);
}

function applyMeta(html, meta, site) {
  if (!meta) return html;
  const url = meta.path !== undefined ? site + meta.path : null;
  const image = meta.image ? (meta.image.startsWith("http") ? meta.image : site + meta.image) : null;
  html = setTag(html, /<title>[^<]*<\/title>/, `<title>${escapeText(meta.title)}</title>`);
  html = setTag(html, /<meta name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${escapeAttr(meta.description)}" />`);
  html = setTag(html, /<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeAttr(meta.title)}" />`);
  html = setTag(html, /<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeAttr(meta.description)}" />`);
  html = setTag(html, /<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeAttr(meta.title)}" />`);
  html = setTag(html, /<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeAttr(meta.description)}" />`);
  if (image) {
    html = setTag(html, /<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${escapeAttr(image)}" />`);
    html = setTag(html, /<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${escapeAttr(image)}" />`);
  }
  if (url) {
    html = setTag(html, /<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${escapeAttr(url)}">`);
    html = setTag(html, /<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${escapeAttr(url)}" />`);
  } else {
    html = setTag(html, /\s*<link rel="canonical" href="[^"]*">/, "");
    html = setTag(html, /\s*<meta property="og:url" content="[^"]*" \/>/, "");
  }
  if (meta.noindex) {
    html = html.replace("</title>", `</title>\n  <meta name="robots" content="noindex, follow" />`);
  }
  return html;
}

const site = (template.match(/<link rel="canonical" href="([^"]+?)\/?">/) || [])[1];
if (!site) throw new Error("No se encontró el canonical base en index.html");

async function writeRoute(route, file) {
  const { html, meta } = await render(route);
  let page = setTag(template, /<div id="root"><\/div>/, `<div id="root">${html}</div>`);
  page = applyMeta(page, meta, site);
  const out = path.join(dist, file);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page);
  console.log(`prerender ${route.padEnd(28)} -> dist/${file}`);
}

for (const route of ROUTES) {
  await writeRoute(route, route === "/" ? "index.html" : `${route.slice(1)}/index.html`);
}
// Netlify sirve dist/404.html (con estado 404) para cualquier ruta inexistente.
await writeRoute("/404", "404.html");
