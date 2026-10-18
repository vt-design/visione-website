import { Routes, Route } from 'react-router-dom'
import HomePage from './Home'
import ContactPage from './ContactPage'
import AboutPage from './AboutPage'
import GalleryPage from './GalleryPage'
import { ServicePage } from './components/ServicePage'

export default function App () {
  return <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/sobre-nosotros' element={<AboutPage onNavigate={() => {}} />} />
    <Route path='/galeria' element={<GalleryPage onNavigate={() => {}} />} />
    <Route path='/contacto' element={<ContactPage onNavigate={() => {}} />} />
    <Route path="/servicios/:servicio" element={<ServicePage />} />
  </Routes>
}