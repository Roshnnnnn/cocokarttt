'use client';

import React, { useState, useEffect } from 'react';
import { FaSearch, FaBoxOpen, FaCheckCircle, FaTruck, FaTimesCircle, FaInfoCircle } from 'react-icons/fa';

const TrackOrder = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [orderStatus, setOrderStatus] = useState(null);
  const [showHelp, setShowHelp] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!orderNumber.trim() || isLoading) return;
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock response
    const mockStatus = Math.random() > 0.5 ? 'Shipped' : 'Processing';
    
    if (isMounted) {
      setOrderStatus({
        orderNumber: orderNumber,
        status: mockStatus,
        estimatedDelivery: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(),
        items: Math.floor(Math.random() * 5) + 1,
        lastUpdated: new Date().toISOString(),
        trackingNumber: 'TRK' + Math.random().toString(36).substr(2, 10).toUpperCase(),
        progress: mockStatus === 'Shipped' ? 66 : 33
      });
      
      setIsLoading(false);
      
      // Scroll to results
      setTimeout(() => {
        const results = document.getElementById('order-results');
        if (results) {
          results.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  };

  const getStatusConfig = (status) => {
    switch (status) {
      case 'Delivered':
        return {
          icon: <FaCheckCircle className="w-6 h-6 text-green-500" />,
          color: 'from-green-50 to-green-50',
          text: 'text-green-600',
          border: 'border-green-100',
          progress: 100
        };
      case 'Shipped':
        return {
          icon: <FaTruck className="w-5 h-5 text-blue-500" />,
          color: 'from-blue-50 to-blue-50',
          text: 'text-blue-600',
          border: 'border-blue-100',
          progress: 66
        };
      case 'Processing':
      default:
        return {
          icon: <FaBoxOpen className="w-5 h-5 text-orange-500" />,
          color: 'from-orange-50 to-orange-50',
          text: 'text-orange-600',
          border: 'border-orange-100',
          progress: 33
        };
    }
  };

  const statusConfig = orderStatus ? getStatusConfig(orderStatus.status) : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="pt-28 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-14 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500 mb-5 sm:mb-6">
            Track Your Order
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600">
            Enter your order number to get real-time updates on your delivery status
          </p>
        </div>

        {/* Search Form */}
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-300">
            <div className="p-6 sm:p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-3">
                  <div className={`flex items-center border-2 ${
                    isFocused 
                      ? 'border-orange-400 ring-2 ring-orange-100' 
                      : 'border-gray-200 hover:border-orange-300'
                  } rounded-xl overflow-hidden transition-all duration-300 bg-white`}>
                    <div className="pl-5 text-gray-400">
                      <FaSearch className="w-5 h-5" />
                    </div>
                    <input 
                      type="text" 
                      id="orderNumber" 
                      name="orderNumber"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      onFocus={() => setIsFocused(true)}
                      onBlur={() => setIsFocused(false)}
                      className="flex-1 py-4 px-4 text-gray-800 placeholder-gray-400 text-base sm:text-lg w-full bg-transparent outline-none"
                      placeholder="Enter order number (e.g., ORD-123456)"
                      required
                      autoComplete="off"
                      aria-label="Order number"
                    />
                    {orderNumber && (
                      <button 
                        type="button" 
                        onClick={() => setOrderNumber('')}
                        whileTap={{ scale: 0.9 }}
                        className="p-2 text-gray-400 hover:text-gray-600 transition-colors mr-2"
                        aria-label="Clear input"
                      >
                        <FaTimesCircle className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  
                  <div className="flex items-center justify-between px-1">
                    <button 
                      type="button"
                      onClick={() => setShowHelp(!showHelp)}
                      className="text-sm text-gray-500 flex items-center hover:text-orange-600 transition-colors"
                    >
                      <FaInfoCircle className="mr-1.5 text-orange-400" />
                      Can't find your order number?
                    </button>
                    <button 
                      type="button"
                      onClick={() => setOrderNumber('ORDER' + Math.floor(100000 + Math.random() * 900000))}
                      className="text-xs text-orange-600 hover:text-orange-700 font-medium transition-colors"
                    >
                      Use demo order
                    </button>
                  </div>
                  
                  <div>
                    {showHelp && (
                      <div className="overflow-hidden transition-all duration-300">
                        <div className="mt-2 p-3 bg-blue-50 rounded-lg text-sm text-blue-700 border border-blue-100">
                          <p className="flex items-start gap-2">
                            <FaInfoCircle className="flex-shrink-0 mt-0.5 text-blue-500" />
                            <span>Your order number was sent to your email when you placed the order. Check your inbox or spam folder for an email from us.</span>
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <button 
                  type="submit" 
                  disabled={isLoading || !orderNumber.trim()}
                  className={`w-full flex items-center justify-center gap-3 rounded-xl py-4 px-6 text-base sm:text-lg font-semibold text-white shadow-lg transition-all duration-300 ${
                    isLoading || !orderNumber.trim() 
                      ? 'bg-gradient-to-r from-orange-300 to-pink-300 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 shadow-orange-200 hover:shadow-md hover:shadow-orange-200 active:scale-[0.98]'
                  }`}
                >
                  {isLoading ? (
                    <>
                      <div className="h-5 w-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>Tracking...</span>
                    </>
                  ) : (
                    <>
                      <FaSearch className="w-5 h-5" />
                      <span>Track Order</span>
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Order Results */}
            <div>
              {orderStatus && (
                <div
                  id="order-results"
                  className={`border-t border-gray-200 p-6 sm:p-8 bg-gradient-to-br ${statusConfig.color} rounded-b-2xl animate-fadeIn`}
                >
                  <div className="flex flex-col sm:flex-row gap-6">
                    <div className="flex-shrink-0">
                      <div className={`h-16 w-16 rounded-xl ${statusConfig.text} bg-white border ${statusConfig.border} flex items-center justify-center shadow-sm`}>
                        {statusConfig.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                        <h3 className="text-xl font-bold text-gray-900">Order #{orderStatus.orderNumber}</h3>
                        <span className={`px-3 py-1.5 rounded-full text-sm font-semibold ${statusConfig.text} bg-white border ${statusConfig.border}`}>
                          {orderStatus.status}
                        </span>
                      </div>
                      
                      <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="bg-white/80 p-3 rounded-lg border border-gray-100">
                            <p className="text-xs font-medium text-gray-500 mb-1">Estimated Delivery</p>
                            <p className="font-medium text-gray-800">
                              {new Date(orderStatus.estimatedDelivery).toLocaleDateString('en-US', { 
                                weekday: 'short',
                                month: 'short', 
                                day: 'numeric',
                                year: 'numeric'
                              })}
                            </p>
                          </div>
                          <div className="bg-white/80 p-3 rounded-lg border border-gray-100">
                            <p className="text-xs font-medium text-gray-500 mb-1">Items</p>
                            <p className="font-medium text-gray-800">
                              {orderStatus.items} item{orderStatus.items > 1 ? 's' : ''}
                            </p>
                          </div>
                        </div>
                        
                        <div className="bg-white/80 p-3 rounded-lg border border-gray-100">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-xs font-medium text-gray-500">Order Progress</p>
                            <p className="text-xs font-medium text-gray-700">{statusConfig.progress}%</p>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-gradient-to-r from-orange-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                              style={{ width: `${statusConfig.progress}%` }}
                            />
                          </div>
                          
                          <div className="flex justify-between mt-3 text-xs text-gray-500">
                            <span className={statusConfig.progress >= 33 ? 'text-orange-600 font-medium' : ''}>
                              Processing
                            </span>
                            <span className={statusConfig.progress >= 66 ? 'text-orange-600 font-medium' : ''}>
                              Shipped
                            </span>
                            <span className={statusConfig.progress >= 100 ? 'text-orange-600 font-medium' : ''}>
                              Delivered
                            </span>
                          </div>
                        </div>
                        
                        <div className="bg-white/80 p-3 rounded-lg border border-gray-100 text-sm">
                          <p className="text-xs font-medium text-gray-500 mb-1">Tracking Number</p>
                          <div className="flex items-center justify-between">
                            <p className="font-mono text-gray-800">{orderStatus.trackingNumber}</p>
                            <button 
                              onClick={() => {
                                navigator.clipboard.writeText(orderStatus.trackingNumber);
                                // Optional: Show a toast notification
                              }}
                              className="text-orange-600 hover:text-orange-700 text-sm font-medium transition-colors"
                            >
                              Copy
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-12 text-center max-w-7xl mx-auto pt-12">
          <p className="text-sm text-gray-500">
            Need help?{' '}
            <a href="/contact" className="text-orange-600 hover:text-orange-700 font-medium transition-colors">
              Contact our support team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;
