"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Megaphone,
  Monitor,
  Newspaper,
  ShoppingBag,
  Users,
  CheckCircle,
  Send,
} from "lucide-react";

const adTypes = [
  {
    id: "digital",
    name: "Digital Display",
    icon: Monitor,
    description: "Advertise on our lobby digital screens",
    price: "From $50/week",
    features: ["High visibility", "Rotating display", "Full color graphics"],
  },
  {
    id: "physical",
    name: "Notice Board",
    icon: Newspaper,
    description: "Physical flyers on community notice boards",
    price: "From $20/week",
    features: ["A4 size", "Strategic locations", "2-week minimum"],
  },
  {
    id: "group-order",
    name: "Group Order",
    icon: ShoppingBag,
    description: "Offer group buy deals to residents",
    price: "Commission based",
    features: ["Direct to residents", "Bulk discounts", "Delivery coordination"],
  },
];

export default function AdvertisePage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    businessName: "",
    contactName: "",
    email: "",
    phone: "",
    adType: "",
    title: "",
    description: "",
    duration: "1",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would submit to an API
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Header />
        <main className="flex-1 flex items-center justify-center p-4">
          <Card className="max-w-md w-full text-center">
            <CardContent className="pt-8 pb-8">
              <div className="w-16 h-16 bg-[#BA006F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-[#BA006F]" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Request Submitted!</h2>
              <p className="text-gray-500 mb-6">
                Thank you for your interest in advertising at The Tennery. Our management team will review your request and contact you within 3-5 business days. You may also reach us at thetennery.cm@gmail.com.
              </p>
              <Button onClick={() => setSubmitted(false)} variant="outline">
                Submit Another Request
              </Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-gradient-to-br from-[#BA006F] to-[#8a0052] text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3 mb-4">
              <Megaphone className="h-8 w-8" />
              <h1 className="text-3xl md:text-4xl font-bold">Advertise With Us</h1>
            </div>
            <p className="text-white/80 max-w-2xl">
              Reach over 300 households at The Tennery. Perfect for local businesses, services, and group buy organizers.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-[#BA006F]">338</p>
                <p className="text-sm text-gray-500">Residential Units</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-[#BA006F]">1000+</p>
                <p className="text-sm text-gray-500">Residents</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 text-center">
                <p className="text-3xl font-bold text-[#BA006F]">D23</p>
                <p className="text-sm text-gray-500">Dairy Farm / Bukit Panjang / Choa Chu Kang</p>
              </CardContent>
            </Card>
          </div>

          {/* Ad Types */}
          <h2 className="text-xl font-bold mb-4">Advertising Options</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {adTypes.map((type) => (
              <Card
                key={type.id}
                className={`cursor-pointer transition-all ${
                  formData.adType === type.id
                    ? "ring-2 ring-[#BA006F] shadow-lg"
                    : "hover:shadow-md"
                }`}
                onClick={() => setFormData({ ...formData, adType: type.id })}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-[#BA006F]/10 flex items-center justify-center">
                      <type.icon className="h-6 w-6 text-[#BA006F]" />
                    </div>
                    {formData.adType === type.id && (
                      <Badge variant="success">Selected</Badge>
                    )}
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{type.name}</h3>
                  <p className="text-gray-500 text-sm mb-3">{type.description}</p>
                  <p className="font-medium text-[#BA006F] mb-3">{type.price}</p>
                  <ul className="space-y-1">
                    {type.features.map((feature, index) => (
                      <li key={index} className="text-sm text-gray-600 flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-[#BA006F]" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Application Form */}
          <Card>
            <CardHeader>
              <CardTitle>Submit Your Advertisement Request</CardTitle>
              <CardDescription>
                Fill out the form below and our team will get back to you with pricing and availability.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Business Name *
                    </label>
                    <Input
                      required
                      value={formData.businessName}
                      onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                      placeholder="Your business name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contact Person *
                    </label>
                    <Input
                      required
                      value={formData.contactName}
                      onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <Input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+65 9123 4567"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Advertisement Type *
                  </label>
                  <Select
                    required
                    value={formData.adType}
                    onChange={(e) => setFormData({ ...formData, adType: e.target.value })}
                  >
                    <option value="">Select an option</option>
                    <option value="digital">Digital Display</option>
                    <option value="physical">Notice Board</option>
                    <option value="group-order">Group Order</option>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Advertisement Title *
                  </label>
                  <Input
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g., 20% Off Home Cleaning Services"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description *
                  </label>
                  <Textarea
                    required
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your product, service, or offer..."
                    rows={4}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Preferred Duration
                  </label>
                  <Select
                    value={formData.duration}
                    onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  >
                    <option value="1">1 week</option>
                    <option value="2">2 weeks</option>
                    <option value="4">1 month</option>
                    <option value="12">3 months</option>
                  </Select>
                </div>

                <Button type="submit" size="lg" className="w-full md:w-auto">
                  <Send className="h-4 w-4 mr-2" />
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}
