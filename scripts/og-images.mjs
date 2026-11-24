// Genera las imágenes para redes sociales (Open Graph, 1200x630 JPG) en public/og/.
// Correr a mano cuando cambien las fotos: node scripts/og-images.mjs
import path from "node:path";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const require = createRequire(import.meta.url);
let sharp;
try { sharp = require("sharp"); } catch {
  sharp = require(path.join(root, "node_modules/.pnpm/sharp@0.34.5/node_modules/sharp"));
}

const W = 1200, H = 630;
const img = (p) => path.join(root, "public", p);
const SOURCES = {
  visione: "images/imagen-hero-1-uca.webp",
  carteleria: "images/soluciones/carteleria/carteleria-letras1.webp",
  revestimientos: "images/soluciones/revestimientos/revestimientos-foto-principal.webp",
  grafica: "images/imagen-servicio-grafica.webp",
};

const shade = Buffer.from(`<svg width="${W}" height="${H}"><defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
<stop offset="0.45" stop-color="#1a1c18" stop-opacity="0"/><stop offset="1" stop-color="#1a1c18" stop-opacity="0.85"/></linearGradient></defs>
<rect width="100%" height="100%" fill="url(#g)"/></svg>`);
const logo = await sharp(img("images/logos/logo-visione-compuesto.png")).resize({ width: 420 }).toBuffer();

for (const [name, src] of Object.entries(SOURCES)) {
  await sharp(img(src))
    .resize(W, H, { fit: "cover", position: "attention" })
    .composite([{ input: shade }, { input: logo, left: 56, top: H - 56 - 64 }])
    .jpeg({ quality: 82, mozjpeg: true })
    .toFile(img(`og/${name}.jpg`));
  console.log(`og/${name}.jpg`);
}
