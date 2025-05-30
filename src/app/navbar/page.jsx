import React from 'react'
import Image from 'next/image'
import { FaCartPlus, FaUser, FaSearch } from 'react-icons/fa'

const Navbar = () => {
  return (
    <nav className='sticky top-0 z-50 bg-white shadow-md px-6 py-4'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        {/* Logo */}
        <div className='flex items-center'>
          {/* <Image src="/logo.png" alt="Logo" width={80} height={80} className="mr-2" /> */}
          <span className='text-xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent cursor-pointer'>CocoKart</span>
        </div>
        
        {/* Search Bar */}
        <div className='hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 flex-1 mx-8 max-w-md focus-within:ring-2 focus-within:ring-orange-500 transition-all'>
          <FaSearch className='text-gray-500 mr-2' />
          <input 
            type="text" 
            placeholder="Search products..." 
            className='bg-transparent border-none focus:outline-none w-full text-gray-700'
          />
        </div>
        
        {/* Navigation Links */}
        <div className='hidden md:flex items-center gap-6'>
          <NavLink href="#">Home</NavLink>
          <NavLink href="#">Products</NavLink>
          <NavLink href="#">Contact</NavLink>
          <NavLink href="#">About</NavLink>
          <NavLink href="#">Dashboard</NavLink>
        </div>
        
        {/* Icons */}
        <div className='flex items-center gap-4'>
          <button className='relative p-2 hover:bg-gray-100 rounded-full transition-colors'>
            <FaCartPlus className='text-xl text-black cursor-pointer' />
            <span className='absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>0</span>
          </button>
          <button className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
            <FaUser className='text-xl text-black cursor-pointer' />
          </button>
          <button className='md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors'>
            <div className='w-5 h-0.5 bg-gray-700 mb-1'></div>
            <div className='w-5 h-0.5 bg-gray-700 mb-1'></div>
            <div className='w-5 h-0.5 bg-gray-700'></div>
          </button>
        </div>
      </div>
    </nav>
  )
}

// Navigation Link Component
const NavLink = ({ href, children }) => {
  return (
    <a 
      href={href} 
      className='text-gray-700 font-medium hover:text-orange-500 transition-colors relative group'
    >
      {children}
      <span className='absolute bottom-0 left-0 w-0 h-0.5 bg-orange-500 group-hover:w-full transition-all duration-300'></span>
    </a>
  )
}

export default Navbar