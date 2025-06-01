'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { auth, googleProvider } from '@/firebase/config';
import { signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import LoadingSpinner from '@/components/LoadingSpinner';

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');



  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    // Validate email format
    if (!validateEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Validate password length
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
      const user = userCredential.user;
      
      // Get additional user data from Firestore
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      const userData = userDoc.data();
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || userData?.displayName || email.split('@')[0],
        phoneNumber: user.phoneNumber || userData?.phoneNumber || '',
        photoURL: user.photoURL || userData?.photoURL || '',
        emailVerified: user.emailVerified,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
        lastLoginAt: user.metadata.lastSignInTime
      }));
      
      // Also store the ID token
      const idToken = await user.getIdToken();
      localStorage.setItem('token', idToken);
      
      // Update last login time in Firestore
      if (userDoc.exists()) {
        await updateDoc(doc(db, 'users', user.uid), {
          lastLoginAt: new Date().toISOString()
        });
      }
      
      router.push('/');
    } catch (err) {
      console.error('Login error:', err);
      // Clear any partial auth data on error
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError('Failed to sign in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;
      
      // Check if user exists in Firestore
      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);
      
      if (!userDoc.exists()) {
        // Create user document if it doesn't exist
        await setDoc(userRef, {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || user.email.split('@')[0],
          photoURL: user.photoURL || '',
          emailVerified: user.emailVerified,
          createdAt: new Date().toISOString(),
          lastLoginAt: new Date().toISOString(),
          role: 'user',
          isGoogleSignIn: true
        });
      } else {
        // Update last login time
        await updateDoc(userRef, {
          lastLoginAt: new Date().toISOString()
        });
      }
      
      // Get the latest user data
      const updatedUserDoc = await getDoc(userRef);
      const userData = updatedUserDoc.data();
      
      // Store user data in localStorage
      localStorage.setItem('user', JSON.stringify({
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || userData?.displayName || user.email.split('@')[0],
        phoneNumber: user.phoneNumber || userData?.phoneNumber || '',
        photoURL: user.photoURL || userData?.photoURL || '',
        emailVerified: user.emailVerified,
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
        lastLoginAt: user.metadata.lastSignInTime,
        isGoogleSignIn: true
      }));
      
      // Also store the ID token
      const idToken = await user.getIdToken();
      localStorage.setItem('token', idToken);
      
      router.push('/');
    } catch (err) {
      console.error('Google sign-in error:', err);
      // Clear any partial auth data on error
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setError('Google sign-in failed. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-6 mx-auto opacity-0 animate-fade-in">
        <div className="text-center mb-8">
          {/* <Image
            src="/logo.png"
            alt="CocoKart Logo"
            width={150}
            height={150}
            className="mx-auto login-element"
          /> */}
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Welcome back!
          </h2>
          <p className="text-gray-600 text-sm">
            Sign in to manage your chocolate store
          </p>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="error-message text-center bg-red-50 text-red-500 py-2 px-4 rounded-lg opacity-0 animate-fade-in">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm pr-10"
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                {showPassword ? (
                  <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-400" />
                )}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-sm">
              <Link 
                href="/reset-password"
                className="font-medium text-orange-600 hover:text-orange-500 transition-colors duration-200"
              >
                Forgot your password?
              </Link>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
            >
              {loading ? <LoadingSpinner /> : 'Sign in'}
            </button>
          </div>

          <div className="mt-4 text-center">
            <span className="text-gray-600">Don't have an account?</span>
            {' '}
            <Link 
              href="/signup"
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              Sign up
            </Link>
          </div>

          <div className="mt-6">
            <button
              type="button"
              onClick={async (e) => {
                e.preventDefault();
                setEmail('roshan@gmail.com');
                setPassword('1234567890');
                setError('');
                setLoading(true);
                
                try {
                  const userCredential = await signInWithEmailAndPassword(auth, 'roshan@gmail.com', '1234567890');
                  const user = userCredential.user;
                  
                  // Get guest user data from Firestore if exists
                  const userDoc = await getDoc(doc(db, 'users', user.uid));
                  const userData = userDoc.data();
                  
                  // Store guest user data in localStorage
                  localStorage.setItem('user', JSON.stringify({
                    uid: user.uid,
                    email: user.email,
                    displayName: userData?.displayName || 'Guest User',
                    phoneNumber: userData?.phoneNumber || '',
                    photoURL: userData?.photoURL || '',
                    emailVerified: user.emailVerified,
                    accessToken: user.accessToken,
                    refreshToken: user.refreshToken,
                    lastLoginAt: user.metadata.lastSignInTime,
                    isGuest: true
                  }));
                  
                  // Also store the ID token
                  const idToken = await user.getIdToken();
                  localStorage.setItem('token', idToken);
                  
                  router.push('/');
                } catch (err) {
                  console.error('Guest login error:', err);
                  // Clear any partial auth data on error
                  localStorage.removeItem('user');
                  localStorage.removeItem('token');
                  setError('Guest login failed. Please try again.');
                } finally {
                  setLoading(false);
                }
              }}
              className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200 mb-6"
            >
              Login as Guest
            </button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Or continue with
                </span>
              </div>
            </div>

            <div className="mt-6">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors duration-200"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                  <path fill="none" d="M1 1h22v22H1z" />
                </svg>
                Sign in with Google
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;