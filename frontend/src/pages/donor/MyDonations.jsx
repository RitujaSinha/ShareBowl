import { useEffect, useState } from "react";

function MyDonations() {
  const [donations, setDonations] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");

  // 🚀 Fetch data
  const fetchDonations = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/donations");
      const data = await res.json();
      setDonations(data);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // ❌ Delete
  const handleDelete = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/donations/${id}`, {
        method: "DELETE",
      });

      setDonations(donations.filter((d) => d._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  // 🔄 Accept
  const handleAccept = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/donations/${id}`, {
        method: "PUT",
      });

      const updated = await res.json();

      setDonations(
        donations.map((d) =>
          d._id === id ? updated : d
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  // 🔥 FILTER + SEARCH
  const filteredDonations = donations
    .filter((d) =>
      filter === "All" ? true : d.status === filter
    )
    .filter((d) =>
      d.type.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold mb-6">My Donations</h1>

      {/* 🔍 SEARCH */}
      <input
        type="text"
        placeholder="Search by food type..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full p-2 mb-4 border rounded-lg"
      />

      {/* 🔥 FILTER BUTTONS */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => setFilter("All")}
          className={`px-4 py-1 rounded ${
            filter === "All" ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          All
        </button>

        <button
          onClick={() => setFilter("Pending")}
          className={`px-4 py-1 rounded ${
            filter === "Pending"
              ? "bg-yellow-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Pending
        </button>

        <button
          onClick={() => setFilter("Accepted")}
          className={`px-4 py-1 rounded ${
            filter === "Accepted"
              ? "bg-green-500 text-white"
              : "bg-gray-200"
          }`}
        >
          Accepted
        </button>
      </div>

      {/* 🧾 LIST */}
      {filteredDonations.length === 0 ? (
        <p className="text-gray-500">No donations found 🚫</p>
      ) : (
        <div className="space-y-4">

          {filteredDonations.map((d) => (
            <div
              key={d._id}
              className="bg-white p-5 rounded-xl shadow hover:shadow-md transition"
            >
              <h2 className="text-lg font-semibold">{d.type}</h2>

              <p className="text-gray-700">Quantity: {d.quantity}</p>
              <p className="text-gray-600">Description: {d.description}</p>

              {/* 📅 DATE */}
              <p className="text-sm text-gray-400 mt-1">
                📅 {new Date(d.createdAt).toLocaleString()}
              </p>

              {/* 📍 LOCATION */}
              {d.location && (
                <p className="text-sm text-gray-500 mt-1">
                  📍 {d.location.lat.toFixed(2)}, {d.location.lng.toFixed(2)}
                </p>
              )}

              {/* 🌍 MAP LINK */}
              {d.location && (
                <a
                  href={`https://www.google.com/maps?q=${d.location.lat},${d.location.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 text-sm underline"
                >
                  View on Map
                </a>
              )}

              {/* STATUS */}
              <p
                className={`mt-2 font-medium ${
                  d.status === "Pending"
                    ? "text-yellow-500"
                    : "text-green-600"
                }`}
              >
                Status: {d.status}
              </p>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3 mt-4">

                {d.status === "Pending" && (
                  <button
                    onClick={() => handleAccept(d._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                )}

                <button
                  onClick={() => handleDelete(d._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
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