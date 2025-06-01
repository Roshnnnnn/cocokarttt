import React from 'react'
import Image from 'next/image'

const page = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-24">
      {/* Hero Section */}
      <div className="relative w-full">
        {/* Aspect ratio container */}
        <div className="relative w-full pb-[50%] sm:pb-[45%] md:pb-[40%]">
          <Image
            src="/carousel1.webp"
            alt="carousel"
            fill
            className="w-full h-full object-cover"
          />
          {/* Text Overlay */}
          <div className="absolute inset-0 flex items-center justify-center text-white bg-black/30">
            <div className="text-center px-4 sm:px-6 lg:px-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Welcome to CocoKart
              </h1>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto">
                Discover amazing products at unbeatable prices
              </p>
              <button className="mt-6 px-6 py-2 sm:px-8 sm:py-3 bg-orange-500 text-white text-sm sm:text-base rounded-full hover:bg-orange-600 transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default page
