import "./index.css";
import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";

import OrganizationSignup from "./pages/organisation/OrganizationSignup.jsx";
import DonorSignup from "./pages/donor/DonorSignup.jsx";

import DonorDashboard from "./pages/donor/DonorDashboard.jsx";
import AddDonation from "./pages/donor/AddDonation.jsx";
import MyDonations from "./pages/donor/MyDonations.jsx";

import OrganisationDashboard from "./pages/organisation/OrganisationDashboard.jsx";
import AcceptedDonation from "./pages/organisation/AcceptedDonation.jsx";
import AllDonation from "./pages/organisation/AllDonation.jsx";
import PendingDonation from "./pages/organisation/PendingDonation.jsx";

import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

import ProtectedRoute from "./components/ProtectedRoute.jsx";
import DonorDirectory from "./pages/admin/DonorDirectory";
import DonationByLocation from "./pages/admin/DonationByLocation";
import OrganisationRequests from "./pages/admin/OrganisationRequests";

import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Toaster position="top-center" />

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup/donorsignup" element={<DonorSignup />} />
      <Route
        path="/signup/organizationsignup"
        element={<OrganizationSignup />}
      />

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

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/donors"
        element={
          <ProtectedRoute role="admin">
            <DonorDirectory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/donations"
        element={
          <ProtectedRoute role="admin">
            <DonationByLocation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/organisations"
        element={
          <ProtectedRoute role="admin">
            <OrganisationRequests />
          </ProtectedRoute>
        }
      />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Routes>
  </BrowserRouter>
);