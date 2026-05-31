import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  HeartHandshake,
  MapPin,
  Package,
  Search,
  Trash2,
} from "lucide-react";

function MyDonations() {
  const navigate = useNavigate();

  const [donations, setDonations] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  const fetchDonations = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/donation/my-donations", {
        method: "GET",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to fetch donations");
        return;
      }

      setDonations(data.donations);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/donation/delete/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to delete donation");
        return;
      }

      setDonations(donations.filter((d) => d._id !== id));
      toast.success("Donation deleted");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const filteredDonations = donations
    .filter((d) => (filter === "All" ? true : d.status === filter))
    .filter((d) => d.foodType?.toLowerCase().includes(search.toLowerCase()));

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
    <div className="min-h-screen bg-[#FFF8EF] px-4 py-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-orange-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 text-white">
              <HeartHandshake size={26} strokeWidth={2.5} />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-amber-600">
                Donor Portal
              </p>
              <h1 className="text-2xl font-black text-gray-900">
                My Donations
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/donor")}
            className="flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-sm font-bold text-green-700 hover:bg-green-100"
          >
            <ArrowLeft size={17} />
            Back
          </button>
        </div>

        <div className="mb-6 rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3">
            <Search size={19} className="text-gray-400" />
            <input
              type="text"
              placeholder="Search by food type..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-gray-800 outline-none placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setFilter("All")}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                filter === "All"
                  ? "bg-green-600 text-white"
                  : "bg-green-50 text-green-700 hover:bg-green-100"
              }`}
            >
              All
            </button>

            <button
              onClick={() => setFilter("Pending")}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                filter === "Pending"
                  ? "bg-amber-500 text-white"
                  : "bg-amber-50 text-amber-700 hover:bg-amber-100"
              }`}
            >
              Pending
            </button>

            <button
              onClick={() => setFilter("Accepted")}
              className={`rounded-xl px-4 py-2 text-sm font-bold transition ${
                filter === "Accepted"
                  ? "bg-green-600 text-white"
                  : "bg-green-50 text-green-700 hover:bg-green-100"
              }`}
            >
              Accepted
            </button>
          </div>
        </div>

        {filteredDonations.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-orange-200 bg-orange-50 p-10 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-orange-700 shadow-sm">
              <Package size={28} strokeWidth={2.5} />
            </div>

            <h3 className="text-lg font-black text-gray-900">
              No donations found
            </h3>

            <p className="mt-1 text-sm font-medium text-gray-500">
              Try changing your search or filter.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredDonations.map((d) => (
              <div
                key={d._id}
                className="rounded-3xl border border-orange-100 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-orange-100 text-orange-700">
                      <Package size={25} strokeWidth={2.5} />
                    </div>

                    <div>
                      <h2 className="text-xl font-black text-gray-900">
                        {d.foodType}
                      </h2>

                      <p className="mt-1 text-sm font-bold text-gray-500">
                        {d.category}
                      </p>
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

                <div className="mt-5 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="font-bold text-gray-500">Organisation</p>
                    <p className="mt-1 font-black text-gray-900">
                      {d.organisation?.organisationName || "N/A"}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-gray-50 p-4">
                    <p className="font-bold text-gray-500">Quantity</p>
                    <p className="mt-1 font-black text-gray-900">
                      {d.quantity}
                    </p>
                  </div>
                </div>

                {d.description && (
                  <p className="mt-4 rounded-2xl bg-orange-50 p-4 text-sm font-medium text-gray-600">
                    {d.description}
                  </p>
                )}

                <div className="mt-4 flex flex-wrap gap-3 text-sm font-semibold text-gray-500">
                  {d.expiry && (
                    <div className="flex items-center gap-2 rounded-xl bg-amber-50 px-3 py-2 text-amber-700">
                      <CalendarDays size={16} />
                      Expiry: {new Date(d.expiry).toLocaleDateString()}
                    </div>
                  )}

                  {d.brand && (
                    <div className="rounded-xl bg-green-50 px-3 py-2 text-green-700">
                      Brand: {d.brand}
                    </div>
                  )}

                  {d.location && (
                    <div className="flex items-center gap-2 rounded-xl bg-blue-50 px-3 py-2 text-blue-700">
                      <MapPin size={16} />
                      {d.location.lat.toFixed(4)}, {d.location.lng.toFixed(4)}
                    </div>
                  )}
                </div>

                <p className="mt-4 text-xs font-semibold text-gray-400">
                  Created: {new Date(d.createdAt).toLocaleString()}
                </p>

                <div className="mt-5 flex flex-wrap gap-3">
                  {d.status === "Pending" && (
                    <button
                      onClick={() => handleDelete(d._id)}
                      className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-bold text-red-600 hover:bg-red-100"
                    >
                      <Trash2 size={17} />
                      Delete
                    </button>
                  )}

                  {d.status === "Accepted" && (
                    <div className="flex items-center gap-2 rounded-xl bg-green-50 px-4 py-2 text-sm font-bold text-green-700">
                      <CheckCircle2 size={17} />
                      Accepted by NGO
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyDonations;