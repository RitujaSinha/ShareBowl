import { useEffect, useState } from "react";
import toast from "react-hot-toast";

function MyDonations() {

  const [donations, setDonations] =
    useState([]);

  const [filter, setFilter] =
    useState("All");

  const [search, setSearch] =
    useState("");

  // Fetch Donations
  const fetchDonations = async () => {

    try {

      const res = await fetch(

        "http://localhost:5000/api/donation/my-donations",

        {
          method: "GET",
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

      setDonations(data.donations);

    } catch (error) {

      console.log(error);

      toast.error("Something went wrong");
    }
  };

  useEffect(() => {

    fetchDonations();

  }, []);

  // Delete Donation
  const handleDelete = async (id) => {

    try {

      const res = await fetch(

        `http://localhost:5000/api/donation/delete/${id}`,

        {
          method: "DELETE",
          credentials: "include",
        }
      );

      const data = await res.json();

      if (!res.ok) {

        toast.error(
          data.message ||
          "Failed to delete donation"
        );

        return;
      }

      setDonations(

        donations.filter(
          (d) => d._id !== id
        )
      );

      toast.success(
        "Donation deleted"
      );

    } catch (error) {

      console.log(error);

      toast.error("Something went wrong");
    }
  };

  // Filter + Search
  const filteredDonations =
    donations

      .filter((d) =>

        filter === "All"
          ? true
          : d.status === filter
      )

      .filter((d) =>

        d.foodType
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
      );

  return (

    <div className="min-h-screen bg-black p-6 text-white">

      {/* Heading */}
      <h1 className="mb-6 text-4xl font-bold text-indigo-500">

        My Donations

      </h1>

      {/* Search */}
      <input
        type="text"
        placeholder="Search by food type..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        className="mb-4 w-full rounded-xl border border-zinc-700 bg-zinc-900 p-3 outline-none focus:border-indigo-500"
      />

      {/* Filter Buttons */}
      <div className="mb-6 flex gap-3">

        <button
          onClick={() => setFilter("All")}
          className={`rounded-xl px-4 py-2 font-medium transition ${
            filter === "All"
              ? "bg-indigo-600"
              : "bg-zinc-800"
          }`}
        >

          All

        </button>

        <button
          onClick={() =>
            setFilter("Pending")
          }
          className={`rounded-xl px-4 py-2 font-medium transition ${
            filter === "Pending"
              ? "bg-yellow-500 text-black"
              : "bg-zinc-800"
          }`}
        >

          Pending

        </button>

        <button
          onClick={() =>
            setFilter("Accepted")
          }
          className={`rounded-xl px-4 py-2 font-medium transition ${
            filter === "Accepted"
              ? "bg-green-600"
              : "bg-zinc-800"
          }`}
        >

          Accepted

        </button>

      </div>

      {/* Donation List */}
      {filteredDonations.length === 0 ? (

        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 p-6 text-center text-zinc-400">

          No donations found 🚫

        </div>

      ) : (

        <div className="space-y-5">

          {filteredDonations.map((d) => (

            <div
              key={d._id}
              className="rounded-3xl border border-zinc-800 bg-zinc-900 p-6 shadow-lg"
            >

              {/* Top */}
              <div className="flex items-center justify-between">

                <div>

                  <h2 className="text-2xl font-bold">

                    {d.foodType}

                  </h2>

                  <p className="mt-1 text-zinc-400">

                    {d.category}

                  </p>

                </div>

                <span
                  className={`rounded-full px-4 py-2 text-sm font-semibold ${
                    d.status === "Pending"
                      ? "bg-yellow-500/20 text-yellow-400"
                      : d.status === "Accepted"
                      ? "bg-green-500/20 text-green-400"
                      : "bg-zinc-700 text-zinc-300"
                  }`}
                >

                  {d.status}

                </span>

              </div>

              {/* Organisation */}
              <p className="mt-4 text-zinc-300">

                <span className="font-semibold">

                  Organisation:

                </span>{" "}

                {d.organisation
                  ?.organisationName}

              </p>

              {/* Quantity */}
              <p className="mt-2 text-zinc-300">

                <span className="font-semibold">

                  Quantity:

                </span>{" "}

                {d.quantity}

              </p>

              {/* Description */}
              {d.description && (

                <p className="mt-2 text-zinc-400">

                  {d.description}

                </p>
              )}

              {/* Expiry */}
              {d.expiry && (

                <p className="mt-2 text-zinc-400">

                  📅 Expiry:
                  {" "}

                  {new Date(
                    d.expiry
                  ).toLocaleDateString()}

                </p>
              )}

              {/* Brand */}
              {d.brand && (

                <p className="mt-2 text-zinc-400">

                  🏷️ Brand:
                  {" "}
                  {d.brand}

                </p>
              )}

              {/* Location */}
              {d.location && (

                <p className="mt-2 text-zinc-400">

                  📍
                  {" "}

                  {d.location.lat.toFixed(4)}
                  ,
                  {" "}
                  {d.location.lng.toFixed(4)}

                </p>
              )}

              {/* Date */}
              <p className="mt-2 text-sm text-zinc-500">

                Created:
                {" "}

                {new Date(
                  d.createdAt
                ).toLocaleString()}

              </p>

              {/* Buttons */}
              <div className="mt-5 flex gap-3">

                <button
                  onClick={() =>
                    handleDelete(d._id)
                  }
                  className="rounded-xl bg-red-600 px-4 py-2 font-semibold transition hover:bg-red-500"
                >

                  Delete

                </button>

              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyDonations;