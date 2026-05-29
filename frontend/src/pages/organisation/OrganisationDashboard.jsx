import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../../components/organisation/Sidebar";
import LogoutModal from "../../components/LogoutModal";

export default function OrganisationDashboard() {
  const navigate = useNavigate();

  const [orgInfo, setOrgInfo] = useState({
    organisationName: "",
  });

  const [counts, setCounts] = useState({
    totalDonations: 0,
    pendingDonations: 0,
    acceptedDonations: 0,
  });

  const [donations, setDonations] = useState([]);
  const [showLogoutModal, setShowLogoutModal] =
  useState(false);

  // ======================
  // FETCH DASHBOARD INFO
  // ======================
  const fetchDashboard = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/organisation/dashboard",
        {
          credentials: "include",
        }
      );

      const data = await res.json();
      setOrgInfo(data);
      setCounts(data);
    } catch (err) {
      console.log(err);
    }
  };

  // ======================
  // FETCH DONATIONS
  // ======================
  const fetchDonations = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/organisation/org-donations",
        {
          credentials: "include",
        }
      );

      const data = await res.json();
      setDonations(data.donations || []);
    } catch (err) {
      console.log(err);
    }
  };

  // ======================
  // ACCEPT DONATION
  // ======================
  const handleAccept = async (id) => {
    try {
      await fetch(
        `http://localhost:5000/api/organisation/status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status: "Accepted" }),
        }
      );

      fetchDashboard();
      fetchDonations();
    } catch (err) {
      console.log(err);
    }
  };

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

  // ======================
  // INIT
  // ======================
  useEffect(() => {
    fetchDashboard();
    fetchDonations();
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white">

      <Sidebar />

      <div className="flex-1 p-8">

        {/* TOP SECTION */}
        <div className="mb-10 flex items-center justify-between">

          <div>
            <h2 className="text-5xl font-bold">
              Organisation Dashboard
            </h2>

            <p className="mt-2 text-zinc-400">
              Welcome back 👋
            </p>
          </div>

          {/* PROFILE (FIXED - NO STATIC DATA) */}
          <div className="flex items-center gap-4">

            <div className="rounded-2xl border border-zinc-700 bg-zinc-900 px-6 py-4">

              <p className="text-lg font-semibold">
                {orgInfo.organisationName || "Loading..."}
              </p>

              <p className="text-sm text-zinc-400">
                NGO Organisation
              </p>

            </div>

            <button
              onClick={() => setShowLogoutModal(true)}
              className="rounded-xl bg-red-600 px-5 py-3 font-semibold hover:bg-red-500"
            >
              Logout
            </button>

          </div>

        </div>

        {/* STATS */}
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

          <div className="rounded-3xl border border-indigo-800 bg-zinc-900 p-6">
            <p className="text-zinc-400">Total Donations</p>
            <h3 className="mt-4 text-5xl font-bold text-indigo-500">
              {counts.totalDonations}
            </h3>
          </div>

          <div className="rounded-3xl border border-yellow-700 bg-zinc-900 p-6">
            <p className="text-zinc-400">Pending Requests</p>
            <h3 className="mt-4 text-5xl font-bold text-yellow-400">
              {counts.pendingDonations}
            </h3>
          </div>

          <div className="rounded-3xl border border-green-700 bg-zinc-900 p-6">
            <p className="text-zinc-400">Accepted</p>
            <h3 className="mt-4 text-5xl font-bold text-green-500">
              {counts.acceptedDonations}
            </h3>
          </div>

        </div>

        {/* RECENT DONATIONS */}
        <div className="mt-12 rounded-3xl border border-zinc-800 bg-zinc-900 p-8">

          {/* HEADER */}
          <div className="mb-8 flex items-center justify-between">

            <h3 className="text-3xl font-bold">
              Recent Donations
            </h3>

            <button
              className="rounded-xl bg-indigo-600 px-5 py-3 font-semibold"
              onClick={() => navigate("/org-donations")}
            >
              View All
            </button>

          </div>

          {/* TABLE */}
          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>
                <tr className="border-b border-zinc-700 text-left text-zinc-400">
                  <th className="pb-4">Donor</th>
                  <th className="pb-4">Food Type</th>
                  <th className="pb-4">Quantity</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Action</th>
                </tr>
              </thead>

              <tbody>

                {donations.slice(0, 5).map((d) => (
                  <tr key={d._id} className="border-b border-zinc-800">

                    <td className="py-5">
                      {d.donor?.name || "Anonymous"}
                    </td>

                    <td>{d.type}</td>
                    <td>{d.quantity}</td>

                    <td>
                      <span
                        className={`px-4 py-2 rounded-full text-sm ${
                          d.status === "Pending"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-green-500/20 text-green-400"
                        }`}
                      >
                        {d.status}
                      </span>
                    </td>

                    <td>
                      {d.status === "Pending" ? (
                        <button
                          onClick={() => handleAccept(d._id)}
                          className="rounded-lg bg-green-600 px-4 py-2 text-sm"
                        >
                          Accept
                        </button>
                      ) : (
                        <button className="rounded-lg bg-indigo-600 px-4 py-2 text-sm">
                          View
                        </button>
                      )}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

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