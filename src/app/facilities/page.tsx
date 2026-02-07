"use client";

import { useState } from "react";
import Link from "next/link";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Waves,
  Dumbbell,
  TreePine,
  Users,
  Car,
  Gamepad2,
  Baby,
  Clock,
  DollarSign,
  Info,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Flame,
  UtensilsCrossed,
  PartyPopper,
  MessageSquare,
  Sparkles,
  CheckCircle,
} from "lucide-react";

// Time slots available for booking
const timeSlots = [
  { id: "morning", name: "Morning Session", startTime: "10:00", endTime: "15:00" },
  { id: "evening", name: "Evening Session", startTime: "17:00", endTime: "22:00" },
];

// Primary Facilities - 1 free booking per month for residents
const primaryFacilities = [
  {
    id: "bbq-pod",
    name: "BBQ Pod",
    icon: Flame,
    category: "PRIMARY",
    description: "Modern BBQ pod with built-in grill, sink, and comfortable seating area for gatherings.",
    capacity: 15,
    freeQuotaPerMonth: 1,
    residentChargeAfterQuota: 20,
    publicHourlyRate: 25,
    depositAmount: 50,
    hours: "10:00 AM - 10:00 PM",
    rules: ["Clean up after use", "No loud music after 10 PM", "Dispose of charcoal properly"],
    bookable: true,
  },
  {
    id: "dining-pod",
    name: "Dining Pod",
    icon: UtensilsCrossed,
    category: "PRIMARY",
    description: "Elegant covered dining pod perfect for family meals and small celebrations.",
    capacity: 12,
    freeQuotaPerMonth: 1,
    residentChargeAfterQuota: 20,
    publicHourlyRate: 25,
    depositAmount: 50,
    hours: "10:00 AM - 10:00 PM",
    rules: ["Clean up after use", "No cooking - for dining only", "Report any damages"],
    bookable: true,
  },
  {
    id: "entertainment-pavilion",
    name: "Entertainment Pavilion",
    icon: PartyPopper,
    category: "PRIMARY",
    description: "Spacious pavilion with AV equipment, ideal for parties and events.",
    capacity: 30,
    freeQuotaPerMonth: 1,
    residentChargeAfterQuota: 20,
    publicHourlyRate: 30,
    depositAmount: 100,
    hours: "10:00 AM - 10:00 PM",
    rules: ["No smoking", "Clean up after use", "Music volume must be reasonable", "Report any damages immediately"],
    bookable: true,
  },
];

// Secondary Facilities - 2 free bookings per month for residents
const secondaryFacilities = [
  {
    id: "meeting-pod-1",
    name: "Outdoor Meeting Pod 1",
    icon: MessageSquare,
    category: "SECONDARY",
    description: "Shaded outdoor meeting pod with seating for small group discussions.",
    capacity: 6,
    freeQuotaPerMonth: 2,
    residentChargeAfterQuota: 20,
    publicHourlyRate: 15,
    depositAmount: 0,
    hours: "8:00 AM - 10:00 PM",
    rules: ["Keep noise levels reasonable", "Clean up after use"],
    bookable: true,
  },
  {
    id: "meeting-pod-2",
    name: "Outdoor Meeting Pod 2",
    icon: MessageSquare,
    category: "SECONDARY",
    description: "Shaded outdoor meeting pod with seating for small group discussions.",
    capacity: 6,
    freeQuotaPerMonth: 2,
    residentChargeAfterQuota: 20,
    publicHourlyRate: 15,
    depositAmount: 0,
    hours: "8:00 AM - 10:00 PM",
    rules: ["Keep noise levels reasonable", "Clean up after use"],
    bookable: true,
  },
  {
    id: "meeting-pod-3",
    name: "Outdoor Meeting Pod 3",
    icon: MessageSquare,
    category: "SECONDARY",
    description: "Shaded outdoor meeting pod with seating for small group discussions.",
    capacity: 6,
    freeQuotaPerMonth: 2,
    residentChargeAfterQuota: 20,
    publicHourlyRate: 15,
    depositAmount: 0,
    hours: "8:00 AM - 10:00 PM",
    rules: ["Keep noise levels reasonable", "Clean up after use"],
    bookable: true,
  },
  {
    id: "meeting-pod-4",
    name: "Outdoor Meeting Pod 4",
    icon: MessageSquare,
    category: "SECONDARY",
    description: "Shaded outdoor meeting pod with seating for small group discussions.",
    capacity: 6,
    freeQuotaPerMonth: 2,
    residentChargeAfterQuota: 20,
    publicHourlyRate: 15,
    depositAmount: 0,
    hours: "8:00 AM - 10:00 PM",
    rules: ["Keep noise levels reasonable", "Clean up after use"],
    bookable: true,
  },
  {
    id: "meeting-pod-5",
    name: "Outdoor Meeting Pod 5",
    icon: MessageSquare,
    category: "SECONDARY",
    description: "Shaded outdoor meeting pod with seating for small group discussions.",
    capacity: 6,
    freeQuotaPerMonth: 2,
    residentChargeAfterQuota: 20,
    publicHourlyRate: 15,
    depositAmount: 0,
    hours: "8:00 AM - 10:00 PM",
    rules: ["Keep noise levels reasonable", "Clean up after use"],
    bookable: true,
  },
  {
    id: "meeting-pod-6",
    name: "Outdoor Meeting Pod 6",
    icon: MessageSquare,
    category: "SECONDARY",
    description: "Shaded outdoor meeting pod with seating for small group discussions.",
    capacity: 6,
    freeQuotaPerMonth: 2,
    residentChargeAfterQuota: 20,
    publicHourlyRate: 15,
    depositAmount: 0,
    hours: "8:00 AM - 10:00 PM",
    rules: ["Keep noise levels reasonable", "Clean up after use"],
    bookable: true,
  },
  {
    id: "meeting-pod-7",
    name: "Outdoor Meeting Pod 7",
    icon: MessageSquare,
    category: "SECONDARY",
    description: "Shaded outdoor meeting pod with seating for small group discussions.",
    capacity: 6,
    freeQuotaPerMonth: 2,
    residentChargeAfterQuota: 20,
    publicHourlyRate: 15,
    depositAmount: 0,
    hours: "8:00 AM - 10:00 PM",
    rules: ["Keep noise levels reasonable", "Clean up after use"],
    bookable: true,
  },
  {
    id: "spa-pod",
    name: "Outdoor SPA Pod",
    icon: Sparkles,
    category: "SECONDARY",
    description: "Relaxing outdoor spa pod with jacuzzi facilities for residents.",
    capacity: 4,
    freeQuotaPerMonth: 2,
    residentChargeAfterQuota: 20,
    publicHourlyRate: 20,
    depositAmount: 50,
    hours: "10:00 AM - 10:00 PM",
    rules: ["Proper swimwear required", "Shower before use", "Maximum 4 persons", "No food or drinks"],
    bookable: true,
  },
];

// Non-bookable amenities
const openFacilities = [
  {
    id: "swimming-pool",
    name: "Swimming Pool",
    icon: Waves,
    category: "OPEN",
    description: "Lap pool and children's wading pool with sun deck area.",
    capacity: 30,
    hours: "7:00 AM - 10:00 PM",
    rules: ["No diving", "Children under 12 must be accompanied", "Proper swimwear required"],
    bookable: false,
  },
  {
    id: "gymnasium",
    name: "Gymnasium",
    icon: Dumbbell,
    category: "OPEN",
    description: "Fully equipped fitness center with cardio machines, free weights, and strength equipment.",
    capacity: 15,
    hours: "6:00 AM - 11:00 PM",
    rules: ["Proper attire required", "Wipe equipment after use", "No food or drinks except water"],
    bookable: false,
  },
  {
    id: "playground",
    name: "Children's Playground",
    icon: Baby,
    category: "OPEN",
    description: "Safe playground area with modern equipment for children aged 3-12.",
    capacity: 20,
    hours: "8:00 AM - 8:00 PM",
    rules: ["Adult supervision required", "For children aged 3-12 only", "No food in play area"],
    bookable: false,
  },
];

// Combined facilities for display
const facilities = [...primaryFacilities, ...secondaryFacilities, ...openFacilities];

// Mock existing bookings for availability display
const existingBookings = [
  { facilityId: "bbq-pod", date: "2026-02-15", timeSlot: "morning" },
  { facilityId: "bbq-pod", date: "2026-02-15", timeSlot: "evening" },
  { facilityId: "dining-pod", date: "2026-02-16", timeSlot: "morning" },
  { facilityId: "entertainment-pavilion", date: "2026-02-20", timeSlot: "evening" },
  { facilityId: "meeting-pod-1", date: "2026-02-18", timeSlot: "morning" },
  { facilityId: "spa-pod", date: "2026-02-19", timeSlot: "evening" },
];

export default function FacilitiesPage() {
  const [selectedFacility, setSelectedFacility] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [showPublicBookingForm, setShowPublicBookingForm] = useState(false);
  const [publicBookingForm, setPublicBookingForm] = useState({
    name: "",
    email: "",
    phone: "",
    timeSlot: "",
    customStartTime: "",
    customEndTime: "",
    notes: "",
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);

  const facility = facilities.find((f) => f.id === selectedFacility);

  // Check availability for a specific date and facility
  const isSlotAvailable = (facilityId: string, date: string, slotId: string) => {
    return !existingBookings.some(
      (b) => b.facilityId === facilityId && b.date === date && b.timeSlot === slotId
    );
  };

  // Calculate hours for public booking
  const calculatePublicCost = () => {
    if (!facility || !("publicHourlyRate" in facility)) return 0;
    const slot = timeSlots.find((s) => s.id === publicBookingForm.timeSlot);
    if (!slot) return 0;
    const startHour = parseInt(slot.startTime.split(":")[0]);
    const endHour = parseInt(slot.endTime.split(":")[0]);
    const hours = endHour - startHour;
    return hours * (facility.publicHourlyRate as number);
  };

  const handlePublicBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setShowPublicBookingForm(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />

      <main className="flex-1">
        {/* Header */}
        <section className="bg-[#BA006F] text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Our Facilities</h1>
            <p className="text-white/80 max-w-2xl">
              Explore and book our premium amenities. Residents can log in to make bookings with PayNow payment.
            </p>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {selectedFacility && facility ? (
            /* Facility Detail View */
            <div>
              <button
                onClick={() => setSelectedFacility(null)}
                className="flex items-center text-[#BA006F] hover:text-[#8a0052] mb-6"
              >
                <ChevronLeft className="h-5 w-5 mr-1" />
                Back to all facilities
              </button>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="md:col-span-2">
                  <Card>
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-16 h-16 rounded-xl bg-[#BA006F]/10 flex items-center justify-center">
                            <facility.icon className="h-8 w-8 text-[#BA006F]" />
                          </div>
                          <div>
                            <CardTitle className="text-2xl">{facility.name}</CardTitle>
                            <p className="text-gray-500 mt-1">{facility.description}</p>
                          </div>
                        </div>
                        {facility.bookable && (
                          <Badge variant="success">Bookable</Badge>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                            <Users className="h-4 w-4" />
                            Capacity
                          </div>
                          <p className="font-semibold">{facility.capacity} pax</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                            <Clock className="h-4 w-4" />
                            Hours
                          </div>
                          <p className="font-semibold text-sm">{facility.hours}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                            <DollarSign className="h-4 w-4" />
                            Public Rate
                          </div>
                          <p className="font-semibold">
                            {"publicHourlyRate" in facility ? `$${facility.publicHourlyRate}/hr` : "N/A"}
                          </p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                            <DollarSign className="h-4 w-4" />
                            Deposit
                          </div>
                          <p className="font-semibold">
                            {"depositAmount" in facility && (facility as { depositAmount: number }).depositAmount > 0 ? `$${(facility as { depositAmount: number }).depositAmount}` : "None"}
                          </p>
                        </div>
                      </div>

                      {/* Pricing Info for Bookable Facilities */}
                      {facility.bookable && "category" in facility && (
                        <div className="bg-[#BA006F]/5 rounded-lg p-4 mb-6">
                          <h4 className="font-semibold text-[#BA006F] mb-2">Pricing Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Category</span>
                              <Badge variant={facility.category === "PRIMARY" ? "default" : "secondary"}>
                                {facility.category}
                              </Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Resident Free Quota</span>
                              <span className="font-medium">{"freeQuotaPerMonth" in facility ? `${facility.freeQuotaPerMonth} booking(s)/month` : "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">After Quota (Residents)</span>
                              <span className="font-medium">{"residentChargeAfterQuota" in facility ? `$${facility.residentChargeAfterQuota}/session` : "N/A"}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Public Booking</span>
                              <span className="font-medium">{"publicHourlyRate" in facility ? `$${facility.publicHourlyRate}/hour` : "N/A"}</span>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Time Slots */}
                      {facility.bookable && (
                        <div className="bg-gray-50 rounded-lg p-4 mb-6">
                          <h4 className="font-semibold mb-2">Available Time Slots</h4>
                          <div className="space-y-2">
                            {timeSlots.map((slot) => (
                              <div key={slot.id} className="flex items-center justify-between text-sm">
                                <span className="text-gray-600">{slot.name}</span>
                                <span className="font-medium">{slot.startTime} - {slot.endTime}</span>
                              </div>
                            ))}
                            <p className="text-xs text-gray-500 mt-2">
                              * Custom time slots available upon request
                            </p>
                          </div>
                        </div>
                      )}

                      <div className="border-t pt-6">
                        <h3 className="font-semibold mb-3 flex items-center gap-2">
                          <Info className="h-5 w-5 text-gray-400" />
                          Rules & Guidelines
                        </h3>
                        <ul className="space-y-2">
                          {facility.rules.map((rule, index) => (
                            <li key={index} className="flex items-start gap-2 text-gray-600">
                              <span className="text-[#BA006F] mt-1">•</span>
                              {rule}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  {/* Check Availability Card */}
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        Check Availability
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      {facility.bookable ? (
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Select Date
                            </label>
                            <Input
                              type="date"
                              value={selectedDate}
                              onChange={(e) => setSelectedDate(e.target.value)}
                              min={new Date().toISOString().split("T")[0]}
                            />
                          </div>

                          {selectedDate && (
                            <div className="space-y-2">
                              <p className="text-sm font-medium text-gray-700">Available Slots:</p>
                              {timeSlots.map((slot) => {
                                const available = isSlotAvailable(facility.id, selectedDate, slot.id);
                                return (
                                  <div
                                    key={slot.id}
                                    className={`flex items-center justify-between p-3 rounded-lg border ${
                                      available
                                        ? "border-green-200 bg-green-50"
                                        : "border-red-200 bg-red-50"
                                    }`}
                                  >
                                    <div>
                                      <p className="font-medium">{slot.name}</p>
                                      <p className="text-sm text-gray-500">
                                        {slot.startTime} - {slot.endTime}
                                      </p>
                                    </div>
                                    <Badge variant={available ? "success" : "destructive"}>
                                      {available ? "Available" : "Booked"}
                                    </Badge>
                                  </div>
                                );
                              })}
                            </div>
                          )}

                          <div className="border-t pt-4 space-y-3">
                            <p className="text-sm text-gray-600">
                              <strong>Residents:</strong> Log in to book with your free monthly quota.
                            </p>
                            <Link href="/login">
                              <Button className="w-full">
                                Resident Login
                              </Button>
                            </Link>
                            <Button
                              variant="outline"
                              className="w-full"
                              onClick={() => setShowPublicBookingForm(true)}
                            >
                              Public Booking Request
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-4">
                          <p className="text-gray-500 mb-4">
                            This facility is available for all residents without booking.
                          </p>
                          <Badge variant="secondary">No Booking Required</Badge>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>
              </div>
            </div>
          ) : (
            /* Facilities Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {facilities.map((facility) => (
                <Card
                  key={facility.id}
                  className="cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => setSelectedFacility(facility.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-[#BA006F]/10 flex items-center justify-center">
                        <facility.icon className="h-6 w-6 text-[#BA006F]" />
                      </div>
                      {facility.bookable ? (
                        <Badge variant="success">Bookable</Badge>
                      ) : (
                        <Badge variant="secondary">Open Access</Badge>
                      )}
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{facility.name}</h3>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">
                      {facility.description}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">
                        <Users className="h-4 w-4 inline mr-1" />
                        {facility.capacity} pax
                      </span>
                      <span className="font-medium text-[#BA006F]">
                        {"category" in facility ? facility.category : "Open Access"}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Public Booking Request Modal */}
      {showPublicBookingForm && facility && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Public Booking Request</CardTitle>
              <button onClick={() => setShowPublicBookingForm(false)}>
                <ChevronLeft className="h-5 w-5 text-gray-500" />
              </button>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePublicBookingSubmit} className="space-y-4">
                <div className="bg-[#BA006F]/5 p-4 rounded-lg mb-4">
                  <p className="font-medium text-[#58595B]">{facility.name}</p>
                  <p className="text-sm text-gray-500">Date: {selectedDate || "Not selected"}</p>
                  {"publicHourlyRate" in facility && (
                    <p className="text-sm text-[#BA006F] font-medium mt-1">
                      Public Rate: ${(facility as { publicHourlyRate: number }).publicHourlyRate}/hour
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <Input
                    required
                    value={publicBookingForm.name}
                    onChange={(e) => setPublicBookingForm({ ...publicBookingForm, name: e.target.value })}
                    placeholder="Your full name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address *
                  </label>
                  <Input
                    type="email"
                    required
                    value={publicBookingForm.email}
                    onChange={(e) => setPublicBookingForm({ ...publicBookingForm, email: e.target.value })}
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number *
                  </label>
                  <Input
                    type="tel"
                    required
                    value={publicBookingForm.phone}
                    onChange={(e) => setPublicBookingForm({ ...publicBookingForm, phone: e.target.value })}
                    placeholder="+65 9123 4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time Slot *
                  </label>
                  <div className="space-y-2">
                    {timeSlots.map((slot) => {
                      const available = selectedDate ? isSlotAvailable(facility.id, selectedDate, slot.id) : true;
                      return (
                        <label
                          key={slot.id}
                          className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                            publicBookingForm.timeSlot === slot.id
                              ? "border-[#BA006F] bg-[#BA006F]/5"
                              : available
                              ? "border-gray-200 hover:border-[#BA006F]/50"
                              : "border-gray-200 bg-gray-100 cursor-not-allowed opacity-60"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="publicTimeSlot"
                              value={slot.id}
                              checked={publicBookingForm.timeSlot === slot.id}
                              onChange={(e) => setPublicBookingForm({ ...publicBookingForm, timeSlot: e.target.value })}
                              disabled={!available}
                              className="text-[#BA006F]"
                            />
                            <div>
                              <p className="font-medium">{slot.name}</p>
                              <p className="text-sm text-gray-500">{slot.startTime} - {slot.endTime}</p>
                            </div>
                          </div>
                          {!available && <Badge variant="secondary">Booked</Badge>}
                        </label>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Additional Notes
                  </label>
                  <Input
                    value={publicBookingForm.notes}
                    onChange={(e) => setPublicBookingForm({ ...publicBookingForm, notes: e.target.value })}
                    placeholder="Any special requests..."
                  />
                </div>

                {publicBookingForm.timeSlot && "publicHourlyRate" in facility && (
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500">Estimated Cost:</span>
                      <span className="font-bold text-lg">${calculatePublicCost()}</span>
                    </div>
                    <p className="text-xs text-gray-500">
                      * Final amount will be confirmed by management
                    </p>
                  </div>
                )}

                <Button type="submit" className="w-full">
                  Submit Booking Request
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  Our management will contact you within 1-2 business days to confirm your booking and arrange payment.
                </p>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Booking Submitted Success */}
      {bookingSubmitted && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md text-center">
            <CardContent className="pt-8 pb-8">
              <div className="w-16 h-16 bg-[#BA006F]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-[#BA006F]" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Request Submitted!</h2>
              <p className="text-gray-500 mb-6">
                Thank you for your booking request. Our management team will review your request and contact you at {publicBookingForm.email} within 1-2 business days.
              </p>
              <Button onClick={() => {
                setBookingSubmitted(false);
                setPublicBookingForm({ name: "", email: "", phone: "", timeSlot: "", customStartTime: "", customEndTime: "", notes: "" });
              }}>
                Close
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
