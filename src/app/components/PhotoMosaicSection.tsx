import { useEffect, useRef, useState } from "react";
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
        title: "Gráfica ambiental para oficinas",
        description:
            "Aplicamos vinilos y recursos de señalética interior para reforzar la identidad corporativa, ordenar los recorridos y transformar los espacios de trabajo.",
        url: "https://images.unsplash.com/photo-1780565081532-0f68d721e44a?w=1200&h=800&fit=crop&auto=format",
        alt: "Gráfica aplicada en espacio comercial",
        photos: [
            {
                url: "https://images.unsplash.com/photo-1780565081532-0f68d721e44a?w=1600&h=1100&fit=crop&auto=format",
                alt: "Gráfica de marca aplicada en un espacio corporativo",
            },
            {
                url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&h=1100&fit=crop&auto=format",
                alt: "Vista general del espacio de trabajo intervenido",
            },
            {
                url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1600&h=1100&fit=crop&auto=format",
                alt: "Detalle de gráfica y señalización interior",
            },
            {
                url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=1100&fit=crop&auto=format",
                alt: "Acceso corporativo con identidad integrada",
            },
            {
                url: "https://images.unsplash.com/photo-1608126841830-53832c4b326f?w=1600&h=1100&fit=crop&auto=format",
                alt: "Terminación de materiales en el área de recepción",
            },
        ],
        points: "790,320 1600,400 1600,650 650,740",
        frame: { x: 650, y: 320, width: 950, height: 420 },
    },
    {
        id: "t5",
        title: "Totem de acceso y orientación",
        description:
            "Resolvimos un hito de acceso visible y resistente, combinando estructura metálica, gráfica de alto desempeño y una lectura jerárquica para visitantes.",
        url: "https://images.unsplash.com/photo-1779614800682-0c0cea8e0cd5?w=1200&h=900&fit=crop&auto=format",
        alt: "Señalética urbana de gran formato",
        photos: [
            {
                url: "https://images.unsplash.com/photo-1779614800682-0c0cea8e0cd5?w=1600&h=1100&fit=crop&auto=format",
                alt: "Totem de acceso visto desde la circulación principal",
            },
            {
                url: "https://images.unsplash.com/photo-1780385187604-4663a1d7c6e6?w=1600&h=1100&fit=crop&auto=format",
                alt: "Detalle de iluminación y lectura nocturna",
            },
            {
                url: "https://images.unsplash.com/photo-1564182842834-681b7be6de4b?w=1600&h=1100&fit=crop&auto=format",
                alt: "Estructura portante durante el montaje",
            },
            {
                url: "https://images.unsplash.com/photo-1551520692-7cdc7dc041b1?w=1600&h=1100&fit=crop&auto=format",
                alt: "Integración de la señal con el entorno arquitectónico",
            },
        ],
        points: "0,810 650,740 560,1000 0,1000",
        frame: { x: 0, y: 740, width: 650, height: 260 },
    },
    {
        id: "t6",
        title: "Envolvente metálica contemporánea",
        description:
            "Diseñamos y ejecutamos un revestimiento modular que actualiza la imagen del edificio, protege la fachada y mantiene una terminación uniforme de bajo mantenimiento.",
        url: "https://images.unsplash.com/photo-1608126841830-53832c4b326f?w=1200&h=800&fit=crop&auto=format",
        alt: "Revestimiento arquitectónico contemporáneo",
        photos: [
            {
                url: "https://images.unsplash.com/photo-1608126841830-53832c4b326f?w=1600&h=1100&fit=crop&auto=format",
                alt: "Vista completa del revestimiento arquitectónico",
            },
            {
                url: "https://images.unsplash.com/photo-1760787545864-b468b6fe2c92?w=1600&h=1100&fit=crop&auto=format",
                alt: "Modulación de paneles en la fachada comercial",
            },
            {
                url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&h=1100&fit=crop&auto=format",
                alt: "Encuentros verticales de la envolvente exterior",
            },
            {
                url: "https://images.unsplash.com/photo-1551520692-7cdc7dc041b1?w=1600&h=1100&fit=crop&auto=format",
                alt: "Detalle de textura y terminación metálica",
            },
            {
                url: "https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?w=1600&h=1100&fit=crop&auto=format",
                alt: "Proceso de instalación de la subestructura",
            },
            {
                url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&h=1100&fit=crop&auto=format",
                alt: "Acceso terminado visto desde el interior",
            },
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


export default function PhotoMosaicSection() {
    const mosaicRef = useRef<HTMLDivElement | null>(null);
    const thumbnailRailRef = useRef<HTMLDivElement | null>(null);
    const flipOriginRef = useRef<{
        left: number;
        top: number;
        width: number;
        height: number;
    } | null>(null);
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

    useEffect(() => {
        const origin = flipOriginRef.current;
        if (
            !selectedProject ||
            !origin ||
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ) {
            return;
        }

        let animation: Animation | null = null;
        const frame = requestAnimationFrame(() => {
            const dialog = document.querySelector<HTMLElement>(
                '.project-gallery-dialog[data-state="open"]',
            );
            if (!dialog) return;

            const target = dialog.getBoundingClientRect();
            const originCenterX = origin.left + origin.width / 2;
            const originCenterY = origin.top + origin.height / 2;
            const targetCenterX = target.left + target.width / 2;
            const targetCenterY = target.top + target.height / 2;
            const offsetX = originCenterX - targetCenterX;
            const offsetY = originCenterY - targetCenterY;
            const scaleX = Math.max(0.16, Math.min(1, origin.width / target.width));
            const scaleY = Math.max(0.16, Math.min(1, origin.height / target.height));
            const rotationDirection = originCenterX < window.innerWidth / 2 ? -1 : 1;

            animation = dialog.animate(
                [
                    {
                        opacity: 0.08,
                        transform: `perspective(1050px) translate3d(${offsetX}px, ${offsetY}px, 0) rotateY(${rotationDirection * 88}deg) scale(${scaleX}, ${scaleY})`,
                        filter: "brightness(0.62)",
                    },
                    {
                        offset: 0.72,
                        opacity: 1,
                        transform: `perspective(1050px) translate3d(${offsetX * 0.08}px, ${offsetY * 0.08}px, 0) rotateY(${rotationDirection * 10}deg) scale(0.98)`,
                        filter: "brightness(0.96)",
                    },
                    {
                        opacity: 1,
                        transform: "perspective(1050px) translate3d(0, 0, 0) rotateY(0deg) scale(1)",
                        filter: "brightness(1)",
                    },
                ],
                {
                    duration: 650,
                    easing: "cubic-bezier(0.2, 0.78, 0.22, 1)",
                    fill: "both",
                },
            );
        });

        return () => {
            cancelAnimationFrame(frame);
            animation?.cancel();
        };
    }, [selectedProject]);

    const openProject = (project: PinnedProject, source: Element) => {
        const { left, top, width, height } = source.getBoundingClientRect();
        flipOriginRef.current = { left, top, width, height };
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
            flipOriginRef.current = null;
            setSelectedProject(null);
            return;
        }

        closingRef.current = true;
        dialog.getAnimations().forEach((runningAnimation) => runningAnimation.cancel());

        const target = dialog.getBoundingClientRect();
        const originCenterX = origin.left + origin.width / 2;
        const originCenterY = origin.top + origin.height / 2;
        const targetCenterX = target.left + target.width / 2;
        const targetCenterY = target.top + target.height / 2;
        const offsetX = originCenterX - targetCenterX;
        const offsetY = originCenterY - targetCenterY;
        const scaleX = Math.max(0.16, Math.min(1, origin.width / target.width));
        const scaleY = Math.max(0.16, Math.min(1, origin.height / target.height));
        const rotationDirection = originCenterX < window.innerWidth / 2 ? -1 : 1;

        const animation = dialog.animate(
            [
                {
                    opacity: 1,
                    transform: "perspective(1050px) translate3d(0, 0, 0) rotateY(0deg) scale(1)",
                    filter: "brightness(1)",
                },
                {
                    offset: 0.3,
                    opacity: 1,
                    transform: `perspective(1050px) translate3d(${offsetX * 0.08}px, ${offsetY * 0.08}px, 0) rotateY(${rotationDirection * 10}deg) scale(0.98)`,
                    filter: "brightness(0.96)",
                },
                {
                    opacity: 0.08,
                    transform: `perspective(1050px) translate3d(${offsetX}px, ${offsetY}px, 0) rotateY(${rotationDirection * 88}deg) scale(${scaleX}, ${scaleY})`,
                    filter: "brightness(0.62)",
                },
            ],
            {
                duration: 580,
                easing: "cubic-bezier(0.4, 0, 0.58, 1)",
                fill: "both",
            },
        );

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

                    return (
                        <g
                            key={tile.id}
                            role="button"
                            tabIndex={0}
                            aria-label={`Abrir proyecto: ${tile.title}`}
                            onClick={(event) => openProject(tile, event.currentTarget)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter" || event.key === " ") {
                                    event.preventDefault();
                                    openProject(tile, event.currentTarget);
                                }
                            }}
                            className={`home-collage-tile ${visible[i]
                                    ? "home-collage-visible"
                                    : i % 2 === 0
                                        ? "home-collage-enter-left"
                                        : "home-collage-enter-right"
                                }`}
                        >
                            <image
                                href={tile.url}
                                x={layout.frame.x}
                                y={layout.frame.y}
                                width={layout.frame.width}
                                height={layout.frame.height}
                                preserveAspectRatio="xMidYMid slice"
                                clipPath={clipPath}
                            />
                            <polygon
                                className="home-collage-interaction-shade"
                                points={layout.points}
                                clipPath={clipPath}
                            />
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
                                className="home-collage-action-label"
                                transform={`translate(${layout.frame.x + layout.frame.width / 2} ${layout.frame.y + layout.frame.height / 2})`}
                                aria-hidden="true"
                            >
                                <rect x="-126" y="-29" width="252" height="58" rx="4" />
                                <text textAnchor="middle" dominantBaseline="central">
                                    VER PROYECTO
                                </text>
                            </g>
                            <g
                                className="home-collage-touch-marker"
                                transform={`translate(${layout.frame.x + layout.frame.width / 2} ${layout.frame.y + layout.frame.height / 2})`}
                                aria-hidden="true"
                            >
                                <circle r="34" />
                                <path d="M-13-4v-9h9 M4-13h9v9 M13 4v9H4 M-4 13h-9V4" />
                            </g>
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
                    className="project-gallery-dialog max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-5xl gap-0 overflow-y-auto border-white/15 bg-foreground p-0 text-white shadow-2xl sm:max-w-5xl"
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
                            <DialogHeader className="project-gallery-header border-b border-white/10 px-5 py-5 pr-16 text-left sm:px-7">
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
                                className="project-gallery-media relative flex min-h-64 items-center justify-center bg-black sm:min-h-96"
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
                                    className="max-h-[52dvh] min-h-64 w-full object-contain sm:min-h-96"
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

                            <div className="project-gallery-details space-y-5 px-5 py-5 sm:px-7 sm:py-6 overflow-x-hidden">
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
                                            className="project-gallery-thumbnail h-20 w-28 shrink-0 snap-center overflow-hidden rounded-none border-2 border-transparent p-0 opacity-60 hover:border-white/55 hover:bg-transparent hover:opacity-100 aria-[current=true]:border-primary aria-[current=true]:opacity-100 sm:h-24 sm:w-36"
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

                                <DialogDescription className="max-w-3xl text-sm leading-relaxed text-white/70 sm:text-base">
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