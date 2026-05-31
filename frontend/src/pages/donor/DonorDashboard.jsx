import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  LogOut,
  PackageCheck,
  Plus,
  Salad,
} from "lucide-react";
import LogoutModal from "../../components/LogoutModal";

function DonorDashboard() {
  const navigate = useNavigate();

  const [donations, setDonations] = useState([]);
  const [counts, setCounts] = useState({
    total: 0,
    accepted: 0,
    pending: 0,
  });

  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const fetchDonations = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/donation/my-donations", {
        credentials: "include",
      });

      const data = await res.json();
      setDonations(data.donations || []);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCounts = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/donation/counts", {
        credentials: "include",
      });

      const data = await res.json();

      setCounts({
        total: data.totalDonations || 0,
        accepted: data.acceptedDonations || 0,
        pending: data.pendingDonations || 0,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDonations();
    fetchCounts();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:5000/api/auth/logout", {
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
    <div className="min-h-screen bg-[#FFF8EF] px-4 py-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-orange-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 text-white">
              <HeartHandshake size={26} strokeWidth={2.5} />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-amber-600">
                Donor Portal
              </p>
              <h1 className="text-2xl font-black text-gray-900">
                Dashboard
              </h1>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate("/add-donation")}
              className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
            >
              <Plus size={17} />
              Add
            </button>

            <button
              onClick={() => setShowLogoutModal(true)}
              className="flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100"
            >
              <LogOut size={17} />
              Logout
            </button>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
              <Salad size={24} strokeWidth={2.5} />
            </div>

            <p className="text-sm font-bold text-gray-500">Total Donations</p>
            <h2 className="mt-2 text-3xl font-black text-gray-900">
              {counts.total}
            </h2>
          </div>

          <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700">
              <CheckCircle2 size={24} strokeWidth={2.5} />
            </div>

            <p className="text-sm font-bold text-gray-500">Accepted</p>
            <h2 className="mt-2 text-3xl font-black text-green-700">
              {counts.accepted}
            </h2>
          </div>

          <div className="rounded-3xl border border-amber-100 bg-white p-5 shadow-sm">
            <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
              <Clock3 size={24} strokeWidth={2.5} />
            </div>

            <p className="text-sm font-bold text-gray-500">Pending</p>
            <h2 className="mt-2 text-3xl font-black text-amber-600">
              {counts.pending}
            </h2>
          </div>
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            onClick={() => navigate("/add-donation")}
            className="group rounded-3xl bg-orange-500 p-6 text-left text-white shadow-sm transition hover:bg-orange-600"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20">
              <Plus size={25} strokeWidth={2.5} />
            </div>

            <h2 className="text-xl font-black">Add Donation</h2>
            <p className="mt-1 text-sm font-medium text-orange-50">
              Donate food or grocery items.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-black">
              Continue
              <ArrowRight size={17} className="transition group-hover:translate-x-1" />
            </div>
          </button>

          <button
            onClick={() => navigate("/my-donations")}
            className="group rounded-3xl border border-green-100 bg-white p-6 text-left shadow-sm transition hover:bg-green-50"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
              <PackageCheck size={25} strokeWidth={2.5} />
            </div>

            <h2 className="text-xl font-black text-gray-900">My Donations</h2>
            <p className="mt-1 text-sm font-medium text-gray-500">
              Track your donation status.
            </p>

            <div className="mt-5 flex items-center gap-2 text-sm font-black text-green-700">
              View List
              <ArrowRight size={17} className="transition group-hover:translate-x-1" />
            </div>
          </button>
        </div>

        <div className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-black text-gray-900">
                Recent Donations
              </h2>
              <p className="text-sm font-medium text-gray-500">
                Your latest donation records
              </p>
            </div>

            <button
              onClick={() => navigate("/my-donations")}
              className="rounded-xl bg-green-50 px-4 py-2 text-sm font-bold text-green-700 hover:bg-green-100"
            >
              View All
            </button>
          </div>

          {donations.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-orange-200 bg-orange-50 p-8 text-center">
              <h3 className="text-lg font-black text-gray-900">
                No donations yet
              </h3>
              <p className="mt-1 text-sm font-medium text-gray-500">
                Start by adding your first donation.
              </p>

              <button
                onClick={() => navigate("/add-donation")}
                className="mt-5 rounded-xl bg-green-600 px-5 py-3 text-sm font-bold text-white hover:bg-green-700"
              >
                Add Donation
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {donations.slice(0, 3).map((donation) => (
                <div
                  key={donation._id}
                  className="flex flex-col gap-3 rounded-2xl border border-gray-100 bg-white p-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-black text-gray-900">
                      {donation.foodType || "Food Donation"}
                    </p>

                    <p className="mt-1 text-sm font-medium text-gray-500">
                      {donation.quantity || "N/A"} •{" "}
                      {donation.createdAt
                        ? new Date(donation.createdAt).toLocaleDateString()
                        : "No date"}
                    </p>
                  </div>

                  <span
                    className={`w-fit rounded-full border px-3 py-1 text-xs font-black ${getStatusClass(
                      donation.status
                    )}`}
                  >
                    {donation.status || "Unknown"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        onConfirm={handleLogout}
      />
    </div>
  );
}

export default DonorDashboard;