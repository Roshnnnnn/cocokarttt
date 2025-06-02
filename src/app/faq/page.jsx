"use client"

import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQSection = ({ title, questions, isOpen, onToggle, openSectionQuestion, onQuestionToggle }) => {
  const toggleQuestion = (index) => {
    onQuestionToggle(isOpen ? index : null);
  };

  return (
    <div className="border border-gray-100 rounded-xl overflow-hidden mb-6 bg-white hover:shadow-lg transition-all duration-300">
      <button
        onClick={onToggle}
        className={`w-full px-6 py-5 flex items-center justify-between ${isOpen ? 'bg-orange-50' : 'hover:bg-gray-50'} transition-all duration-300`}
      >
        <h2 className="text-xl font-semibold text-gray-900 font-montserrat group-hover:text-orange-500">{title}</h2>
        {isOpen ? (
          <FaChevronUp className="text-black" />
        ) : (
          <FaChevronDown className="text-black" />
        )}
      </button>
      <div
        className={`transition-all duration-300 overflow-hidden ${
          isOpen ? 'max-h-[1000px]' : 'max-h-0'
        }`}
      >
        <div className="px-6 py-2">
          {questions.map((item, index) => (
            <div key={index} className="border-b border-orange-100 last:border-b-0">
              <button
                onClick={() => toggleQuestion(index)}
                className={`w-full px-6 py-4 flex items-center justify-between text-left ${openSectionQuestion === index ? 'bg-orange-50' : 'hover:bg-gray-50'} transition-all duration-300`}
              >
                <span className="text-gray-800 font-montserrat group-hover:text-orange-500">{item.question}</span>
                {openSectionQuestion === index ? (
                  <FaChevronUp className="text-black flex-shrink-0 ml-4" />
                ) : (
                  <FaChevronDown className="text-black flex-shrink-0 ml-4" />
                )}
              </button>
              <div
                className={`transition-all duration-300 overflow-hidden ${
                  openSectionQuestion === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <p className="px-6 pb-4 text-gray-600 font-montserrat">
                  {item.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const FAQPage = () => {
  const [openSection, setOpenSection] = useState(null);
  const [openSectionQuestion, setOpenSectionQuestion] = useState(null);

  const handleSectionToggle = (index) => {
    setOpenSection(openSection === index ? null : index);
    setOpenSectionQuestion(null); // Reset open question when changing sections
  };

  const handleQuestionToggle = (index) => {
    setOpenSectionQuestion(openSectionQuestion === index ? null : index);
  };

  const faqData = [
    {
      title: "Order Related",
      questions: [
        {
          question: "How do I track my order?",
          answer: "You can track your order by clicking on the 'Track Order' link in the navigation menu or by visiting your order history in your account. Enter your order ID to get real-time updates on your delivery."
        },
        {
          question: "What payment methods do you accept?",
          answer: "We accept various payment methods including Credit/Debit cards, UPI, Net Banking, and Cash on Delivery (COD). All online payments are processed through secure payment gateways."
        },
        {
          question: "Can I modify or cancel my order?",
          answer: "Orders can be cancelled before they are shipped. Once shipped, they cannot be cancelled. To modify your order, please contact our customer support immediately."
        }
      ]
    },
    {
      title: "Shipping & Delivery",
      questions: [
        {
          question: "What are the delivery charges?",
          answer: "Delivery charges vary based on your location and order value. Orders above ₹999 qualify for free shipping. Standard delivery charges for other orders range from ₹49 to ₹99."
        },
        {
          question: "How long will it take to receive my order?",
          answer: "Standard delivery takes 5-7 business days. Express delivery (available in select cities) takes 2-3 business days. Delivery time may vary based on your location."
        },
        {
          question: "Do you ship internationally?",
          answer: "Currently, we only ship within India. We're working on expanding our services to international locations."
        }
      ]
    },
    {
      title: "Returns & Refunds",
      questions: [
        {
          question: "What is your return policy?",
          answer: "We offer a 7-day return policy for most items. Products must be unused, in original packaging, and with all tags attached. Some categories like innerwear and customized items are not eligible for return."
        },
        {
          question: "How do I return a product?",
          answer: "To return a product, log into your account, go to order history, select the item you want to return, and follow the return instructions. We'll arrange for a pickup or provide a return shipping label."
        },
        {
          question: "When will I receive my refund?",
          answer: "Refunds are processed within 5-7 business days after we receive and inspect the returned item. The amount will be credited to your original payment method or as store credit based on your preference."
        }
      ]
    },
    {
      title: "Product & Stock",
      questions: [
        {
          question: "Are all products authentic?",
          answer: "Yes, we guarantee 100% authenticity for all products sold on our platform. We source directly from authorized distributors and brands."
        },
        {
          question: "What if the product is out of stock?",
          answer: "You can click on 'Notify Me' for out-of-stock items to receive an email when the product is back in stock. Alternatively, you can browse similar products in the same category."
        },
        {
          question: "Do you offer size guides?",
          answer: "Yes, each product category has a detailed size guide. You can find the size chart on the product page below the size selection options."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white py-12 pt-24">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold font-montserrat mb-4 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-400 bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
            <p className="text-gray-600 text-lg font-montserrat max-w-2xl mx-auto">
              Find answers to common questions about our services
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <div className="space-y-4 divide-y divide-gray-100">
              {faqData.map((section, index) => (
                <FAQSection
                  key={index}
                  title={section.title}
                  questions={section.questions}
                  isOpen={openSection === index}
                  onToggle={() => handleSectionToggle(index)}
                  openSectionQuestion={openSectionQuestion}
                  onQuestionToggle={handleQuestionToggle}
                />
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <p className="text-gray-600 font-montserrat">
              Can't find what you're looking for?{' '}
              <a href="/contact" className="text-orange-500 hover:text-orange-600 font-semibold">
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;