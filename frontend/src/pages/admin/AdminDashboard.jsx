import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LogoutModal from "../../components/LogoutModal";

function AdminDashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    donors: 0,
    organisations: 0,
    pendingOrganisations: 0,
    donations: 0,
  });

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  useEffect(() => {
    const user = JSON.parse(
      localStorage.getItem("user")
    );

    if (!user || user.role !== "admin") {
      navigate("/login");
      return;
    }

    setStats({
      donors: 12,
      organisations: 5,
      pendingOrganisations: 2,
      donations: 30,
    });
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await fetch(
        "http://localhost:5000/api/auth/logout",
        {
          method: "POST",
          credentials: "include",
        }
      );

      localStorage.removeItem("user");
      localStorage.removeItem("token");

      setShowLogoutModal(false);

      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">

      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-white px-8 py-8">
        <div className="flex justify-between items-center">

          <div>
            <h1 className="text-3xl font-bold">
              Admin Dashboard
            </h1>

            <p className="text-gray-300 mt-1">
              Manage organisations, donors and donations
            </p>
          </div>

          <button
            onClick={() =>
              setShowLogoutModal(true)
            }
            className="bg-white text-slate-800 px-4 py-2 rounded-lg font-medium"
          >
            Logout
          </button>

        </div>
      </div>

      <div className="p-8">

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

          <div className="bg-white p-6 rounded-2xl shadow border">
            <h3 className="text-gray-500 text-sm">
              Total Donors
            </h3>

            <p className="text-3xl font-bold mt-2">
              {stats.donors}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border">
            <h3 className="text-gray-500 text-sm">
              Organisations
            </h3>

            <p className="text-3xl font-bold mt-2">
              {stats.organisations}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border">
            <h3 className="text-gray-500 text-sm">
              Pending Requests
            </h3>

            <p className="text-3xl font-bold mt-2 text-yellow-600">
              {stats.pendingOrganisations}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow border">
            <h3 className="text-gray-500 text-sm">
              Total Donations
            </h3>

            <p className="text-3xl font-bold mt-2 text-green-600">
              {stats.donations}
            </p>
          </div>

        </div>

        <h2 className="text-2xl font-semibold mb-5">
          Administration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div
            onClick={() =>
              navigate("/admin/organisations")
            }
            className="bg-white p-6 rounded-2xl shadow border cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">
              Organisation Requests
            </h3>

            <p className="text-gray-500 mt-2">
              Approve or reject organisation registrations.
            </p>
          </div>

          <div
            onClick={() =>
              navigate("/admin/donors")
            }
            className="bg-white p-6 rounded-2xl shadow border cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">
              Donor Directory
            </h3>

            <p className="text-gray-500 mt-2">
              View all registered donors.
            </p>
          </div>

          <div
            onClick={() =>
              navigate("/admin/donations")
            }
            className="bg-white p-6 rounded-2xl shadow border cursor-pointer hover:shadow-lg transition"
          >
            <h3 className="text-lg font-semibold">
              Donations By Location
            </h3>

            <p className="text-gray-500 mt-2">
              Filter donations by state and district.
            </p>
          </div>

        </div>

        <LogoutModal
          isOpen={showLogoutModal}
          onClose={() =>
            setShowLogoutModal(false)
          }
          onConfirm={handleLogout}
        />

      </div>

    </div>
  );
}

export default AdminDashboard;