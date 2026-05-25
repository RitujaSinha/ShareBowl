import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function DonorSignup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    donorName: "",
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

  // Handle Input
  const handleChange = (e) => {

    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  // Handle Submit
  const handleSubmit = async () => {

    // password validation
    if (form.password !== form.repassword) {

      toast.error("Passwords do not match");
      return;
    }

    try {

      const res = await fetch(
        "http://localhost:5000/api/auth/signup/donor",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({

            donorName: form.donorName,

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

      console.log(data);

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

    <div className='min-h-screen bg-black px-6 py-10 text-white'>

      {/* Heading */}
      <p className='mx-auto mb-10 max-w-3xl text-center text-lg text-zinc-300'>
        Register to become a donor and help reduce food waste.
      </p>

      {/* Form Container */}
      <div className='mx-auto max-w-4xl rounded-3xl border border-zinc-800 bg-zinc-900 p-10'>

        <form

          onSubmit={(e) => {

            e.preventDefault();

            handleSubmit();
          }}

          className='grid gap-6 md:grid-cols-2'
        >

          {/* Title */}
          <legend className='col-span-2 mb-4 text-4xl font-bold text-yellow-400'>
            Create Account
          </legend>

          {/* Donor Name */}
          <input
            id="donorName"
            type="text"
            required
            placeholder="Enter donor name"
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
          />

          {/* Email */}
          <input
            id="email"
            type="email"
            required
            placeholder="Enter email"
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
          />

          {/* Phone */}
          <input
            id="phone"
            type="text"
            required
            placeholder="Enter phone number"
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
          />

          {/* Street */}
          <input
            id="street"
            type="text"
            required
            placeholder="Enter street"
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
          />

          {/* City */}
          <input
            id="city"
            type="text"
            required
            placeholder="Enter city"
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
          />

          {/* District */}
          <input
            id="district"
            type="text"
            required
            placeholder="Enter district"
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
          />

          {/* State */}
          <input
            id="state"
            type="text"
            required
            placeholder="Enter state"
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
          />

          {/* Pincode */}
          <input
            id="pincode"
            type="text"
            required
            placeholder="Enter pincode"
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
          />

          {/* Password */}
          <input
            id="password"
            type="password"
            required
            placeholder="Enter password"
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
          />

          {/* Confirm Password */}
          <input
            id="repassword"
            type="password"
            required
            placeholder="Confirm password"
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
          />

          {/* Button */}
          <button
            type="submit"
            className='col-span-2 mt-4 rounded-xl bg-yellow-400 py-4 text-xl font-bold text-black transition duration-300 hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.8)]'
          >
            Sign Up
          </button>

        </form>
      </div>
    </div>
  );
}