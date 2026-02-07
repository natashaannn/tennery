"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Clock,
  Users,
  DollarSign,
  Plus,
  X,
  QrCode,
  CheckCircle,
  Flame,
  UtensilsCrossed,
  PartyPopper,
  MessageSquare,
  Sparkles,
  Info,
} from "lucide-react";

// Time slot options
const timeSlotOptions = [
  { id: "morning", name: "Morning Session", startTime: "10:00", endTime: "15:00" },
  { id: "evening", name: "Evening Session", startTime: "17:00", endTime: "22:00" },
  { id: "custom", name: "Custom Time (Request)", startTime: "", endTime: "" },
];

// Primary Facilities - 1 free booking per month
const primaryFacilities = [
  { id: "bbq-pod", name: "BBQ Pod", icon: Flame, category: "PRIMARY", freeQuota: 1, chargeAfterQuota: 20, deposit: 50, capacity: 15 },
  { id: "dining-pod", name: "Dining Pod", icon: UtensilsCrossed, category: "PRIMARY", freeQuota: 1, chargeAfterQuota: 20, deposit: 50, capacity: 12 },
  { id: "entertainment-pavilion", name: "Entertainment Pavilion", icon: PartyPopper, category: "PRIMARY", freeQuota: 1, chargeAfterQuota: 20, deposit: 100, capacity: 30 },
];

// Secondary Facilities - 2 free bookings per month
const secondaryFacilities = [
  { id: "meeting-pod-1", name: "Outdoor Meeting Pod 1", icon: MessageSquare, category: "SECONDARY", freeQuota: 2, chargeAfterQuota: 20, deposit: 0, capacity: 6 },
  { id: "meeting-pod-2", name: "Outdoor Meeting Pod 2", icon: MessageSquare, category: "SECONDARY", freeQuota: 2, chargeAfterQuota: 20, deposit: 0, capacity: 6 },
  { id: "meeting-pod-3", name: "Outdoor Meeting Pod 3", icon: MessageSquare, category: "SECONDARY", freeQuota: 2, chargeAfterQuota: 20, deposit: 0, capacity: 6 },
  { id: "meeting-pod-4", name: "Outdoor Meeting Pod 4", icon: MessageSquare, category: "SECONDARY", freeQuota: 2, chargeAfterQuota: 20, deposit: 0, capacity: 6 },
  { id: "meeting-pod-5", name: "Outdoor Meeting Pod 5", icon: MessageSquare, category: "SECONDARY", freeQuota: 2, chargeAfterQuota: 20, deposit: 0, capacity: 6 },
  { id: "meeting-pod-6", name: "Outdoor Meeting Pod 6", icon: MessageSquare, category: "SECONDARY", freeQuota: 2, chargeAfterQuota: 20, deposit: 0, capacity: 6 },
  { id: "meeting-pod-7", name: "Outdoor Meeting Pod 7", icon: MessageSquare, category: "SECONDARY", freeQuota: 2, chargeAfterQuota: 20, deposit: 0, capacity: 6 },
  { id: "spa-pod", name: "Outdoor SPA Pod", icon: Sparkles, category: "SECONDARY", freeQuota: 2, chargeAfterQuota: 20, deposit: 50, capacity: 4 },
];

const facilities = [...primaryFacilities, ...secondaryFacilities];

// Mock data for user's quota usage this month
const quotaUsage = {
  "bbq-pod": 0,
  "dining-pod": 1,
  "entertainment-pavilion": 0,
  "meeting-pod-1": 1,
  "meeting-pod-2": 0,
  "meeting-pod-3": 0,
  "meeting-pod-4": 0,
  "meeting-pod-5": 0,
  "meeting-pod-6": 0,
  "meeting-pod-7": 0,
  "spa-pod": 2,
};

// Mock bookings for availability display
const existingBookings = [
  { facilityId: "bbq-pod", date: "2026-02-15", timeSlot: "morning" },
  { facilityId: "bbq-pod", date: "2026-02-15", timeSlot: "evening" },
  { facilityId: "dining-pod", date: "2026-02-16", timeSlot: "morning" },
  { facilityId: "entertainment-pavilion", date: "2026-02-20", timeSlot: "evening" },
];

const myBookings = [
  {
    id: "1",
    facility: "BBQ Pod",
    date: "2026-02-15",
    startTime: "10:00",
    endTime: "15:00",
    timeSlot: "Morning Session",
    status: "confirmed",
    totalAmount: 0,
    isFreeQuota: true,
    depositPaid: true,
  },
  {
    id: "2",
    facility: "Dining Pod",
    date: "2026-02-22",
    startTime: "17:00",
    endTime: "22:00",
    timeSlot: "Evening Session",
    status: "pending",
    totalAmount: 20,
    isFreeQuota: false,
    depositPaid: false,
  },
];

export default function BookingsPage() {
  const [showNewBooking, setShowNewBooking] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const [showAvailability, setShowAvailability] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<typeof myBookings[0] | null>(null);
  const [bookingForm, setBookingForm] = useState({
    facility: "",
    date: "",
    timeSlot: "",
    customStartTime: "",
    customEndTime: "",
    notes: "",
  });

  const selectedFacility = facilities.find((f) => f.id === bookingForm.facility);
  const selectedTimeSlot = timeSlotOptions.find((t) => t.id === bookingForm.timeSlot);

  // Check if user has free quota remaining
  const hasQuotaRemaining = () => {
    if (!selectedFacility) return false;
    const used = quotaUsage[selectedFacility.id as keyof typeof quotaUsage] || 0;
    return used < selectedFacility.freeQuota;
  };

  // Calculate total based on quota
  const calculateTotal = () => {
    if (!selectedFacility || !bookingForm.timeSlot) return { fee: 0, deposit: selectedFacility?.deposit || 0, isFree: false };
    const isFree = hasQuotaRemaining();
    const fee = isFree ? 0 : selectedFacility.chargeAfterQuota;
    return { fee, deposit: selectedFacility.deposit, isFree };
  };

  // Check availability for a specific date and facility
  const isSlotAvailable = (facilityId: string, date: string, slotId: string) => {
    return !existingBookings.some(
      (b) => b.facilityId === facilityId && b.date === date && b.timeSlot === slotId
    );
  };

  const handleSubmitBooking = () => {
    setShowNewBooking(false);
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    setShowPayment(false);
    setBookingForm({ facility: "", date: "", timeSlot: "", customStartTime: "", customEndTime: "", notes: "" });
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Facility Booking</h1>
          <p className="text-gray-500">Book and manage your facility reservations</p>
        </div>
        <Button onClick={() => setShowNewBooking(true)}>
          <Plus className="h-4 w-4 mr-2" />
          New Booking
        </Button>
      </div>

      {/* My Bookings */}
      <Card>
        <CardHeader>
          <CardTitle>My Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col md:flex-row md:items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-semibold">{booking.facility}</h3>
                    <Badge
                      variant={
                        booking.status === "confirmed"
                          ? "success"
                          : booking.status === "pending"
                          ? "warning"
                          : "secondary"
                      }
                    >
                      {booking.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(booking.date).toLocaleDateString("en-SG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {booking.startTime} - {booking.endTime}
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="h-4 w-4" />
                      ${booking.totalAmount}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2 mt-4 md:mt-0">
                  {!booking.depositPaid && (
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedBooking(booking);
                        setShowPayment(true);
                      }}
                    >
                      Pay Deposit
                    </Button>
                  )}
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* New Booking Modal */}
      {showNewBooking && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>New Facility Booking</CardTitle>
              <button onClick={() => setShowNewBooking(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Facility
                </label>
                <Select
                  value={bookingForm.facility}
                  onChange={(e) => setBookingForm({ ...bookingForm, facility: e.target.value, timeSlot: "" })}
                >
                  <option value="">Choose a facility</option>
                  <optgroup label="Primary Facilities (1 free/month)">
                    {primaryFacilities.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </optgroup>
                  <optgroup label="Secondary Facilities (2 free/month)">
                    {secondaryFacilities.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </optgroup>
                </Select>
              </div>

              {selectedFacility && (
                <div className="bg-[#BA006F]/5 p-4 rounded-lg text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Category:</span>
                    <Badge variant={selectedFacility.category === "PRIMARY" ? "default" : "secondary"}>
                      {selectedFacility.category}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-medium">{selectedFacility.capacity} pax</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Free Quota:</span>
                    <span className="font-medium">{selectedFacility.freeQuota} booking(s)/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Your Usage This Month:</span>
                    <span className="font-medium">{quotaUsage[selectedFacility.id as keyof typeof quotaUsage] || 0} used</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Deposit Required:</span>
                    <span className="font-medium">{selectedFacility.deposit > 0 ? `$${selectedFacility.deposit}` : "None"}</span>
                  </div>
                  {hasQuotaRemaining() ? (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-2 rounded mt-2">
                      <CheckCircle className="h-4 w-4" />
                      <span className="text-sm font-medium">You have free quota remaining!</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-[#BA006F] bg-[#BA006F]/10 p-2 rounded mt-2">
                      <Info className="h-4 w-4" />
                      <span className="text-sm">Quota used. Booking fee: ${selectedFacility.chargeAfterQuota}</span>
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <Input
                  type="date"
                  value={bookingForm.date}
                  onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value, timeSlot: "" })}
                  min={new Date().toISOString().split("T")[0]}
                />
              </div>

              {selectedFacility && bookingForm.date && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Time Slot
                  </label>
                  <div className="space-y-2">
                    {timeSlotOptions.map((slot) => {
                      const available = slot.id === "custom" || isSlotAvailable(selectedFacility.id, bookingForm.date, slot.id);
                      return (
                        <label
                          key={slot.id}
                          className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                            bookingForm.timeSlot === slot.id
                              ? "border-[#BA006F] bg-[#BA006F]/5"
                              : available
                              ? "border-gray-200 hover:border-[#BA006F]/50"
                              : "border-gray-200 bg-gray-100 cursor-not-allowed opacity-60"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="timeSlot"
                              value={slot.id}
                              checked={bookingForm.timeSlot === slot.id}
                              onChange={(e) => setBookingForm({ ...bookingForm, timeSlot: e.target.value })}
                              disabled={!available}
                              className="text-[#BA006F]"
                            />
                            <div>
                              <p className="font-medium">{slot.name}</p>
                              {slot.startTime && (
                                <p className="text-sm text-gray-500">{slot.startTime} - {slot.endTime}</p>
                              )}
                            </div>
                          </div>
                          {!available && (
                            <Badge variant="secondary">Booked</Badge>
                          )}
                        </label>
                      );
                    })}
                  </div>
                </div>
              )}

              {bookingForm.timeSlot === "custom" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Custom Start Time
                    </label>
                    <Input
                      type="time"
                      value={bookingForm.customStartTime}
                      onChange={(e) => setBookingForm({ ...bookingForm, customStartTime: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Custom End Time
                    </label>
                    <Input
                      type="time"
                      value={bookingForm.customEndTime}
                      onChange={(e) => setBookingForm({ ...bookingForm, customEndTime: e.target.value })}
                    />
                  </div>
                  <p className="col-span-2 text-xs text-gray-500">
                    * Custom time requests are subject to approval
                  </p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <Textarea
                  value={bookingForm.notes}
                  onChange={(e) => setBookingForm({ ...bookingForm, notes: e.target.value })}
                  placeholder="Any special requests or notes..."
                  rows={3}
                />
              </div>

              {selectedFacility && bookingForm.timeSlot && (
                <div className="border-t pt-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-500">Booking Fee:</span>
                    <span className={calculateTotal().isFree ? "text-green-600 font-medium" : ""}>
                      {calculateTotal().isFree ? "FREE (using quota)" : `$${calculateTotal().fee}`}
                    </span>
                  </div>
                  {selectedFacility.deposit > 0 && (
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500">Deposit (refundable):</span>
                      <span>${selectedFacility.deposit}</span>
                    </div>
                  )}
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total Due Now:</span>
                    <span>${calculateTotal().fee + selectedFacility.deposit}</span>
                  </div>
                </div>
              )}

              <Button
                className="w-full"
                onClick={handleSubmitBooking}
                disabled={!bookingForm.facility || !bookingForm.date || !bookingForm.timeSlot || (bookingForm.timeSlot === "custom" && (!bookingForm.customStartTime || !bookingForm.customEndTime))}
              >
                {calculateTotal().fee + (selectedFacility?.deposit || 0) > 0 ? "Proceed to Payment" : "Confirm Booking"}
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>PayNow Payment</CardTitle>
              <button onClick={() => setShowPayment(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-gray-100 p-8 rounded-lg mb-4">
                <QrCode className="h-32 w-32 mx-auto text-gray-400" />
                <p className="text-sm text-gray-500 mt-2">
                  Scan with your banking app
                </p>
              </div>

              <div className="text-left mb-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">PayNow UEN:</span>
                  <span className="font-mono">T12345678A</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Reference:</span>
                  <span className="font-mono">TEN-BK-{Date.now().toString().slice(-6)}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Amount:</span>
                  <span className="font-bold text-lg">
                    ${selectedBooking ? selectedBooking.totalAmount : calculateTotal().fee + (selectedFacility?.deposit || 0)}
                  </span>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                After payment, click the button below. Your booking will be confirmed once payment is verified.
              </p>

              <Button className="w-full" onClick={handlePaymentComplete}>
                <CheckCircle className="h-4 w-4 mr-2" />
                I Have Made Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
