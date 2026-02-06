// app/admin/dashboard/layout.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, SessionProvider } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const navigation = [
    { name: "Overview", href: "/admin/dashboard" },
    { name: "Manage Monthly Event", href: "/admin/dashboard/events" },
    { name: "Manage Sermons", href: "/admin/dashboard/sermons" }, // Placeholder for later
    { name: "Manage Admins", href: "/admin/dashboard/manage-admins" },
  ];

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col">
        <div className="p-6 border-b border-slate-800">
          <h2 className="text-xl font-bold text-yellow-500">Admin Panel</h2>
        </div>
        
        <nav className="flex-1 p-4 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-4 py-3 rounded-md transition-colors ${
                  isActive 
                    ? "bg-blue-600 text-white" 
                    : "text-gray-400 hover:bg-slate-800 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            className="w-full flex items-center justify-center px-4 py-2 text-sm font-medium text-red-400 bg-slate-800 rounded-md hover:bg-slate-700"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <SessionProvider>{children}</SessionProvider>
      </main>
    </div>
  );
}