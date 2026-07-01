import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import API_URL from "../../api";
import {
  ArrowLeft,
  CheckCircle2,
  HeartHandshake,
  Loader2,
  Mail,
  MapPin,
  Phone,
  Salad,
  Send,
  ShoppingBasket,
} from "lucide-react";

function AddDonation() {
  const navigate = useNavigate();

  const [category, setCategory] = useState("Food");
  const [allOrganisations, setAllOrganisations] = useState([]);
  const [filteredOrganisations, setFilteredOrganisations] = useState([]);
  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    organisation: "",
    foodType: "",
    quantity: "",
    description: "",
    expiry: "",
    brand: "",
  });

  useEffect(() => {
    fetchOrganisations();
  }, []);

  const fetchOrganisations = async () => {
    try {
      const res = await fetch(`${API_URL}/organisation/all`, {
        credentials: "include",
      });

      const data = await res.json();

      const orgList = Array.isArray(data)
        ? data
        : data.organisations || [];

      setAllOrganisations(orgList);
    } catch (error) {
      console.log(error);
      toast.error("Failed to load organisations");
    }
  };

  const handleChange = (field, value) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const filterOrganisationsByLocation = (currentLocation) => {
    const filtered = allOrganisations.filter((org) => {
      const orgState = org.location?.state?.toLowerCase()?.trim();
      const orgDistrict = org.location?.district?.toLowerCase()?.trim();

      const donorState = currentLocation.state?.toLowerCase()?.trim();
      const donorDistrict = currentLocation.district?.toLowerCase()?.trim();

      return orgState === donorState && orgDistrict === donorDistrict;
    });

    setFilteredOrganisations(filtered);

    if (filtered.length === 0) {
      toast.error("No organisation found in your city/district");
    } else {
      toast.success(`${filtered.length} nearby organisation found`);
    }
  };

  const getLocation = () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation not supported");
      return;
    }

    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const lat = pos.coords.latitude;
          const lng = pos.coords.longitude;

          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
          );

          const data = await response.json();

          const currentLocation = {
            lat,
            lng,
            city:
              data?.address?.city ||
              data?.address?.town ||
              data?.address?.village ||
              "",
            district: data?.address?.county || "",
            state: data?.address?.state || "",
          };

          setLocation(currentLocation);
          setForm((prev) => ({
            ...prev,
            organisation: "",
          }));

          filterOrganisationsByLocation(currentLocation);
        } catch (error) {
          console.log(error);
          toast.error("Failed to fetch location");
        } finally {
          setLoadingLocation(false);
        }
      },
      (error) => {
        console.log(error);
        setLoadingLocation(false);
        toast.error("Location access denied");
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.organisation) {
      toast.error("Please select an organisation");
      return;
    }

    if (!form.foodType || !form.quantity) {
      toast.error("Please fill required fields");
      return;
    }

    if (!location) {
      toast.error("Please add location");
      return;
    }

    try {
      setSubmitting(true);

      const res = await fetch(`${API_URL}/donation/create`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...form,
          category,
          location,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        toast.error(result.message || "Error adding donation");
        return;
      }

      toast.success("Donation added successfully");
      navigate("/my-donations");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FFF8EF] px-4 py-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between rounded-3xl border border-orange-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 text-white">
              <HeartHandshake size={26} strokeWidth={2.5} />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-amber-600">
                Donor Portal
              </p>
              <h1 className="text-2xl font-black text-gray-900">
                Add Donation
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/donor")}
            className="flex items-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-sm font-bold text-green-700 hover:bg-green-100"
          >
            <ArrowLeft size={17} />
            Back
          </button>
        </div>

        <div className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
          <div className="mb-6 grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setCategory("Food")}
              className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-4 font-bold transition ${
                category === "Food"
                  ? "border-orange-400 bg-orange-500 text-white"
                  : "border-orange-100 bg-orange-50 text-orange-700 hover:bg-orange-100"
              }`}
            >
              <Salad size={22} />
              Food
            </button>

            <button
              type="button"
              onClick={() => setCategory("Grocery")}
              className={`flex items-center justify-center gap-2 rounded-2xl border px-4 py-4 font-bold transition ${
                category === "Grocery"
                  ? "border-green-500 bg-green-600 text-white"
                  : "border-green-100 bg-green-50 text-green-700 hover:bg-green-100"
              }`}
            >
              <ShoppingBasket size={22} />
              Grocery
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <button
              type="button"
              onClick={getLocation}
              disabled={loadingLocation}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-green-50 px-4 py-3 text-sm font-bold text-green-700 hover:bg-green-100 disabled:opacity-70"
            >
              {loadingLocation ? (
                <Loader2 className="animate-spin" size={18} />
              ) : (
                <MapPin size={18} />
              )}
              {loadingLocation ? "Getting Location..." : "Get Location First"}
            </button>

            {location && (
              <div className="rounded-2xl border border-green-100 bg-green-50 p-4 text-sm text-green-800">
                <div className="mb-2 flex items-center gap-2 font-bold">
                  <CheckCircle2 size={18} />
                  Location Added
                </div>

                <p>State: {location.state || "N/A"}</p>
                <p>District: {location.district || "N/A"}</p>
                <p>City: {location.city || "N/A"}</p>
              </div>
            )}

            <div>
              <h2 className="mb-3 text-lg font-black text-gray-900">
                Select Nearby Organisation
              </h2>

              {!location && (
                <div className="rounded-2xl border border-yellow-100 bg-yellow-50 p-4 text-sm font-semibold text-yellow-700">
                  Please add your location first. Organisations from your same
                  state and district will be shown here.
                </div>
              )}

              {location && filteredOrganisations.length === 0 && (
                <div className="rounded-2xl border border-red-100 bg-red-50 p-4 text-sm font-semibold text-red-700">
                  No approved organisation found in your location.
                </div>
              )}

              {location && filteredOrganisations.length > 0 && (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {filteredOrganisations.map((org) => (
                    <div
                      key={org._id}
                      onClick={() =>
                        handleChange("organisation", org._id)
                      }
                      className={`cursor-pointer rounded-3xl border p-5 shadow-sm transition ${
                        form.organisation === org._id
                          ? "border-green-600 bg-green-50 ring-4 ring-green-100"
                          : "border-gray-200 bg-white hover:border-green-300 hover:bg-green-50"
                      }`}
                    >
                      <div className="mb-3 flex items-start justify-between gap-3">
                        <div>
                          <h3 className="text-lg font-black text-gray-900">
                            {org.organisationName}
                          </h3>

                          <p className="mt-1 text-xs font-bold uppercase tracking-wide text-green-700">
                            Approved Organisation
                          </p>
                        </div>

                        {form.organisation === org._id && (
                          <CheckCircle2
                            className="text-green-600"
                            size={24}
                          />
                        )}
                      </div>

                      <div className="space-y-2 text-sm font-semibold text-gray-600">
                        <p className="flex items-center gap-2">
                          <Mail size={16} />
                          {org.email || "N/A"}
                        </p>

                        <p className="flex items-center gap-2">
                          <Phone size={16} />
                          {org.phone || "N/A"}
                        </p>

                        <p className="flex items-center gap-2">
                          <MapPin size={16} />
                          {org.location?.district || "N/A"},{" "}
                          {org.location?.state || "N/A"}
                        </p>
                      </div>

                      <div
                        className={`mt-4 rounded-xl px-4 py-2 text-center text-sm font-black ${
                          form.organisation === org._id
                            ? "bg-green-600 text-white"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {form.organisation === org._id
                          ? "Selected"
                          : "Select Organisation"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <input
              type="text"
              placeholder={
                category === "Food" ? "Food Type *" : "Grocery Item *"
              }
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
              value={form.foodType}
              onChange={(e) => handleChange("foodType", e.target.value)}
            />

            <input
              type="text"
              placeholder="Quantity *"
              className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
              value={form.quantity}
              onChange={(e) => handleChange("quantity", e.target.value)}
            />

            {category === "Food" && (
              <input
                type="date"
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold outline-none focus:border-green-500 focus:ring-4 focus:ring-green-100"
                value={form.expiry}
                onChange={(e) => handleChange("expiry", e.target.value)}
              />
            )}

            {category === "Grocery" && (
              <input
                type="text"
                placeholder="Brand optional"
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
                value={form.brand}
                onChange={(e) => handleChange("brand", e.target.value)}
              />
            )}

            <textarea
              rows="4"
              placeholder="Description"
              className="w-full resize-none rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
              value={form.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />

            <button
              type="submit"
              disabled={submitting}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-green-600 to-emerald-700 px-5 py-4 text-sm font-black text-white shadow-lg shadow-green-600/20 hover:-translate-y-0.5 disabled:opacity-70"
            >
              {submitting ? (
                <Loader2 className="animate-spin" size={19} />
              ) : (
                <Send size={19} />
              )}
              {submitting ? "Submitting..." : "Submit Donation"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddDonation;