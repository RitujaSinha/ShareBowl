import React from 'react'

export default function Login() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-black px-6 py-10'>

      <div className='w-full max-w-md rounded-3xl border border-indigo-900 bg-zinc-900 p-10 shadow-[0_0_30px_rgba(99,102,241,0.25)]'>

        {/* Heading */}
        <h1 className='mb-2 text-center text-5xl font-bold text-indigo-500'>
          Login
        </h1>

        <p className='mb-10 text-center text-zinc-400'>
          Welcome back to ShareBowl
        </p>

        {/* Role Selection */}
        <div className='mb-8'>

          <p className='mb-4 text-lg font-semibold text-white'>
            Select Role
          </p>

          <div className='flex flex-wrap items-center justify-center gap-4'>

            {/* Donor */}
            <label className='flex cursor-pointer items-center gap-2 rounded-xl border border-indigo-700 px-4 py-2 text-white transition duration-300 hover:bg-indigo-600'>

              <input
                type="radio"
                name="role"
                className='h-5 w-5 accent-indigo-500'
              />

              <span className='text-lg'>Donor</span>
            </label>

            {/* Organisation */}
            <label className='flex cursor-pointer items-center gap-2 rounded-xl border border-indigo-700 px-4 py-2 text-white transition duration-300 hover:bg-indigo-600'>

              <input
                type="radio"
                name="role"
                className='h-5 w-5 accent-indigo-500'
              />

              <span className='text-lg'>Organisation</span>
            </label>

            {/* Admin */}
            <label className='flex cursor-pointer items-center gap-2 rounded-xl border border-indigo-700 px-4 py-2 text-white transition duration-300 hover:bg-indigo-600'>

              <input
                type="radio"
                name="role"
                className='h-5 w-5 accent-indigo-500'
              />

              <span className='text-lg'>Admin</span>
            </label>

          </div>
        </div>

        {/* Inputs */}
        <div className='flex flex-col gap-6'>

          <input
            type="email"
            name="email"
            id="email"
            placeholder='Enter your email'
            className='rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none transition duration-300 focus:border-indigo-500 focus:shadow-[0_0_10px_rgba(99,102,241,0.8)]'
          />

          <input
            type="password"
            name='password'
            placeholder='Enter your password'
            className='rounded-xl border border-zinc-700 bg-black p-4 text-white outline-none transition duration-300 focus:border-indigo-500 focus:shadow-[0_0_10px_rgba(99,102,241,0.8)]'
          />

        </div>

        {/* Button */}
        <button
          className='mt-8 w-full rounded-xl bg-indigo-600 py-4 text-xl font-semibold text-white transition duration-300 hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.9)]'
        >
          Login
        </button>

      </div>
    </div>
  )
}