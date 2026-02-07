"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Building2, 
  Home, 
  Calendar, 
  FileText, 
  CreditCard, 
  Bell, 
  Users, 
  ShoppingBag,
  LogOut,
  Menu,
  X,
  DoorOpen,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { MobileNav } from "@/components/layout/mobile-nav";

const sidebarItems = [
  { href: "/resident/dashboard", icon: Home, label: "Dashboard" },
  { href: "/resident/access", icon: DoorOpen, label: "Access Control" },
  { href: "/resident/bookings", icon: Calendar, label: "Facility Booking" },
  { href: "/resident/eforms", icon: FileText, label: "eForms" },
  { href: "/resident/payments", icon: CreditCard, label: "Payments" },
  { href: "/resident/notices", icon: Bell, label: "Notices" },
  { href: "/resident/community", icon: Users, label: "Community" },
  { href: "/resident/group-orders", icon: ShoppingBag, label: "Group Orders" },
];

export default function ResidentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="md:hidden sticky top-0 z-40 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 h-16">
          <Link href="/resident/dashboard" className="flex items-center gap-2">
            <Building2 className="h-7 w-7 text-[#BA006F]" />
            <span className="font-display font-bold text-[#58595B]">The Tennery</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 text-gray-600"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/50"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed top-0 left-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out",
          "md:translate-x-0 md:z-40",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="hidden md:flex items-center gap-2 px-6 h-16 border-b border-gray-200">
            <Building2 className="h-8 w-8 text-[#BA006F]" />
            <span className="font-display font-bold text-lg text-[#58595B]">The Tennery</span>
          </div>
          <div className="md:hidden h-16" />

          {/* User Info */}
          <div className="px-4 py-4 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#BA006F]/10 flex items-center justify-center">
                <span className="text-[#BA006F] font-medium">JD</span>
              </div>
              <div>
                <p className="font-medium text-sm">John Doe</p>
                <p className="text-xs text-gray-500">Unit #12-34</p>
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
                      ? "bg-[#BA006F]/10 text-[#BA006F]"
                      : "text-[#58595B] hover:bg-[#939497]/10"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <Link
              href="/login"
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut className="h-5 w-5" />
              Logout
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="md:ml-64 pb-20 md:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileNav />
    </div>
  );
}
