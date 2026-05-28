import React, { useEffect, useState } from "react";
import Sidebar from "../../components/organisation/Sidebar";

function PendingDonation() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH ALL ORGANISATION DONATIONS
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
        const pending = (data.donations || []).filter(
          (d) => d.status === "Pending"
        );

        setDonations(pending);
      } else {
        setDonations([]);
      }

    } catch (error) {
      console.log(error);
      setDonations([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // ACCEPT / REJECT ACTION
  const updateStatus = async (id, status) => {
    try {
      await fetch(
        `http://localhost:5000/api/organisation/status/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({ status }),
        }
      );

      fetchDonations();

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <div className="flex-1 p-8">

        <h1 className="text-3xl font-bold mb-6">
          Pending Donations
        </h1>

        {/* LOADING */}
        {loading && (
          <p className="text-gray-400">
            Loading pending donations...
          </p>
        )}

        {/* EMPTY */}
        {!loading && donations.length === 0 && (
          <p className="text-gray-400">
            No pending donations 🎉
          </p>
        )}

        {/* LIST */}
        <div className="space-y-4">

          {donations.map((d) => (
            <div
              key={d._id}
              className="bg-zinc-900 p-5 rounded-xl border border-zinc-800"
            >

              <div className="flex justify-between">

                {/* LEFT */}
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

                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(d.createdAt).toLocaleString()}
                  </p>

                </div>

                {/* RIGHT */}
                <div className="flex flex-col gap-2">

                  <button
                    onClick={() =>
                      updateStatus(d._id, "Accepted")
                    }
                    className="bg-green-500 px-3 py-1 rounded"
                  >
                    Accept
                  </button>

                  <button
                    onClick={() =>
                      updateStatus(d._id, "Rejected")
                    }
                    className="bg-red-500 px-3 py-1 rounded"
                  >
                    Reject
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>

    </div>
  );
}

export default PendingDonation;