import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function DonorDirectory() {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState("");

  const fetchDonors = async () => {
    try {
      const res = await fetch(
        "http://localhost:5000/api/admin/donors",
        {
          credentials: "include",
        }
      );

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
    donor.donorName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-6">

      <div className="mb-8">
        <h1 className="text-4xl font-bold text-indigo-500">
          Donor Directory
        </h1>

        <p className="mt-2 text-zinc-400">
          View all registered donors on ShareBowl
        </p>
      </div>

      <input
        type="text"
        placeholder="Search donor..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-8 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 outline-none focus:border-indigo-500"
      />

      {filteredDonors.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center text-zinc-400">
          No donors found
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {filteredDonors.map((donor) => (

            <div
              key={donor._id}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg hover:border-indigo-500 transition"
            >

              <div className="flex items-center gap-4 mb-5">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-indigo-600 text-xl font-bold">
                  {donor.donorName?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    {donor.donorName}
                  </h2>

                  <p className="text-sm text-zinc-400">
                    Donor
                  </p>
                </div>

              </div>

              <div className="space-y-2 text-sm">

                <p>
                  <span className="font-semibold text-indigo-400">
                    Email:
                  </span>{" "}
                  {donor.email}
                </p>

                <p>
                  <span className="font-semibold text-indigo-400">
                    Phone:
                  </span>{" "}
                  {donor.phone}
                </p>

                <p>
                  <span className="font-semibold text-indigo-400">
                    City:
                  </span>{" "}
                  {donor.city}
                </p>

                <p>
                  <span className="font-semibold text-indigo-400">
                    District:
                  </span>{" "}
                  {donor.district}
                </p>

                <p>
                  <span className="font-semibold text-indigo-400">
                    State:
                  </span>{" "}
                  {donor.state}
                </p>

              </div>

              <div className="mt-5 border-t border-zinc-800 pt-4">

                <div className="flex justify-between">

                  <div>
                    <p className="text-zinc-400 text-sm">
                      Donations
                    </p>

                    <p className="text-2xl font-bold text-green-400">
                      {donor.donationCount}
                    </p>
                  </div>

                  <div>
                    <p className="text-zinc-400 text-sm">
                      Joined
                    </p>

                    <p className="font-semibold">
                      {new Date(
                        donor.createdAt
                      ).toLocaleDateString()}
                    </p>
                  </div>

                </div>

              </div>

            </div>
          ))}

        </div>
      )}
    </div>
  );
}

export default DonorDirectory;