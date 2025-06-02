"use client"

import React, { useState } from 'react'
import { FiChevronDown, FiChevronUp, FiMail, FiPhone, FiMessageSquare, FiClock } from 'react-icons/fi'

const HelpAndSupport = () => {
  const [activeFaq, setActiveFaq] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [submitted, setSubmitted] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const validateForm = () => {
    const errors = []
    const { name, email, subject, message } = formData

    if (!name || name.length < 2) {
      errors.push('Please enter your full name (minimum 2 characters)')
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push('Please enter a valid email address')
    }

    if (!subject || subject.length < 3) {
      errors.push('Please enter a subject (minimum 3 characters)')
    }

    if (!message || message.length < 10) {
      errors.push('Please enter a detailed message (minimum 10 characters)')
    }

    return errors
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationErrors = validateForm()

    if (validationErrors.length > 0) {
      alert(validationErrors.join('\n'))
      return
    }

    setSubmitting(true)

    try {
      const response = await fetch('https://formspree.io/f/xnnvayge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
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

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index)
  }

  const faqs = [
    {
      question: "How do I track my order?",
      answer: "You can track your order by logging into your account and visiting the 'My Orders' section. You'll find real-time updates on your order status and tracking information."
    },
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for most items. Items must be unused, in their original packaging, and with all tags attached. Please contact our support team to initiate a return."
    },
    {
      question: "How can I change my shipping address?",
      answer: "You can update your shipping address by going to 'My Account' > 'Addresses' before placing your order. For orders already placed, please contact our support team immediately."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit/debit cards, UPI, Net Banking, and popular digital wallets. We also offer Cash on Delivery (COD) for select locations."
    },
    {
      question: "How do I contact customer support?",
      answer: "You can reach our customer support team 24/7 through our live chat, email at support@cocokart.com, or by calling our toll-free number 1800-123-4567."
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 pt-32">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">Help & Support</h1>
          <p className="text-black max-w-3xl mx-auto text-lg">
            Find answers to common questions or get in touch with our support team
          </p>
        </div>

        {/* Quick Help Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <FiMessageSquare className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Live Chat</h3>
            <p className="text-gray-900 mb-4">Chat with our support team in real-time</p>
            <button className="text-orange-500 font-medium hover:text-orange-600 transition-colors">
              Start Chat
            </button>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <FiMail className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Email Us</h3>
            <p className="text-gray-900 mb-4">We'll respond within 24 hours</p>
            <a href="mailto:support@cocokart.com" className="text-orange-500 font-medium hover:text-orange-600 transition-colors">
              support@cocokart.com
            </a>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
              <FiPhone className="w-6 h-6 text-orange-500" />
            </div>
            <h3 className="text-lg font-semibold mb-2 text-gray-900">Call Us</h3>
            <p className="text-gray-900 mb-4">Available 24/7 for your convenience</p>
            <a href="tel:+91 9893018968" className="text-orange-500 font-medium hover:text-orange-600 transition-colors">
              +91 9893018968
            </a>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden">
                <button
                  className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                  onClick={() => toggleFaq(index)}
                >
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {activeFaq === index ? (
                    <FiChevronUp className="w-5 h-5 text-gray-900" />
                  ) : (
                    <FiChevronDown className="w-5 h-5 text-gray-900" />
                  )}
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-4 pt-0 text-black">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Business Hours */}
        <div className="mt-16 max-w-4xl mx-auto bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Business Hours</h2>
          <div className="flex items-start">
            <div className="mr-4 mt-1">
              <FiClock className="w-6 h-6 text-orange-500" />
            </div>
            <div>
              <p className="text-black mb-2">Our customer support team is available:</p>
              <ul className="space-y-2">
                <li className="flex justify-between max-w-xs">
                  <span className="text-black">Monday - Friday</span>
                  <span className="font-medium text-black">9:00 AM - 10:00 PM</span>
                </li>
                <li className="flex justify-between max-w-xs">
                  <span className="text-black">Saturday - Sunday</span>
                  <span className="font-medium text-black">10:00 AM - 8:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="mt-16 max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Still need help?</h2>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-black mb-2">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-orange-500 text-black transition duration-150 ease-in-out"
                    placeholder="Your name"
                    required
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-black mb-2">Email Address *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-orange-500 text-black transition duration-150 ease-in-out"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-black mb-2">Subject *</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-orange-500 text-black transition duration-150 ease-in-out"
                  placeholder="What can we help you with?"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-black mb-2">Message *</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border-0 focus:ring-2 focus:ring-orange-500 text-black transition duration-150 ease-in-out"
                  placeholder="Please provide details about your issue"
                  required
                ></textarea>
              </div>
              <p className="text-xs text-red-500 mt-2">
                * Required fields
              </p>
              <div className="flex justify-end">
                {submitted ? (
                  <div className="text-green-500 text-center">
                    Message sent successfully!
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-orange-500 hover:text-orange-600 font-medium mt-2"
                    >
                      Send another message
                    </button>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-6 py-3 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HelpAndSupport