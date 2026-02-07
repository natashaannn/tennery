"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Truck,
  Hammer,
  Package,
  ArrowRight,
  Plus,
  X,
  QrCode,
  CheckCircle,
  Clock,
  Calendar,
  Upload,
} from "lucide-react";

const formTypes = [
  {
    id: "renovation",
    name: "Renovation Permit",
    icon: Hammer,
    description: "Apply for renovation works in your unit",
    deposit: 1000,
    processingTime: "5-7 working days",
  },
  {
    id: "moving-in",
    name: "Moving In",
    icon: Truck,
    description: "Register for moving in with large items",
    deposit: 200,
    processingTime: "2-3 working days",
  },
  {
    id: "moving-out",
    name: "Moving Out",
    icon: Truck,
    description: "Register for moving out with large items",
    deposit: 200,
    processingTime: "2-3 working days",
  },
  {
    id: "bulky-item",
    name: "Bulky Item Delivery",
    icon: Package,
    description: "Register delivery of large furniture/appliances",
    deposit: 100,
    processingTime: "1-2 working days",
  },
];

const myForms = [
  {
    id: "1",
    type: "renovation",
    typeName: "Renovation Permit",
    submittedDate: "2026-01-15",
    status: "approved",
    details: "Kitchen renovation - cabinet replacement",
  },
  {
    id: "2",
    type: "bulky-item",
    typeName: "Bulky Item Delivery",
    submittedDate: "2026-02-01",
    status: "pending",
    details: "Sofa delivery from IKEA",
  },
];

export default function EFormsPage() {
  const [selectedFormType, setSelectedFormType] = useState<string | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [formData, setFormData] = useState({
    date: "",
    timeSlot: "",
    description: "",
    contractor: "",
    duration: "",
  });

  const formType = formTypes.find((f) => f.id === selectedFormType);

  const handleSubmit = () => {
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    setShowPayment(false);
    setSelectedFormType(null);
    setFormData({ date: "", timeSlot: "", description: "", contractor: "", duration: "" });
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">eForms</h1>
        <p className="text-gray-500">Submit applications for moving, renovation, and deliveries</p>
      </div>

      {!selectedFormType ? (
        <>
          {/* Form Types */}
          <h2 className="text-lg font-semibold mb-4">Submit New Application</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            {formTypes.map((form) => (
              <Card
                key={form.id}
                className="cursor-pointer hover:shadow-md transition-shadow"
                onClick={() => setSelectedFormType(form.id)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                      <form.icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{form.name}</h3>
                      <p className="text-sm text-gray-500 mb-2">{form.description}</p>
                      <div className="flex flex-wrap gap-2 text-xs">
                        <Badge variant="secondary">
                          Deposit: ${form.deposit}
                        </Badge>
                        <Badge variant="outline">
                          {form.processingTime}
                        </Badge>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-gray-400" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* My Applications */}
          <h2 className="text-lg font-semibold mb-4">My Applications</h2>
          <Card>
            <CardContent className="p-0">
              {myForms.length > 0 ? (
                <div className="divide-y">
                  {myForms.map((form) => (
                    <div key={form.id} className="p-4 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium">{form.typeName}</h3>
                          <Badge
                            variant={
                              form.status === "approved"
                                ? "success"
                                : form.status === "pending"
                                ? "warning"
                                : "destructive"
                            }
                          >
                            {form.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">{form.details}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          Submitted: {new Date(form.submittedDate).toLocaleDateString("en-SG")}
                        </p>
                      </div>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center text-gray-500">
                  <FileText className="h-12 w-12 mx-auto mb-2 text-gray-300" />
                  <p>No applications submitted yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </>
      ) : (
        /* Form Submission */
        <div>
          <button
            onClick={() => setSelectedFormType(null)}
            className="text-emerald-600 hover:text-emerald-700 mb-4 flex items-center gap-1"
          >
            ← Back to all forms
          </button>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                  {formType && <formType.icon className="h-6 w-6 text-purple-600" />}
                </div>
                <div>
                  <CardTitle>{formType?.name}</CardTitle>
                  <CardDescription>{formType?.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              {selectedFormType === "renovation" ? (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Start Date *
                      </label>
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Duration *
                      </label>
                      <Select
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      >
                        <option value="">Select duration</option>
                        <option value="1">1 week</option>
                        <option value="2">2 weeks</option>
                        <option value="4">1 month</option>
                        <option value="8">2 months</option>
                        <option value="12">3 months</option>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Contractor Name & Contact *
                    </label>
                    <Input
                      value={formData.contractor}
                      onChange={(e) => setFormData({ ...formData, contractor: e.target.value })}
                      placeholder="Company name and phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description of Works *
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the renovation works to be carried out..."
                      rows={4}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Supporting Documents
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">
                        Upload floor plans, contractor license, etc.
                      </p>
                      <Button variant="outline" size="sm" className="mt-2">
                        Choose Files
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date *
                      </label>
                      <Input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time Slot *
                      </label>
                      <Select
                        value={formData.timeSlot}
                        onChange={(e) => setFormData({ ...formData, timeSlot: e.target.value })}
                      >
                        <option value="">Select time slot</option>
                        <option value="morning">Morning (9AM - 12PM)</option>
                        <option value="afternoon">Afternoon (1PM - 5PM)</option>
                        <option value="evening">Evening (6PM - 9PM)</option>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Description *
                    </label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the items being moved/delivered..."
                      rows={3}
                    />
                  </div>
                </>
              )}

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Deposit Required</h4>
                <p className="text-sm text-yellow-700">
                  A refundable deposit of <strong>${formType?.deposit}</strong> is required.
                  This will be refunded within 7 working days after completion, subject to no damages.
                </p>
              </div>

              <Button className="w-full" onClick={handleSubmit}>
                Submit & Pay Deposit (${formType?.deposit})
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
              <CardTitle>PayNow Deposit</CardTitle>
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
                  <span className="font-mono">TEN-EF-{Date.now().toString(36).toUpperCase()}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Deposit Amount:</span>
                  <span className="font-bold text-lg">${formType?.deposit}</span>
                </div>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                After payment, click the button below. Your application will be processed once payment is verified.
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
