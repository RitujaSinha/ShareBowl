import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

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
        "http://localhost:8000/api/auth/signup/organisation",
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

    <div className='min-h-screen bg-black px-6 py-10 text-white'>

      {/* heading */}
      <p className='mx-auto mb-10 max-w-3xl text-center text-lg leading-8 text-zinc-300'>
        Register As Organisation
      </p>

      {/* form container */}
      <div className='mx-auto max-w-5xl rounded-3xl border border-zinc-800 bg-zinc-900 p-10'>

        <form
          onSubmit={handleSubmit}
          className='grid gap-6 md:grid-cols-2'
        >

          {/* title */}
          <legend className='col-span-2 mb-4 text-4xl font-bold text-indigo-500'>
            Create Account
          </legend>

          {/* Organisation Name */}
          <input
            id='organisationName'
            type='text'
            required
            placeholder='Enter organisation name'
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
          />

          {/* Organisation ID */}
          <input
            id='organisationID'
            type='text'
            required
            placeholder='Enter organisation ID'
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
          />

          {/* Owner */}
          <input
            id='organisationOwner'
            type='text'
            required
            placeholder='Enter owner name'
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
          />

          {/* Email */}
          <input
            id='email'
            type='email'
            required
            placeholder='Enter email'
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
          />

          {/* Phone */}
          <input
            id='phone'
            type='text'
            required
            placeholder='Enter phone number'
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
          />

          {/* Street */}
          <input
            id='street'
            type='text'
            required
            placeholder='Enter street'
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
          />

          {/* City */}
          <input
            id='city'
            type='text'
            required
            placeholder='Enter city'
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
          />

          {/* District */}
          <input
            id='district'
            type='text'
            required
            placeholder='Enter district'
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
          />

          {/* State */}
          <input
            id='state'
            type='text'
            required
            placeholder='Enter state'
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
          />

          {/* Pincode */}
          <input
            id='pincode'
            type='text'
            required
            placeholder='Enter pincode'
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
          />

          {/* Password */}
          <input
            id='password'
            type='password'
            required
            placeholder='Enter password'
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
          />

          {/* Confirm Password */}
          <input
            id='repassword'
            type='password'
            required
            placeholder='Re-enter password'
            onChange={handleChange}
            className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
          />

          {/* Button */}
          <button
            type='submit'
            className='col-span-2 mt-6 rounded-xl bg-indigo-500 py-4 text-xl font-bold text-white transition duration-300 hover:bg-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.8)]'
          >
            Request Sign Up
          </button>

        </form>
      </div>
    </div>
  );
}