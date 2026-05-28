import React, { useEffect, useState } from "react";
import Sidebar from "../../components/organisation/Sidebar";

function AcceptedDonation() {
  const [donations, setDonations] = useState([]);

  // FETCH ACCEPTED DONATIONS
  const fetchAcceptedDonations = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/organisation/org-donations",
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success) {
        const accepted = (data.donations || []).filter(
          (d) => d.status === "Accepted"
        );

        setDonations(accepted);
      } else {
        setDonations([]);
      }

    } catch (err) {
      console.log(err);
      setDonations([]);
    }
  };

  useEffect(() => {
    fetchAcceptedDonations();
  }, []);

  return (
    <div className="flex min-h-screen bg-black text-white">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <div className="flex-1 p-8">

        {/* HEADER */}
        <h1 className="text-3xl font-bold mb-6">
          Accepted Donations
        </h1>

        {/* EMPTY STATE */}
        {donations.length === 0 ? (
          <p className="text-zinc-400">
            No accepted donations yet 🚫
          </p>
        ) : (
          <div className="overflow-x-auto">

            <table className="w-full border-collapse">

              <thead>
                <tr className="border-b border-zinc-700 text-left text-zinc-400">
                  <th className="pb-4">Donor</th>
                  <th className="pb-4">Food Type</th>
                  <th className="pb-4">Quantity</th>
                  <th className="pb-4">Status</th>
                  <th className="pb-4">Date</th>
                </tr>
              </thead>

              <tbody>

                {donations.map((d) => (
                  <tr
                    key={d._id}
                    className="border-b border-zinc-800"
                  >

                    <td className="py-4">
                      {d.donor?.name || "Anonymous"}
                    </td>

                    <td>
                      {d.type}
                    </td>

                    <td>
                      {d.quantity}
                    </td>

                    <td>
                      <span className="px-4 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">
                        Accepted
                      </span>
                    </td>

                    <td className="text-zinc-400 text-sm">
                      {new Date(d.createdAt).toLocaleDateString()}
                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          </div>
        )}

      </div>

    </div>
  );
}

export default AcceptedDonation;