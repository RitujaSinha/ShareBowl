import React from 'react'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div className='min-h-screen bg-black flex flex-col items-center justify-center px-6 py-10 text-white'>
      
      {/* Heading */}
      <h2 className='mb-15 text-5xl font-semibold'>
        Registration
      </h2>

      
      <div className='flex flex-col gap-15 md:flex-row'>

        {/* Organization  */}
        <div className='w-[350px] rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-lg transition duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(99,102,241,0.5)]'>
          
          <h3 className='text-3xl font-bold'>
            For <span className='text-indigo-500'>Organizations</span>
          </h3>

          <p className='mt-5 text-zinc-300 leading-7'>
            Join our mission to reduce food waste and help people in need by donating surplus food through ShareBowl.
          </p>

          <button className='mt-8 w-full rounded-xl bg-indigo-600 py-4 text-lg font-semibold transition duration-300 hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.8)]'>
            <Link to="/">
              Register
            </Link>
          </button>
        </div>

        {/* Donors */}
        <div className='w-[350px] rounded-3xl border border-zinc-800 bg-zinc-900 p-8 shadow-lg transition duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(250,204,21,0.5)]'>
          
          <h3 className='text-3xl font-bold'>
            For <span className='text-yellow-400'>Donors</span>
          </h3>

          <p className='mt-5 text-zinc-300 leading-7'>
            Become a part of ShareBowl and help distribute meals, support communities, and spread hope one bowl at a time.
          </p>

          <button className='mt-8 w-full rounded-xl bg-yellow-400 py-4 text-lg font-semibold text-black transition duration-300 hover:bg-yellow-300 hover:shadow-[0_0_20px_rgba(250,204,21,0.8)]'>
            <Link to="/">
              Register
            </Link>
          </button>
        </div>

      </div>
    </div>
  )
}
