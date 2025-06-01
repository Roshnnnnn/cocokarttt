'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { FaBox, FaBoxOpen, FaTruck, FaCheckCircle, FaClock, FaTimesCircle } from 'react-icons/fa';

const OrderHistory = () => {
  const { currentUser } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!currentUser) {
        setLoading(false);
        return;
      }
      
      try {
        setLoading(true);
        const ordersRef = collection(db, 'orders');
        const q = query(
          ordersRef, 
          where('userId', '==', currentUser.uid)
        );

        const querySnapshot = await getDocs(q);
        const ordersData = querySnapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            orderNumber: doc.id, // Using document ID as order number
            status: data.status || 'Processing',
            total: data.totalAmount || 0,
            items: data.items ? data.items.length : 0,
            // Convert Firestore timestamp to JS Date if needed
            createdAt: data.createdAt?.toDate ? data.createdAt.toDate() : data.createdAt,
            // Include other fields you need
            ...data
          };
        });
        
        // Sort by createdAt on client side
        ordersData.sort((a, b) => {
          const dateA = a.createdAt instanceof Date ? a.createdAt : new Date(a.createdAt);
          const dateB = b.createdAt instanceof Date ? b.createdAt : new Date(b.createdAt);
          return dateB - dateA; // Newest first
        });
        
        setOrders(ordersData);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError('Failed to load orders. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [currentUser]);

  const getStatusBadge = (status) => {
    if (!status) return 'bg-gray-100 text-gray-800';
    
    switch (status.toLowerCase()) {
      case 'processing':
      case 'pending':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
      case 'dispatched':
        return 'bg-yellow-100 text-yellow-800';
      case 'delivered':
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusDetails = (status) => {
    switch (status.toLowerCase()) {
      case 'processing':
      case 'pending':
        return {
          icon: <FaClock className="text-yellow-500" />,
          color: 'bg-yellow-100 text-yellow-800',
          text: 'Processing'
        };
      case 'shipped':
      case 'dispatched':
        return {
          icon: <FaTruck className="text-yellow-500" />,
          color: 'bg-yellow-100 text-yellow-800',
          text: 'Shipped'
        };
      case 'delivered':
      case 'completed':
        return {
          icon: <FaCheckCircle className="text-green-500" />,
          color: 'bg-green-100 text-green-800',
          text: 'Delivered'
        };
      case 'cancelled':
      case 'failed':
        return {
          icon: <FaTimesCircle className="text-red-500" />,
          color: 'bg-red-100 text-red-800',
          text: 'Cancelled'
        };
      default:
        return {
          icon: <FaClock className="text-yellow-500" />,
          color: 'bg-yellow-100 text-yellow-800',
          text: 'Processing'
        };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-128px)] flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  if (!currentUser) {
    return (
      <div className="min-h-[calc(100vh-128px)] flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md mx-4 bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="bg-yellow-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
            <FaClock className="text-yellow-500 text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h3>
          <p className="text-gray-600 mb-6">Please sign in to view your order history.</p>
          <a
            href="/login"
            className="inline-flex items-center px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-medium"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[calc(100vh-128px)] flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md mx-4 bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="bg-red-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
            <FaTimesCircle className="text-red-500 text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Error loading orders</h3>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="inline-flex items-center px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-[calc(100vh-128px)] flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md mx-4 bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="bg-gray-100 p-4 rounded-full inline-flex items-center justify-center mb-4">
            <FaBoxOpen className="text-gray-400 text-3xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders found</h3>
          <p className="text-gray-600 mb-6">
            You haven't placed any orders yet. Start shopping to see your order history here.
          </p>
          <a
            href="/products"
            className="inline-flex items-center px-6 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors font-medium"
          >
            Browse Products
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-128px)] bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Order History</h1>
            <p className="mt-2 text-gray-600">View and manage your recent orders</p>
          </div>
          
          <div className="bg-white shadow-sm rounded-lg overflow-hidden">
            <ul className="divide-y divide-gray-100">
              {orders.map((order) => {
                const status = getStatusDetails(order.status);
                const totalItems = order.items ? order.items.reduce((sum, item) => sum + (item.quantity || 1), 0) : 0;
                
                return (
                  <li key={order.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                          <h3 className="text-lg font-semibold text-gray-900">
                            Order #{order.orderNumber || order.id.substring(0, 8).toUpperCase()}
                          </h3>
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mt-2 sm:mt-0 ${status.color}`}>
                            {status.icon}
                            <span className="ml-1.5">{status.text}</span>
                          </span>
                        </div>
                        
                        <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm">
                          <div className="text-gray-600">
                            <span className="font-medium">Placed on:</span>{' '}
                            <span>{formatDate(order.createdAt)}</span>
                          </div>
                          <div className="text-gray-600">
                            <span className="font-medium">Items:</span>{' '}
                            <span>{totalItems} item{totalItems !== 1 ? 's' : ''}</span>
                          </div>
                          <div className="text-gray-600">
                            <span className="font-medium">Total:</span>{' '}
                            <span className="font-semibold">${order.total?.toFixed(2) || '0.00'}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-4 sm:mt-0 sm:ml-6">
                        <a
                          href={`/profile/orders/${order.id}`}
                          className="inline-flex items-center justify-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
                        >
                          View Details
                        </a>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
            
            {orders.length > 0 && (
              <div className="bg-gray-50 px-6 py-4 flex items-center justify-between border-t border-gray-100">
                <p className="text-sm text-gray-600">
                  Showing <span className="font-medium">1-{orders.length}</span> of <span className="font-medium">{orders.length}</span> orders
                </p>
                <div className="flex space-x-3">
                  <button
                    disabled
                    className="relative inline-flex items-center px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 cursor-not-allowed"
                  >
                    Previous
                  </button>
                  <button
                    disabled
                    className="relative inline-flex items-center px-3 py-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500 cursor-not-allowed"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;