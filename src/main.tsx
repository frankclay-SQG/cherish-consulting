import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './app/App'
import BooksPage from './app/pages/BooksPage'
import ESAPage from './app/pages/ESAPage'
import LabyrinthsPage from './app/pages/LabyrinthsPage'
import ToSPage from './app/pages/ToSPage'
import PrivacyPage from './app/pages/PrivacyPage'
import BlogPage from './app/pages/BlogPage'
import BlogPostPage from './app/pages/BlogPostPage'
import DOTEvaluationsPage from './app/pages/DOTEvaluationsPage'
import VeteransEvaluationsPage from './app/pages/VeteransEvaluationsPage'
import AssessmentsPage from './app/pages/AssessmentsPage'
import ClinicalSupervisionPage from './app/pages/ClinicalSupervisionPage'
import ResourcesPage from './app/pages/ResourcesPage'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/"           element={<App />} />
        <Route path="/books"      element={<BooksPage />} />
        <Route path="/esa"        element={<ESAPage />} />
        <Route path="/labyrinths" element={<LabyrinthsPage />} />
        <Route path="/tos"        element={<ToSPage />} />
        <Route path="/privacy"    element={<PrivacyPage />} />
        <Route path="/blog"                   element={<BlogPage />} />
        <Route path="/blog/:slug"             element={<BlogPostPage />} />
        <Route path="/dot-evaluations"        element={<DOTEvaluationsPage />} />
        <Route path="/veterans-evaluations"   element={<VeteransEvaluationsPage />} />
        <Route path="/assessments"            element={<AssessmentsPage />} />
        <Route path="/clinical-supervision"   element={<ClinicalSupervisionPage />} />
        <Route path="/resources"              element={<ResourcesPage />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
