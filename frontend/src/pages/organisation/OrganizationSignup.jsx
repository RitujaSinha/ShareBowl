import React from 'react'

export default function OrganizationSignup() {
  return (
    <div className='min-h-screen bg-black px-6 py-10 text-white'>

      <p className='mx-auto mb-10 max-w-3xl text-center text-lg leading-8 text-zinc-300'>
        Register As Organisation
      </p>

      <div className='mx-auto max-w-4xl rounded-3xl border border-zinc-800 bg-zinc-900 p-10'>

        <form className='flex flex-col gap-6'>

          <fieldset className='flex flex-col gap-6'>

            <legend className='mb-6 text-4xl font-bold text-indigo-500'>
              Create Account
            </legend>

            {/* Organisation Name */}
            <div className='flex flex-col gap-2'>
              <label htmlFor="orgname">Organisation Name</label>

              <input
                id='orgname'
                type='text'
                required
                placeholder='Enter organisation name'
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
              />
            </div>

            {/* Organisation ID */}
            <div className='flex flex-col gap-2'>
              <label htmlFor="orgid">Organisation ID</label>

              <input
                id='orgid'
                type='text'
                required
                placeholder='Enter organisation ID'
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
              />
            </div>

            {/* Owner */}
            <div className='flex flex-col gap-2'>
              <label htmlFor="orgowner">Organisation Owner</label>

              <input
                id='orgowner'
                type='text'
                required
                placeholder='Enter owner name'
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
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
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
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
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
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
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
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
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
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
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
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
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
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
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
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
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
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
                className='rounded-xl border border-zinc-700 bg-black p-4 outline-none focus:border-indigo-400'
              />
            </div>

            {/* Button */}
            <button
              type='submit'
              className='mt-6 rounded-xl bg-indigo-400 py-4 text-xl font-bold text-black transition duration-300 hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.8)]'
            >
              Request Sign Up
            </button>

          </fieldset>

        </form>
      </div>
    </div>
  )
}
