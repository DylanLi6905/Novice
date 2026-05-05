import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router'
import { Authentication } from './features/auth/components/Authentication'
import Homepage from './routes/homepage'
import Dashboard from './routes/dashboard'
import ExpertsMarketplace from './routes/experts-marketplace'
import './css/index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Authentication>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/find-coach" element={<ExpertsMarketplace />} />
        </Routes>
      </BrowserRouter>
    </Authentication>
  </StrictMode>,
)
