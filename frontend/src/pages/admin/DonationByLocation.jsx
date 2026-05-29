import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function DonationByLocation() {

  const [donations, setDonations] = useState([]);
  const [stateFilter, setStateFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");

  const fetchDonations = async () => {

    try {

      let url =
        "http://localhost:5000/api/admin/donations";

      const params =
        new URLSearchParams();

      if (stateFilter) {
        params.append(
          "state",
          stateFilter
        );
      }

      if (districtFilter) {
        params.append(
          "district",
          districtFilter
        );
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await fetch(
        url,
        {
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {

        toast.error(
          data.message ||
          "Failed to fetch donations"
        );

        return;
      }

      setDonations(
        data.donations || []
      );

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong"
      );
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const uniqueStates =
    [...new Set(
      donations.map(
        (d) =>
          d.location?.state
      )
    )]
      .filter(Boolean)
      .sort();

  const uniqueDistricts =
    [...new Set(
      donations
        .filter(
          (d) =>
            !stateFilter ||
            d.location?.state ===
              stateFilter
        )
        .map(
          (d) =>
            d.location?.district
        )
    )]
      .filter(Boolean)
      .sort();

  return (

    <div className="min-h-screen bg-black text-white p-6">

      <div className="mb-8">

        <h1 className="text-4xl font-bold text-indigo-500">

          Donations By Location

        </h1>

        <p className="mt-2 text-zinc-400">

          View donations across all locations

        </p>

      </div>

      <div className="grid gap-4 md:grid-cols-3 mb-8">

        <select
          value={stateFilter}
          onChange={(e) =>
            setStateFilter(
              e.target.value
            )
          }
          className="rounded-xl border border-zinc-700 bg-zinc-900 p-3"
        >

          <option value="">
            All States
          </option>

          {uniqueStates.map(
            (state) => (

              <option
                key={state}
                value={state}
              >

                {state}

              </option>
            )
          )}

        </select>

        <select
          value={districtFilter}
          onChange={(e) =>
            setDistrictFilter(
              e.target.value
            )
          }
          className="rounded-xl border border-zinc-700 bg-zinc-900 p-3"
        >

          <option value="">
            All Districts
          </option>

          {uniqueDistricts.map(
            (district) => (

              <option
                key={district}
                value={district}
              >

                {district}

              </option>
            )
          )}

        </select>

        <button
          onClick={fetchDonations}
          className="rounded-xl bg-indigo-600 px-4 py-3 font-semibold hover:bg-indigo-500"
        >

          Search

        </button>

      </div>

      {donations.length === 0 ? (

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center text-zinc-400">

          No donations found

        </div>

      ) : (

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

          {donations.map(
            (donation) => (

              <div
                key={donation._id}
                className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg"
              >

                <div className="flex justify-between items-start">

                  <h2 className="text-2xl font-bold">

                    {donation.foodType}

                  </h2>

                  <span
                    className={`rounded-full px-3 py-1 text-sm font-semibold ${
                      donation.status ===
                      "Pending"
                        ? "bg-yellow-500/20 text-yellow-400"
                        : donation.status ===
                          "Accepted"
                        ? "bg-green-500/20 text-green-400"
                        : "bg-zinc-700 text-zinc-300"
                    }`}
                  >

                    {donation.status}

                  </span>

                </div>

                <p className="mt-3 text-zinc-300">

                  <span className="font-semibold">

                    Quantity:

                  </span>{" "}

                  {donation.quantity}

                </p>

                <p className="mt-2 text-zinc-300">

                  <span className="font-semibold">

                    Donor:

                  </span>{" "}

                  {
                    donation.donor
                      ?.donorName
                  }

                </p>

                <p className="mt-2 text-zinc-300">

                  <span className="font-semibold">

                    Organisation:

                  </span>{" "}

                  {
                    donation
                      .organisation
                      ?.organisationName
                  }

                </p>

                {donation.description && (

                  <p className="mt-3 text-zinc-400">

                    {
                      donation.description
                    }

                  </p>

                )}

                <div className="mt-4 border-t border-zinc-800 pt-4">

                  <p className="text-sm text-zinc-400">

                    City:
                    {" "}
                    {
                      donation.location
                        ?.city
                    }

                  </p>

                  <p className="text-sm text-zinc-400">

                    District:
                    {" "}
                    {
                      donation.location
                        ?.district
                    }

                  </p>

                  <p className="text-sm text-zinc-400">

                    State:
                    {" "}
                    {
                      donation.location
                        ?.state
                    }

                  </p>

                </div>

                <p className="mt-4 text-xs text-zinc-500">

                  {new Date(
                    donation.createdAt
                  ).toLocaleString()}

                </p>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}

export default DonationByLocation;