import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Building2,
  Lock,
  Mail,
  ShieldCheck,
  User,
  Users,
} from "lucide-react";
import Navbar from "../components/Navbar";
import API_URL from "../api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    role: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name || e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.role) {
      toast.error("Please select a role");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      console.log("LOGIN RESPONSE:", data);

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      const user = data.user || data;

      if (!user?.role) {
        toast.error("Invalid server response");
        return;
      }

      localStorage.setItem("user", JSON.stringify(user));

      toast.success("Login successful");

      // ROLE BASED NAVIGATION
      switch (user.role) {
        case "donor":
          navigate("/donor");
          break;

        case "organisation":
          navigate("/organisation-dashboard");
          break;

        case "admin":
          navigate("/admin-dashboard");
          break;

        default:
          toast.error("Unknown role");
      }
    } catch (error) {
      console.log(error);
      toast.error("Server not reachable");
    }
  };

  const roleClass = (role) =>
    form.role === role
      ? "border-green-500 bg-green-50 text-green-700"
      : "border-gray-200 bg-white text-gray-600 hover:bg-green-50 hover:text-green-700";

  return (
    <div className="min-h-screen bg-[#FFF8EF] text-gray-900">
      <Navbar />

      <div className="flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
          <div className="mb-6 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-600 text-white">
              <Users size={28} strokeWidth={2.5} />
            </div>

            <p className="text-sm font-bold uppercase tracking-widest text-amber-600">
              ShareBowl
            </p>

            <h1 className="mt-1 text-3xl font-black text-gray-900">
              Login
            </h1>

            <p className="mt-2 text-sm font-medium text-gray-500">
              Welcome back to ShareBowl
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <p className="mb-3 text-sm font-black text-gray-800">
                Select Role
              </p>

              <div className="grid grid-cols-3 gap-3">
                <label
                  className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-4 text-sm font-bold transition ${roleClass(
                    "donor"
                  )}`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="donor"
                    onChange={handleChange}
                    className="hidden"
                  />
                  <User size={22} strokeWidth={2.5} />
                  Donor
                </label>

                <label
                  className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-4 text-sm font-bold transition ${roleClass(
                    "organisation"
                  )}`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="organisation"
                    onChange={handleChange}
                    className="hidden"
                  />
                  <Building2 size={22} strokeWidth={2.5} />
                  Organisation
                </label>

                <label
                  className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border px-3 py-4 text-sm font-bold transition ${
                    form.role === "admin"
                      ? "border-slate-700 bg-slate-900 text-white"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    onChange={handleChange}
                    className="hidden"
                  />
                  <ShieldCheck size={22} strokeWidth={2.5} />
                  Admin
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
                <Mail size={18} className="text-gray-400" />

                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Enter your email"
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm font-semibold text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>

              <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-4 py-3 focus-within:border-green-500 focus-within:ring-4 focus-within:ring-green-100">
                <Lock size={18} className="text-gray-400" />

                <input
                  type="password"
                  id="password"
                  required
                  placeholder="Enter your password"
                  onChange={handleChange}
                  className="w-full bg-transparent text-sm font-semibold text-gray-800 outline-none placeholder:text-gray-400"
                />
              </div>
            </div>

          <div className="mt-4 flex justify-end">
          <button
            type="button"
            onClick={() => navigate("/forgot-password")}
            className="text-sm font-bold text-green-700 transition hover:text-green-800 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          className="mt-4 w-full rounded-2xl bg-green-600 px-5 py-4 text-sm font-black text-white shadow-lg shadow-green-600/20 transition hover:bg-green-700"
        >
          Login
        </button>
          </form>
        </div>
      </div>
    </div>
  );
}