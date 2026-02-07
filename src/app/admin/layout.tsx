"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Building2, 
  LayoutDashboard, 
  CheckSquare, 
  Users, 
  DollarSign, 
  FileText, 
  Calendar,
  LogOut,
  Menu,
  X,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const sidebarItems = [
  { href: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/admin/approvals", icon: CheckSquare, label: "Approvals" },
  { href: "/admin/residents", icon: Users, label: "Residents" },
  { href: "/admin/fees", icon: DollarSign, label: "Maintenance Fees" },
  { href: "/admin/vendors", icon: FileText, label: "Vendor Contracts" },
  { href: "/admin/council", icon: Calendar, label: "Council Meetings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-[#58595B] text-white">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/admin/dashboard" className="flex items-center gap-2">
            <Building2 className="h-7 w-7 text-[#BA006F]" />
            <span className="font-display font-bold">Admin Portal</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-40 h-full w-64 bg-[#58595B] text-white transform transition-transform duration-200 ease-in-out",
          "lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="hidden lg:flex items-center gap-2 px-6 h-16 border-b border-[#939497]/30">
            <Building2 className="h-8 w-8 text-[#BA006F]" />
            <div>
              <span className="font-display font-bold text-lg">The Tennery</span>
              <p className="text-xs text-[#939497]">Admin Portal</p>
            </div>
          </div>
          <div className="lg:hidden h-16" />

          {/* Admin Info */}
          <div className="px-4 py-4 border-b border-[#939497]/30">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#BA006F] flex items-center justify-center">
                <span className="text-white font-medium">AD</span>
              </div>
              <div>
                <p className="font-medium text-sm">Admin User</p>
                <p className="text-xs text-gray-400">Management</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-[#BA006F] text-white"
                      : "text-gray-300 hover:bg-[#939497]/20"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Footer Links */}
          <div className="p-4 border-t border-[#939497]/30 space-y-1">
            <Link
              href="/resident/dashboard"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-300 hover:bg-[#939497]/20 transition-colors"
            >
              <Settings className="h-5 w-5" />
              Resident View
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64">
        {children}
      </main>
    </div>
  );
}
