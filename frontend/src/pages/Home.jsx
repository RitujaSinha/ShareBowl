import React from 'react'
import { Link } from 'react-router-dom'
import hungryChild from "../assets/Hungry-child.jpg";


export default function Home() {
  return (
    <div className='bg-black min-h-screen w-screen text-black bg-cover' style={{backgroundImage: `url(${hungryChild})`}}>
      <div className='p-2 text-2xl'>
        <Link
            className='w-[120px] h-[35px] text-center rounded-sm px-10 font-serif   text-3xl font-bold text-yellow-400 text-shadow-gray-950'
          to="/">SHAREBOWL🥣
        </Link>
      </div>

      <div className='flex flex-col items-center justify-center h-[80vh] text-center gap-6 px-4'>
        
        <div className='text-5xl font-bold'>
          One Bowl. One Smile. One Change.
        </div>

        <p className='max-w-2xl font-semibold text-indigo-900'>
          ShareBowl connects surplus food with people in need, turning every extra meal into hope, care, and a chance to fight hunger together.
        </p>

        <div className='flex gap-6'>
  
            <Link
            className='w-[120px] h-[35px] text-center rounded-sm border border-yellow-400 px-10 bg-black  text-2xl font-semibold text-yellow-400 transition duration-200 hover:bg-yellow-500 hover:text-black hover:shadow-[0_0_7px_rgba(250,204,21,0.9)]'
            to="/login"
            >
            Login
            </Link>

            <Link
            className='w-[140px] h-[35px] text-center rounded-sm border border-yellow-400 px-10  bg-black text-2xl font-semibold text-yellow-400 transition duration-200 hover:bg-yellow-500 hover:text-black hover:shadow-[0_0_7px_rgba(250,204,21,0.9)]'
            to="/signup"
            >
            Register
            </Link>

        </div>

        <p>
          Every year, 1.3 billion tons of food is wasted while millions go hungry.
        </p>

      </div>
    </div>
  )
}