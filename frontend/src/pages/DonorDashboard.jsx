import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function DonorDashboard() {
  const navigate = useNavigate();
  const [donations, setDonations] = useState([]);

  // 🔥 Function to fetch data
  const fetchDonations = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/donations");
      const data = await res.json();
      setDonations(data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  // 🚀 Fetch when component loads
  useEffect(() => {
    fetchDonations();
  }, []);

  // 📊 Stats
  const total = donations.length;
  const accepted = donations.filter(d => d.status === "Accepted").length;
  const pending = donations.filter(d => d.status === "Pending").length;

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Welcome, Donor 👋</h1>
        <p className="text-gray-600">
          Manage your donations and help reduce food waste
        </p>
      </div>

      {/* 📊 Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Total Donations</h2>
          <p className="text-2xl font-bold mt-2">{total}</p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Accepted</h2>
          <p className="text-2xl font-bold mt-2 text-green-600">
            {accepted}
          </p>
        </div>

        <div className="bg-white p-5 rounded-xl shadow">
          <h2 className="text-lg font-semibold">Pending</h2>
          <p className="text-2xl font-bold mt-2 text-yellow-500">
            {pending}
          </p>
        </div>

      </div>

      {/* 🚀 Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

        {/* Add Donation */}
        <div
          onClick={() => navigate("/add-donation")}
          className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg hover:scale-105 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            ➕ Add Donation
          </h2>
          <p className="text-gray-500">
            Donate food or groceries easily
          </p>
        </div>

        {/* My Donations */}
        <div
          onClick={() => {
            navigate("/my-donations");
          }}
          className="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg hover:scale-105 transition"
        >
          <h2 className="text-xl font-semibold mb-2">
            📦 My Donations
          </h2>
          <p className="text-gray-500">
            Track your donation status
          </p>
        </div>

      </div>

      {/* 🔥 Refresh Button (temporary but useful) */}
      <div className="mt-6">
        <button
          onClick={fetchDonations}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Refresh Data 🔄
        </button>
      </div>

    </div>
  );
}

export default DonorDashboard;