import Link from "next/link";
import { Building2, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#58595B] text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-8 w-8 text-[#BA006F]" />
              <span className="text-xl font-display font-bold text-white">the tennery</span>
            </div>
            <p className="text-sm text-gray-300 mb-4">
              A modern condominium in Singapore offering premium living spaces with excellent amenities and convenient location.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-[#BA006F]" />
                <span>3,3A,5,5A Woodlands Road Singapore 677901,677727,677903,677728</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4 text-[#BA006F]" />
                <span>+65 6763 8978</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-[#BA006F]" />
                <span>thetennery.cm@gmail.com</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/facilities" className="hover:text-[#BA006F] transition-colors">
                  Facilities
                </Link>
              </li>
              <li>
                <Link href="/advertise" className="hover:text-[#BA006F] transition-colors">
                  Advertise With Us
                </Link>
              </li>
              <li>
                <Link href="/team" className="hover:text-[#BA006F] transition-colors">
                  Our Team
                </Link>
              </li>
              <li>
                <Link href="/login" className="hover:text-[#BA006F] transition-colors">
                  Resident Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">For Residents</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/resident/bookings" className="hover:text-[#BA006F] transition-colors">
                  Book Facilities
                </Link>
              </li>
              <li>
                <Link href="/resident/eforms" className="hover:text-[#BA006F] transition-colors">
                  eForms
                </Link>
              </li>
              <li>
                <Link href="/resident/payments" className="hover:text-[#BA006F] transition-colors">
                  Pay Fees
                </Link>
              </li>
              <li>
                <Link href="/resident/notices" className="hover:text-[#BA006F] transition-colors">
                  Notices
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} The Tennery MCST. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
