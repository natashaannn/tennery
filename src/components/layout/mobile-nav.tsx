"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Calendar, FileText, CreditCard, Bell, Users, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

const residentNavItems = [
  { href: "/resident/dashboard", icon: Home, label: "Home" },
  { href: "/resident/bookings", icon: Calendar, label: "Bookings" },
  { href: "/resident/eforms", icon: FileText, label: "eForms" },
  { href: "/resident/payments", icon: CreditCard, label: "Payments" },
  { href: "/resident/notices", icon: Bell, label: "Notices" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 md:hidden">
      <div className="flex justify-around items-center h-16 px-2">
        {residentNavItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex flex-col items-center justify-center flex-1 py-2 px-1",
                isActive ? "text-[#BA006F]" : "text-[#939497]"
              )}
            >
              <item.icon className="h-5 w-5" />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
