import React, { useEffect, useState } from "react";
import Sidebar from "../../components/organisation/Sidebar";

function AllDonation() {
  const [donations, setDonations] = useState([]);

  // FETCH ALL DONATIONS
  const fetchDonations = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/organisation/org-donations",
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success) {
        setDonations(data.donations || []);
      } else {
        setDonations([]);
      }

    } catch (err) {
      console.log(err);
      setDonations([]);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-6">

        <h1 className="text-3xl font-bold mb-6">
          Donations Received by Organisation
        </h1>

        {/* EMPTY STATE */}
        {donations.length === 0 ? (
          <p className="text-gray-400">
            No donations received yet
          </p>
        ) : (
          <div className="space-y-4">

            {donations.map((d) => (
              <div
                key={d._id}
                className="bg-zinc-900 p-5 rounded-xl border border-zinc-800"
              >

                {/* HEADER */}
                <div className="flex justify-between">

                  <div>

                    {/* FIXED FIELD */}
                    <h2 className="text-lg font-semibold">
                      {d.type}
                    </h2>

                    <p className="text-sm text-gray-400">
                      Quantity: {d.quantity}
                    </p>

                    <p className="text-sm text-gray-400">
                      Donor: {d.donor?.name || "Anonymous"}
                    </p>

                  </div>

                  {/* STATUS */}
                  <div>

                    <span
                      className={`px-3 py-1 rounded text-sm ${
                        d.status === "Pending"
                          ? "bg-yellow-500/20 text-yellow-400"
                          : d.status === "Accepted"
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {d.status}
                    </span>

                  </div>

                </div>

                {/* DATE */}
                <p className="text-xs text-gray-500 mt-3">
                  {new Date(d.createdAt).toLocaleString()}
                </p>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
}

export default AllDonation;