import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import API_URL from "../../api";
import {
  CalendarDays,
  Mail,
  Phone,
  Search,
  User,
  Users,
  MapPin,
  Gift,
} from "lucide-react";

function DonorDirectory() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");

  const fetchDonors = async () => {
    try {
      const res = await fetch(`${API_URL}/admin/donors`, {
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to fetch donors");
        return;
      }

      setDonors(data.donors || []);
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const filteredDonors = donors.filter((donor) =>
    donor.donorName?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] px-4 py-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
              <Users size={26} strokeWidth={2.5} />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-slate-500">
                Admin Panel
              </p>

              <h1 className="text-2xl font-black text-gray-900">
                Donor Directory
              </h1>

              <p className="text-sm font-medium text-gray-500">
                View all registered donors on ShareBowl
              </p>
            </div>
          </div>
        </div>

        <div className="mb-6 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 focus-within:border-slate-500 focus-within:ring-4 focus-within:ring-slate-100">
            <Search size={19} className="text-gray-400" />

            <input
              type="text"
              placeholder="Search donor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm font-semibold text-gray-800 outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {filteredDonors.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-slate-300 bg-white p-10 text-center shadow-sm">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-700">
              <User size={28} strokeWidth={2.5} />
            </div>

            <h3 className="text-lg font-black text-gray-900">
              No donors found
            </h3>

            <p className="mt-1 text-sm font-medium text-gray-500">
              Try searching with another donor name.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {filteredDonors.map((donor) => (
              <div
                key={donor._id}
                className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="mb-5 flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-xl font-black text-blue-700">
                    {donor.donorName?.charAt(0).toUpperCase()}
                  </div>

                  <div>
                    <h2 className="text-xl font-black text-gray-900">
                      {donor.donorName}
                    </h2>

                    <p className="text-sm font-bold text-blue-700">
                      Donor
                    </p>
                  </div>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3 rounded-2xl bg-blue-50 p-3">
                    <Mail
                      size={18}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0 text-blue-700"
                    />

                    <div>
                      <p className="text-xs font-bold text-blue-700">
                        Email
                      </p>

                      <p className="font-black text-gray-900">
                        {donor.email || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl bg-green-50 p-3">
                    <Phone
                      size={18}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0 text-green-700"
                    />

                    <div>
                      <p className="text-xs font-bold text-green-700">
                        Phone
                      </p>

                      <p className="font-black text-gray-900">
                        {donor.phone || "N/A"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl bg-slate-50 p-3">
                    <MapPin
                      size={18}
                      strokeWidth={2.5}
                      className="mt-0.5 shrink-0 text-slate-700"
                    />

                    <div>
                      <p className="text-xs font-bold text-slate-700">
                        Location
                      </p>

                      <p className="font-black text-gray-900">
                        {donor.city || "N/A"}, {donor.district || "N/A"}
                      </p>

                      <p className="text-xs font-semibold text-gray-500">
                        {donor.state || "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
                  <div className="rounded-2xl bg-emerald-50 p-3">
                    <div className="mb-2 flex items-center gap-2 text-xs font-bold text-emerald-700">
                      <Gift size={15} strokeWidth={2.5} />
                      Donations
                    </div>

                    <p className="text-2xl font-black text-emerald-700">
                      {donor.donationCount || 0}
                    </p>
                  </div>

                  <div className="rounded-2xl bg-amber-50 p-3">
                    <div className="mb-2 flex items-center gap-2 text-xs font-bold text-amber-700">
                      <CalendarDays size={15} strokeWidth={2.5} />
                      Joined
                    </div>

                    <p className="text-sm font-black text-gray-900">
                      {donor.createdAt
                        ? new Date(donor.createdAt).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default DonorDirectory;