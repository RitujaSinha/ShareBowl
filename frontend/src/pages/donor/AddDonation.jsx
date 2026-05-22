import { useState } from "react";

function AddDonation() {
  const [form, setForm] = useState({
    type: "",
    quantity: "",
    description: "",
  });

  const [location, setLocation] = useState(null);

  // 📍 Get Location
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        alert("Location access denied");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.type || !form.quantity || !form.description) {
      alert("Please fill all fields");
      return;
    }

    if (!location) {
      alert("Please add your location");
      return;
    }

    const data = {
      ...form,
      location,
    };

    try {
      const res = await fetch("http://localhost:5000/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      console.log("Saved:", result);
      alert("Donation submitted successfully 🎉");

      // clear form
      setForm({
        type: "",
        quantity: "",
        description: "",
      });
      setLocation(null);

    } catch (error) {
      console.error(error);
      alert("Error submitting donation");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Add Donation
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            placeholder="Food Type"
            value={form.type}
            className="w-full p-3 border rounded-lg"
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Quantity"
            value={form.quantity}
            className="w-full p-3 border rounded-lg"
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
          />

          <textarea
            placeholder="Description"
            value={form.description}
            className="w-full p-3 border rounded-lg"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          <button
            type="button"
            onClick={getLocation}
            className="w-full bg-gray-200 p-2 rounded-lg"
          >
            📍 Get My Location
          </button>

          {location && (
            <p className="text-green-600 text-sm">
              Location added ✅
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg"
          >
            Submit Donation
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddDonation;