'use client'

import React from 'react'

const Error = ({ error, reset }) => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='bg-red-100 text-red-700 p-4 rounded-lg max-w-md w-full mx-4'>
        <h2 className='text-lg font-semibold mb-2'>Something went wrong!</h2>
        <p className='mb-4'>{error?.message || 'Failed to load dashboard data'}</p>
        <button
          onClick={reset}
          className='bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors'
        >
          Try again
        </button>
      </div>
    </div>
  )
}

export default Error