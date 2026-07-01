import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
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

function AllDonation() {
  const [donations, setDonations] = useState([]);
  const [pickupData, setPickupData] = useState({
    donationId: "",
    date: "",
    time: "",
    note: "",
  });

  const fetchDonations = async () => {
    try {
      const res = await fetch(`${API_URL}/organisation/org-donations`, {
        credentials: "include",
      });

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

  const updateStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/organisation/status/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ status }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to update status");
        return;
      }

      toast.success(data.message || "Status updated");
      fetchDonations();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const schedulePickup = async (id) => {
    if (!pickupData.date || !pickupData.time) {
      toast.error("Pickup date and time are required");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/organisation/pickup/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          date: pickupData.date,
          time: pickupData.time,
          note: pickupData.note,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to schedule pickup");
        return;
      }

      toast.success(data.message || "Pickup scheduled");
      setPickupData({
        donationId: "",
        date: "",
        time: "",
        note: "",
      });
      fetchDonations();
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Accepted":
        return "bg-green-100 text-green-700 border-green-200";
      case "Pickup Scheduled":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "Picked Up":
        return "bg-purple-100 text-purple-700 border-purple-200";
      case "Completed":
        return "bg-emerald-100 text-emerald-700 border-emerald-200";
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
                  Manage donation acceptance, pickup scheduling, and completion
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
                          {d.foodType || d.type || "N/A"}
                        </h2>

                        <div className="mt-2 space-y-1">
                          <p className="text-sm font-semibold text-gray-600">
                            Quantity: {d.quantity}
                          </p>

                          <p className="flex items-center gap-2 text-sm font-semibold text-gray-600">
                            <User size={16} strokeWidth={2.5} />
                            Donor:{" "}
                            {d.donor?.donorName || d.donor?.name || "Anonymous"}
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

                  {d.pickupSchedule?.date && (
                    <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4 text-sm font-semibold text-blue-800">
                      <p>
                        Pickup Date:{" "}
                        {new Date(d.pickupSchedule.date).toLocaleDateString()}
                      </p>
                      <p>Pickup Time: {d.pickupSchedule.time}</p>
                      {d.pickupSchedule.note && (
                        <p>Note: {d.pickupSchedule.note}</p>
                      )}
                    </div>
                  )}

                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-gray-500">
                    <CalendarDays size={15} strokeWidth={2.5} />
                    {new Date(d.createdAt).toLocaleString()}
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3 border-t border-green-100 pt-4">
                    {d.status === "Pending" && (
                      <>
                        <button
                          onClick={() => updateStatus(d._id, "Accepted")}
                          className="flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
                        >
                          <CheckCircle2 size={16} />
                          Accept
                        </button>

                        <button
                          onClick={() => updateStatus(d._id, "Rejected")}
                          className="rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100"
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {d.status === "Accepted" && (
                      <button
                        onClick={() =>
                          setPickupData({
                            donationId: d._id,
                            date: "",
                            time: "",
                            note: "",
                          })
                        }
                        className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
                      >
                        <Clock3 size={16} />
                        Schedule Pickup
                      </button>
                    )}

                    {d.status === "Pickup Scheduled" && (
                      <button
                        onClick={() => updateStatus(d._id, "Picked Up")}
                        className="flex items-center gap-2 rounded-xl bg-purple-600 px-4 py-2 text-sm font-bold text-white hover:bg-purple-700"
                      >
                        <Truck size={16} />
                        Mark Picked Up
                      </button>
                    )}

                    {d.status === "Picked Up" && (
                      <button
                        onClick={() => updateStatus(d._id, "Completed")}
                        className="flex items-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-bold text-white hover:bg-emerald-700"
                      >
                        <CheckCircle2 size={16} />
                        Mark Completed
                      </button>
                    )}
                  </div>

                  {pickupData.donationId === d._id && (
                    <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50 p-4">
                      <h3 className="mb-3 text-sm font-black text-blue-800">
                        Schedule Pickup
                      </h3>

                      <div className="grid gap-3 md:grid-cols-3">
                        <input
                          type="date"
                          value={pickupData.date}
                          onChange={(e) =>
                            setPickupData((prev) => ({
                              ...prev,
                              date: e.target.value,
                            }))
                          }
                          className="rounded-xl border border-blue-100 px-3 py-2 text-sm font-semibold outline-none"
                        />

                        <input
                          type="time"
                          value={pickupData.time}
                          onChange={(e) =>
                            setPickupData((prev) => ({
                              ...prev,
                              time: e.target.value,
                            }))
                          }
                          className="rounded-xl border border-blue-100 px-3 py-2 text-sm font-semibold outline-none"
                        />

                        <input
                          type="text"
                          placeholder="Note optional"
                          value={pickupData.note}
                          onChange={(e) =>
                            setPickupData((prev) => ({
                              ...prev,
                              note: e.target.value,
                            }))
                          }
                          className="rounded-xl border border-blue-100 px-3 py-2 text-sm font-semibold outline-none"
                        />
                      </div>

                      <div className="mt-3 flex gap-3">
                        <button
                          onClick={() => schedulePickup(d._id)}
                          className="rounded-xl bg-blue-600 px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
                        >
                          Save Pickup
                        </button>

                        <button
                          onClick={() =>
                            setPickupData({
                              donationId: "",
                              date: "",
                              time: "",
                              note: "",
                            })
                          }
                          className="rounded-xl bg-white px-4 py-2 text-sm font-bold text-blue-700"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}
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