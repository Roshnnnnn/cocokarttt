import React from 'react'
import Link from 'next/link'
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope, FaCreditCard, FaTruck, FaShieldAlt, FaHeadset } from 'react-icons/fa'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className='bg-gray-900 text-white pt-8 sm:pt-12 lg:pt-16 pb-6'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Main Footer Content */}
        <div className='grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-6 gap-y-10 mb-10'>
          {/* Company Info */}
          <div className='xs:col-span-2 md:col-span-3 lg:col-span-1'>
            <h3 className='text-2xl font-bold mb-4 lg:mb-6'>
              <span className='bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent'>CocoKart</span>
            </h3>
            <p className='text-gray-400 text-sm lg:text-base mb-4'>Your one-stop destination for all your shopping needs. Quality products, fast delivery, and exceptional customer service.</p>
            <div className='flex space-x-4 mt-6'>
              <SocialIcon icon={<FaFacebook />} href="#" />
              <SocialIcon icon={<FaTwitter />} href="#" />
              <SocialIcon icon={<FaInstagram />} href="#" />
              <SocialIcon icon={<FaLinkedin />} href="#" />
              <SocialIcon icon={<FaYoutube />} href="#" />
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className='text-lg font-semibold mb-4 border-b border-gray-700 pb-2'>Quick Links</h4>
            <ul className='space-y-2'>
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/products">Products</FooterLink>
              <FooterLink href="/terms&conditions">Terms & Conditions</FooterLink>
              <FooterLink href="#">New Arrivals</FooterLink>
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/contact">Contact Us</FooterLink>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h4 className='text-lg font-semibold mb-4 border-b border-gray-700 pb-2'>Customer Service</h4>
            <ul className='space-y-2'>
              <FooterLink href="/profile">My Account</FooterLink>
              <FooterLink href="/orderhistory">Order History</FooterLink>
              <FooterLink href="/wishlist">Wishlist</FooterLink>
              <FooterLink href="/returns&refunds">Returns & Refunds</FooterLink>
              <FooterLink href="/faq">FAQ</FooterLink>
              <FooterLink href="/terms&conditions">Terms & Conditions</FooterLink>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className='text-lg font-semibold mb-4 border-b border-gray-700 pb-2'>Contact Us</h4>
            <ul className='space-y-3'>
              <li className='flex items-start'>
                <FaMapMarkerAlt className='text-orange-500 mt-1 mr-3' />
                <span className='text-gray-400'>123 Shopping Avenue, Retail District, Mumbai, India</span>
              </li>
              <li className='flex items-center'>
                <FaPhone className='text-orange-500 mr-3' />
                <span className='text-gray-400'>+91 9893018968</span>
              </li>
              <li className='flex items-center'>
                <FaEnvelope className='text-orange-500 mr-3' />
                <span className='text-gray-400'>support@cocokart.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Features Section */}
        <div className='border-t border-b border-gray-800 py-6 sm:py-8 my-8'>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center'>
            <div className='flex flex-col items-center'>
              <FaCreditCard className='text-3xl text-orange-500 mb-3' />
              <h5 className='font-medium mb-1'>Secure Payment</h5>
              <p className='text-sm text-gray-400'>Multiple payment options</p>
            </div>
            <div className='flex flex-col items-center'>
              <FaTruck className='text-3xl text-orange-500 mb-3' />
              <h5 className='font-medium mb-1'>Fast Delivery</h5>
              <p className='text-sm text-gray-400'>Nationwide shipping</p>
            </div>
            <div className='flex flex-col items-center'>
              <FaShieldAlt className='text-3xl text-orange-500 mb-3' />
              <h5 className='font-medium mb-1'>Quality Guarantee</h5>
              <p className='text-sm text-gray-400'>100% original products</p>
            </div>
            <div className='flex flex-col items-center'>
              <FaHeadset className='text-3xl text-orange-500 mb-3' />
              <h5 className='font-medium mb-1'>24/7 Support</h5>
              <p className='text-sm text-gray-400'>Dedicated customer service</p>
            </div>
          </div>
        </div>
        
        {/* Newsletter */}
        <div className='mb-8'>
          <div className='bg-gray-800 rounded-lg p-4 sm:p-6 lg:p-8'>
            <div className='lg:flex lg:items-center lg:justify-between'>
              <div className='mb-6 lg:mb-0 lg:mr-8 text-center lg:text-left'>
                <h4 className='text-lg font-semibold mb-2'>Subscribe to our Newsletter</h4>
                <p className='text-gray-400 text-sm'>Get the latest updates on new products and upcoming sales</p>
              </div>
              <div className='flex flex-col sm:flex-row gap-3 sm:gap-0 max-w-xl mx-auto lg:mx-0'>
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className='flex-1 bg-gray-700 text-white px-4 py-3 rounded-lg sm:rounded-r-none w-full focus:outline-none focus:ring-2 focus:ring-orange-500 text-sm'
                />
                <button className='bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-lg sm:rounded-l-none font-medium hover:opacity-90 transition-opacity whitespace-nowrap text-sm'>
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        {/* <div className='text-center text-gray-500 text-sm pt-6 border-t border-gray-800'>
          <p className='mb-3'>&copy; {currentYear} CocoKart. All rights reserved.</p>
          <div className='flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-6'>
            <Link href="#" className='hover:text-gray-300 transition-colors'>Privacy Policy</Link>
            <span className='hidden sm:inline text-gray-700'>•</span>
            <Link href="#" className='hover:text-gray-300 transition-colors'>Terms of Service</Link>
            <span className='hidden sm:inline text-gray-700'>•</span>
            <Link href="#" className='hover:text-gray-300 transition-colors'>Sitemap</Link>
          </div>
        </div> */}
      </div>
    </footer>
  )
}

// Helper Components
const SocialIcon = ({ icon, href }) => (
  <a 
    href={href} 
    className='bg-gray-800 p-1.5 sm:p-2 rounded-full hover:bg-orange-500 transition-colors text-sm sm:text-base'
    target="_blank" 
    rel="noopener noreferrer"
  >
    {icon}
  </a>
)

const FooterLink = ({ href, children }) => (
  <li>
    <Link 
      href={href} 
      className='text-gray-400 hover:text-orange-500 transition-colors'
    >
      {children}
    </Link>
  </li>
)

export default Footer