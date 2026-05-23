import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function DonorSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
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

  // 🔥 Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  // 🚀 Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.password !== form.repassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: "donor",
          address: {
            street: form.street,
            city: form.city,
            district: form.district,
            state: form.state,
            pincode: form.pincode,
          },
        }),
      });

      const data = await res.json();

      alert(data.message || "Signup successful 🎉");

      // 🔥 Redirect to login
      navigate("/login");

    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
  };

  return (
    <div className='min-h-screen bg-black px-6 py-10 text-white'>

      <p className='mx-auto mb-10 max-w-3xl text-center text-lg text-zinc-300'>
        Register to be Donor
      </p>

      <div className='mx-auto max-w-4xl rounded-3xl border border-zinc-800 bg-zinc-900 p-10'>

        <form onSubmit={handleSubmit} className='flex flex-col gap-6'>

          <legend className='mb-6 text-4xl font-bold text-yellow-400'>
            Create Account
          </legend>

          {/* Name */}
          <input id="name" placeholder="Name" onChange={handleChange} className="input" />

          {/* Email */}
          <input id="email" type="email" placeholder="Email" onChange={handleChange} className="input" />

          {/* Phone */}
          <input id="phone" placeholder="Phone" onChange={handleChange} className="input" />

          {/* Address */}
          <input id="street" placeholder="Street" onChange={handleChange} className="input" />
          <input id="city" placeholder="City" onChange={handleChange} className="input" />
          <input id="district" placeholder="District" onChange={handleChange} className="input" />
          <input id="state" placeholder="State" onChange={handleChange} className="input" />
          <input id="pincode" placeholder="Pincode" onChange={handleChange} className="input" />

          {/* Password */}
          <input id="password" type="password" placeholder="Password" onChange={handleChange} className="input" />

          {/* Confirm Password */}
          <input id="repassword" type="password" placeholder="Confirm Password" onChange={handleChange} className="input" />

          {/* Button */}
          <button
            type="submit"
            className="mt-6 rounded-xl bg-yellow-400 py-4 text-xl font-bold text-black hover:bg-yellow-300"
          >
            Sign Up
          </button>

        </form>
      </div>
    </div>
  );
}