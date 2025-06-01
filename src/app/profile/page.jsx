'use client';

import React, { useState, useEffect } from 'react';
import { FaUser, FaMapMarkerAlt, FaCreditCard, FaSignOutAlt, FaChevronRight, FaShoppingBag, FaHeart, FaEdit, FaPhone, FaEnvelope, FaCamera, FaChevronLeft, FaQuestionCircle, FaShieldAlt, FaStore, FaHistory, FaGift, FaHome, FaSearch, FaShoppingCart, FaUser as FaUserIcon } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Profile = () => {
  const [activeTab, setActiveTab] = useState('orders');
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Get user data from localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    } else {
      // Redirect to login if not authenticated
      router.push('/login');
    }
  }, [router]);

  const orders = [
    { 
      id: 1, 
      status: 'Delivered', 
      date: '25 May 2024', 
      items: 2, 
      amount: '₹1,499', 
      itemsList: ['T-Shirt (M)', 'Jeans (32)'],
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    },
    { 
      id: 2, 
      status: 'In Transit', 
      date: '20 May 2024', 
      items: 1, 
      amount: '₹799', 
      itemsList: ['Sneakers (10)'],
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=100&q=80'
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    router.push('/login');
  };

  // Helper function to render mobile profile options
  const renderProfileOption = (text, Icon, color, href = '#') => (
    <Link 
      href={href}
      className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className={`w-10 h-10 rounded-full bg-${color}-50 flex items-center justify-center`}>
          <Icon className={`text-${color}-500`} />
        </div>
        <span className="text-gray-800 font-medium">{text}</span>
      </div>
      <FaChevronRight className="text-gray-400" />
    </Link>
  );

  // Helper function to render desktop nav items
  const renderDesktopNavItem = (text, Icon, path, currentPath) => {
    const isActive = path === currentPath;
    return (
      <Link 
        key={path}
        href={path}
        className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg ${
          isActive 
            ? 'bg-blue-50 text-blue-600 font-medium' 
            : 'text-gray-600 hover:bg-gray-50'
        }`}
      >
        <Icon className="text-lg" />
        <span>{text}</span>
      </Link>
    );
  };

  // Get current path for active state
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 sm:pt-28">
      {/* Mobile View (up to md breakpoint) */}
      <div className="block md:hidden">
        {/* Mobile Header */}
        <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 p-4 z-40">
          <div className="flex items-center">
            <button 
              onClick={() => router.back()}
              className="p-2 -ml-2 mr-2"
            >
              <FaChevronLeft className="text-gray-600" />
            </button>
            <h1 className="text-lg font-medium text-gray-800">Profile</h1>
          </div>
        </header>


        {/* Mobile Profile Options */}
        <div className="mt-2 bg-white">
          <div className="divide-y divide-gray-100">
            {renderProfileOption('Personal Information', FaUser, 'blue', '/profile/user')}
            {renderProfileOption('My Orders', FaStore, 'green', '/profile/orders')}
            {renderProfileOption('My Rewards', FaGift, 'yellow', '/profile/rewards')}
            {renderProfileOption('Order History', FaHistory, 'purple', '/profile/history')}
            {renderProfileOption('Help & Support', FaQuestionCircle, 'red', '/help')}
            {renderProfileOption('Privacy Policy', FaShieldAlt, 'orange', '/privacy')}
          </div>
          
          {/* Mobile Logout Button */}
          <div className="px-6 py-4">
            <button 
              onClick={handleLogout}
              className="w-full py-3 px-4 border border-red-500 text-red-500 font-medium rounded-lg flex items-center justify-center gap-2 hover:bg-red-50 transition-colors"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
          
          {/* Mobile App Version */}
          <div className="px-6 py-4 text-center text-gray-400 text-sm">
            App Version 1.0.0
          </div>
        </div>
      </div>

      {/* Desktop View (md breakpoint and up) */}
      <div className="hidden md:flex min-h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 flex-shrink-0">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">My Account</h1>
          </div>
          
          <nav className="p-4 space-y-1">
            {renderDesktopNavItem('My Profile', FaUser, '/profile/user', currentPath)}
            {renderDesktopNavItem('My Orders', FaShoppingBag, '/profile/orders', currentPath)}
            {renderDesktopNavItem('My Wishlist', FaHeart, '/profile/wishlist', currentPath)}
            {renderDesktopNavItem('My Addresses', FaMapMarkerAlt, '/profile/addresses', currentPath)}
            {renderDesktopNavItem('My Payments', FaCreditCard, '/profile/payments', currentPath)}
            {renderDesktopNavItem('Help & Support', FaQuestionCircle, '/help', currentPath)}
          </nav>
          
          <div className="absolute bottom-0 w-64 p-4 border-t border-gray-200">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-left text-red-500 hover:bg-red-50 rounded-lg"
            >
              <FaSignOutAlt />
              <span>Logout</span>
            </button>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 p-8 bg-gray-50">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">My Profile</h2>
              
              <div className="flex items-start gap-8">
                {/* Profile Picture */}
                <div className="relative">
                  <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                    {user.photoURL ? (
                      <img 
                        src={user.photoURL} 
                        alt={user.displayName} 
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <FaUser className="text-5xl text-gray-400" />
                    )}
                  </div>
                  <button className="absolute bottom-0 right-0 bg-white rounded-full p-2 shadow-md border border-gray-200">
                    <FaCamera className="text-gray-600 text-sm" />
                  </button>
                </div>
                
                {/* User Info */}
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">{user.displayName || 'Guest User'}</h3>
                      <p className="text-gray-500 mt-1">{user.email || 'No email provided'}</p>
                      <p className="text-gray-500 text-sm">{user.phoneNumber || 'No phone number'}</p>
                    </div>
                    <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors">
                      <FaEdit className="text-xs" />
                      <span>Edit Profile</span>
                    </button>
                  </div>
                  
                  <div className="mt-6 grid grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <p className="text-gray-500 text-sm">Total Orders</p>
                      <p className="text-xl font-bold text-gray-800">12</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <p className="text-gray-500 text-sm">Wishlist</p>
                      <p className="text-xl font-bold text-gray-800">5</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Recent Orders */}
              <div className="mt-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold text-gray-800">Recent Orders</h3>
                  <button className="text-blue-600 text-sm font-medium">View All</button>
                </div>
                
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-800">Order #{order.id}</p>
                          <p className="text-sm text-gray-500">Placed on {order.date}</p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                          order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {order.status}
                        </span>
                      </div>
                      <div className="mt-3 flex items-center">
                        <div className="w-16 h-16 rounded bg-gray-100 overflow-hidden flex-shrink-0">
                          <img 
                            src={order.image} 
                            alt={order.itemsList[0]} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="ml-4">
                          <p className="font-medium text-gray-800">{order.itemsList[0]}</p>
                          <p className="text-sm text-gray-500">{order.items} item{order.items > 1 ? 's' : ''} • {order.amount}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;