'use client';

import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { getAuth } from 'firebase/auth';
import { Toaster, toast } from 'sonner';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    if (!user) {
      setError('Please log in to view your cart');
      setLoading(false);
      return;
    }

    // Set up real-time listener for cart items
    const cartRef = collection(db, 'users', user.uid, 'cart');
    const unsubscribe = onSnapshot(cartRef, (snapshot) => {
      const cartItems = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      console.log('Cart items:', cartItems);
      setCart(cartItems);
      setLoading(false);
    }, (error) => {
      console.error('Error fetching cart:', error);
      setError('Failed to load cart. Please try again.');
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const updateQuantity = async (itemId, newQuantity) => {
    if (!user) return;
    
    try {
      if (newQuantity < 1) {
        // Delete item if quantity is 0
        await deleteDoc(doc(db, 'users', user.uid, 'cart', itemId));
      } else {
        // Update quantity
        await updateDoc(doc(db, 'users', user.uid, 'cart', itemId), {
          quantity: newQuantity
        });
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      toast.error('Failed to update quantity', {
        description: 'Please try again'
      });
    }
  };

  const removeFromCart = async (itemId) => {
    if (!user) return;
    
    try {
      await deleteDoc(doc(db, 'users', user.uid, 'cart', itemId));
      toast.success('Item removed from cart');
    } catch (error) {
      console.error('Error removing item:', error);
      toast.error('Failed to remove item', {
        description: 'Please try again'
      });
    }
  };

  if (loading) {
    return (
      <div className='min-h-screen bg-gray-50 pt-24 flex items-center justify-center'>
        <div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500'></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='min-h-screen bg-gray-50 pt-32 flex items-center justify-center'>
        <div className='text-center p-6 bg-white rounded-lg shadow-md'>
          <p className='text-red-500 mb-4'>{error}</p>
          {!user && (
            <a 
              href='/login' 
              className='text-orange-500 hover:underline'
            >
              Go to Login
            </a>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-50 to-white pt-16 sm:pt-24 pb-8 sm:pb-12'>
      <Toaster richColors position="top-center" expand={true} />
      <div className='max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 pt-8 sm:pt-12'>
        <div className='text-center mb-6 sm:mb-12'>
          <h1 className='text-3xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-3 sm:mb-6 animate-fade-in leading-tight'>
            Your Cart
          </h1>
          <p className='text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in-up px-4'>
            {cart.length > 0
              ? 'Review and manage your delicious selections.' 
              : 'Your cart is empty. Time to explore our menu!'}
          </p>
        </div>

        {cart.length === 0 ? (
          <div className='text-center py-16 animate-fade-in-up'>
            <div className='mb-8'>
              <svg className='mx-auto h-24 w-24 text-gray-400' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' />
              </svg>
            </div>
            <p className='text-gray-500 text-lg mb-8'>Your cart is waiting to be filled with amazing dishes!</p>
            <a 
              href='/products'
              className='inline-flex items-center px-8 py-4 border-2 border-orange-500 text-lg font-semibold rounded-full text-white bg-orange-500 hover:bg-orange-600 hover:border-orange-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500'
            >
              Start Ordering
            </a>
          </div>
        ) : (
          <div className='bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100 animate-fade-in-up'>
            <div className='px-6 py-6 border-b border-gray-200 bg-gradient-to-r from-orange-50 to-white'>
              <h3 className='text-2xl font-bold text-gray-900'>
                Order Summary
              </h3>
            </div>
            
            <div className='divide-y divide-gray-100'>
              {cart.map((item) => (
                <div key={item.id} className='p-4 sm:p-6 hover:bg-gray-50 transition-colors duration-200'>
                  <div className='flex flex-col sm:flex-row items-start gap-4 sm:gap-6'>
                    <div className='relative flex-shrink-0 w-full sm:w-48 h-40 sm:h-40 bg-gray-100 rounded-xl overflow-hidden shadow-sm transition-transform duration-300 hover:scale-105'>
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className='w-full h-full object-cover'
                        />
                      ) : (
                        <div className='w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-400'>
                          <svg className='h-12 w-12' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z' />
                          </svg>
                        </div>
                      )}
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className='absolute top-2 right-2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-md text-red-500 hover:text-red-600 transition-colors'
                      >
                        <svg className='h-5 w-5' fill='none' viewBox='0 0 24 24' stroke='currentColor'>
                          <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={1.5} d='M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16' />
                        </svg>
                      </button>
                    </div>
                    
                    <div className='flex-1 w-full'>
                      <div className='flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2'>
                        <h4 className='text-lg sm:text-2xl font-bold text-gray-900'>{item.name}</h4>
                        <p className='text-xl sm:text-2xl font-bold text-orange-500'>
                          ₹{item.price ? item.price.toFixed(2) : '0.00'}
                        </p>
                      </div>
                      <p className='text-sm sm:text-base text-gray-600 mb-4'>{item.description || 'No description available'}</p>
                      <div className='flex items-center justify-between sm:justify-start gap-4'>
                        <div className='flex items-center border-2 border-gray-200 rounded-full overflow-hidden bg-white shadow-sm'>
                          <button 
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) - 1)}
                            className='w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors text-lg font-medium'
                          >
                            −
                          </button>
                          <span className='w-12 h-10 flex items-center justify-center text-gray-900 font-medium border-x-2 border-gray-200'>
                            {item.quantity || 1}
                          </span>
                          <button 
                            onClick={() => updateQuantity(item.id, (item.quantity || 1) + 1)}
                            className='w-10 h-10 flex items-center justify-center bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors text-lg font-medium'
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className='fixed bottom-0 left-0 right-0 sm:relative px-4 sm:px-6 py-4 sm:py-8 border-t border-gray-200 bg-white sm:bg-gradient-to-b from-white to-orange-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] sm:shadow-none'>
              <div className='max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-6'>
                <div className='text-center sm:text-left w-full sm:w-auto'>
                  <p className='text-sm text-gray-600 mb-0.5 sm:mb-1'>Total Amount</p>
                  <h3 className='text-2xl sm:text-3xl font-bold text-gray-900'>
                    ₹{cart.reduce((sum, item) => {
                      const price = Number(item?.price) || 0;
                      const quantity = Number(item?.quantity) || 1;
                      return sum + (price * quantity);
                    }, 0).toFixed(2)}
                  </h3>
                </div>
                <button className='w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 text-base sm:text-lg font-semibold rounded-full text-white bg-orange-500 hover:bg-orange-600 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 shadow-lg hover:shadow-xl'>
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;