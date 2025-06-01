'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Navbar from '../app/navbar/page';
import Footer from '../app/footer/page';
import { AuthProvider } from '@/context/AuthContext';

const isAuthRoute = (pathname) => {
  if (!pathname) return false;
  return (
    pathname.startsWith('/auth') || 
    pathname === '/login' || 
    pathname === '/signup' ||
    pathname === '/reset-password'
  );
};

export default function ClientLayout({ children }) {
  const [showLayout, setShowLayout] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    setShowLayout(!isAuthRoute(pathname));
  }, [pathname]);

  return (
    <AuthProvider>
      {showLayout ? (
        <>
          <Navbar />
          <main className="min-h-[calc(100vh-128px)]">
            {children}
          </main>
          <Footer />
        </>
      ) : (
        <div className="min-h-screen bg-gray-50">
          <main>{children}</main>
        </div>
      )}
    </AuthProvider>
  );
}
