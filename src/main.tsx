import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from "./app/App"
import { FloatingWhatsApp } from "./app/components/FloatingWhatsApp"
import { WebMcpTools } from "./app/webmcp/WebMcpTools"
import './styles/index.css'

const container = document.getElementById('root')!
const app = (
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <FloatingWhatsApp />
      <WebMcpTools />
    </BrowserRouter>
  </React.StrictMode>
)

// Las páginas vienen prerenderizadas (scripts/prerender.mjs): si hay HTML, se hidrata.
if (container.hasChildNodes()) {
  ReactDOM.hydrateRoot(container, app)
} else {
  ReactDOM.createRoot(container).render(app)
}
