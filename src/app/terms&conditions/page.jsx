"use client"

import React, { useState, useEffect } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const Section = ({ title, children, isOpen, onToggle }) => {
  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg group bg-white animate-fade-in">
      <button
        onClick={onToggle}
        className={`w-full px-6 py-4 flex items-center justify-between bg-white ${isOpen ? 'bg-orange-50' : 'hover:bg-gray-50'} transition-all duration-300`}
      >
        <h2 className="text-lg md:text-xl font-semibold text-black font-montserrat">{title}</h2>
        {isOpen ? (
          <FaChevronUp className="text-black" />
        ) : (
          <FaChevronDown className="text-black" />
        )}
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden ${isOpen ? 'max-h-96' : 'max-h-0'}`}
      >
        <div className="px-6 py-4 bg-white ">
          {children}
        </div>
      </div>
    </div>
  );
};

const TermsAndConditions = () => {
  const [openSection, setOpenSection] = useState(0);

  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: (
        <p className="text-black font-montserrat">
          By accessing and using CocoKart, you agree to be bound by these Terms and Conditions. 
          If you do not agree to these terms, please do not use our services.
        </p>
      ),
    },
    {
      title: '2. 7-Day Replacement Policy',
      content: (
        <ul className="text-black space-y-3 list-none font-montserrat">
          <li className="flex items-start group">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>We offer a 7-day replacement guarantee on eligible products</span>
          </li>
          <li className="flex items-start">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>The product must be unused and in its original packaging</span>
          </li>
          <li className="flex items-start">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>Replacement is subject to stock availability</span>
          </li>
          <li className="flex items-start">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>Shipping charges for replacement may apply</span>
          </li>
        </ul>
      ),
    },
    {
      title: '3. Order Cancellation',
      content: (
        <ul className="text-black space-y-3 list-none font-montserrat">
          <li className="flex items-start group">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>Orders can be cancelled before shipping</span>
          </li>
          <li className="flex items-start">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>Once shipped, orders cannot be cancelled</span>
          </li>
          <li className="flex items-start">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>Refunds for cancelled orders will be processed within 5-7 business days</span>
          </li>
        </ul>
      ),
    },
    {
      title: '4. Shipping Policy',
      content: (
        <ul className="text-black space-y-3 list-none font-montserrat">
          <li className="flex items-start group">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>Standard delivery within 5-7 business days</span>
          </li>
          <li className="flex items-start">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>Express delivery available at additional cost</span>
          </li>
          <li className="flex items-start">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>Free shipping on orders above specified amount</span>
          </li>
          <li className="flex items-start">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>Delivery times may vary based on location</span>
          </li>
        </ul>
      ),
    },
    {
      title: '5. Privacy & Security',
      content: (
        <ul className="text-black space-y-3 list-none font-montserrat">
          <li className="flex items-start group">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>We protect your personal information</span>
          </li>
          <li className="flex items-start">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>Secure payment processing</span>
          </li>
          <li className="flex items-start">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>No sharing of customer data with third parties</span>
          </li>
          <li className="flex items-start">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>Cookies used to enhance shopping experience</span>
          </li>
        </ul>
      ),
    },
    {
      title: '6. Product Information',
      content: (
        <ul className="text-black space-y-3 list-none font-montserrat">
          <li className="flex items-start group">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>We strive to provide accurate product information</span>
          </li>
          <li className="flex items-start">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>Colors may slightly vary due to display settings</span>
          </li>
          <li className="flex items-start">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>We reserve the right to limit quantities</span>
          </li>
          <li className="flex items-start">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>Prices subject to change without notice</span>
          </li>
        </ul>
      ),
    },
    {
      title: '7. Customer Service',
      content: (
        <ul className="text-black space-y-3 list-none font-montserrat">
          <li className="flex items-start group">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>Available Monday to Saturday</span>
          </li>
          <li className="flex items-start">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>Email support 24/7</span>
          </li>
          <li className="flex items-start">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>Response within 24-48 hours</span>
          </li>
          <li className="flex items-start">
            <span className="text-black mr-2 group-hover:text-orange-500 transition-colors">•</span>
            <span>Dedicated support for order-related queries</span>
          </li>
        </ul>
      ),
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8 max-w-5xl pt-24">
      <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 border border-gray-100">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-4 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent">
            Terms & Conditions
          </h1>
          <p className="text-gray-600 text-lg font-montserrat max-w-2xl mx-auto">
            Please read these terms carefully before using our services
          </p>
        </div>

        <div className="space-y-4 divide-y divide-gray-100">
          {sections.map((section, index) => (
            <Section 
              key={index} 
              title={section.title}
              isOpen={openSection === index}
              onToggle={() => setOpenSection(openSection === index ? -1 : index)}
            >
              {section.content}
            </Section>
          ))}
        </div>

        <p className="text-sm text-gray-500 text-center mt-12 font-montserrat">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default TermsAndConditions;