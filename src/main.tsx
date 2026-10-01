import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./app/App"
import { FloatingWhatsApp } from "./app/components/FloatingWhatsApp"
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
    <FloatingWhatsApp />
  </React.StrictMode>,
)
