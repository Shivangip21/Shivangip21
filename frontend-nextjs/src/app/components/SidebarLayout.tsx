'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function SidebarLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user_id = localStorage.getItem('token');
    if (!user_id) {
      router.push('/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen text-xl font-semibold text-gray-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside
        className="w-[10%] bg-[#fef1ec] text-white p-6 flex flex-col justify-between min-w-[250px]"
        style={{ boxShadow: '4px 0 10px rgba(0, 0, 0, 0.1)' }}
      >
        <div className="text-black">
          <h2 className="text-xl font-bold mb-6">Menu</h2>
          <nav className="flex flex-col space-y-2">
            <Link href="/" className="hover:underline">Create Order</Link>
            <Link href="/history" className="hover:underline">Order History</Link>
          </nav>
        </div>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </aside>

      {/* Main */}
      <main className="w-[90%] p-6 bg-gray-100">{children}</main>
    </div>
  );
}
