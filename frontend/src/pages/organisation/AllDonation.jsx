import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  HeartHandshake,
  Package,
  User,
} from "lucide-react";
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

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Accepted":
        return "bg-green-100 text-green-700 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
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
                  Donations Received
                </h1>

                <p className="text-sm font-medium text-gray-500">
                  All donation requests received by your organisation
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
                No donations received yet
              </h3>

              <p className="mt-1 text-sm font-medium text-gray-500">
                New donation requests will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {donations.map((d) => (
                <div
                  key={d._id}
                  className="rounded-3xl border border-green-100 bg-white p-5 shadow-sm transition hover:bg-green-50/50"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                        <Package size={25} strokeWidth={2.5} />
                      </div>

                      <div>
                        <h2 className="text-lg font-black text-gray-900">
                          {d.type}
                        </h2>

                        <div className="mt-2 space-y-1">
                          <p className="text-sm font-semibold text-gray-600">
                            Quantity: {d.quantity}
                          </p>

                          <p className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                            <User size={16} strokeWidth={2.5} />
                            Donor: {d.donor?.name || "Anonymous"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <span
                      className={`w-fit rounded-full border px-3 py-1 text-xs font-black ${getStatusClass(
                        d.status
                      )}`}
                    >
                      {d.status}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-gray-500">
                    <CalendarDays size={15} strokeWidth={2.5} />
                    {new Date(d.createdAt).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AllDonation;