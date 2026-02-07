"use client";

import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Card, CardContent } from "@/components/ui/card";
import {
  Users,
  Building2,
  Mail,
  Phone,
  Briefcase,
} from "lucide-react";

const councilMembers = [
  {
    name: "Council Member 1",
    role: "Chairperson",
    term: "2024 - 2026",
  },
  {
    name: "Council Member 2",
    role: "Secretary",
    term: "2024 - 2026",
  },
  {
    name: "Council Member 3",
    role: "Treasurer",
    term: "2024 - 2026",
  },
  {
    name: "Council Member 4",
    role: "Council Member",
    term: "2024 - 2026",
  },
  {
    name: "Council Member 5",
    role: "Council Member",
    term: "2024 - 2026",
  },
];

const managementTeam = [
  {
    name: "Property Manager",
    role: "Property Manager",
    responsibilities: "Overall management and operations",
  },
  {
    name: "Assistant Manager",
    role: "Assistant Property Manager",
    responsibilities: "Day-to-day operations and resident relations",
  },
  {
    name: "Accounts Executive",
    role: "Accounts Executive",
    responsibilities: "Financial management and billing",
  },
];

const managingAgent = {
  name: "Managing Agent Name",
  address: "Managing Agent Address, Singapore",
  phone: "+65 6763 8978",
  email: "thetennery.cm@gmail.com",
  website: "",
  description: "Professional property management services for residential condominiums in Singapore.",
};

export default function TeamPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBFC]">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-[#BA006F] text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-8 w-8" />
              <h1 className="text-3xl md:text-4xl font-bold">Our Team</h1>
            </div>
            <p className="text-white/80 max-w-2xl">
              Meet the dedicated team behind the tennery&apos;s management and operations.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Council Members */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#BA006F]/10 flex items-center justify-center">
                <Users className="h-5 w-5 text-[#BA006F]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#58595B]">Management Council</h2>
                <p className="text-[#939497]">Elected representatives of the tennery</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {councilMembers.map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-full bg-[#BA006F]/10 flex items-center justify-center">
                        <span className="text-[#BA006F] font-semibold text-lg">
                          {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#58595B]">{member.name}</h3>
                        <p className="text-[#BA006F] font-medium text-sm">{member.role}</p>
                        <p className="text-[#939497] text-xs">Term: {member.term}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Management Team */}
          <section className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#BA006F]/10 flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-[#BA006F]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#58595B]">Management Team</h2>
                <p className="text-[#939497]">Professional staff managing daily operations</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {managementTeam.map((member, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-3">
                      <div className="w-14 h-14 rounded-full bg-[#58595B]/10 flex items-center justify-center">
                        <span className="text-[#58595B] font-semibold text-lg">
                          {member.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-[#58595B]">{member.name}</h3>
                        <p className="text-[#BA006F] font-medium text-sm">{member.role}</p>
                      </div>
                    </div>
                    <p className="text-[#939497] text-sm">{member.responsibilities}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Managing Agent */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-lg bg-[#BA006F]/10 flex items-center justify-center">
                <Building2 className="h-5 w-5 text-[#BA006F]" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-[#58595B]">Managing Agent</h2>
                <p className="text-[#939497]">Our appointed property management company</p>
              </div>
            </div>
            <Card className="hover:shadow-lg transition-shadow">
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-bold text-[#58595B] mb-2">{managingAgent.name}</h3>
                    <p className="text-[#939497] mb-6">{managingAgent.description}</p>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-[#58595B]">
                        <Building2 className="h-5 w-5 text-[#BA006F]" />
                        <span>{managingAgent.address}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[#58595B]">
                        <Phone className="h-5 w-5 text-[#BA006F]" />
                        <span>{managingAgent.phone}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[#58595B]">
                        <Mail className="h-5 w-5 text-[#BA006F]" />
                        <span>{managingAgent.email}</span>
                      </div>
                    </div>
                  </div>
                  <div className="bg-[#FDFBFC] rounded-lg p-6">
                    <h4 className="font-semibold text-[#58595B] mb-4">Office Hours</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-[#939497]">Monday - Friday</span>
                        <span className="text-[#58595B] font-medium">9:00 AM - 6:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#939497]">Saturday</span>
                        <span className="text-[#58595B] font-medium">9:00 AM - 1:00 PM</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#939497]">Sunday & Public Holidays</span>
                        <span className="text-[#58595B] font-medium">Closed</span>
                      </div>
                    </div>
                    <div className="mt-6 pt-4 border-t border-[#939497]/20">
                      <p className="text-sm text-[#939497]">
                        For emergencies outside office hours, please contact the security guardhouse.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
