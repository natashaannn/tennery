"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  Building2,
  DoorOpen,
  Phone,
  User,
  Clock,
  CheckCircle,
  XCircle,
  Loader2,
  MapPin,
  ArrowRight,
  Home,
} from "lucide-react";

// Access points matching the vendor spec
const accessPoints = [
  { id: "ap-1", name: "Main Lobby", location: "Tower B Ground Floor" },
  { id: "ap-2", name: "Entrance A", location: "Tower A Side" },
  { id: "ap-3", name: "Entrance B", location: "Tower B Side" },
  { id: "ap-4", name: "Entrance C", location: "Tower C Side" },
  { id: "ap-5", name: "Entrance D", location: "Tower D Side" },
];

// Purpose options
const purposeOptions = [
  { value: "visiting", label: "Visiting Resident" },
  { value: "delivery", label: "Delivery" },
  { value: "service", label: "Service / Contractor" },
  { value: "viewing", label: "Property Viewing" },
  { value: "other", label: "Other" },
];

type RequestStatus = "idle" | "submitting" | "waiting" | "approved" | "denied" | "expired";

function VisitorAccessContent() {
  const searchParams = useSearchParams();
  const entranceId = searchParams.get("entrance") || "ap-1";
  
  const [step, setStep] = useState<"form" | "waiting" | "result">("form");
  const [status, setStatus] = useState<RequestStatus>("idle");
  const [requestCode, setRequestCode] = useState("");
  const [countdown, setCountdown] = useState(180); // 3 minutes
  
  const [form, setForm] = useState({
    unitNumber: "",
    visitorName: "",
    visitorPhone: "",
    purpose: "",
  });

  const currentEntrance = accessPoints.find((ap) => ap.id === entranceId) || accessPoints[0];

  // Generate request code
  const generateRequestCode = () => {
    return `VR-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const code = generateRequestCode();
    setRequestCode(code);
    setStatus("waiting");
    setStep("waiting");
    setCountdown(180);
  };

  // Countdown timer
  useEffect(() => {
    if (status !== "waiting") return;
    
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          setStatus("expired");
          setStep("result");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [status]);

  // Simulate resident response (for demo)
  useEffect(() => {
    if (status !== "waiting") return;
    
    // Simulate approval after 8 seconds for demo
    const demoTimer = setTimeout(() => {
      if (status === "waiting") {
        setStatus("approved");
        setStep("result");
      }
    }, 8000);

    return () => clearTimeout(demoTimer);
  }, [status]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#BA006F]/10 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center gap-3">
          <Building2 className="h-8 w-8 text-[#BA006F]" />
          <div>
            <h1 className="font-display font-bold text-[#58595B]">The Tennery</h1>
            <p className="text-xs text-gray-500">Visitor Access Portal</p>
          </div>
        </div>
      </header>

      <main className="max-w-lg mx-auto px-4 py-6">
        {/* Current Location */}
        <div className="bg-[#BA006F] text-white rounded-xl p-4 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="h-5 w-5" />
            <span className="font-medium">Your Location</span>
          </div>
          <p className="text-xl font-bold">{currentEntrance.name}</p>
          <p className="text-white/80 text-sm">{currentEntrance.location}</p>
        </div>

        {/* Step 1: Request Form */}
        {step === "form" && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DoorOpen className="h-5 w-5" />
                Request Entry
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Unit Number *
                  </label>
                  <div className="relative">
                    <Home className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      required
                      value={form.unitNumber}
                      onChange={(e) => setForm({ ...form, unitNumber: e.target.value })}
                      placeholder="e.g., #05-12"
                      className="pl-10"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    Enter the unit number you wish to visit
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      required
                      value={form.visitorName}
                      onChange={(e) => setForm({ ...form, visitorName: e.target.value })}
                      placeholder="Enter your full name"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number (Optional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <Input
                      type="tel"
                      value={form.visitorPhone}
                      onChange={(e) => setForm({ ...form, visitorPhone: e.target.value })}
                      placeholder="+65 9123 4567"
                      className="pl-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Purpose of Visit *
                  </label>
                  <Select
                    required
                    value={form.purpose}
                    onChange={(e) => setForm({ ...form, purpose: e.target.value })}
                  >
                    <option value="">Select purpose</option>
                    {purposeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Select>
                </div>

                <Button
                  type="submit"
                  className="w-full"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Sending Request...
                    </>
                  ) : (
                    <>
                      Request Entry
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </>
                  )}
                </Button>

                <p className="text-xs text-gray-500 text-center">
                  The resident will receive a notification and can grant you access remotely.
                </p>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Waiting for Response */}
        {step === "waiting" && (
          <Card>
            <CardContent className="pt-8 pb-8 text-center">
              <div className="w-20 h-20 bg-[#BA006F]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Loader2 className="h-10 w-10 text-[#BA006F] animate-spin" />
              </div>
              
              <h2 className="text-xl font-bold mb-2">Waiting for Response</h2>
              <p className="text-gray-500 mb-6">
                Your request has been sent to unit <strong>{form.unitNumber}</strong>
              </p>

              <div className="bg-gray-100 rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-500 mb-1">Request Code</p>
                <p className="text-2xl font-mono font-bold">{requestCode}</p>
              </div>

              <div className="flex items-center justify-center gap-2 text-gray-500 mb-6">
                <Clock className="h-4 w-4" />
                <span>Request expires in <strong>{formatTime(countdown)}</strong></span>
              </div>

              <div className="space-y-2 text-sm text-gray-500">
                <p>📱 The resident has been notified</p>
                <p>🔔 Please wait for their response</p>
                <p>🚪 The door will unlock automatically if approved</p>
              </div>

              <Button
                variant="outline"
                className="mt-6"
                onClick={() => {
                  setStep("form");
                  setStatus("idle");
                }}
              >
                Cancel Request
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Result */}
        {step === "result" && (
          <Card>
            <CardContent className="pt-8 pb-8 text-center">
              {status === "approved" && (
                <>
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                  </div>
                  <h2 className="text-xl font-bold text-green-600 mb-2">Access Granted!</h2>
                  <p className="text-gray-500 mb-6">
                    The door has been unlocked. Please enter now.
                  </p>
                  <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6">
                    <DoorOpen className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <p className="text-green-700 font-medium">Door is unlocked for 10 seconds</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    Proceed to unit {form.unitNumber}
                  </p>
                </>
              )}

              {status === "denied" && (
                <>
                  <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <XCircle className="h-10 w-10 text-red-600" />
                  </div>
                  <h2 className="text-xl font-bold text-red-600 mb-2">Access Denied</h2>
                  <p className="text-gray-500 mb-6">
                    The resident has declined your entry request.
                  </p>
                  <p className="text-sm text-gray-500">
                    Please contact the resident directly or try again later.
                  </p>
                </>
              )}

              {status === "expired" && (
                <>
                  <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Clock className="h-10 w-10 text-yellow-600" />
                  </div>
                  <h2 className="text-xl font-bold text-yellow-600 mb-2">Request Expired</h2>
                  <p className="text-gray-500 mb-6">
                    The resident did not respond in time.
                  </p>
                  <p className="text-sm text-gray-500">
                    Please try again or contact the resident directly.
                  </p>
                </>
              )}

              <Button
                className="mt-6"
                onClick={() => {
                  setStep("form");
                  setStatus("idle");
                  setForm({ unitNumber: "", visitorName: "", visitorPhone: "", purpose: "" });
                }}
              >
                New Request
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Help Section */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>Need help? Contact security at</p>
          <a href="tel:+6567638978" className="text-[#BA006F] font-medium">
            +65 6763 8978
          </a>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto py-4 text-center text-xs text-gray-400">
        <p>© 2026 The Tennery. All rights reserved.</p>
      </footer>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#BA006F]/10 to-white flex items-center justify-center">
      <div className="text-center">
        <Loader2 className="h-8 w-8 animate-spin text-[#BA006F] mx-auto mb-4" />
        <p className="text-gray-500">Loading...</p>
      </div>
    </div>
  );
}

export default function VisitorAccessPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <VisitorAccessContent />
    </Suspense>
  );
}
