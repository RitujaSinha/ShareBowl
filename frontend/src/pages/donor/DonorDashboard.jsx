import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function DonorDashboard() {
  const navigate = useNavigate();
  const location = useLocation();

  const [donations, setDonations] = useState([]);

  // 🔐 Protect route
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || user.role !== "donor") {
      navigate("/login");
    }
  }, []);

  // 🚀 Fetch donations
  const fetchDonations = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/donations");
      const data = await res.json();
      setDonations(data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  // 🔄 Auto refresh
  useEffect(() => {
    fetchDonations();
  }, [location]);

  // 📊 Stats
  const total = donations.length;
  const accepted = donations.filter(d => d.status === "Accepted").length;
  const pending = donations.filter(d => d.status === "Pending").length;

  // 🚪 Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/*  Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Welcome back 👋</h1>
          <p className="text-gray-600">
            You have donated {total} items so far 🙌
          </p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>

      {/* 📊 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-5 rounded-xl shadow border">
          <h2 className="text-lg font-semibold">Total Donations</h2>
          <p className="text-2xl font-bold mt-2">{total}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border">
          <h2 className="text-lg font-semibold">Accepted</h2>
          <p className="text-2xl font-bold mt-2 text-green-600">
            {accepted}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow border">
          <h2 className="text-lg font-semibold">Pending</h2>
          <p className="text-2xl font-bold mt-2 text-yellow-500">
            {pending}
          </p>
        </div>

      </div>

      {/* 🚀 Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">

        <div
          onClick={() => navigate("/add-donation")}
          className="bg-white p-6 rounded-xl shadow border cursor-pointer hover:shadow-lg hover:scale-105 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            ➕ Add Donation
          </h2>
          <p className="text-gray-500">
            Donate food or groceries easily
          </p>
        </div>

        <div
          onClick={() => navigate("/my-donations")}
          className="bg-white p-6 rounded-xl shadow border cursor-pointer hover:shadow-lg hover:scale-105 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            📦 My Donations
          </h2>
          <p className="text-gray-500">
            Track your donation status
          </p>
        </div>

      </div>

      {/* 🔥 Recent Donations */}
      <h2 className="text-xl font-semibold mb-4">
        Recent Donations
      </h2>

      {donations.length === 0 ? (
        <p className="text-gray-500">No recent donations</p>
      ) : (
        <div className="space-y-3">
          {donations.slice(0, 3).map((d) => (
            <div
              key={d._id}
              className="bg-white p-4 rounded-lg shadow flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{d.type}</p>
                <p className="text-sm text-gray-500">
                  {new Date(d.createdAt).toLocaleDateString()}
                </p>
              </div>

              <span
                className={`text-sm font-medium ${
                  d.status === "Pending"
                    ? "text-yellow-500"
                    : "text-green-600"
                }`}
              >
                {d.status}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* 💡 Tip */}
      <div className="mt-8 bg-blue-100 p-4 rounded-lg">
        <p className="text-blue-700">
          💡 Tip: Add clear descriptions to help NGOs accept faster!
        </p>
      </div>

    </div>
  );
}

export default DonorDashboard;