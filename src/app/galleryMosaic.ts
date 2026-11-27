// Mosaico de la galería: reparte las fotos en columnas (la más corta primero)
// y cada tanto agranda una foto apaisada a dos columnas. Es una función pura
// de las proporciones de las fotos, así el HTML prerenderizado ya sale armado
// y las fotos que se cargan después no mueven a las anteriores.

/** Una columna mide UNITS filas de grilla: la altura de cada foto se expresa en esas filas. */
export const UNITS = 16;

/** Columnas por tamaño de pantalla (deben coincidir con index.css). */
export const LAYOUT_COLUMNS = [2, 3, 4] as const;

export type Placement = {
  col: number; // línea de grilla donde empieza (1 = primera columna)
  cols: number; // columnas que ocupa (1 o 2)
  row: number; // línea de grilla donde empieza
  rows: number; // filas que ocupa
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

// Recorte tolerado: las verticales muy altas quedan en 2:3 y las apaisadas
// en una sola columna, hasta 16:10. Una apaisada nunca cae en un casillero vertical.
const SINGLE_MIN_RATIO = 0.66;
const SINGLE_MAX_RATIO = 1.6;
const FEATURED_MIN_RATIO = 1.3;
const FEATURED_MAX_RATIO = 2.2;

// Cada cuántas fotos se permite una destacada (a dos columnas).
const FEATURE_EVERY: Record<number, number> = { 2: 5, 3: 4, 4: 4 };
// Desnivel máximo (en filas) que se puede emparejar estirando la foto de arriba.
const MAX_LEVELING = 3;

export function layoutMosaic(ratios: number[], columns: number): Placement[] {
  const heights = Array<number>(columns).fill(1); // próxima línea libre por columna
  const lastInColumn = Array<number | null>(columns).fill(null);
  const placements: Placement[] = [];
  let sinceFeatured = 0;

  for (let index = 0; index < ratios.length; index++) {
    const ratio = ratios[index];

    if (ratio >= FEATURED_MIN_RATIO && sinceFeatured >= FEATURE_EVERY[columns]) {
      const featured = placeFeatured(ratio, heights, lastInColumn, placements);
      if (featured) {
        placements.push(featured);
        for (const c of [featured.col - 1, featured.col]) {
          heights[c] = featured.row + featured.rows;
          lastInColumn[c] = index;
        }
        sinceFeatured = 0;
        continue;
      }
    }

    const col = heights.indexOf(Math.min(...heights));
    const rows = Math.round(UNITS / clamp(ratio, SINGLE_MIN_RATIO, SINGLE_MAX_RATIO));
    placements.push({ col: col + 1, cols: 1, row: heights[col], rows });
    heights[col] += rows;
    lastInColumn[col] = index;
    sinceFeatured++;
  }

  return placements;
}

// Busca dos columnas vecinas casi a la misma altura; el desnivel se cubre
// estirando la última foto de la columna más corta, así no quedan huecos.
function placeFeatured(
  ratio: number,
  heights: number[],
  lastInColumn: (number | null)[],
  placements: Placement[],
): Placement | null {
  let best: { col: number; row: number } | null = null;

  for (let c = 0; c + 1 < heights.length; c++) {
    const row = Math.max(heights[c], heights[c + 1]);
    const shorter = heights[c] < heights[c + 1] ? c : c + 1;
    const gap = row - heights[shorter];
    const above = lastInColumn[shorter];
    const fillable =
      gap === 0 ||
      (above !== null && gap <= MAX_LEVELING && gap <= placements[above].rows * 0.3);
    if (fillable && (!best || row < best.row)) best = { col: c, row };
  }
  if (!best) return null;

  for (const c of [best.col, best.col + 1]) {
    const above = lastInColumn[c];
    if (above !== null && heights[c] < best.row) placements[above].rows += best.row - heights[c];
  }

  const rows = Math.round((2 * UNITS) / clamp(ratio, FEATURED_MIN_RATIO, FEATURED_MAX_RATIO));
  return { col: best.col + 1, cols: 2, row: best.row, rows };
}
