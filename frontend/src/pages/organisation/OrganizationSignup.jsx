import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Building2,
  HeartHandshake,
  Lock,
  Mail,
  MapPin,
  Phone,
  Send,
  User,
} from "lucide-react";

export default function OrganizationSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    organisationName: "",
    organisationID: "",
    organisationOwner: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    district: "",
    state: "",
    pincode: "",
    password: "",
    repassword: "",
  });

  // handle input
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  // submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // password check
    if (form.password !== form.repassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await fetch(
        "http://localhost:5000/api/auth/signup/organisation",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            organisationName: form.organisationName,

            organisationID: form.organisationID,

            organisationOwner: form.organisationOwner,

            email: form.email,

            phone: form.phone,

            street: form.street,

            city: form.city,

            district: form.district,

            state: form.state,

            pincode: form.pincode,

            password: form.password,
          }),
        }
      );

      const data = await res.json();

      // success
      if (res.ok) {
        toast.success(data.message);

        navigate("/login");
      }

      // backend error
      else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);

      toast.error("Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5FBF7] px-4 py-6">
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 flex flex-col gap-4 rounded-3xl border border-green-100 bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-green-600 text-white">
              <HeartHandshake size={26} strokeWidth={2.5} />
            </div>

            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-green-600">
                Organisation Portal
              </p>

              <h1 className="text-2xl font-black text-gray-900">
                Register Organisation
              </h1>

              <p className="text-sm font-medium text-gray-500">
                Create your organisation account to receive and manage donations.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => navigate("/login")}
            className="flex items-center justify-center gap-2 rounded-xl border border-green-200 bg-green-50 px-4 py-2 text-sm font-bold text-green-700 hover:bg-green-100"
          >
            <ArrowLeft size={17} />
            Back to Login
          </button>
        </div>

        <div className="rounded-3xl border border-green-100 bg-white p-6 shadow-sm">
          <div className="mb-6 flex items-center gap-4">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-green-100 text-green-700">
              <Building2 size={24} strokeWidth={2.5} />
            </div>

            <div>
              <h2 className="text-xl font-black text-gray-900">
                Organisation Details
              </h2>

              <p className="text-sm font-medium text-gray-500">
                Fill the required details to request your account.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-black text-gray-800">
                Organisation Name
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
                <Building2 size={18} className="text-gray-400" />

                <input
                  id="organisationName"
                  type="text"
                  required
                  placeholder="Enter organisation name"
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm font-semibold text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black text-gray-800">
                Organisation ID
              </label>

              <input
                id="organisationID"
                type="text"
                required
                placeholder="Enter organisation ID"
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-black text-gray-800">
                Owner Name
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
                <User size={18} className="text-gray-400" />

                <input
                  id="organisationOwner"
                  type="text"
                  required
                  placeholder="Enter owner name"
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm font-semibold text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black text-gray-800">
                Email
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
                <Mail size={18} className="text-gray-400" />

                <input
                  id="email"
                  type="email"
                  required
                  placeholder="Enter email"
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm font-semibold text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black text-gray-800">
                Phone Number
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
                <Phone size={18} className="text-gray-400" />

                <input
                  id="phone"
                  type="text"
                  required
                  placeholder="Enter phone number"
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm font-semibold text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-black text-gray-800">
                Street Address
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
                <MapPin size={18} className="text-gray-400" />

                <input
                  id="street"
                  type="text"
                  required
                  placeholder="Enter street"
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm font-semibold text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black text-gray-800">
                City
              </label>

              <input
                id="city"
                type="text"
                required
                placeholder="Enter city"
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-black text-gray-800">
                District
              </label>

              <input
                id="district"
                type="text"
                required
                placeholder="Enter district"
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-black text-gray-800">
                State
              </label>

              <input
                id="state"
                type="text"
                required
                placeholder="Enter state"
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-black text-gray-800">
                Pincode
              </label>

              <input
                id="pincode"
                type="text"
                required
                placeholder="Enter pincode"
                onChange={handleChange}
                className="w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-800 outline-none placeholder:text-gray-400 focus:border-green-500 focus:ring-4 focus:ring-green-100"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-black text-gray-800">
                Password
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
                <Lock size={18} className="text-gray-400" />

                <input
                  id="password"
                  type="password"
                  required
                  placeholder="Enter password"
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm font-semibold text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-black text-gray-800">
                Confirm Password
              </label>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
                <Lock size={18} className="text-gray-400" />

                <input
                  id="repassword"
                  type="password"
                  required
                  placeholder="Re-enter password"
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm font-semibold text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-4 flex items-center justify-center gap-2 rounded-2xl bg-green-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700 md:col-span-2"
            >
              <Send size={18} strokeWidth={2.5} />
              Request Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}