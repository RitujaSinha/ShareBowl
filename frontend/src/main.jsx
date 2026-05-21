import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from './pages/Home'
import Signup from './pages/Signup'
import DonorDashboard from './pages/DonorDashboard'
import AddDonation from './pages/AddDonation'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/donor" element={<DonorDashboard />} />
      <Route path="/add-donation" element={<AddDonation />} />
    </Routes>
  </BrowserRouter>
)