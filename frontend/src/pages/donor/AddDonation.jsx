import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function AddDonation() {

  const navigate = useNavigate();

  const [category, setCategory] =
    useState("Food");

  const [organisations, setOrganisations] =
    useState([]);

  const [form, setForm] = useState({

    organisation: "",
    foodType: "",
    quantity: "",
    description: "",
    expiry: "",
    brand: "",

  });

  const [location, setLocation] =
    useState(null);

  // Fetch Organisations
  useEffect(() => {

    const fetchOrganisations =
    async () => {

      try {

        const res = await fetch(
          "http://localhost:5000/api/organisation/all"
        );

        const data = await res.json();

        setOrganisations(data);

      } catch (error) {

        console.log(error);

        toast.error(
          "Failed to load organisations"
        );
      }
    };

    fetchOrganisations();

  }, []);

  // Get Location
  const getLocation = () => {

    if (!navigator.geolocation) {

      toast.error(
        "Geolocation not supported"
      );

      return;
    }

    navigator.geolocation.getCurrentPosition(

      (pos) => {

        const lat =
          pos.coords.latitude;

        const lng =
          pos.coords.longitude;

        setLocation({ lat, lng });

        toast.success(
          "Location added"
        );
      },

      (err) => {

        console.log(err);

        toast.error(
          "Location access denied"
        );
      }
    );
  };

  // Submit Donation
  const handleSubmit = async (e) => {

    e.preventDefault();

    if (
      !form.organisation ||
      !form.foodType ||
      !form.quantity
    ) {

      toast.error(
        "Please fill required fields"
      );

      return;
    }

    if (!location) {

      toast.error(
        "Please add location"
      );

      return;
    }

    const data = {

      ...form,
      category,
      location,

    };

    try {

      const res = await fetch(
        "http://localhost:5000/api/donation/create",
        {

          method: "POST",

          credentials: "include",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify(data),
        }
      );

      const result =
        await res.json();

      if (!res.ok) {

        toast.error(
          result.message ||
          "Error adding donation"
        );

        return;
      }

      toast.success(
        "Donation added successfully ✅"
      );

      navigate("/my-donations");

    } catch (error) {

      console.log(error);

      toast.error(
        "Something went wrong"
      );
    }
  };

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">

      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">

        <h1 className="text-3xl font-bold mb-6 text-center">

          Add Donation

        </h1>

        {/* Category Switch */}
        <div className="flex gap-3 mb-6">

          <button
            type="button"
            onClick={() =>
              setCategory("Food")
            }
            className={`flex-1 p-3 rounded-lg font-semibold transition ${
              category === "Food"
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >

            🍱 Food

          </button>

          <button
            type="button"
            onClick={() =>
              setCategory("Grocery")
            }
            className={`flex-1 p-3 rounded-lg font-semibold transition ${
              category === "Grocery"
                ? "bg-green-500 text-white"
                : "bg-gray-200"
            }`}
          >

            🛒 Grocery

          </button>

        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >

          {/* Organisation */}
          <select
            className="w-full p-3 border rounded-lg outline-none"
            value={form.organisation}
            onChange={(e) =>
              setForm({

                ...form,
                organisation:
                  e.target.value,

              })
            }
          >

            <option value="">
              Select Organisation
            </option>

            {organisations.map((org) => (

              <option
                key={org._id}
                value={org._id}
              >

                {org.organisationName}

              </option>

            ))}

          </select>

          {/* Food Type */}
          <input
            type="text"
            placeholder={
              category === "Food"
                ? "Food Type (Rice, Bread)"
                : "Grocery Item (Flour, Oil)"
            }
            className="w-full p-3 border rounded-lg outline-none"
            value={form.foodType}
            onChange={(e) =>
              setForm({

                ...form,
                foodType:
                  e.target.value,

              })
            }
          />

          {/* Quantity */}
          <input
            type="text"
            placeholder="Quantity"
            className="w-full p-3 border rounded-lg outline-none"
            value={form.quantity}
            onChange={(e) =>
              setForm({

                ...form,
                quantity:
                  e.target.value,

              })
            }
          />

          {/* Food Expiry */}
          {category === "Food" && (

            <input
              type="date"
              className="w-full p-3 border rounded-lg outline-none"
              value={form.expiry}
              onChange={(e) =>
                setForm({

                  ...form,
                  expiry:
                    e.target.value,

                })
              }
            />
          )}

          {/* Grocery Brand */}
          {category === "Grocery" && (

            <input
              type="text"
              placeholder="Brand (optional)"
              className="w-full p-3 border rounded-lg outline-none"
              value={form.brand}
              onChange={(e) =>
                setForm({

                  ...form,
                  brand:
                    e.target.value,

                })
              }
            />
          )}

          {/* Description */}
          <textarea
            placeholder="Description"
            className="w-full p-3 border rounded-lg outline-none"
            value={form.description}
            onChange={(e) =>
              setForm({

                ...form,
                description:
                  e.target.value,

              })
            }
          />

          {/* Location */}
          <button
            type="button"
            onClick={getLocation}
            className="w-full bg-gray-200 hover:bg-gray-300 transition p-3 rounded-lg"
          >

            📍 Get Location

          </button>

          {/* Show Location */}
          {location && (

            <p className="text-sm text-green-600">

              📍 Location Added:
              {" "}
              {location.lat.toFixed(4)},
              {" "}
              {location.lng.toFixed(4)}

            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 transition text-white p-3 rounded-lg font-semibold"
          >

            Submit Donation

          </button>

        </form>

      </div>

    </div>
  );
}

export default AddDonation;