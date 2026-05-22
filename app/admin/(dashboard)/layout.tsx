import "./admin.css";
import Sidebar from "./Sidebar";
import { logout } from "@/lib/auth";
import { redirect } from "next/navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  async function logoutAction() {
    'use server';
    await logout();
    redirect("/admin/login");
  }

  return (
    <div className="flex h-screen bg-[#121212] text-white font-sans admin-theme overflow-hidden">
      <Sidebar logoutAction={logoutAction} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 border-b border-gray-800 bg-[#121212]/80 backdrop-blur-md flex items-center px-8 justify-between sticky top-0 z-10">
          <h2 className="text-xl font-semibold">Dashboard</h2>
          <div className="flex items-center space-x-4">
            <span className="flex h-3 w-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm text-gray-400">System Online</span>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
