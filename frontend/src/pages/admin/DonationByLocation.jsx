import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  CalendarDays,
  Filter,
  Gift,
  MapPin,
  MapPinned,
  Search,
  User,
  Building2,
} from "lucide-react";

function DonationByLocation() {
  const [donations, setDonations] = useState([]);
  const [stateFilter, setStateFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");

  const fetchDonations = async () => {
    try {
      let url = "http://localhost:5000/api/admin/donations";

      const params = new URLSearchParams();

      if (stateFilter) {
        params.append("state", stateFilter);
      }

      if (districtFilter) {
        params.append("district", districtFilter);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await fetch(url, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to fetch donations");
        return;
      }

      setDonations(data.donations || []);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const uniqueStates = [
    ...new Set(donations.map((d) => d.location?.state)),
  ]
    .filter(Boolean)
    .sort();

  const uniqueDistricts = [
    ...new Set(
      donations
        .filter((d) => !stateFilter || d.location?.state === stateFilter)
        .map((d) => d.location?.district)
    ),
  ]
    .filter(Boolean)
    .sort();

  const getStatusClass = (status) => {
    switch (status) {
      case "Pending":
        return "bg-amber-100 text-amber-700 border-amber-200";
      case "Accepted":
        return "bg-green-100 text-green-700 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <MapPinned size={26} strokeWidth={2.5} />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
                Admin Panel
              </p>

              <h1 className="text-2xl font-black text-gray-900">
                Donations By Location
              </h1>

              <p className="text-sm font-medium text-gray-500">
                View and filter donations across all locations
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <Filter size={21} strokeWidth={2.5} />
            </div>

            <div>
              <h2 className="text-lg font-black text-gray-900">
                Filter Donations
              </h2>

              <p className="text-sm font-medium text-gray-500">
                Search donations by state and district
              </p>
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100"
            >
              <option value="">All States</option>

              {uniqueStates.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </select>

            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 outline-none focus:border-slate-500 focus:ring-4 focus:ring-slate-100"
            >
              <option value="">All Districts</option>

              {uniqueDistricts.map((district) => (
                <option key={district} value={district}>
                  {district}
                </option>
              ))}
            </select>

            <button
              onClick={fetchDonations}
              className="flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-black text-white transition hover:bg-slate-800"
            >
              <Search size={18} strokeWidth={2.5} />
              Search
            </button>
          </div>
        </div>

        {donations.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <Gift size={28} strokeWidth={2.5} />
            </div>

            <h3 className="text-lg font-black text-gray-900">
              No donations found
            </h3>

            <p className="mt-1 text-sm font-medium text-gray-500">
              Try changing the selected state or district.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {donations.map((donation) => (
              <div
                key={donation._id}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex gap-3">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
                      <Gift size={23} strokeWidth={2.5} />
                    </div>

                    <div>
                      <h2 className="text-lg font-black text-gray-900">
                        {donation.foodType}
                      </h2>

                      <p className="mt-1 text-sm font-semibold text-gray-500">
                        Quantity: {donation.quantity}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`w-fit rounded-full border px-3 py-1 text-xs font-black ${getStatusClass(
                      donation.status
                    )}`}
                  >
                    {donation.status}
                  </span>
                </div>

                <div className="mt-5 space-y-3">
                  <div className="flex items-start gap-3 rounded-2xl bg-blue-50 p-3">
                    <User
                      size={18}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0 text-blue-700"
                    />

                    <div>
                      <p className="text-xs font-bold text-blue-700">
                        Donor
                      </p>

                      <p className="text-sm font-black text-gray-900">
                        {donation.donor?.donorName || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl bg-green-50 p-3">
                    <Building2
                      size={18}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0 text-green-700"
                    />

                    <div>
                      <p className="text-xs font-bold text-green-700">
                        Organisation
                      </p>

                      <p className="text-sm font-black text-gray-900">
                        {donation.organisation?.organisationName || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {donation.description && (
                  <p className="mt-4 rounded-2xl bg-slate-50 p-3 text-sm font-medium text-gray-600">
                    {donation.description}
                  </p>
                )}

                <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
                  <div className="mb-3 flex items-center gap-2 text-sm font-black text-gray-900">
                    <MapPin size={17} strokeWidth={2.5} />
                    Location
                  </div>

                  <div className="space-y-1 text-sm font-semibold text-gray-600">
                    <p>City: {donation.location?.city || "N/A"}</p>
                    <p>District: {donation.location?.district || "N/A"}</p>
                    <p>State: {donation.location?.state || "N/A"}</p>
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-gray-500">
                  <CalendarDays size={15} strokeWidth={2.5} />
                  {new Date(donation.createdAt).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DonationByLocation;