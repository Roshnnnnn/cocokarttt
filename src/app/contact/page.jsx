"use client"

import React, { useState } from 'react'
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock } from 'react-icons/fa'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/xnnvayge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        throw new Error('Form submission failed')
      }
    } catch (error) {
      alert('Failed to send message. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white pt-28 pb-12 px-4 sm:px-6 lg:px-8'>
      <div className='w-auto mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-8 sm:mb-12'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4'>Get in Touch</h1>
          <p className='text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto'>Have questions about our products or services? We're here to help!</p>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
          {/* Contact Form - Shown first on mobile */}
          <div className='lg:col-span-2 order-1 lg:order-2'>
            <div className='bg-white rounded-xl shadow-lg p-6 sm:p-8'>
              <h3 className='text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6'>Send us a Message</h3>
              {submitted ? (
                <div className='text-center py-8'>
                  <div className='text-green-500 text-xl mb-3'>Message sent successfully!</div>
                  <p className='text-gray-600'>Thank you for contacting us. We'll get back to you soon.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className='mt-4 text-orange-500 hover:text-orange-600 font-medium'
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className='space-y-6'>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-6'>
                  <div>
                    <label htmlFor='name' className='block text-xs sm:text-sm font-medium text-gray-700'>Full Name</label>
                    <input
                      type='text'
                      id='name'
                      name='name'
                      value={formData.name}
                      onChange={handleChange}
                      className='text-black mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm transition duration-150 ease-in-out'
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor='email' className='block text-xs sm:text-sm font-medium text-gray-700'>Email Address</label>
                    <input
                      type='email'
                      id='email'
                      name='email'
                      value={formData.email}
                      onChange={handleChange}
                      className='text-black mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm transition duration-150 ease-in-out'
                      required
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor='subject' className='block text-xs sm:text-sm font-medium text-gray-700'>Subject</label>
                  <input
                    type='text'
                    id='subject'
                    name='subject'
                    value={formData.subject}
                    onChange={handleChange}
                    className='text-black mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm transition duration-150 ease-in-out'
                    required
                  />
                </div>
                <div>
                  <label htmlFor='message' className='block text-xs sm:text-sm font-medium text-gray-700'>Message</label>
                  <textarea
                    id='message'
                    name='message'
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className='text-black mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 sm:text-sm transition duration-150 ease-in-out'
                    required
                  />
                </div>
                <div className='flex justify-end'>
                  <button
                    type='submit'
                    disabled={submitting}
                    className='inline-flex justify-center rounded-lg border border-transparent bg-orange-500 py-2 sm:py-3 px-4 sm:px-6 text-sm sm:text-base font-medium text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition duration-150 ease-in-out transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>
              </form>
              )}
            </div>
          </div>

          {/* Contact Information - Shown second on mobile */}
          <div className='lg:col-span-1 order-2 lg:order-1'>
            <div className='bg-white rounded-xl shadow-lg p-6 lg:sticky lg:top-24'>
              <h3 className='text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6'>Contact Information</h3>
              <div className='space-y-6'>
                <div className='flex items-start'>
                  <div className='flex-shrink-0'>
                    <FaPhone className='h-6 w-6 text-orange-500' />
                  </div>
                  <div className='ml-4'>
                    <p className='text-xs sm:text-sm font-medium text-gray-900'>Phone</p>
                    <p className='text-xs sm:text-sm text-gray-600'>+91 9893018968</p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <div className='flex-shrink-0'>
                    <FaEnvelope className='h-6 w-6 text-orange-500' />
                  </div>
                  <div className='ml-4'>
                    <p className='text-xs sm:text-sm font-medium text-gray-900'>Email</p>
                    <p className='text-xs sm:text-sm text-gray-600 break-all'>roshankumar.02yadav@gmail.com</p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <div className='flex-shrink-0'>
                    <FaMapMarkerAlt className='h-6 w-6 text-orange-500' />
                  </div>
                  <div className='ml-4'>
                    <p className='text-xs sm:text-sm font-medium text-gray-900'>Address</p>
                    <p className='text-xs sm:text-sm text-gray-600'>123 Business Street<br />Silicon Valley, CA 94025</p>
                  </div>
                </div>
                <div className='flex items-start'>
                  <div className='flex-shrink-0'>
                    <FaClock className='h-6 w-6 text-orange-500' />
                  </div>
                  <div className='ml-4'>
                    <p className='text-xs sm:text-sm font-medium text-gray-900'>Business Hours</p>
                    <p className='text-xs sm:text-sm text-gray-600'>Mon - Fri: 9:00 AM - 6:00 PM<br />Sat - Sun: Closed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>


        </div>
      </div>
    </div>
  )
}

export default Contact