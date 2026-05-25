import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddDonation() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("Food");

  const [form, setForm] = useState({
    type: "",
    quantity: "",
    description: "",
    expiry: "",
    brand: "",
  });

  const [location, setLocation] = useState(null);

  // 📍 Get Location
  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        console.log("Location:", lat, lng);

        setLocation({ lat, lng });
      },
      (err) => {
        console.log(err);
        toast.error("Location access denied");
      }
    );
  };

  //  Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.type || !form.quantity) {
      toast.error("Please fill required fields");
      return;
    }

    if (!location) {
      toast.error("Please add location");
      return;
    }

    const data = {
      ...form,
      category,
      location,
    };

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(
        "http://localhost:5000/api/auth/donation",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, 
          },
          body: JSON.stringify(data),
        }
      );

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Error adding donation");
        return;
      }

      toast.success("Donation added successfully ✅");

      navigate("/my-donations");
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md">

        <h1 className="text-2xl font-bold mb-6 text-center">
          Add Donation
        </h1>

        {/* CATEGORY SWITCH */}
        <div className="flex gap-3 mb-6">
          <button
            type="button"
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
            type="button"
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

          {/* Type */}
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

          {/* Quantity */}
          <input
            type="text"
            placeholder="Quantity"
            className="w-full p-3 border rounded-lg"
            onChange={(e) =>
              setForm({ ...form, quantity: e.target.value })
            }
          />

          {/* Food Field */}
          {category === "Food" && (
            <input
              type="date"
              className="w-full p-3 border rounded-lg"
              onChange={(e) =>
                setForm({ ...form, expiry: e.target.value })
              }
            />
          )}

          {/* Grocery Field */}
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

          {/* Description */}
          <textarea
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
            className="w-full bg-gray-200 p-2 rounded"
          >
            📍 Get Location
          </button>

          {/*  SHOW LOCATION */}
          {location && (
            <p className="text-sm text-green-600">
              📍 Location Added: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
            </p>
          )}

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