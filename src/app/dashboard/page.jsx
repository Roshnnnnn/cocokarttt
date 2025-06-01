'use client'

import React from 'react'
import { FaUsers, FaShoppingCart, FaBox, FaRupeeSign, FaCreditCard, FaTruck } from 'react-icons/fa'
import { useDashboardData } from '@/hooks/useDashboardData'

const Dashboard = () => {
  const { stats, recentOrders, activeUsers, loading, error } = useDashboardData()

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white pt-28 pb-12 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-7xl mx-auto'>
        <div className='text-center mb-8 sm:mb-12'>
          <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-3 sm:mb-4'>
            <span className='bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent'>Admin Dashboard</span>
          </h1>
          <p className='text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto'>Monitor sales, manage products, and track user activity</p>
        </div>

        {/* Stats Overview */}
        <div className='grid grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
          <div className='bg-white p-4 rounded-lg shadow-md border-l-4 border-orange-500'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-500 text-sm'>Total Revenue</p>
                <p className='text-2xl font-bold text-gray-900'>₹{stats.totalRevenue.toLocaleString()}</p>
              </div>
              <FaRupeeSign className='text-orange-500 text-3xl' />
            </div>
          </div>
          <div className='bg-white p-4 rounded-lg shadow-md border-l-4 border-green-500'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-500 text-sm'>Online Payments</p>
                <p className='text-2xl font-bold text-gray-900'>₹{stats.onlinePayments.toLocaleString()}</p>
              </div>
              <FaCreditCard className='text-green-500 text-3xl' />
            </div>
          </div>
          <div className='bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-500 text-sm'>COD Payments</p>
                <p className='text-2xl font-bold text-gray-900'>₹{stats.codPayments.toLocaleString()}</p>
              </div>
              <FaTruck className='text-blue-500 text-3xl' />
            </div>
          </div>
          <div className='bg-white p-4 rounded-lg shadow-md border-l-4 border-purple-500'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-500 text-sm'>Active Users</p>
                <p className='text-2xl font-bold text-gray-900'>{stats.activeUsers}</p>
              </div>
              <FaUsers className='text-purple-500 text-3xl' />
            </div>
          </div>
          <div className='bg-white p-4 rounded-lg shadow-md border-l-4 border-yellow-500'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-500 text-sm'>Total Orders</p>
                <p className='text-2xl font-bold text-gray-900'>{stats.totalOrders}</p>
              </div>
              <FaBox className='text-yellow-500 text-3xl' />
            </div>
          </div>
          <div className='bg-white p-4 rounded-lg shadow-md border-l-4 border-red-500'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-gray-500 text-sm'>Pending Orders</p>
                <p className='text-2xl font-bold text-gray-900'>{stats.pendingOrders}</p>
              </div>
              <FaShoppingCart className='text-red-500 text-3xl' />
            </div>
          </div>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {/* Recent Orders */}
          <div className='bg-white rounded-xl shadow-lg p-6 border-t-4 border-orange-500'>
            <h2 className='text-xl font-semibold mb-4 text-gray-900'>Recent Orders</h2>
            <div className='space-y-4'>
              {recentOrders.map(order => (
                <div key={order.id} className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                  <div>
                    <p className='font-medium text-gray-900'>{order.user}</p>
                    <p className='text-sm text-gray-600'>₹{order.amount} - {order.payment}</p>
                  </div>
                  <span className={`px-3 py-1 text-sm rounded-full ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-800' :
                    order.status === 'Processing' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-blue-100 text-blue-800'
                  }`}>
                    {order.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Active Users */}
          <div className='bg-white rounded-xl shadow-lg p-6 border-t-4 border-purple-500'>
            <h2 className='text-xl font-semibold mb-4 text-gray-900'>Active Users</h2>
            <div className='space-y-4'>
              {activeUsers.map(user => (
                <div key={user.id} className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                  <div>
                    <p className='font-medium text-gray-900'>{user.name}</p>
                    <p className='text-sm text-gray-600'>{user.email}</p>
                  </div>
                  <div className='text-right'>
                    <p className='text-sm text-gray-500'>{user.lastActive}</p>
                    <p className='text-sm text-orange-500'>{user.cartItems} items in cart</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard