import { Routes, Route } from 'react-router-dom'
import HomePage from './Home'
import ContactPage from './ContactPage'
import AboutPage from './AboutPage'
import GalleryPage from './GalleryPage'
import { ServicePage } from './components/ServicePage'
import NotFoundPage from './NotFoundPage'

export default function App () {
  return <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/sobre-nosotros' element={<AboutPage />} />
    <Route path='/galeria' element={<GalleryPage  />} />
    <Route path='/contacto' element={<ContactPage />} />
    <Route path="/servicios/:servicio" element={<ServicePage />} />
    <Route path='*' element={ <NotFoundPage /> } />
  </Routes>
}