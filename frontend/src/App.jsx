import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import DonorDashboard from "./pages/DonorDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/donor" element={<DonorDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;