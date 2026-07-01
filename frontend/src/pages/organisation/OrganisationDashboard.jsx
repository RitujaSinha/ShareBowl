import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../api";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  Clock3,
  Eye,
  HeartHandshake,
  LogOut,
  Mail,
  MapPin,
  PackageCheck,
  Phone,
  Users,
} from "lucide-react";
import Sidebar from "../../components/organisation/Sidebar";
import LogoutModal from "../../components/LogoutModal";

export default function OrganisationDashboard() {
  const navigate = useNavigate();

  const [orgInfo, setOrgInfo] = useState({});
  const [counts, setCounts] = useState({
    totalDonations: 0,
    pendingDonations: 0,
    acceptedDonations: 0,
  });

  const [donations, setDonations] = useState([]);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const fetchDashboard = async () => {
    try {
      const res = await fetch(`${API_URL}/organisation/dashboard`, {
        credentials: "include",
      });
  
      const data = await res.json();
  
      console.log("Dashboard Response:", data);
  
      setOrgInfo(data);
  
      setCounts({
        totalDonations: data.totalDonations || 0,
        pendingDonations: data.pendingDonations || 0,
        acceptedDonations: data.acceptedDonations || 0,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const fetchDonations = async () => {
    try {
      const res = await fetch(`${API_URL}/organisation/org-donations`, {
        credentials: "include",
      });

      const data = await res.json();

      setDonations(data.donations || []);
    } catch (err) {
      console.log(err);
    }
  };

  const handleAccept = async (id) => {
    try {
      await fetch(`${API_URL}/organisation/status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status: "Accepted" }),
      });

      fetchDashboard();
      fetchDonations();
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      setShowLogoutModal(false);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDashboard();
    fetchDonations();
  }, []);

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Accepted":
        return "bg-green-100 text-green-700 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F5FBF7]">
      <Sidebar />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-green-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 text-white">
                <HeartHandshake size={26} strokeWidth={2.5} />
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-green-600">
                  Organisation Portal
                </p>

                <h1 className="text-2xl font-black text-gray-900">
                  Dashboard
                </h1>

                <p className="text-sm font-medium text-gray-500">
                  Welcome back
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>

          <div className="mb-6 rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                <Building2 size={24} strokeWidth={2.5} />
              </div>

              <div>
                <h2 className="text-xl font-black text-gray-900">
                  Organisation Information
                </h2>

                <p className="text-sm font-medium text-gray-500">
                  Basic registered details of your organisation
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
                <p className="text-xs font-black uppercase tracking-widest text-green-700">
                  Organisation Name
                </p>
                <p className="mt-1 text-lg font-black text-gray-900">
                  {orgInfo.organisationName || "N/A"}
                </p>
              </div>

              <div className="rounded-2xl border border-green-100 bg-green-50 p-4">
                <p className="text-xs font-black uppercase tracking-widest text-green-700">
                  Verification Status
                </p>
                <p className="mt-1 flex items-center gap-2 text-lg font-black text-gray-900">
                  <CheckCircle2 size={20} className="text-green-700" />
                  {orgInfo.isAdminVerified ? "Verified" : "Pending"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <p className="mb-1 flex items-center gap-2 text-sm font-bold text-gray-500">
                  <Mail size={16} />
                  Email
                </p>
                <p className="text-sm font-black text-gray-900">
                  {orgInfo.email || "N/A"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4">
                <p className="mb-1 flex items-center gap-2 text-sm font-bold text-gray-500">
                  <Phone size={16} />
                  Phone
                </p>
                <p className="text-sm font-black text-gray-900">
                  {orgInfo.phone || orgInfo.contactNumber || "N/A"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 md:col-span-2">
                <p className="mb-1 flex items-center gap-2 text-sm font-bold text-gray-500">
                  <MapPin size={16} />
                  Location
                </p>
                <p className="text-sm font-black text-gray-900">
                  {orgInfo.location?.city || orgInfo.city || "N/A"},{" "}
                  {orgInfo.location?.district || orgInfo.district || "N/A"},{" "}
                  {orgInfo.location?.state || orgInfo.state || "N/A"}
                </p>
              </div>

              <div className="rounded-2xl border border-gray-100 bg-gray-50 p-4 md:col-span-2">
                <p className="text-sm font-bold text-gray-500">Address</p>
                <p className="mt-1 text-sm font-black text-gray-900">
                  {orgInfo.address || orgInfo.location?.address || "N/A"}
                </p>
              </div>
            </div>
          </div>

          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
                <PackageCheck size={24} strokeWidth={2.5} />
              </div>

              <p className="text-sm font-bold text-gray-500">
                Total Donations
              </p>

              <h2 className="mt-2 text-3xl font-black text-gray-900">
                {counts.totalDonations}
              </h2>
            </div>

            <div className="rounded-3xl border border-amber-100 bg-white p-5 shadow-sm">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <Clock3 size={24} strokeWidth={2.5} />
              </div>

              <p className="text-sm font-bold text-gray-500">
                Pending Requests
              </p>

              <h2 className="mt-2 text-3xl font-black text-amber-600">
                {counts.pendingDonations}
              </h2>
            </div>

            <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                <CheckCircle2 size={24} strokeWidth={2.5} />
              </div>

              <p className="text-sm font-bold text-gray-500">Accepted</p>

              <h2 className="mt-2 text-3xl font-black text-green-700">
                {counts.acceptedDonations}
              </h2>
            </div>
          </div>

          <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-black text-gray-900">
                  Recent Donations
                </h2>

                <p className="text-sm font-medium text-gray-500">
                  Latest donation requests from donors
                </p>
              </div>

              <button
                onClick={() => navigate("/org-donations")}
                className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
              >
                View All
                <ArrowRight size={17} />
              </button>
            </div>

            {donations.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-green-200 bg-green-50 p-8 text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                  <Users size={28} strokeWidth={2.5} />
                </div>

                <h3 className="text-lg font-black text-gray-900">
                  No donations found
                </h3>

                <p className="mt-1 text-sm font-medium text-gray-500">
                  New donation requests will appear here.
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-left text-sm text-gray-500">
                      <th className="pb-4 font-black">Donor</th>
                      <th className="pb-4 font-black">Food Type</th>
                      <th className="pb-4 font-black">Quantity</th>
                      <th className="pb-4 font-black">Status</th>
                      <th className="pb-4 font-black">Action</th>
                    </tr>
                  </thead>

                  <tbody>
                    {donations.slice(0, 5).map((d) => (
                      <tr key={d._id} className="border-b border-gray-100">
                        <td className="py-4 text-sm font-bold text-gray-900">
                          {d.donor?.donorName || d.donor?.name || "Anonymous"}
                        </td>

                        <td className="py-4 text-sm font-semibold text-gray-600">
                          {d.foodType || d.type || "N/A"}
                        </td>

                        <td className="py-4 text-sm font-semibold text-gray-600">
                          {d.quantity}
                        </td>

                        <td className="py-4">
                          <span
                            className={`w-fit rounded-full border px-3 py-1 text-xs font-black ${getStatusClass(
                              d.status
                            )}`}
                          >
                            {d.status}
                          </span>
                        </td>

                        <td className="py-4">
                          {d.status === "Pending" ? (
                            <button
                              onClick={() => handleAccept(d._id)}
                              className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
                            >
                              <CheckCircle2 size={16} />
                              Accept
                            </button>
                          ) : (
                            <button
                              onClick={() => navigate("/org-donations")}
                              className="flex items-center gap-2 rounded-xl bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 hover:bg-blue-100"
                            >
                              <Eye size={16} />
                              View
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <LogoutModal
            isOpen={showLogoutModal}
            onClose={() => setShowLogoutModal(false)}
            onConfirm={handleLogout}
          />
        </div>
      </div>
    </div>
  );
}