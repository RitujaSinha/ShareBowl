import React from 'react'

export default function DonorSignup() {
  return (
    <div className='min-h-screen bg-black px-6 py-10 text-white'>

      <p className='mx-auto mb-10 max-w-3xl text-center text-lg leading-0 text-zinc-300'>
        Register to be Donor
      </p>

      <div className='mx-auto max-w-4xl rounded-3xl border border-zinc-800 bg-zinc-900 p-10'>

        <form className='flex flex-col gap-6'>

          <fieldset className='flex flex-col gap-6'>

            <legend className='mb-6 text-4xl font-bold text-yellow-400'>
              Create Account
            </legend>

            {/* Donor  Name */}
            <div className='flex flex-col gap-2'>
              <label htmlFor="donorname">Donor Name</label>

              <input
                id='donorname'
                type='text'
                required
                placeholder='Enter your name'
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
              />
            </div>

            {/* Email */}
            <div className='flex flex-col gap-2'>
              <label htmlFor="email">Email</label>

              <input
                id='email'
                type='email'
                required
                placeholder='Enter email'
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
              />
            </div>

            {/* Phone */}
            <div className='flex flex-col gap-2'>
              <label htmlFor="phone">Phone Number</label>

              <input
                id='phone'
                type='tel'
                required
                placeholder='Enter phone number'
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
              />
            </div>

            {/* Street */}
            <div className='flex flex-col gap-2'>
              <label htmlFor="street">Street</label>

              <input
                id='street'
                type='text'
                required
                placeholder='Enter street'
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
              />
            </div>

            {/* City */}
            <div className='flex flex-col gap-2'>
              <label htmlFor="city">City</label>

              <input
                id='city'
                type='text'
                required
                placeholder='Enter city'
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
              />
            </div>

            {/* District */}
            <div className='flex flex-col gap-2'>
              <label htmlFor="district">District</label>

              <input
                id='district'
                type='text'
                required
                placeholder='Enter district'
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
              />
            </div>

            {/* State */}
            <div className='flex flex-col gap-2'>
              <label htmlFor="state">State</label>

              <input
                id='state'
                type='text'
                required
                placeholder='Enter state'
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
              />
            </div>

            {/* Pincode */}
            <div className='flex flex-col gap-2'>
              <label htmlFor="pincode">Pincode</label>

              <input
                id='pincode'
                type='number'
                required
                placeholder='Enter pincode'
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
              />
            </div>

            {/* Password */}
            <div className='flex flex-col gap-2'>
              <label htmlFor="password">Password</label>

              <input
                id='password'
                type='password'
                required
                placeholder='Enter password'
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
              />
            </div>

            {/* Confirm Password */}
            <div className='flex flex-col gap-2'>
              <label htmlFor="repassword">Re-enter Password</label>

              <input
                id='repassword'
                type='password'
                required
                placeholder='Re-enter password'
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-yellow-400'
              />
            </div>

            {/* Button */}
            <button
              type='submit'
              className='mt-6 rounded-xl bg-yellow-400 py-4 text-xl font-bold text-black transition duration-300 hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.8)]'
            >
              Sign Up
            </button>

          </fieldset>

        </form>
      </div>
    </div>
  )
}