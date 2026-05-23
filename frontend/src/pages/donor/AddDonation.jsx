import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddDonation() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("Food"); // 🔥 NEW
  const [form, setForm] = useState({
    type: "",
    quantity: "",
    description: "",
    expiry: "", // for food
    brand: "", // for grocery
  });

  const [location, setLocation] = useState(null);

  // 📍 Location
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
      },
      () => alert("Location access denied")
    );
  };

  // 🚀 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.type || !form.quantity) {
      alert("Please fill required fields");
      return;
    }

    if (!location) {
      alert("Please add location");
      return;
    }

    const data = {
      ...form,
      category,
      location,
    };

    try {
      await fetch("http://localhost:5000/api/donations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      navigate("/my-donations"); // 🔥 redirect
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Add Donation
        </h1>

        {/* 🔥 CATEGORY SWITCH */}
        <div className="flex gap-3 mb-6">
          <button
            onClick={() => setCategory("Food")}
            className={`flex-1 p-2 rounded ${
              category === "Food"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            🍱 Food
          </button>

          <button
            onClick={() => setCategory("Grocery")}
            className={`flex-1 p-2 rounded ${
              category === "Grocery"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >
            🛒 Grocery
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* Common Fields */}
          <input
            type="text"
            placeholder={
              category === "Food"
                ? "Food Type (Rice, Bread)"
                : "Grocery Item (Flour, Oil)"
            }
            className="w-full p-3 border rounded-lg"
            onChange={(e) =>
              setForm({ ...form, type: e.target.value })
            }
          />

          <input
            type="text"
            placeholder="Quantity"
            className="w-full p-3 border rounded-lg"
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
          />

          {/* 🔥 FOOD EXTRA FIELD */}
          {category === "Food" && (
            <input
              type="date"
              className="w-full p-3 border rounded-lg"
              onChange={(e) =>
                setForm({ ...form, expiry: e.target.value })
              }
            />
          )}

          {/* 🔥 GROCERY EXTRA FIELD */}
          {category === "Grocery" && (
            <input
              type="text"
              placeholder="Brand (optional)"
              className="w-full p-3 border rounded-lg"
              onChange={(e) =>
                setForm({ ...form, brand: e.target.value })
              }
            />
          )}

          <textarea
            placeholder="Description"
            className="w-full p-3 border rounded-lg"
            onChange={(e) =>
              setForm({ ...form, description: e.target.value })
            }
          />

          {/* Location */}
          <button
            type="button"
            onClick={getLocation}
            className="w-full bg-gray-200 p-2 rounded"
          >
            📍 Get Location
          </button>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded"
          >
            Submit Donation
          </button>

        </form>
      </div>
    </div>
  );
}

export default AddDonation;