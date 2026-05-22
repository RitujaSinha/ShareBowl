import { useEffect, useState } from "react";

function MyDonations() {
  const [donations, setDonations] = useState([]);

  // 🚀 Fetch data
  const fetchDonations = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/donations");
      const data = await res.json();
      setDonations(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  // ❌ Delete donation
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

  // 🔄 Accept donation
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

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      <h1 className="text-2xl font-bold mb-6">My Donations</h1>

      {donations.length === 0 ? (
        <p className="text-gray-500">No donations yet 🚫</p>
      ) : (
        <div className="space-y-4">

          {donations.map((d) => (
            <div
              key={d._id}
              className="bg-white p-4 rounded-lg shadow"
            >
              <h2 className="text-lg font-semibold">{d.type}</h2>

              <p>Quantity: {d.quantity}</p>
              <p>Description: {d.description}</p>

              <p
                className={
                  d.status === "Pending"
                    ? "text-yellow-500 font-medium"
                    : "text-green-600 font-medium"
                }
              >
                Status: {d.status}
              </p>

              {/* 🔥 Buttons */}
              <div className="flex gap-3 mt-3">

                {/* Accept button */}
                {d.status === "Pending" && (
                  <button
                    onClick={() => handleAccept(d._id)}
                    className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
                  >
                    Accept
                  </button>
                )}

                {/* Delete button */}
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