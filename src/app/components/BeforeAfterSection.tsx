import { useCallback, useEffect, useRef, useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useNearViewport } from "./LazyImg"

interface Comparison {
  title: string
  subtitle: string
  before: { src: string; label: string }
  after: { src: string; label: string }
  /** CSS object-position, for photos whose subject isn't centered. */
  focus?: string
  /** Where the divider starts (0–100). Defaults to the middle; set it so the
   *  divider crosses the main subject when that sits off-center. */
  start?: number
}

const COMPARISONS: Comparison[] = [
  {
    title: "Kawasaki · GS Motorcycles",
    subtitle: "Revestimiento de fachada en ACM y cartelería corpórea",
    before: { src: "/images/antes-despues/kawasaki-antes.webp", label: "Antes" },
    after: { src: "/images/antes-despues/kawasaki-despues.webp", label: "Después" },
  },
  {
    title: "Tedesco Neumáticos · Dunlop",
    subtitle: "Imagen integral: revestimiento, marquesina y corpóreos",
    before: { src: "/images/antes-despues/tedesco-antes.webp", label: "Antes" },
    after: { src: "/images/antes-despues/tedesco-despues.webp", label: "Después" },
  },
  {
    title: "Fontenla",
    subtitle: "Tótem monumental con corpóreos iluminados con LED",
    before: { src: "/images/antes-despues/fontenla-dia.webp", label: "Día" },
    after: { src: "/images/antes-despues/fontenla-noche.webp", label: "Noche" },
    focus: "50% 18%",
    start: 74,
  },
]

const DEFAULT_START = 50

function CompareSlider({
  item,
  active,
  load,
}: {
  item: Comparison
  active: boolean
  load: boolean
}) {
  const frameRef = useRef<HTMLDivElement | null>(null)
  const draggingRef = useRef(false)
  const hintedRef = useRef(false)
  const start = item.start ?? DEFAULT_START
  const [pos, setPos] = useState(start)
  const [animating, setAnimating] = useState(false)

  // Back to the middle whenever this slide is shown again.
  useEffect(() => {
    if (active) setPos(start)
  }, [active, start])

  // One gentle sweep the first time the slide is on screen, hinting that it drags.
  useEffect(() => {
    const frame = frameRef.current
    if (!active || !frame || hintedRef.current) return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const timers: ReturnType<typeof setTimeout>[] = []
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hintedRef.current) return
        hintedRef.current = true
        observer.disconnect()
        setAnimating(true)
        const clamp = (v: number) => Math.min(92, Math.max(8, v))
        const steps: [number, number][] = [
          [350, clamp(start - 18)],
          [1000, clamp(start + 16)],
          [1650, start],
        ]
        steps.forEach(([delay, value]) =>
          timers.push(setTimeout(() => !draggingRef.current && setPos(value), delay)),
        )
        timers.push(setTimeout(() => setAnimating(false), 2400))
      },
      { threshold: 0.6 },
    )
    observer.observe(frame)
    return () => {
      observer.disconnect()
      timers.forEach(clearTimeout)
    }
  }, [active, start])

  const setFromClientX = useCallback((clientX: number) => {
    const rect = frameRef.current?.getBoundingClientRect()
    if (!rect) return
    const next = ((clientX - rect.left) / rect.width) * 100
    setPos(Math.min(100, Math.max(0, next)))
  }, [])

  const onPointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return
    draggingRef.current = true
    setAnimating(false)
    event.currentTarget.setPointerCapture(event.pointerId)
    setFromClientX(event.clientX)
  }

  const onPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) setFromClientX(event.clientX)
  }

  const endDrag = () => {
    draggingRef.current = false
  }

  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const step = event.shiftKey ? 10 : 4
    const keys: Record<string, number> = {
      ArrowLeft: pos - step,
      ArrowRight: pos + step,
      Home: 0,
      End: 100,
    }
    if (!(event.key in keys)) return
    event.preventDefault()
    setAnimating(false)
    setPos(Math.min(100, Math.max(0, keys[event.key])))
  }

  const ease = animating ? "duration-700 ease-in-out" : "duration-0"

  return (
    <div
      ref={frameRef}
      className="before-after-frame group relative aspect-[4/3] w-full cursor-ew-resize touch-pan-y select-none overflow-hidden bg-[#1a1c18] md:aspect-video"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
      onLostPointerCapture={endDrag}
    >
      {/* After: full frame underneath */}
      <img
        src={load ? item.after.src : undefined}
        alt={`${item.title}: ${item.after.label.toLowerCase()}`}
        draggable={false}
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: item.focus }}
      />

      {/* Before: same image box, revealed from the left up to the divider */}
      <img
        src={load ? item.before.src : undefined}
        alt={`${item.title}: ${item.before.label.toLowerCase()}`}
        draggable={false}
        decoding="async"
        className={`absolute inset-0 h-full w-full object-cover transition-[clip-path] ${ease}`}
        style={{
          objectPosition: item.focus,
          clipPath: `inset(0 ${100 - pos}% 0 0)`,
        }}
      />

      {/* Labels */}
      <span
        className="pointer-events-none absolute left-4 top-4 rounded-xs bg-black/65 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-white transition-opacity duration-300"
        style={{ opacity: pos < 12 ? 0 : 1 }}
      >
        {item.before.label}
      </span>
      <span
        className="pointer-events-none absolute right-4 top-4 rounded-xs bg-[#a5cd38] px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#1a1c18] transition-opacity duration-300"
        style={{ opacity: pos > 88 ? 0 : 1 }}
      >
        {item.after.label}
      </span>

      {/* Divider + handle: a full-width layer moved with transform (no layout per frame) */}
      <div
        className={`pointer-events-none absolute inset-0 will-change-transform transition-transform ${ease}`}
        style={{ transform: `translateX(${pos}%)` }}
      >
        <div className="absolute inset-y-0 -left-px w-0.5 bg-white shadow-[0_0_12px_rgba(0,0,0,0.45)]" />
        <div
          role="slider"
          tabIndex={active ? 0 : -1}
          aria-label={`Comparar ${item.before.label.toLowerCase()} y ${item.after.label.toLowerCase()}: ${item.title}`}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)}% ${item.before.label.toLowerCase()}`}
          onKeyDown={onKeyDown}
          className="pointer-events-auto absolute left-0 top-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-black/55 text-white shadow-lg transition-colors duration-200 group-hover:bg-[#a5cd38] group-hover:text-[#1a1c18] focus-visible:bg-[#a5cd38] focus-visible:text-[#1a1c18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a5cd38] focus-visible:ring-offset-2"
        >
          <ChevronLeft size={16} strokeWidth={2.5} className="-mr-0.5" />
          <ChevronRight size={16} strokeWidth={2.5} className="-ml-0.5" />
        </div>
      </div>
    </div>
  )
}

export function BeforeAfterSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const near = useNearViewport(sectionRef)
  const [index, setIndex] = useState(0)
  const current = COMPARISONS[index]
  const go = (direction: -1 | 1) =>
    setIndex((i) => (i + direction + COMPARISONS.length) % COMPARISONS.length)

  return (
    <section ref={sectionRef} className="py-20 border-b border-black/5">
      <div className="max-w-5xl mx-auto px-6 md:px-12 space-y-12">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="ff-display font-['Audiowide'] text-2xl md:text-4xl font-bold tracking-tight text-[#1a1c18] uppercase">
            Antes y Después
          </h2>
          <div className="w-12 h-1 bg-[#a5cd38] mx-auto"></div>
          <p className="text-[#1a1c18]/70 text-sm">
            Deslizá para ver cómo transformamos cada espacio.
          </p>
        </div>

        <div className="overflow-hidden rounded-sm border border-black/10 bg-white shadow-lg">
          {/* All slides stay mounted (images preloaded); only the active one is shown. */}
          <div className="relative">
            {COMPARISONS.map((item, i) => (
              <div
                key={item.title}
                // `invisible` (after the fade) keeps hidden slides' handles from catching drags.
                className={`transition-[opacity,visibility] duration-500 ${
                  i === index
                    ? "visible relative opacity-100"
                    : "invisible pointer-events-none absolute inset-0 opacity-0"
                }`}
                aria-hidden={i !== index}
              >
                <CompareSlider item={item} active={i === index} load={near} />
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-4 border-t border-black/10 px-5 py-4 sm:flex-row sm:items-center sm:justify-between md:px-6">
            <div className="min-w-0" aria-live="polite">
              <p className="ff-display font-['Audiowide'] text-base font-bold uppercase text-[#1a1c18] md:text-lg">
                {current.title}
              </p>
              <p className="text-xs text-[#1a1c18]/65 md:text-sm">{current.subtitle}</p>
            </div>

            <div className="flex items-center justify-between gap-5 sm:justify-end">
              <div className="flex items-center gap-0">
                {COMPARISONS.map((item, i) => (
                  <button
                    key={item.title}
                    type="button"
                    onClick={() => setIndex(i)}
                    className="group/dot flex h-6 min-w-6 cursor-pointer items-center justify-center px-1"
                    aria-label={`Ver proyecto ${i + 1}: ${item.title}`}
                    aria-current={i === index ? "true" : undefined}
                  >
                <span aria-hidden="true" className={`block h-2 rounded-full transition-all ${
                      i === index ? "w-8 bg-[#a5cd38]" : "w-2 bg-black/20 group-hover/dot:bg-black/40"
                    }`} />
              </button>
                ))}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="p-2 border border-black/15 hover:bg-[#a5cd38] hover:border-[#a5cd38] text-[#1a1c18] transition-colors rounded-xs cursor-pointer"
                  aria-label="Proyecto anterior"
                >
                  <ChevronLeft size={18} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="p-2 border border-black/15 hover:bg-[#a5cd38] hover:border-[#a5cd38] text-[#1a1c18] transition-colors rounded-xs cursor-pointer"
                  aria-label="Proyecto siguiente"
                >
                  <ChevronRight size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
