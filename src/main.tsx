import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './app/App'
import AdminPage from './app/AdminPage'
import BooksPage from './app/pages/BooksPage'
import ESAPage from './app/pages/ESAPage'
import LabyrinthsPage from './app/pages/LabyrinthsPage'
import ToSPage from './app/pages/ToSPage'
import PrivacyPage from './app/pages/PrivacyPage'
import './styles/index.css'

// SOF-56: Dynamically load Google Analytics if configured via /admin
const savedGaId = localStorage.getItem('cherish_ga_id')
if (savedGaId?.startsWith('G-')) {
  const s = document.createElement('script')
  s.async = true
  s.src = `https://www.googletagmanager.com/gtag/js?id=${savedGaId}`
  document.head.appendChild(s)
  ;(window as any).dataLayer = (window as any).dataLayer || []
  const gtag = (...args: unknown[]) => (window as any).dataLayer.push(args)
  ;(window as any).gtag = gtag
  gtag('js', new Date())
  gtag('config', savedGaId)
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<App />} />
        <Route path="/books"      element={<BooksPage />} />
        <Route path="/esa"        element={<ESAPage />} />
        <Route path="/labyrinths" element={<LabyrinthsPage />} />
        <Route path="/admin"      element={<AdminPage />} />
        <Route path="/tos"        element={<ToSPage />} />
        <Route path="/privacy"    element={<PrivacyPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
