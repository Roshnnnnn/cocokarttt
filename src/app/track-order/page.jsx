import React from 'react'

const TrackOrder = () => {
  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white pt-28 pb-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-8 sm:mb-12'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4'>Track Your Order</h1>
          <p className='text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto'>Enter your order details to track your order status.</p>
        </div>
        <div className='max-w-md mx-auto'>
          <div className='bg-white rounded-xl shadow-lg p-6 sm:p-8'>
            <form className='space-y-6'>
              <div>
                <label htmlFor='orderNumber' className='block text-xs sm:text-sm font-medium text-gray-700 mb-1'>Order Number</label>
                <input 
                  type='text' 
                  id='orderNumber' 
                  name='orderNumber' 
                  className='text-black block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm transition duration-150 ease-in-out' 
                  placeholder='Enter your order number'
                  required
                />
              </div>
              <div className='flex justify-end'>
                <button 
                  type='submit' 
                  className='w-full inline-flex justify-center rounded-lg border border-transparent bg-orange-500 py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105'
                >
                  Track Order
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrackOrder