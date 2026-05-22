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
      (error) => {
        alert("Location access denied");
      }
    );
  };

  // 🚀 Handle Submit (for now just console log)
  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      ...form,
      location,
    };

    console.log("Donation Data:", data);
    alert("Donation submitted (check console)");
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
            name="type"
            placeholder="Food Type (e.g. Rice, Bread)"
            className="w-full p-3 border rounded-lg"
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          />

          <input
            type="text"
            name="quantity"
            placeholder="Quantity"
            className="w-full p-3 border rounded-lg"
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
          />

          <textarea
            name="description"
            placeholder="Description"
            className="w-full p-3 border rounded-lg"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* 📍 Location Button */}
          <button
            type="button"
            onClick={getLocation}
            className="w-full bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
          >
            📍 Get My Location
          </button>

          {/* Show Location */}
          {location && (
            <p className="text-sm text-green-600">
              Location: {location.lat}, {location.lng}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600"
          >
            Submit Donation
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddDonation;