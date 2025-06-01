'use client';

import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaPhone, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth, storage } from '@/firebase/config';
import { updateProfile, updatePhoneNumber, updateEmail } from 'firebase/auth';

import { doc, updateDoc, getFirestore, getDoc } from 'firebase/firestore';
import './user.css';

const User = () => {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: '',
    phoneNumber: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEditClick = () => {
    setFormData({
      displayName: user.displayName || '',
      phoneNumber: user.phoneNumber || ''
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };



  const handleSaveProfile = async (e) => {
    e.preventDefault();
    
    // Get token from localStorage
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Authentication token not found. Please log in again.');
      router.push('/login');
      return;
    }

    if (!auth.currentUser) {
      toast.error('You must be logged in to update your profile');
      return;
    }

    setIsLoading(true);
    
    try {
      const updates = {};
      const user = auth.currentUser;
      
      // Update display name if changed
      if (formData.displayName !== user.displayName) {
        await updateProfile(user, { displayName: formData.displayName });
        updates.displayName = formData.displayName;
      }
      
      // Update phone number if changed (requires re-authentication)
      if (formData.phoneNumber && formData.phoneNumber !== user.phoneNumber) {
        updates.phoneNumber = formData.phoneNumber;
        toast.info('Phone number update requires verification. Please verify your new number.');
      }
      
      // Update Firestore user document if needed
      const db = getFirestore();
      const userRef = doc(db, 'users', user.uid);
      await updateDoc(userRef, updates);
      
      // Get updated user data
      const updatedUser = {
        ...user,
        displayName: user.displayName,
        phoneNumber: user.phoneNumber || formData.phoneNumber,
        email: user.email,
        uid: user.uid
      };
      
      // Update local storage and state
      localStorage.setItem('user', JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(`Failed to update profile: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        // Get additional user data from Firestore if needed
        const db = getFirestore();
        const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
        
        const userData = {
          uid: firebaseUser.uid,
          displayName: firebaseUser.displayName || '',
          email: firebaseUser.email || '',
          phoneNumber: firebaseUser.phoneNumber || '',
          emailVerified: firebaseUser.emailVerified,
          metadata: {
            creationTime: firebaseUser.metadata.creationTime,
            lastSignInTime: firebaseUser.metadata.lastSignInTime
          },
          ...(userDoc?.exists() ? userDoc.data() : {})
        };
        
        // Update local storage and state
        localStorage.setItem('user', JSON.stringify(userData));
        setUser(userData);
        setFormData({
          displayName: userData.displayName || '',
          phoneNumber: userData.phoneNumber || ''
        });
      } else {
        // Clear local storage and redirect to login if not authenticated
        localStorage.removeItem('user');
        router.push('/login');
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, [router]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-24 sm:pt-28 px-4 pb-20">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="max-w-2xl mx-auto">
        {/* Profile Header */}
        {/* <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col items-center text-center">
            <div className="relative mb-4">
              <div className="w-32 h-32 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                <FaUser className="text-5xl text-gray-400" />
              </div>
            </div>
            {isEditing ? (
              <div className="w-full max-w-xs mx-auto space-y-4">
                <div>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent text-black"
                    placeholder="Full Name"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={user.email}
                    disabled
                    className="w-full px-4 py-2 bg-gray-100 rounded-lg cursor-not-allowed opacity-70 text-black"
                  />
                </div>
              </div>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-gray-900">{user.displayName || 'Guest User'}</h1>
                <p className="text-gray-600 mt-1">{user.email || 'No email provided'}</p>
              </>
            )}
          </div>
        </div> */}

        {/* User Details */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h2>
          
          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 bg-blue-50 p-3 rounded-full">
                <FaUser className="text-blue-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Full Name</p>
                {isEditing ? (
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-800">{user.displayName || 'Not provided'}</p>
                )}
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-green-50 p-3 rounded-full">
                <FaEnvelope className="text-green-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Email Address</p>
                <p className="text-gray-800">{user.email || 'Not provided'}</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 bg-purple-50 p-3 rounded-full">
                <FaPhone className="text-purple-500" />
              </div>
              <div className="ml-4">
                <p className="text-sm text-gray-500">Phone Number</p>
                {isEditing ? (
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    className="w-full px-3 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="+91 9876543210"
                  />
                ) : (
                  <p className="text-gray-800">{user.phoneNumber || 'Not provided'}</p>
                )}
              </div>
            </div>
          </div>

          {isEditing ? (
            <div className="flex gap-3 mt-6">
              <button 
                onClick={handleSaveProfile}
                disabled={isLoading}
                className="flex-1 sm:flex-none px-6 py-2 bg-green-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></span>
                ) : (
                  <>
                    <FaCheck />
                    <span>Save Changes</span>
                  </>
                )}
              </button>
              <button 
                onClick={handleCancelEdit}
                disabled={isLoading}
                className="flex-1 sm:flex-none px-6 py-2 bg-gray-200 text-gray-700 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-300 transition-colors"
              >
                <FaTimes />
                <span>Cancel</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={handleEditClick}
              className="mt-6 w-full sm:w-auto px-6 py-2 bg-orange-500 text-white rounded-lg flex items-center justify-center gap-2 hover:bg-orange-600 transition-colors"
            >
              <FaEdit />
              Edit Profile
            </button>
          )}
        </div>

        {/* Additional Information */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Details</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-500">Account Created</span>
              <span className="text-gray-900">
                {user.metadata?.creationTime || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-100">
              <span className="text-gray-500">Last Sign In</span>
              <span className="text-gray-900">
                {user.metadata?.lastSignInTime || 'N/A'}
              </span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-500">Email Verified</span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                user.emailVerified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {user.emailVerified ? 'Verified' : 'Not Verified'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;