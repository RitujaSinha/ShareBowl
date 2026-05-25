import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    role: "",
    email: "",
    password: "",
  });

  // Handle Input
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.name || e.target.id]: e.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = async (e) => {

    e.preventDefault();

    // role validation
    if (!form.role) {

      alert("Please select a role");
      return;
    }

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: form.email,
            password: form.password,
            role: form.role,
          }),
        }
      );

      const data = await res.json();

      console.log(data);

      // backend error
      if (!res.ok) {

        alert(data.message);
        return;
      }

      // save user
      localStorage.setItem("user", JSON.stringify(data));

      // save token
      localStorage.setItem("token", data.token);

      // redirect
      if (data.role === "donor") {

        navigate("/donor");
      }

      else if (data.role === "organisation") {

        navigate("/organisation-dashboard");
      }

      else if (data.role === "admin") {

        navigate("/admin-dashboard");
      }

    } catch (error) {

      console.log(error);

      alert("Login failed");
    }
  };

  return (

    <div className='flex min-h-screen items-center justify-center bg-black px-6 py-10'>

      {/* Card */}
      <div className='w-full max-w-md rounded-3xl border border-indigo-900 bg-zinc-900 p-10 shadow-[0_0_25px_rgba(99,102,241,0.2)]'>

        {/* Heading */}
        <h1 className='mb-2 text-center text-5xl font-bold text-indigo-500'>
          Login
        </h1>

        <p className='mb-10 text-center text-zinc-400'>
          Welcome back to ShareBowl
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit}>

          {/* Role Selection */}
          <div className='mb-8'>

            <p className='mb-4 text-lg font-semibold text-white'>
              Select Role
            </p>

            <div className='flex flex-wrap justify-center gap-6'>

              {/* Donor */}
              <label className='flex items-center gap-2 text-white'>

                <input
                  type="radio"
                  name="role"
                  value="donor"
                  onChange={handleChange}
                  className='h-5 w-5 accent-yellow-400'
                />

                Donor
              </label>

              {/* Organisation */}
              <label className='flex items-center gap-2 text-white'>

                <input
                  type="radio"
                  name="role"
                  value="organisation"
                  onChange={handleChange}
                  className='h-5 w-5 accent-indigo-500'
                />

                Organisation
              </label>

              {/* Admin */}
              <label className='flex items-center gap-2 text-white'>

                <input
                  type="radio"
                  name="role"
                  value="admin"
                  onChange={handleChange}
                  className='h-5 w-5 accent-red-500'
                />

                Admin
              </label>

            </div>
          </div>

          {/* Inputs */}
          <div className='flex flex-col gap-6'>

            {/* Email */}
            <input
              type="email"
              id="email"
              required
              placeholder='Enter your email'
              onChange={handleChange}
              className='rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none transition duration-300 focus:border-indigo-500'
            />

            {/* Password */}
            <input
              type="password"
              id="password"
              required
              placeholder='Enter your password'
              onChange={handleChange}
              className='rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none transition duration-300 focus:border-indigo-500'
            />

          </div>

          {/* Button */}
          <button
            type="submit"
            className='mt-8 w-full rounded-xl bg-indigo-600 py-4 text-xl font-semibold text-white transition duration-300 hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.8)]'
          >
            Login
          </button>

        </form>

      </div>
    </div>
  );
}