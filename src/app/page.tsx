import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Building2,
  MapPin,
  Train,
  Dumbbell,
  Waves,
  TreePine,
  Shield,
  Calendar,
  FileText,
  Users,
  ChevronRight,
  Star,
} from "lucide-react";

const facilities = [
  { icon: Waves, name: "Swimming Pool", description: "Lap pool & kids pool" },
  { icon: Dumbbell, name: "Gymnasium", description: "Fully equipped fitness center" },
  { icon: TreePine, name: "BBQ Pavilion", description: "Multiple BBQ pits available" },
  { icon: Users, name: "Function Room", description: "For events & gatherings" },
  { icon: Shield, name: "24/7 Security", description: "CCTV & guard patrol" },
  { icon: Train, name: "Near MRT", description: "5 min walk to Woodlands MRT" },
];

const quickLinks = [
  {
    icon: Calendar,
    title: "Book Facilities",
    description: "Reserve BBQ pits, function rooms & more",
    href: "/facilities",
    color: "bg-[#BA006F]/10 text-[#BA006F]",
  },
  {
    icon: FileText,
    title: "Submit eForms",
    description: "Renovation, moving & delivery permits",
    href: "/login",
    color: "bg-[#939497]/10 text-[#58595B]",
  },
  {
    icon: Users,
    title: "Advertise With Us",
    description: "Reach our community of residents",
    href: "/advertise",
    color: "bg-[#BA006F]/10 text-[#BA006F]",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-[#BA006F] to-[#8a0052] text-white">
          <div className="absolute inset-0 bg-black/10" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-4">
                <Building2 className="h-8 w-8" />
                <span className="text-white/80 font-medium">Welcome to</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
                the tennery
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8">
                A modern condominium in Woodlands, Singapore. Experience comfortable living with premium amenities and convenient access to Woodlands MRT.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/facilities">
                  <Button size="lg" className="w-full sm:w-auto bg-white text-[#BA006F] hover:bg-[#FDFBFC]">
                    View Facilities
                  </Button>
                </Link>
                <Link href="/login">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto border-white text-black hover:bg-white/10">
                    Resident Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Location Badge */}
        <section className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-center gap-2 text-[#58595B]">
              <MapPin className="h-5 w-5 text-[#BA006F]" />
              <span>Woodlands Road, 677727</span>
              <span className="text-[#939497]">|</span>
              <Train className="h-5 w-5 text-[#BA006F]" />
              <span>5 min walk to Bukit Panjang MRT</span>
            </div>
          </div>
        </section>

        {/* Quick Links */}
        <section className="bg-gray-50 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
              Quick Access
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {quickLinks.map((link) => (
                <Link key={link.title} href={link.href}>
                  <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 rounded-lg ${link.color} flex items-center justify-center mb-4`}>
                        <link.icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold mb-2">{link.title}</h3>
                      <p className="text-gray-500 text-sm mb-4">{link.description}</p>
                      <div className="flex items-center text-[#BA006F] text-sm font-medium">
                        Learn more <ChevronRight className="h-4 w-4 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Facilities */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Our Facilities
              </h2>
              <p className="text-gray-500 max-w-2xl mx-auto">
                Enjoy a range of premium amenities designed for your comfort and convenience.
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {facilities.map((facility) => (
                <div
                  key={facility.name}
                  className="text-center p-4 rounded-xl bg-[#FDFBFC] hover:bg-[#BA006F]/10 transition-colors"
                >
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-[#BA006F]/10 flex items-center justify-center">
                    <facility.icon className="h-6 w-6 text-[#BA006F]" />
                  </div>
                  <h3 className="font-medium text-sm mb-1">{facility.name}</h3>
                  <p className="text-xs text-gray-500">{facility.description}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/facilities">
                <Button variant="outline">
                  View All Facilities & Book
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="bg-[#BA006F]/5 py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-4">
                  About The Tennery
                </h2>
                <p className="text-gray-600 mb-4">
                  The Tennery is a 99-year leasehold condominium located at Woodlands Road, 677727 in District 23. Completed in 2013, this development comprises 338 residential units across multiple blocks.
                </p>
                <p className="text-gray-600 mb-6">
                  Strategically located near Bukit Panjang MRT station on the Downtown Line, residents enjoy excellent connectivity to the rest of Singapore. The development is also close to Hillion and Bukit Panjang Plaza shopping mall and various amenities.
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1">
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                    <Star className="h-5 w-5 text-gray-300" />
                  </div>
                  <span className="text-sm text-gray-500">Rated 4.0 on PropertyGuru</span>
                </div>
              </div>
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <h3 className="font-semibold mb-4">Property Details</h3>
                <dl className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Total Units</dt>
                    <dd className="font-medium">338</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Tenure</dt>
                    <dd className="font-medium">99-year Leasehold</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Completion</dt>
                    <dd className="font-medium">2013</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">District</dt>
                    <dd className="font-medium">D23 Dairy Farm / Bukit Panjang / Choa Chu Kang</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-gray-500">Developer</dt>
                    <dd className="font-medium">Dollar Land Singapore Private Limited</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 md:py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Are You a Resident?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto mb-8">
              Access exclusive features including facility booking, maintenance fee payments, community updates, and more.
            </p>
            <Link href="/login">
              <Button size="lg">
                Login to Resident Portal
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
