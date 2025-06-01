import Link from 'next/link';

export default function AuthLayout({ children }) {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
       
        <div className="max-w-md mx-auto">
          {children}
        </div>
      </div>
    </main>
  );
}