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

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async () => {
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
          credentials: "include", 
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

      if (!res.ok) {
        toast.error(data.message || "Signup failed");
        return;
      }

      toast.success(data.message || "Signup successful");
      navigate("/login");

    } catch (error) {
      console.log(error);
      toast.error("Server error");
    }
  };

  return (
    <div className='min-h-screen bg-black px-6 py-10 text-white'>

      <p className='mx-auto mb-10 max-w-3xl text-center text-lg text-zinc-300'>
        Register to become a donor and help reduce food waste.
      </p>

      <div className='mx-auto max-w-4xl rounded-3xl border border-zinc-800 bg-zinc-900 p-10'>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className='grid gap-6 md:grid-cols-2'
        >

          <legend className='col-span-2 mb-4 text-4xl font-bold text-yellow-400'>
            Create Account
          </legend>

          <input id="donorName" type="text" required placeholder="Enter donor name" onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
          />

          <input id="email" type="email" required placeholder="Enter email" onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
          />

          <input id="phone" type="text" required placeholder="Enter phone number" onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
          />

          <input id="street" type="text" required placeholder="Enter street" onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
          />

          <input id="city" type="text" required placeholder="Enter city" onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
          />

          <input id="district" type="text" required placeholder="Enter district" onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
          />

          <input id="state" type="text" required placeholder="Enter state" onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
          />

          <input id="pincode" type="text" required placeholder="Enter pincode" onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
          />

          <input id="password" type="password" required placeholder="Enter password" onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
          />

          <input id="repassword" type="password" required placeholder="Confirm password" onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
          />

          <button
            type="submit"
            className='col-span-2 mt-4 rounded-xl bg-yellow-400 py-4 text-xl font-bold text-black'
          >
            Sign Up
          </button>

        </form>

      </div>
    </div>
  );
}