import React, { useState } from "react"
import { Navbar } from "./Navbar"
import { Footer } from "./Footer"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { Link, useParams } from "react-router-dom"
import NotFoundPage from "../NotFoundPage"
import { LazyImg } from "./LazyImg"
import { usePageMeta } from "../seo"
import servicePageData from "@/data/servicios.json"

type PhotoCarouselProps = {
  images: string[]
  initialImage: string
  title: string
}

function PhotoCarousel({ images, initialImage, title }: PhotoCarouselProps) {
  const initialIndex = Math.max(images.indexOf(initialImage), 0)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)
  const hasMultipleImages = images.length > 1

  const showPrevious = () => {
    setCurrentIndex((index) => (index - 1 + images.length) % images.length)
  }

  const showNext = () => {
    setCurrentIndex((index) => (index + 1) % images.length)
  }

  return (
    <div className="group relative h-[350px] w-full overflow-hidden rounded-sm bg-[#1a1c18] md:h-[450px]">
      <button
        type="button"
        onClick={showNext}
        className="h-full w-full cursor-pointer"
        aria-label={`Ver siguiente foto de ${title}`}
      >
        <LazyImg
          key={images[currentIndex]}
          src={images[currentIndex]}
          alt={`${title}, foto ${currentIndex + 1} de ${images.length}`}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
        />
      </button>

      {hasMultipleImages && (
        <>
          <button
            type="button"
            onClick={showPrevious}
            aria-label={`Ver foto anterior de ${title}`}
            className="absolute left-4 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-[#a5cd38] hover:text-[#1a1c18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a5cd38]"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            onClick={showNext}
            aria-label={`Ver siguiente foto de ${title}`}
            className="absolute right-4 top-1/2 flex size-10 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white backdrop-blur-sm transition-colors hover:bg-[#a5cd38] hover:text-[#1a1c18] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#a5cd38]"
          >
            <ArrowRight size={18} />
          </button>
          <div className="absolute bottom-4 right-4 z-20 flex items-center gap-0">
            {images.map((image, index) => (
              <button
                key={image}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className="group/dot flex h-6 min-w-6 cursor-pointer items-center justify-center px-1"
                aria-label={`Ver foto ${index + 1} de ${title}`}
                aria-current={currentIndex === index ? "true" : undefined}
              >
                <span aria-hidden="true" className={`block h-2 rounded-full transition-all ${
                  currentIndex === index
                    ? "w-8 bg-[#a5cd38]"
                    : "w-2 bg-white/40 group-hover/dot:bg-white/70"
                }`} />
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

// Versiones más livianas del hero para pantallas chicas.
function heroSrcSet(src: string) {
  if (src.includes("images.unsplash.com")) {
    const at = (w: number) =>
      src.replace(/w=\d+/, `w=${w}`).replace(/h=\d+/, `h=${Math.round((w * 9) / 16)}`) + "&q=50" // se muestra al 35% de opacidad
    return `${at(800)} 800w, ${at(1600)} 1600w`
  }
  if (src.endsWith(".webp")) return `${src.replace(/\.webp$/, "-800w.webp")} 800w, ${src} 1600w`
  return undefined
}

type ServiceData = {
  title: string
  subtitle: string
  seoTitle: string
  seoDescription: string
  heroImg: string
  features: {
    title: string
    description: string
    image: string
    images?: string[]
    tag: string
  }[]
}

export function ServicePage() {
  const { servicio = "" } = useParams()
  const data = (servicePageData as Record<string, ServiceData>)[servicio]
  if (!data) return <NotFoundPage />
  return <ServicePageContent servicio={servicio} data={data} />
}

function ServicePageContent({
  servicio,
  data,
}: {
  servicio: string
  data: ServiceData
}) {
  const { title, subtitle, heroImg, features, seoTitle, seoDescription } = data
  usePageMeta({
    title: seoTitle,
    description: seoDescription,
    path: `/soluciones/${servicio}`,
    image: `/og/${servicio}.jpg`, // ver scripts/og-images.mjs
    imageAlt: title,
  })
  const serviceImages = Array.from(
    new Set([heroImg, ...features.map((feature) => feature.image)]),
  )

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1a1c18] ff-body flex flex-col justify-between">
      <div>
        <Navbar activePage={servicio} />
        <main>

        {/* FULL SCREEN HERO WITH BACKGROUND PHOTO */}
        <section className="relative h-[75dvh] lg:h-screen flex items-center justify-center bg-[#1a1c18] overflow-hidden">
          <img
            src={heroImg}
            srcSet={heroSrcSet(heroImg)}
            sizes="100vw"
            alt={title}
            {...{ fetchpriority: "high" } /* React 18: atributo en minúsculas */}
            className="absolute inset-0 w-full h-full object-cover opacity-35 filter brightness-90"
          />
          {/* <div className="absolute inset-0 bg-gradient-to-t from-[#1a1c18] via-[#1a1c18]/40 to-[#1a1c18]/70" /> */}

          <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-12 text-center text-white space-y-6">
            <h1 className="ff-display font-['Audiowide'] text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white uppercase leading-tight">
              {title}
            </h1>
            <p className="text-lg md:text-2xl text-white/80 max-w-3xl mx-auto font-light leading-relaxed">
              {subtitle}
            </p>
            <div className="pt-6">
              <Link
                to="/contacto"
                onClick={() => window.scrollTo({ top: 0 })}
                className="btn-wipe btn-wipe-light px-8 py-4 bg-[#a5cd38] text-[#1a1c18] font-bold text-sm tracking-wider uppercase rounded-xs shadow-lg inline-flex items-center gap-3 cursor-pointer"
              >
                <span className="hidden md:block">
                  Solicitar Presupuesto para este Servicio
                </span>
                <span className="block md:hidden">Contactanos</span>
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </section>

        {/* ZIG ZAG FEATURES SECTION */}
        <section className="py-24 max-w-7xl mx-auto px-6 md:px-12 space-y-24">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="ff-display font-['Audiowide'] text-2xl md:text-4xl font-bold tracking-tight text-[#1a1c18] uppercase">
              Materiales y terminaciones
            </h2>
            <div className="w-16 h-1 bg-[#a5cd38] mx-auto"></div>
            <p className="text-[#1a1c18]/70 text-base">
              Conocé en detalle la tecnología, materiales y estándares de
              ejecución que aplicamos en cada proyecto.
            </p>
          </div>

          <div className="space-y-20 md:space-y-32">
            {features.map((item, idx) => {
              const isEven = idx % 2 === 0
              return (
                <div
                  key={idx}
                  className={`flex flex-col md:flex-row items-center gap-12 md:gap-16 ${
                    isEven ? "" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="w-full md:w-1/2 overflow-hidden rounded-sm border border-black/10 shadow-lg bg-white">
                    <PhotoCarousel
                      images={item.images?.length ? item.images : serviceImages}
                      initialImage={item.image}
                      title={item.title}
                    />
                  </div>
                  <div className="w-full md:w-1/2 space-y-5">
                    <h3 className="ff-display font-['Audiowide'] text-2xl md:text-3xl font-bold text-[#1a1c18] uppercase leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-base text-[#1a1c18]/80 leading-relaxed font-normal">
                      {item.description}
                    </p>
                    <div className="pt-2">
                      <Link
                to="/proyectos"
                onClick={() => window.scrollTo({ top: 0 })}
                        className="group text-xs font-bold tracking-wider uppercase text-[#55701a] hover:text-[#1a1c18] inline-flex items-center gap-2 border-b-2 border-[#55701a] hover:border-[#1a1c18] pb-1 transition-colors cursor-pointer"
                      >
                        <span>Ver más fotos</span>
                        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* BOTTOM CTA BANNER */}
        <section className="bg-[#1a1c18] text-white py-16 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="ff-display font-['Audiowide'] text-2xl font-bold uppercase text-white">
                ¿Tenés un proyecto en mente?
              </h3>
              <p className="text-white/70 text-sm max-w-xl">
                Nuestro equipo técnico asesora desde el plano inicial hasta el
                montaje final en cualquier punto del país.
              </p>
            </div>
            <Link
                to="/contacto"
                onClick={() => window.scrollTo({ top: 0 })}
              className="btn-wipe btn-wipe-light px-8 py-3.5 bg-[#a5cd38] text-[#1a1c18] font-bold text-xs tracking-wider uppercase rounded-xs shadow-md whitespace-nowrap cursor-pointer"
            >
              Contactar Asesor Técnico
            </Link>
          </div>
        </section>
      </main>
      </div>

      <Footer />
    </div>
  )
}
