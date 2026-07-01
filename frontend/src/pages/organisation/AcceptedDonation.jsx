import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  Package,
  Truck,
  User,
} from "lucide-react";
import Sidebar from "../../components/organisation/Sidebar";
import API_URL from "../../api";

function AcceptedDonation() {
  const [donations, setDonations] = useState([]);

  const fetchAcceptedDonations = async () => {
    try {
      const res = await fetch(
        `${API_URL}/organisation/org-donations`,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (data.success) {
        const accepted = (data.donations || []).filter((d) =>
          ["Accepted", "Pickup Scheduled", "Picked Up"].includes(d.status)
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

  const getBadge = (status) => {
    switch (status) {
      case "Accepted":
        return (
          <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-black text-green-700">
            <CheckCircle2 size={14} />
            Accepted
          </span>
        );

      case "Pickup Scheduled":
        return (
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-100 px-3 py-1 text-xs font-black text-blue-700">
            <Clock3 size={14} />
            Pickup Scheduled
          </span>
        );

      case "Picked Up":
        return (
          <span className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-purple-100 px-3 py-1 text-xs font-black text-purple-700">
            <Truck size={14} />
            Picked Up
          </span>
        );

      default:
        return null;
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F5FBF7]">
      <Sidebar />

      <div className="flex-1 px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-6 rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 text-white">
                <HeartHandshake size={26} strokeWidth={2.5} />
              </div>

              <div>
                <p className="text-sm font-bold uppercase tracking-widest text-green-600">
                  Organisation Portal
                </p>

                <h1 className="text-2xl font-black text-gray-900">
                  Active Donations
                </h1>

                <p className="text-sm font-medium text-gray-500">
                  Accepted and ongoing donations
                </p>
              </div>
            </div>
          </div>

          {donations.length === 0 ? (
            <div className="rounded-3xl border border-dashed border-green-200 bg-green-50 p-10 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                <Package size={28} strokeWidth={2.5} />
              </div>

              <h3 className="text-lg font-black text-gray-900">
                No active donations
              </h3>

              <p className="mt-1 text-sm font-medium text-gray-500">
                Accepted donations will appear here.
              </p>
            </div>
          ) : (
            <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-gray-900">
                    Donation List
                  </h2>

                  <p className="text-sm font-medium text-gray-500">
                    Total Active Donations: {donations.length}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                  <CheckCircle2 size={24} strokeWidth={2.5} />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px] border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 text-left text-sm text-gray-500">
                      <th className="pb-4 font-black">Donor</th>
                      <th className="pb-4 font-black">Food Type</th>
                      <th className="pb-4 font-black">Quantity</th>
                      <th className="pb-4 font-black">Status</th>
                      <th className="pb-4 font-black">Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    {donations.map((d) => (
                      <tr
                        key={d._id}
                        className="border-b border-gray-100 hover:bg-green-50 transition"
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-700">
                              <User size={18} />
                            </div>

                            <span className="text-sm font-bold text-gray-900">
                              {d.donor?.donorName ||
                                d.donor?.name ||
                                "Anonymous"}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 text-sm font-semibold text-gray-700">
                          {d.foodType || d.type || "N/A"}
                        </td>

                        <td className="py-4 text-sm font-semibold text-gray-700">
                          {d.quantity}
                        </td>

                        <td className="py-4">
                          {getBadge(d.status)}
                        </td>

                        <td className="py-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                            <CalendarDays size={16} />
                            {new Date(d.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AcceptedDonation;