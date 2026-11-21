import { useCallback, useEffect, useRef, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import {
    ArrowRight,
    ChevronLeft,
    ChevronRight
} from "lucide-react";

interface ProjectPhoto {
    url: string;
    alt: string;
}

interface PinnedProject {
    id: string;
    title: string;
    description: string;
    url: string;
    alt: string;
    photos: ProjectPhoto[];
    points: string;
    frame: { x: number; y: number; width: number; height: number };
}

const MOSAIC_TILES: PinnedProject[] = [
    {
        id: "t1",
        title: "CONTINENTAL NEUMASHOP - PILAR, BUENOS AIRES",
        description:
            "Desarrollamos una solución de integral de  imagen corporativa que combina revestimiento de fachada en ACM (aluminio compuesto), grandes letras corpóreas de acrilico iluminadas con leds, y totem publicitario de gran altura. El proyecto se completa con elementos de identidad visual en el interior, integrando diseño, materiales y tecnología en una propuesta de alto impacto.",
        url: "/images/mosaic-images/proyecto-continental/continental-foto-3.webp",
        alt: "REVESTIMIENTO - CARTELERÍA Y  CORPOREOS - GRAFICA CORPORATIVA",
        photos: [
            // proceso
            {
                url: "/images/mosaic-images/proyecto-continental/continental-foto-4.webp",
                alt: "imagen continental de noche",
            },
            {
                url: "/images/mosaic-images/proyecto-continental/continental-foto-10.webp",
                alt: "imagen continental de noche",
            },
            // de dia
            {
                url: "/images/mosaic-images/proyecto-continental/continental-foto-11.webp",
                alt: "imagen continental de noche",
            },
            {
                url: "/images/mosaic-images/proyecto-continental/continental-foto-5.webp",
                alt: "imagen continental de noche",
            },
            {
                url: "/images/mosaic-images/proyecto-continental/continental-foto-9.webp",
                alt: "imagen continental de noche",
            },
            // noche
            {
                url: "/images/mosaic-images/proyecto-continental/continental-foto-2.webp",
                alt: "imagen continental de noche",
            },
            {
                url: "/images/mosaic-images/proyecto-continental/continental-foto-3.webp",
                alt: "imagen continental de noche",
            },

            {
                url: "/images/mosaic-images/proyecto-continental/continental-foto-8.webp",
                alt: "imagen continental de noche",
            },
            // interior
            {
                url: "/images/mosaic-images/proyecto-continental/continental-foto-1.webp",
                alt: "imagen continental de noche",
            },


            {
                url: "/images/mosaic-images/proyecto-continental/continental-foto-6.webp",
                alt: "imagen continental de noche",
            },
            {
                url: "/images/mosaic-images/proyecto-continental/continental-foto-7.webp",
                alt: "imagen continental de noche",
            },

        ],
        points: "0,0 900,0 790,320 0,250",
        frame: { x: 0, y: 0, width: 900, height: 320 },
    },
    {
        id: "t2",
        title: "DUNLOP - General Rodriguez, San Nicolás de los Arroyos, Córdoba, Pilar, CABA",
        description:
            "Desarrollamos una intervención integral en diferentes sucursales del país, combinando revestimientos de los edificios en aluminio compuesto (ACM), carteles con fondo en ACM y letras corpóreas con laterales en chapa y frente de acrílico, con iluminación led, respetando los colores de la marca. El proyecto se completó con grafica corporativa en vidrieras y espacios interiores, asegurando una identidad visual consistente en cada sede.",
        url: "/images/mosaic-images/proyecto-dunlop/dunlop-foto-3.webp",
        alt: "Fachada comercial revestida",
        photos: [
            // general rodriguez
            {
                url: "/images/mosaic-images/proyecto-dunlop/dunlop-foto-7.webp",
                alt: "Vista frontal de la fachada comercial revestida",
            },
            {
                url: "/images/mosaic-images/proyecto-dunlop/dunlop-foto-8.webp",
                alt: "Vista frontal de la fachada comercial revestida",
            },
            {
                url: "/images/mosaic-images/proyecto-dunlop/dunlop-foto-6.webp",
                alt: "Vista frontal de la fachada comercial revestida",
            },
            {
                url: "/images/mosaic-images/proyecto-dunlop/dunlop-foto-9.webp",
                alt: "Vista frontal de la fachada comercial revestida",
            },
            //
            {
                url: "/images/mosaic-images/proyecto-dunlop/dunlop-foto-2.webp",
                alt: "Vista frontal de la fachada comercial revestida",
            },
            {
                url: "/images/mosaic-images/proyecto-dunlop/dunlop-foto-1.webp",
                alt: "Vista frontal de la fachada comercial revestida",
            },
            {
                url: "/images/mosaic-images/proyecto-dunlop/dunlop-foto-5.webp",
                alt: "Vista frontal de la fachada comercial revestida",
            },
            {
                url: "/images/mosaic-images/proyecto-dunlop/dunlop-foto-4.webp",
                alt: "Vista frontal de la fachada comercial revestida",
            },
            {
                url: "/images/mosaic-images/proyecto-dunlop/dunlop-foto-3.webp",
                alt: "Vista frontal de la fachada comercial revestida",
            },
            {
                url: "/images/mosaic-images/proyecto-dunlop/dunlop-foto-10.webp",
                alt: "Vista frontal de la fachada comercial revestida",
            },
        ],
        points: "900,0 1600,0 1600,400 790,320",
        frame: { x: 790, y: 0, width: 810, height: 400 },
    },
    {
        id: "t3",
        title: "GRUPO GALENO - IDENTIDAD CORPORATIVA MULTISEDE",
        description:
            "El proyecto incluye renovación de logo y la instalación en altura de letras corpóreas de gran formato realizadas en acero inoxidable con frente de acrílico e iluminación led en la Clínica TRINIDAD DE PALERMO. Se sumó en esta importante sede cartelería de ingreso con logo en acero inoxidable. En el proyecto abarcó sedes en San Isidro, Corrientes, Neuquén, Ramos Mejía, Luján, Microcentro (CABA), Belgrano y Puerto Madero con soluciones de cartelería corpórea exterior e interior desarrollada en diversos materiales como chapa o acero con frente de acrilico, y acero inoxidable pleno, con y sin iluminación led, adaptándose a las necesidades de cada espacio.",
        url: "/images/mosaic-images/proyecto-galeno/galeno-foto-9.webp",
        alt: "Galeno imagen principal",
        photos: [
            {
                url: "/images/mosaic-images/proyecto-galeno/galeno-foto-1.webp",
                alt: "galeno foto 1",
            },
            {
                url: "/images/mosaic-images/proyecto-galeno/galeno-foto-2.webp",
                alt: "galeno foto 2",
            },
            {
                url: "/images/mosaic-images/proyecto-galeno/galeno-foto-3.webp",
                alt: "galeno foto 3",
            },
            {
                url: "/images/mosaic-images/proyecto-galeno/galeno-foto-4.webp",
                alt: "galeno foto 4",
            },
            {
                url: "/images/mosaic-images/proyecto-galeno/galeno-foto-5.webp",
                alt: "galeno foto 5",
            },
            {
                url: "/images/mosaic-images/proyecto-galeno/galeno-foto-6.webp",
                alt: "galeno foto 6",
            },
            {
                url: "/images/mosaic-images/proyecto-galeno/galeno-foto-7.webp",
                alt: "galeno foto 7",
            },
            {
                url: "/images/mosaic-images/proyecto-galeno/galeno-foto-8.webp",
                alt: "galeno foto 8",
            },
            {
                url: "/images/mosaic-images/proyecto-galeno/galeno-foto-9.webp",
                alt: "galeno foto 9",
            },
            {
                url: "/images/mosaic-images/proyecto-galeno/galeno-foto-10.webp",
                alt: "galeno foto 10",
            },
            {
                url: "/images/mosaic-images/proyecto-galeno/galeno-foto-11.webp",
                alt: "galeno foto 11",
            },
            {
                url: "/images/mosaic-images/proyecto-galeno/galeno-foto-12.webp",
                alt: "galeno foto 12",
            },
            {
                url: "/images/mosaic-images/proyecto-galeno/galeno-foto-13.webp",
                alt: "galeno foto 13",
            },
            {
                url: "/images/mosaic-images/proyecto-galeno/galeno-foto-14.webp",
                alt: "galeno foto 14",
            },
            {
                url: "/images/mosaic-images/proyecto-galeno/galeno-foto-15.webp",
                alt: "galeno foto 15",
            },
        ],
        points: "0,250 790,320 650,740 0,810",
        frame: { x: 0, y: 250, width: 790, height: 560 },
    },
    {
        id: "t4",
        title: "IVESS - JAUREGUI",
        description:
            "Desarrollamos e instalamos un cartel exterior de grandes dimensiones, con letras corpóreas monumentales y el logo institucional en chapa y frente de acrílico, iluminados,, respetando con precisión los colores que identifican la marca.\nUna intervención de gran impacto visual que refuerza la identidad corporativa y consolida la presencia de IVESS en su planta industrial.",
        url: "/images/mosaic-images/proyecto-ivess/ivess-foto-1.webp",
        alt: "Ivess imagen principal",
        photos: [
            {
                url: "/images/mosaic-images/proyecto-ivess/ivess-foto-1.webp",
                alt: "Ivess foto 1",
            },
            {
                url: "/images/mosaic-images/proyecto-ivess/ivess-foto-2.webp",
                alt: "Ivess foto 2",
            },
            {
                url: "/images/mosaic-images/proyecto-ivess/ivess-foto-3.webp",
                alt: "Ivess foto 3",
            },
            {
                url: "/images/mosaic-images/proyecto-ivess/ivess-foto-4.webp",
                alt: "Ivess foto 4",
            },
            {
                url: "/images/mosaic-images/proyecto-ivess/ivess-foto-5.webp",
                alt: "Ivess foto 5",
            },
            {
                url: "/images/mosaic-images/proyecto-ivess/ivess-foto-6.webp",
                alt: "Ivess foto 6",
            },
        ],
        points: "790,320 1600,400 1600,650 650,740",
        frame: { x: 650, y: 320, width: 950, height: 420 },
    },
    {
        id: "t5",
        title: "JEBAR - NEUQUÉN",
        description:
            "Proyecto integral de revestimiento en ACM (aluminio compuesto) y cartelería  de acero inoxidable con frente de acrílico e iluminación led para una concesionaria de gran escala en la ciudad de Neuquén.\nUna intervención que combina soluciones constructivas e identidad corporativa para lograr una imagen arquitectónica sólida, uniforme y de gran impacto visual alineada con la identidad de marca de JEBAR.",
        url: "/images/mosaic-images/proyecto-jebar/jebar-foto-5.webp",
        alt: "Jebar imagen principal",
        photos: [
            {
                url: "/images/mosaic-images/proyecto-jebar/jebar-foto-1.webp",
                alt: "foto jebar 1",
            },
            {
                url: "/images/mosaic-images/proyecto-jebar/jebar-foto-2.webp",
                alt: "foto jebar 2",
            },
            {
                url: "/images/mosaic-images/proyecto-jebar/jebar-foto-3.webp",
                alt: "foto jebar 3",
            },
            {
                url: "/images/mosaic-images/proyecto-jebar/jebar-foto-4.webp",
                alt: "foto jebar 4",
            },
            {
                url: "/images/mosaic-images/proyecto-jebar/jebar-foto-5.webp",
                alt: "foto jebar 5",
            },
            {
                url: "/images/mosaic-images/proyecto-jebar/jebar-foto-6.webp",
                alt: "foto jebar 6",
            },
            {
                url: "/images/mosaic-images/proyecto-jebar/jebar-foto-7.webp",
                alt: "foto jebar 7",
            },
            {
                url: "/images/mosaic-images/proyecto-jebar/jebar-foto-8.webp",
                alt: "foto jebar 8",
            },
            {
                url: "/images/mosaic-images/proyecto-jebar/jebar-foto-9.webp",
                alt: "foto jebar 9",
            },
            {
                url: "/images/mosaic-images/proyecto-jebar/jebar-foto-10.webp",
                alt: "foto jebar 10",
            },
        ],
        points: "0,810 650,740 560,1000 0,1000",
        frame: { x: 0, y: 740, width: 650, height: 260 },
    },
    {
        id: "t6",
        title: " LUCCIANO´S - VILLA URQUIZA",
        description:
            "Desarrollamos una intervención integral que combina revestimientos de diseño exclusivo y plegados irregulares que generan textura, volúmenes y un marcado efecto tridimensional, que se completa con cartelería corpórea iluminada con leds. Un proyecto donde los materiales y la luz se integran para dar forma e identidad visual distintiva, convirtiendo la arquitectura del espacio en una extensión de la marca.",
        url: "/images/mosaic-images/proyecto-luccianos/luccianos-foto-7.webp",
        alt: "Lucciano's imagen principal",
        photos: [
            {
                url: "/images/mosaic-images/proyecto-luccianos/luccianos-foto-1.webp",
                alt: "foto luccianos 1",
            },
            {
                url: "/images/mosaic-images/proyecto-luccianos/luccianos-foto-2.webp",
                alt: "foto luccianos 2",
            },
            {
                url: "/images/mosaic-images/proyecto-luccianos/luccianos-foto-3.webp",
                alt: "foto luccianos 3",
            },
            {
                url: "/images/mosaic-images/proyecto-luccianos/luccianos-foto-4.webp",
                alt: "foto luccianos 4",
            },
            {
                url: "/images/mosaic-images/proyecto-luccianos/luccianos-foto-5.webp",
                alt: "foto luccianos 5",
            },
            {
                url: "/images/mosaic-images/proyecto-luccianos/luccianos-foto-6.webp",
                alt: "foto luccianos 6",
            },
            {
                url: "/images/mosaic-images/proyecto-luccianos/luccianos-foto-7.webp",
                alt: "foto luccianos 7",
            },
            {
                url: "/images/mosaic-images/proyecto-luccianos/luccianos-foto-8.webp",
                alt: "foto luccianos 8",
            }
        ],
        points: "650,740 1600,650 1600,1000 560,1000",
        frame: { x: 560, y: 650, width: 1040, height: 350 },
    },
];

const MOBILE_MOSAIC_LAYOUT = [
    {
        points: "0,0 600,0 600,270 0,330",
        frame: { x: 0, y: 0, width: 600, height: 330 },
    },
    {
        points: "0,330 600,270 600,620 0,570",
        frame: { x: 0, y: 270, width: 600, height: 350 },
    },
    {
        points: "0,570 600,620 600,870 0,930",
        frame: { x: 0, y: 570, width: 600, height: 360 },
    },
    {
        points: "0,930 600,870 600,1220 0,1170",
        frame: { x: 0, y: 870, width: 600, height: 350 },
    },
    {
        points: "0,1170 600,1220 600,1470 0,1530",
        frame: { x: 0, y: 1170, width: 600, height: 360 },
    },
    {
        points: "0,1530 600,1470 600,1800 0,1800",
        frame: { x: 0, y: 1470, width: 600, height: 330 },
    },
];

type Rect = { left: number; top: number; width: number; height: number };
type Frame = { x: number; y: number; width: number; height: number };

/** What the flip needs to know about the tile that was clicked. */
interface FlipOrigin {
    tile: SVGGElement;
    frame: Frame;
    points: string;
    imageUrl: string;
}

const FLIP_STEPS = 36;
const clamp01 = (v: number) => Math.min(1, Math.max(0, v));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2);

/** Screen rect of a tile's frame, from SVG viewBox units. */
function tileScreenRect(origin: FlipOrigin): Rect {
    const svg = origin.tile.ownerSVGElement!;
    const svgRect = svg.getBoundingClientRect();
    const s = svgRect.width / svg.viewBox.baseVal.width;
    return {
        left: svgRect.left + origin.frame.x * s,
        top: svgRect.top + origin.frame.y * s,
        width: origin.frame.width * s,
        height: origin.frame.height * s,
    };
}

/** The tile's slanted polygon as a CSS clip-path relative to its frame. */
function tileClipPath({ points, frame }: FlipOrigin) {
    const pts = points.split(" ").map((pair) => {
        const [x, y] = pair.split(",").map(Number);
        return `${(((x - frame.x) / frame.width) * 100).toFixed(2)}% ${(((y - frame.y) / frame.height) * 100).toFixed(2)}%`;
    });
    return `polygon(${pts.join(", ")})`;
}

/**
 * Keyframes for a physical card flip from the tile to the dialog. The front face
 * (tile photo) and back face (dialog) share one path and differ only by 180° of
 * rotation, so with backface-visibility hidden they read as one two-sided card.
 * Along the way the card lifts toward the viewer, tilts a little, and darkens as
 * it turns edge-on, like a real card catching the light.
 */
function cardFlipKeyframes(from: Rect, to: Rect, direction: 1 | -1) {
    const center = (r: Rect) => [r.left + r.width / 2, r.top + r.height / 2];
    const [fromX, fromY] = center(from);
    const [toX, toY] = center(to);

    // Each face is laid out at its own natural size (front = tile, back = dialog) and
    // transformed onto the card's shared position/size, so neither face is ever stretched
    // while it's the one facing the viewer.
    const placeFace = (face: Rect, x: number, y: number, w: number, h: number) => {
        const [faceX, faceY] = center(face);
        return {
            translate: `translate3d(${x - faceX}px, ${y - faceY}px, 0)`,
            scale: `scale(${w / face.width}, ${h / face.height})`,
        };
    };

    const front: Keyframe[] = [];
    const back: Keyframe[] = [];
    for (let i = 0; i <= FLIP_STEPS; i++) {
        const t = i / FLIP_STEPS;
        const move = easeInOutCubic(t);
        // Rotation starts a beat after the lift and lands as the card settles.
        const turn = easeInOutCubic(clamp01((t - 0.06) / 0.86));
        // Lift + tilt happen in the first part only and are gone before the card
        // arrives, so the size grows steadily into place with no overshoot/bounce.
        const arc = Math.sin(Math.PI * clamp01(t / 0.62));
        const lift = 1 + 0.06 * arc;
        const angle = 180 * turn;
        const shade = 0.6 + 0.4 * Math.abs(Math.cos((angle * Math.PI) / 180));

        const x = lerp(fromX, toX, move);
        const y = lerp(fromY, toY, move) - 22 * arc;
        const w = lerp(from.width, to.width, move) * lift;
        const h = lerp(from.height, to.height, move) * lift;
        const tilt = `rotateX(${(5 * arc).toFixed(2)}deg)`;
        const filter = `brightness(${shade.toFixed(3)})`;

        const f = placeFace(from, x, y, w, h);
        const b = placeFace(to, x, y, w, h);
        front.push({
            transform: `perspective(1800px) ${f.translate} ${tilt} rotateY(${direction * angle}deg) ${f.scale}`,
            filter,
        });
        back.push({
            transform: `perspective(1800px) ${b.translate} ${tilt} rotateY(${direction * (angle - 180)}deg) ${b.scale}`,
            filter,
        });
    }
    return { front, back };
}

/** Builds the card's front face (the tile photo) on top of the page, exactly over the tile. */
function createCardFront(origin: FlipOrigin, at: Rect) {
    const card = document.createElement("div");
    card.className = "project-flip-card";
    Object.assign(card.style, {
        left: `${at.left}px`,
        top: `${at.top}px`,
        width: `${at.width}px`,
        height: `${at.height}px`,
        backgroundImage: `url("${origin.imageUrl}")`,
        clipPath: tileClipPath(origin),
    });
    document.body.appendChild(card);
    return card;
}

function runCardFlip(origin: FlipOrigin, dialog: HTMLElement, mode: "open" | "close") {
    dialog.getAnimations().forEach((a) => a.cancel());
    // If the previous flip hasn't finished (e.g. closed mid-open), drop its front face.
    document.querySelectorAll(".project-flip-card").forEach((el) => el.remove());
    const from = tileScreenRect(origin);
    const to = dialog.getBoundingClientRect();
    const direction = from.left + from.width / 2 < window.innerWidth / 2 ? 1 : -1;
    const { front, back } = cardFlipKeyframes(from, to, direction);
    if (mode === "close") {
        front.reverse();
        back.reverse();
    }

    const card = createCardFront(origin, from);
    const timing: KeyframeAnimationOptions = {
        duration: mode === "open" ? 900 : 760,
        easing: "linear",
        fill: "both",
    };
    origin.tile.style.visibility = "hidden";
    const cardAnimation = card.animate(front, timing);
    const dialogAnimation = dialog.animate(back, timing);

    const cleanup = () => {
        card.remove();
        if (mode === "close") origin.tile.style.visibility = "";
    };
    cardAnimation.onfinish = cleanup;
    cardAnimation.oncancel = cleanup;
    return dialogAnimation;
}

export default function PhotoMosaicSection() {
    const mosaicRef = useRef<HTMLDivElement | null>(null);
    const thumbnailRailRef = useRef<HTMLDivElement | null>(null);
    const flipOriginRef = useRef<FlipOrigin | null>(null);
    const photoTouchStartRef = useRef<{ x: number; y: number } | null>(null);
    const closingRef = useRef(false);
    const [visible, setVisible] = useState<boolean[]>(new Array(MOSAIC_TILES.length).fill(false));
    const [selectedProject, setSelectedProject] = useState<PinnedProject | null>(null);
    const [activePhotoIndex, setActivePhotoIndex] = useState(0);

    useEffect(() => {
        const mosaic = mosaicRef.current;
        if (!mosaic) return;

        const timers: ReturnType<typeof setTimeout>[] = [];
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;

                MOSAIC_TILES.forEach((_, i) => {
                    timers.push(
                        setTimeout(() => {
                            setVisible((previous) => {
                                const next = [...previous];
                                next[i] = true;
                                return next;
                            });
                        }, i * 110),
                    );
                });
                observer.disconnect();
            },
            { threshold: 0.12 },
        );

        observer.observe(mosaic);
        return () => {
            observer.disconnect();
            timers.forEach(clearTimeout);
        };
    }, []);

    useEffect(() => {
        if (!selectedProject) return;
        thumbnailRailRef.current
            ?.querySelector<HTMLElement>('[aria-current="true"]')
            ?.scrollIntoView({
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
                block: "nearest",
                inline: "center",
            });
    }, [activePhotoIndex, selectedProject]);

    // Called when the dialog's DOM attaches (before first paint), so the card flip
    // starts from the tile without the dialog flashing in its final position first.
    const startOpenFlip = useCallback((marker: HTMLElement | null) => {
        const origin = flipOriginRef.current;
        const dialog = marker?.closest<HTMLElement>(".project-gallery-dialog");
        if (!origin || !dialog || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }
        // Hide for one frame so the dialog doesn't flash, and so the scroll lock
        // (which removes the page scrollbar and widens the dialog) has applied
        // before we measure the card's final size.
        dialog.style.opacity = "0";
        requestAnimationFrame(() => {
            dialog.style.opacity = "";
            if (dialog.isConnected) runCardFlip(origin, dialog, "open");
        });
    }, []);

    const openProject = (project: PinnedProject, tile: SVGGElement, layout: { points: string; frame: Frame }) => {
        flipOriginRef.current = {
            tile,
            frame: layout.frame,
            points: layout.points,
            imageUrl: project.url,
        };
        closingRef.current = false;
        setSelectedProject(project);
        setActivePhotoIndex(0);
    };

    const closeProject = () => {
        if (closingRef.current) return;

        const origin = flipOriginRef.current;
        const dialog = document.querySelector<HTMLElement>(
            '.project-gallery-dialog[data-state="open"]',
        );
        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)",
        ).matches;

        if (!origin || !dialog || prefersReducedMotion) {
            if (origin) origin.tile.style.visibility = "";
            flipOriginRef.current = null;
            setSelectedProject(null);
            return;
        }

        closingRef.current = true;
        const animation = runCardFlip(origin, dialog, "close");

        const finishClose = () => {
            closingRef.current = false;
            flipOriginRef.current = null;
            setSelectedProject(null);
        };

        animation.onfinish = finishClose;
        animation.oncancel = finishClose;
    };

    const movePhoto = (direction: -1 | 1) => {
        if (!selectedProject) return;
        setActivePhotoIndex(
            (current) => (current + direction + selectedProject.photos.length) % selectedProject.photos.length,
        );
    };

    const handlePhotoTouchEnd = (event: React.TouchEvent<HTMLDivElement>) => {
        const start = photoTouchStartRef.current;
        photoTouchStartRef.current = null;
        if (!start || !window.matchMedia("(max-width: 639px)").matches) return;

        const touch = event.changedTouches[0];
        const deltaX = touch.clientX - start.x;
        const deltaY = touch.clientY - start.y;
        if (Math.abs(deltaX) < 48 || Math.abs(deltaX) <= Math.abs(deltaY)) return;

        movePhoto(deltaX < 0 ? 1 : -1);
    };

    const activePhoto = selectedProject?.photos[activePhotoIndex];

    const renderMosaic = (variant: "desktop" | "mobile") => {
        const isMobile = variant === "mobile";
        const clipPrefix = `home-collage-${variant}-clip`;

        return (
            <svg
                className={`home-collage home-collage-${variant}`}
                viewBox={isMobile ? "0 0 600 1800" : "0 0 1600 1000"}
                role="img"
                aria-labelledby={`home-collage-title-${variant}`}
                preserveAspectRatio="xMidYMid meet"
            >
                <title id={`home-collage-title-${variant}`}>Selección de obras realizadas</title>
                <defs>
                    {MOSAIC_TILES.map((tile, index) => {
                        const layout = isMobile ? MOBILE_MOSAIC_LAYOUT[index] : tile;
                        return (
                            <clipPath
                                key={tile.id}
                                id={`${clipPrefix}-${tile.id}`}
                                clipPathUnits="userSpaceOnUse"
                            >
                                <polygon points={layout.points} />
                            </clipPath>
                        );
                    })}
                </defs>

                {MOSAIC_TILES.map((tile, i) => {
                    const layout = isMobile ? MOBILE_MOSAIC_LAYOUT[i] : tile;
                    const clipPath = `url(#${clipPrefix}-${tile.id})`;
                    const { x, y, width, height } = layout.frame;
                    // Center the label on the visible (slanted) shape, not the bounding frame.
                    const vertices = layout.points.split(" ").map((p) => p.split(",").map(Number));
                    const labelX = vertices.reduce((sum, [px]) => sum + px, 0) / vertices.length;
                    const labelY = vertices.reduce((sum, [, py]) => sum + py, 0) / vertices.length;

                    return (
                        <g
                            key={tile.id}
                            role="button"
                            tabIndex={0}
                            aria-label={`Abrir proyecto: ${tile.title}`}
                            onClick={(event) => openProject(tile, event.currentTarget, layout)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    openProject(tile, event.currentTarget, layout);
                                }
                            }}
                            className={`home-collage-tile ${visible[i]
                                ? "home-collage-visible"
                                : i % 2 === 0
                                    ? "home-collage-enter-left"
                                    : "home-collage-enter-right"
                                }`}
                        >
                            <g clipPath={clipPath}>
                                <image
                                    className="home-collage-image"
                                    href={tile.url}
                                    x={x}
                                    y={y}
                                    width={width}
                                    height={height}
                                    preserveAspectRatio="xMidYMid slice"
                                />
                            </g>
                            <polygon
                                className="home-collage-outline"
                                points={layout.points}
                                fill="none"
                                stroke="white"
                                strokeWidth="18"
                                strokeLinejoin="round"
                            />
                            <polygon
                                className="home-collage-focus-ring"
                                points={layout.points}
                                fill="none"
                                strokeWidth="18"
                                strokeLinejoin="round"
                            />
                            <g
                                transform={`translate(${labelX} ${labelY})`}
                                aria-hidden="true"
                            >
                                <g className="home-collage-caption">
                                    <text
                                        className="home-collage-caption-cta"
                                        textAnchor="middle"
                                        dominantBaseline="central"
                                    >
                                        VER PROYECTO  →
                                    </text>
                                    <rect
                                        className="home-collage-caption-rule"
                                        x={-40}
                                        y={26}
                                        width={80}
                                        height={4}
                                    />
                                </g>
                            </g>
                            {/* <g
                                className="home-collage-touch-marker"
                                transform={`translate(${layout.frame.x + layout.frame.width / 2} ${layout.frame.y + layout.frame.height / 2})`}
                                aria-hidden="true"
                            >
                                <circle r="34" />
                                <path d="M-13-4v-9h9 M4-13h9v9 M13 4v9H4 M-4 13h-9V4" />
                            </g> */}
                        </g>
                    );
                })}
            </svg>
        );
    };

    return (
        <section className="bg-[#f8f9fa] text-white py-20 lg:py-28 border-t border-white/10">
            <div className="w-full px-4 md:px-[48px] space-y-12">
                <div className="text-center max-w-2xl mx-auto space-y-3">
                    <h2 className="font-['Audiowide'] text-3xl md:text-5xl font-bold tracking-tight text-[#1a1c18] uppercase">
                        Proyectos Destacados
                    </h2>
                    <div className="w-16 h-1 bg-[#a5cd38] mx-auto" />
                    <p className="text-[#1a1c18]/70 text-base md:text-lg font-light">
                        Una selección de proyectos que refleja nuestra experiencia, versatilidad y alcance en todo el país.
                    </p>
                </div>

                <div ref={mosaicRef}>
                    {renderMosaic("desktop")}
                    {renderMosaic("mobile")}
                </div>

                <div className="text-center pt-4">
                    <button
                        // onClick={() => onNavigate("galeria")}
                        className="btn-wipe btn-wipe-primary px-8 py-4 bg-[#a5cd38] text-[#1a1c18] font-bold text-xs tracking-wider uppercase rounded-xs shadow-lg inline-flex items-center gap-3"
                    >
                        <span>Ver Galería Completa</span>
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>

            <Dialog
                open={Boolean(selectedProject)}
                onOpenChange={(open) => {
                    if (!open) closeProject();
                }}
            >
                <DialogContent
                    className="project-gallery-dialog max-h-[calc(100dvh-4rem)] w-[calc(100%-2rem)] max-w-4xl gap-0 overflow-y-auto border-white/15 bg-foreground p-0 text-white shadow-2xl sm:max-w-4xl"
                    onKeyDown={(event) => {
                        if (event.key === "ArrowLeft") {
                            event.preventDefault();
                            movePhoto(-1);
                        }
                        if (event.key === "ArrowRight") {
                            event.preventDefault();
                            movePhoto(1);
                        }
                    }}
                >
                    {selectedProject && activePhoto && (
                        <>
                            <span ref={startOpenFlip} hidden aria-hidden="true" />
                            <DialogHeader className="project-gallery-header border-b border-white/10 px-5 py-5 pr-16 text-left sm:px-7 sm:py-4">
                                <div className="flex items-center gap-3">
                                    <span className="font-mono text-xs font-bold uppercase tracking-widest text-primary">
                                        Proyecto destacado
                                    </span>
                                    <span className="text-xs tabular-nums text-white/55" aria-live="polite">
                                        {activePhotoIndex + 1} de {selectedProject.photos.length}
                                    </span>
                                </div>
                                <DialogTitle className="ff-display font-['Audiowide'] text-xl font-bold uppercase leading-tight text-white sm:text-2xl">
                                    {selectedProject.title}
                                </DialogTitle>
                            </DialogHeader>

                            <div
                                className="project-gallery-media relative flex min-h-64 items-center justify-center bg-black"
                                onTouchStart={(event) => {
                                    const touch = event.touches[0];
                                    photoTouchStartRef.current = { x: touch.clientX, y: touch.clientY };
                                }}
                                onTouchEnd={handlePhotoTouchEnd}
                                onTouchCancel={() => {
                                    photoTouchStartRef.current = null;
                                }}
                            >
                                <img
                                    key={activePhoto.url}
                                    src={activePhoto.url}
                                    alt={activePhoto.alt}
                                    className="h-[52dvh] min-h-64 w-full object-contain sm:h-[min(42dvh,480px)]"
                                />
                                {selectedProject.photos.length > 1 && (
                                    <>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => movePhoto(-1)}
                                            aria-label="Ver foto anterior"
                                            className="absolute left-3 top-1/2 size-11 -translate-y-1/2 rounded-full border border-white/25 bg-black/60 text-white backdrop-blur-sm hover:bg-primary hover:text-primary-foreground sm:left-5"
                                        >
                                            <ChevronLeft />
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => movePhoto(1)}
                                            aria-label="Ver foto siguiente"
                                            className="absolute right-3 top-1/2 size-11 -translate-y-1/2 rounded-full border border-white/25 bg-black/60 text-white backdrop-blur-sm hover:bg-primary hover:text-primary-foreground sm:right-5"
                                        >
                                            <ChevronRight />
                                        </Button>
                                    </>
                                )}
                            </div>

                            <div className="project-gallery-details space-y-5 px-5 py-5 sm:space-y-4 sm:px-7 sm:py-4 overflow-x-hidden">
                                <div
                                    ref={thumbnailRailRef}
                                    className="project-gallery-thumbnails flex snap-x snap-mandatory gap-3 overflow-x-scroll pb-2 "
                                    aria-label="Fotos del proyecto"
                                >
                                    {selectedProject.photos.map((photo, index) => (
                                        <Button
                                            key={photo.url}
                                            type="button"
                                            variant="ghost"
                                            aria-label={`Ver foto ${index + 1}: ${photo.alt}`}
                                            aria-current={index === activePhotoIndex ? "true" : undefined}
                                            onClick={() => setActivePhotoIndex(index)}
                                            className="project-gallery-thumbnail h-20 w-28 shrink-0 snap-center overflow-hidden rounded-none border-2 border-transparent p-0 opacity-60 hover:border-white/55 hover:bg-transparent hover:opacity-100 aria-[current=true]:border-primary aria-[current=true]:opacity-100 sm:h-16 sm:w-24"
                                        >
                                            <img
                                                src={photo.url}
                                                alt=""
                                                className="h-full w-full object-cover"
                                                loading="lazy"
                                                draggable={false}
                                            />
                                        </Button>
                                    ))}
                                </div>

                                <DialogDescription className="max-w-3xl text-sm leading-relaxed text-white/70">
                                    {selectedProject.description}
                                </DialogDescription>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
}