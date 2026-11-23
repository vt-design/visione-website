import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './Home'

// La home se carga de inmediato; el resto de las páginas se descarga al navegar.
const AboutPage = lazy(() => import('./AboutPage'))
const GalleryPage = lazy(() => import('./GalleryPage'))
const ContactPage = lazy(() => import('./ContactPage'))
const ServicePage = lazy(() => import('./components/ServicePage').then((m) => ({ default: m.ServicePage })))
const NotFoundPage = lazy(() => import('./NotFoundPage'))

export default function App () {
  return <Suspense fallback={<div className="min-h-screen bg-[#1a1c18]" />}>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/sobre-nosotros' element={<AboutPage />} />
      <Route path='/proyectos' element={<GalleryPage />} />
      <Route path='/contacto' element={<ContactPage />} />
      <Route path="/soluciones/:servicio" element={<ServicePage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  </Suspense>
}
