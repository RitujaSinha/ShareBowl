import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../../api";
import {
  ArrowRight,
  Building2,
  Clock3,
  Gift,
  HeartHandshake,
  LogOut,
  MapPinned,
  ShieldCheck,
  Users,
} from "lucide-react";
import LogoutModal from "../../components/LogoutModal";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    donors: 0,
    organisations: 0,
    pendingOrganisations: 0,
    donations: 0,
  });

  const [loading, setLoading] = useState(true);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const fetchDashboard = async () => {
    try {
      const response = await fetch(`${API_URL}/admin/dashboard`, {
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message);
      }

      setStats(data);
    } catch (error) {
      console.error("Dashboard Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    fetchDashboard();
  }, [navigate]);

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

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg font-bold">
        Loading Dashboard...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <ShieldCheck size={26} strokeWidth={2.5} />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
                Admin Panel
              </p>

              <h1 className="text-2xl font-black text-gray-900">
                Dashboard
              </h1>

              <p className="text-sm font-medium text-gray-500">
                Manage organisations, donors and donations
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

        <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-3xl border border-blue-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <Users size={24} strokeWidth={2.5} />
            </div>

            <p className="text-sm font-bold text-gray-500">
              Total Donors
            </p>

            <h2 className="mt-2 text-3xl font-black text-gray-900">
              {stats.donors}
            </h2>
          </div>

          <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700">
              <Building2 size={24} strokeWidth={2.5} />
            </div>

            <p className="text-sm font-bold text-gray-500">
              Organisations
            </p>

            <h2 className="mt-2 text-3xl font-black text-gray-900">
              {stats.organisations}
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
              {stats.pendingOrganisations}
            </h2>
          </div>

          <div className="rounded-3xl border border-emerald-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Gift size={24} strokeWidth={2.5} />
            </div>

            <p className="text-sm font-bold text-gray-500">
              Total Donations
            </p>

            <h2 className="mt-2 text-3xl font-black text-emerald-700">
              {stats.donations}
            </h2>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-5">
            <h2 className="text-xl font-black text-gray-900">
              Administration
            </h2>

            <p className="text-sm font-medium text-gray-500">
              Quick access to admin management sections
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <div
              onClick={() => navigate("/admin/organisations")}
              className="group cursor-pointer rounded-3xl border border-green-100 bg-green-50 p-5 transition hover:bg-green-100"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                <HeartHandshake size={25} strokeWidth={2.5} />
              </div>

              <h3 className="text-lg font-black text-gray-900">
                Organisation Requests
              </h3>

              <p className="mt-2 text-sm font-medium text-gray-600">
                {stats.pendingOrganisations} pending organisation requests.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-black text-green-700">
                Open
                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </div>
            </div>

            <div
              onClick={() => navigate("/admin/donors")}
              className="group cursor-pointer rounded-3xl border border-blue-100 bg-blue-50 p-5 transition hover:bg-blue-100"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-blue-700 shadow-sm">
                <Users size={25} strokeWidth={2.5} />
              </div>

              <h3 className="text-lg font-black text-gray-900">
                Donor Directory
              </h3>

              <p className="mt-2 text-sm font-medium text-gray-600">
                {stats.donors} registered donors.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-black text-blue-700">
                Open
                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </div>
            </div>

            <div
              onClick={() => navigate("/admin/donations")}
              className="group cursor-pointer rounded-3xl border border-amber-100 bg-amber-50 p-5 transition hover:bg-amber-100"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-amber-700 shadow-sm">
                <MapPinned size={25} strokeWidth={2.5} />
              </div>

              <h3 className="text-lg font-black text-gray-900">
                Donations By Location
              </h3>

              <p className="mt-2 text-sm font-medium text-gray-600">
                {stats.donations} donations available.
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-black text-amber-700">
                Open
                <ArrowRight
                  size={17}
                  className="transition group-hover:translate-x-1"
                />
              </div>
            </div>
          </div>
        </div>

        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() => setShowLogoutModal(false)}
          onConfirm={handleLogout}
        />
      </div>
    </div>
  );
}

export default AdminDashboard;