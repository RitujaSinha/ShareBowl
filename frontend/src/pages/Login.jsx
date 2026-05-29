import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

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
      const res = await fetch("http://localhost:5000/api/auth/login", {
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

      localStorage.setItem(
        "user",
        JSON.stringify(user)
      );

      toast.success("Login successful");

      //  ROLE BASED NAVIGATION
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

  return (
    <div className="min-h-screen bg-black">
      <Navbar />

      <div className="flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-md rounded-3xl border border-indigo-900 bg-zinc-900 p-10 shadow-[0_0_25px_rgba(99,102,241,0.2)]">

          <h1 className="mb-2 text-center text-5xl font-bold text-indigo-500">
            Login
          </h1>

          <p className="mb-10 text-center text-zinc-400">
            Welcome back to ShareBowl
          </p>

          <form onSubmit={handleSubmit}>

            {/* ROLE */}
            <div className="mb-8">
              <p className="mb-4 text-lg font-semibold text-white">
                Select Role
              </p>

              <div className="flex flex-wrap justify-center gap-6">

                <label className="flex items-center gap-2 text-white">
                  <input
                    type="radio"
                    name="role"
                    value="donor"
                    onChange={handleChange}
                    className="h-5 w-5 accent-yellow-400"
                  />
                  Donor
                </label>

                <label className="flex items-center gap-2 text-white">
                  <input
                    type="radio"
                    name="role"
                    value="organisation"
                    onChange={handleChange}
                    className="h-5 w-5 accent-indigo-500"
                  />
                  Organisation
                </label>

                <label className="flex items-center gap-2 text-white">
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    onChange={handleChange}
                    className="h-5 w-5 accent-red-500"
                  />
                  Admin
                </label>

              </div>
            </div>

            {/* INPUTS */}
            <div className="flex flex-col gap-6">

              <input
                type="email"
                id="email"
                required
                placeholder="Enter your email"
                onChange={handleChange}
                className="rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-indigo-500"
              />

              <input
                type="password"
                id="password"
                required
                placeholder="Enter your password"
                onChange={handleChange}
                className="rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none focus:border-indigo-500"
              />

            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="mt-8 w-full rounded-xl bg-indigo-600 py-4 text-xl font-semibold text-white transition hover:bg-indigo-500"
            >
              Login
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}