import "./index.css";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";

import OrganizationSignup from "./pages/organisation/OrganizationSignup.jsx";
import DonorSignup from "./pages/donor/DonorSignup.jsx";

import DonorDashboard from "./pages/donor/DonorDashboard";
import AddDonation from "./pages/donor/AddDonation";
import MyDonations from "./pages/donor/MyDonations";

import OrganisationDashboard from "./pages/organisation/OrganisationDashboard.jsx";
import AcceptedDonation from "./pages/organisation/AcceptedDonation.jsx";
import AllDonation from "./pages/organisation/AllDonation.jsx";
import PendingDonation from "./pages/organisation/PendingDonation.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster position="top-center" />

    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup/donorsignup" element={<DonorSignup />} />
      <Route path="/signup/organizationsignup" element={<OrganizationSignup />} />

      {/* DONOR PROTECTED ROUTES */}
      <Route
        path="/donor"
        element={
          <ProtectedRoute role="donor">
            <DonorDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/add-donation"
        element={
          <ProtectedRoute role="donor">
            <AddDonation />
          </ProtectedRoute>
        }
      />

      <Route
        path="/my-donations"
        element={
          <ProtectedRoute role="donor">
            <MyDonations />
          </ProtectedRoute>
        }
      />

      {/* ORGANISATION PROTECTED ROUTES */}
      <Route
        path="/organisation-dashboard"
        element={
          <ProtectedRoute role="organisation">
            <OrganisationDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/org-donations"
        element={
          <ProtectedRoute role="organisation">
            <AllDonation />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pending-donations"
        element={
          <ProtectedRoute role="organisation">
            <PendingDonation />
          </ProtectedRoute>
        }
      />

      <Route
        path="/accepted-donations"
        element={
          <ProtectedRoute role="organisation">
            <AcceptedDonation />
          </ProtectedRoute>
        }
      />
    </Routes>
  </BrowserRouter>
);