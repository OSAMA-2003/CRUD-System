import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className='flex justify-center items-center min-h-screen bg-gray-300'>
    
    <Link to='/login' className=' px-10 py-5 bg-blue-700 rounded-lg text-white font-bold text-3xl hover:scale-105 ' >
        Go To Dashboard
    </Link>
    
    </div>
  )
}
