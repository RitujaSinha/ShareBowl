import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "",
  });

  // 🔥 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id || e.target.name]: e.target.value });
  };

  // 🚀 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.role) {
      alert("Please select a role");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password,
          role: form.role
        }),
      });

      const data = await res.json();

      if (!data.user) {
        alert("Invalid credentials");
        return;
      }

      //  Check role match
      if (data.user.role !== form.role) {
        alert("Incorrect role selected");
        return;
      }

      //  Save user
      localStorage.setItem("user", JSON.stringify(data.user));

      //  Redirect
      if (data.user.role === "donor") {
        navigate("/donor");
      } else if (data.user.role === "ngo") {
        navigate("/organisation-dashboard");
      } else {
        navigate("/admin-dashboard");
      }

    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-black px-6 py-10'>

      <div className='w-full max-w-md rounded-3xl border border-indigo-900 bg-zinc-900 p-10'>

        <h1 className='mb-2 text-center text-5xl font-bold text-indigo-500'>
          Login
        </h1>

        <p className='mb-10 text-center text-zinc-400'>
          Welcome back to ShareBowl
        </p>

        {/* 🔥 FORM START */}
        <form onSubmit={handleSubmit}>

          {/* Role Selection */}
          <div className='mb-8'>
            <p className='mb-4 text-lg font-semibold text-white'>
              Select Role
            </p>

            <div className='flex gap-4 justify-center'>

              <label className='flex items-center gap-2 text-white'>
                <input
                  type="radio"
                  name="role"
                  value="donor"
                  onChange={handleChange}
                />
                Donor
              </label>

              <label className='flex items-center gap-2 text-white'>
                <input
                  type="radio"
                  name="role"
                  value="ngo"
                  onChange={handleChange}
                />
                Organisation
              </label>

              <label className='flex items-center gap-2 text-white'>
                <input
                  type="radio"
                  name="role"
                  value="admin"
                  onChange={handleChange}
                />
                Admin
              </label>

            </div>
          </div>

          {/* Inputs */}
          <div className='flex flex-col gap-6'>

            <input
              type="email"
              id="email"
              placeholder='Enter your email'
              onChange={handleChange}
              className='rounded-xl border border-zinc-700 bg-black p-4 text-white'
            />

            <input
              type="password"
              id="password"
              placeholder='Enter your password'
              onChange={handleChange}
              className='rounded-xl border border-zinc-700 bg-black p-4 text-white'
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            className='mt-8 w-full rounded-xl bg-indigo-600 py-4 text-xl font-semibold text-white'
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
}