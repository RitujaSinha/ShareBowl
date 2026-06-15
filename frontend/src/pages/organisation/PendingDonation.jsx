import React, { useEffect, useState } from "react";
import {
  CalendarDays,
  CheckCircle2,
  Clock3,
  HeartHandshake,
  Loader2,
  Package,
  XCircle,
  User,
} from "lucide-react";
import Sidebar from "../../components/organisation/Sidebar";
import API_URL from "../../api";

function PendingDonation() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  // FETCH ALL ORGANISATION DONATIONS
  const fetchDonations = async () => {
    try {
      const res = await fetch(
        `${API_URL}/organisation/org-donations`,
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
      await fetch(`${API_URL}/organisation/status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      fetchDonations();
    } catch (err) {
      console.log(err);
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
                  Pending Donations
                </h1>

                <p className="text-sm font-medium text-gray-500">
                  Review and manage donation requests waiting for action
                </p>
              </div>
            </div>
          </div>

          {loading && (
            <div className="rounded-3xl border border-green-100 bg-white p-10 text-center shadow-sm">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-700">
                <Loader2 className="animate-spin" size={28} strokeWidth={2.5} />
              </div>

              <h3 className="text-lg font-black text-gray-900">
                Loading pending donations...
              </h3>
            </div>
          )}

          {!loading && donations.length === 0 && (
            <div className="rounded-3xl border border-dashed border-green-200 bg-green-50 p-10 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-green-700 shadow-sm">
                <Clock3 size={28} strokeWidth={2.5} />
              </div>

              <h3 className="text-lg font-black text-gray-900">
                No pending donations
              </h3>

              <p className="mt-1 text-sm font-medium text-gray-500">
                New pending donation requests will appear here.
              </p>
            </div>
          )}

          {!loading && donations.length > 0 && (
            <div className="space-y-4">
              {donations.map((d) => (
                <div
                  key={d._id}
                  className="rounded-3xl border border-amber-100 bg-white p-5 shadow-sm transition hover:bg-amber-50/40"
                >
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                        <Package size={25} strokeWidth={2.5} />
                      </div>

                      <div>
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                          <h2 className="text-lg font-black text-gray-900">
                            {d.type}
                          </h2>

                          <span className="rounded-full border border-amber-200 bg-amber-100 px-3 py-1 text-xs font-black text-amber-700">
                            Pending
                          </span>
                        </div>

                        <div className="space-y-1">
                          <p className="text-sm font-semibold text-gray-600">
                            Quantity: {d.quantity}
                          </p>

                          <p className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                            <User size={16} strokeWidth={2.5} />
                            Donor: {d.donor?.name || "Anonymous"}
                          </p>

                          <p className="flex items-center gap-2 text-xs font-semibold text-gray-500">
                            <CalendarDays size={15} strokeWidth={2.5} />
                            {new Date(d.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 sm:flex-col">
                      <button
                        onClick={() => updateStatus(d._id, "Accepted")}
                        className="flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
                      >
                        <CheckCircle2 size={17} strokeWidth={2.5} />
                        Accept
                      </button>

                      <button
                        onClick={() => updateStatus(d._id, "Rejected")}
                        className="flex items-center justify-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100"
                      >
                        <XCircle size={17} strokeWidth={2.5} />
                        Reject
                      </button>
                    </div>
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

export default PendingDonation;