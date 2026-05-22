import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home.jsx'
import Signup from './pages/Signup.jsx'
import Login from './pages/Login.jsx'
import OrganizationSignup from './pages/organisation/OrganizationSignup.jsx'
import DonorSignup from './pages/donor/DonorSignup.jsx'
import DonorDashboard from './pages/donor/DonorDashboard'
import AddDonation from './pages/donor/AddDonation'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>

      <Route  path="/" element={<Home/>} />
      <Route path = "/signup" element = {<Signup/>} />
      <Route path= "/login" element = {<Login/>} />
      <Route path="/signup/donorsignup" element={<DonorSignup />} />
      <Route path="/signup/organizationsignup" element={<OrganizationSignup />} />
      <Route path="/donor" element={<DonorDashboard />} />
      <Route path="/add-donation" element={<AddDonation />} />
    </Routes>
  </BrowserRouter>
)