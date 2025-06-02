"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FaCartPlus, FaUser, FaSearch, FaTimes, FaHome, FaBox, FaPhoneAlt, FaInfoCircle, FaChartBar } from 'react-icons/fa'

// Navigation Link Component with active state
const NavLink = ({ href, children }) => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setIsActive(window.location.pathname === href)
  }, [href])

  return (
    <Link 
      href={href}
      className={`text-sm sm:text-base font-medium px-3 py-2 rounded-md transition-colors relative group ${
        isActive 
          ? 'text-orange-500 font-semibold' 
          : 'text-gray-700 hover:text-orange-500'
      }`}
    >
      {children}
      <span 
        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-orange-500 transition-all duration-300 ${
          isActive ? 'w-4/5' : 'w-0 group-hover:w-4/5'
        }`}
      />
    </Link>
  )
}

// Mobile Navigation Link Component
const MobileNavLink = ({ href, children, onClick }) => {
  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    setIsActive(window.location.pathname === href)
  }, [href])

  return (
    <Link 
      href={href}
      onClick={onClick}
      className={`block px-4 py-3 transition-colors rounded-md ${
        isActive 
          ? 'text-orange-500 font-semibold bg-orange-50' 
          : 'text-gray-700 hover:bg-gray-100 hover:text-orange-500'
      }`}
    >
      {children}
    </Link>
  )
}

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
    // Prevent scrolling when menu is open
    document.body.style.overflow = !mobileMenuOpen ? 'hidden' : 'unset'
  }
  
  return (
    <nav className='fixed top-0 left-0 right-0 z-50 bg-white shadow-md'>
      <div className='bg-gray-100 text-black'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6'>
          <div className='flex justify-end py-1'>
            <Link href='/track-order' className='text-[10px] sm:text-xs hover:text-orange-500 transition-colors'>Track Order</Link>
          </div>
        </div>
      </div>

      <div 
        className={`fixed inset-0 bg-black/50 transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleMobileMenu}
      />
      
      <div className='max-w-7xl mx-auto flex justify-between items-center relative px-4 sm:px-6 py-3 sm:py-4'>
        {/* Logo */}
        <div className='flex items-center'>
          {/* <Image src="/logo.png" alt="Logo" width={80} height={80} className="mr-2" /> */}
          <NavLink href="/">
            <span className='text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent cursor-pointer'>CocoKart</span>
          </NavLink>
        </div>
        
        {/* Search Bar */}
        {/* <div className='hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 flex-1 mx-8 max-w-md focus-within:ring-2 focus-within:ring-orange-500 transition-all'>
          <FaSearch className='text-gray-500 mr-2' />
          <input 
            type="text" 
            placeholder="Search products..." 
            className='bg-transparent border-none focus:outline-none w-full text-gray-700'
          />
        </div> */}
        
        {/* Navigation Links - Desktop */}
        <div className='hidden md:flex items-center gap-6'>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/products">Products</NavLink>
          <NavLink href="/contact">Contact</NavLink>
          <NavLink href="/about">About</NavLink>
          {/* <NavLink href="/dashboard">Dashboard</NavLink> */}
        </div>
        
        {/* Icons */}
        <div className='flex items-center gap-2 sm:gap-4'>
          <div className='hidden md:flex items-center gap-2'>
            <Link href="/cart">
              <button className='relative p-2 hover:bg-gray-100 rounded-full transition-colors'>
                <FaCartPlus className='text-base sm:text-lg md:text-xl text-black cursor-pointer' />
                <span className='absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center'>0</span>
              </button>
            </Link>
            <Link href="/profile">
              <button className='p-2 hover:bg-gray-100 rounded-full transition-colors'>
                <FaUser className='text-base sm:text-lg md:text-xl text-black cursor-pointer' />
              </button>
            </Link>
          </div>
          <button 
            className='md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors'
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? (
              <FaTimes className="text-xl" />
            ) : (
              <div className="flex flex-col justify-center items-center">
                <div className='w-5 h-0.5 bg-gray-700 mb-1'></div>
                <div className='w-5 h-0.5 bg-gray-700 mb-1'></div>
                <div className='w-5 h-0.5 bg-gray-700'></div>
              </div>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
     <div 
        className={`md:hidden fixed top-[73px] sm:top-[73px] left-0 right-0 bg-white shadow-md z-50 transition-all duration-300 overflow-hidden ${
          mobileMenuOpen ? 'max-h-[calc(100vh-73px)]' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col divide-y divide-gray-100">
          {/* Navigation Links */}
          <div className="px-4 bg-gray-50">
            <div className="flex flex-col py-2">
              <MobileNavLink href="/" onClick={toggleMobileMenu}>
                <div className="flex items-center gap-3">
                  <FaHome className="text-orange-500" />
                  <span>Home</span>
                </div>
              </MobileNavLink>
              <MobileNavLink href="/products" onClick={toggleMobileMenu}>
                <div className="flex items-center gap-3">
                  <FaBox className="text-orange-500" />
                  <span>Products</span>
                </div>
              </MobileNavLink>
              <MobileNavLink href="/contact" onClick={toggleMobileMenu}>
                <div className="flex items-center gap-3">
                  <FaPhoneAlt className="text-orange-500" />
                  <span>Contact</span>
                </div>
              </MobileNavLink>
              <MobileNavLink href="/about" onClick={toggleMobileMenu}>
                <div className="flex items-center gap-3">
                  <FaInfoCircle className="text-orange-500" />
                  <span>About</span>
                </div>
              </MobileNavLink>
              {/* <MobileNavLink href="/dashboard" onClick={toggleMobileMenu}>
                <div className="flex items-center gap-3">
                  <FaChartBar className="text-orange-500" />
                  <span>Dashboard</span>
                </div>
              </MobileNavLink> */}
              <MobileNavLink href="/cart" onClick={toggleMobileMenu}>
                <div className="flex items-center gap-3">
                  <FaCartPlus className="text-orange-500" />
                  <div>
                    <div>Cart</div>
                    <div className="text-xs text-gray-500">0 items</div>
                  </div>
                </div>
              </MobileNavLink>
              <MobileNavLink href="/profile" onClick={toggleMobileMenu}>
                <div className="flex items-center gap-3">
                  <FaUser className="text-orange-500" />
                  <span>Profile</span>
                </div>
              </MobileNavLink>
            </div>
          </div>         
        </div>
      </div>
    </nav>
  )
}

export default Navbar