import './index.css'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import Signup from './pages/Signup'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route  path="/" element={<Home/>} />
      <Route path = "/signup" element = {<Signup/>} />
    </Routes>
  </BrowserRouter>
)
