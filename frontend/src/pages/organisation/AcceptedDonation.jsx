import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  Package,
  User,
} from "lucide-react";
import Sidebar from "../../components/organisation/Sidebar";
import API_URL from "../../api";

function AcceptedDonation() {
  const [donations, setDonations] = useState([]);

  // FETCH ACCEPTED DONATIONS
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
                  Accepted Donations
                </h1>

                <p className="text-sm font-medium text-gray-500">
                  Donations accepted by your organisation
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
                No accepted donations yet
              </h3>

              <p className="mt-1 text-sm font-medium text-gray-500">
                Accepted donation records will appear here.
              </p>
            </div>
          ) : (
            <div className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm">
              <div className="mb-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-black text-gray-900">
                    Accepted Donation List
                  </h2>

                  <p className="text-sm font-medium text-gray-500">
                    Total accepted donations: {donations.length}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                  <CheckCircle2 size={24} strokeWidth={2.5} />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] border-collapse">
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
                        className="border-b border-gray-100 transition hover:bg-green-50/60"
                      >
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-green-50 text-green-700">
                              <User size={18} strokeWidth={2.5} />
                            </div>

                            <span className="text-sm font-bold text-gray-900">
                              {d.donor?.name || "Anonymous"}
                            </span>
                          </div>
                        </td>

                        <td className="py-4 text-sm font-semibold text-gray-600">
                          {d.type}
                        </td>

                        <td className="py-4 text-sm font-semibold text-gray-600">
                          {d.quantity}
                        </td>

                        <td className="py-4">
                          <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-green-100 px-3 py-1 text-xs font-black text-green-700">
                            <CheckCircle2 size={14} strokeWidth={2.5} />
                            Accepted
                          </span>
                        </td>

                        <td className="py-4">
                          <div className="flex items-center gap-2 text-sm font-semibold text-gray-500">
                            <CalendarDays size={16} strokeWidth={2.5} />
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