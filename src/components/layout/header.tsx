"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, Home, Calendar, FileText, CreditCard, Bell, Users, ShoppingBag, Settings, LogOut, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  isAuthenticated?: boolean;
  userRole?: string;
  userName?: string;
}

export function Header({ isAuthenticated = false, userRole, userName }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <Building2 className="h-8 w-8 text-[#BA006F]" />
            <span className="text-xl font-display font-bold text-[#58595B]">the tennery</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/facilities" className="text-[#58595B] hover:text-[#BA006F] transition-colors">
              Facilities
            </Link>
            <Link href="/advertise" className="text-[#58595B] hover:text-[#BA006F] transition-colors">
              Advertise
            </Link>
            <Link href="/team" className="text-[#58595B] hover:text-[#BA006F] transition-colors">
              Our Team
            </Link>
            {isAuthenticated ? (
              <>
                <Link href="/resident/dashboard" className="text-[#58595B] hover:text-[#BA006F] transition-colors">
                  Dashboard
                </Link>
                {(userRole === "ADMIN" || userRole === "COUNCIL") && (
                  <Link href="/admin/dashboard" className="text-[#58595B] hover:text-[#BA006F] transition-colors">
                    Admin
                  </Link>
                )}
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">{userName}</span>
                  <Button variant="outline" size="sm">
                    <LogOut className="h-4 w-4 mr-1" />
                    Logout
                  </Button>
                </div>
              </>
            ) : (
              <Link href="/login">
                <Button>Login</Button>
              </Link>
            )}
          </nav>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-4 space-y-3">
            <Link
              href="/facilities"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Calendar className="h-5 w-5" />
              Facilities
            </Link>
            <Link
              href="/advertise"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <FileText className="h-5 w-5" />
              Advertise
            </Link>
            <Link
              href="/team"
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Users className="h-5 w-5" />
              Our Team
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  href="/resident/dashboard"
                  className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                {(userRole === "ADMIN" || userRole === "COUNCIL") && (
                  <Link
                    href="/admin/dashboard"
                    className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Settings className="h-5 w-5" />
                    Admin
                  </Link>
                )}
                <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-600 hover:bg-red-50 w-full">
                  <LogOut className="h-5 w-5" />
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="block"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Button className="w-full">Login</Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
