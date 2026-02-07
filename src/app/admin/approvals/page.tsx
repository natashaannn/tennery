"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckSquare,
  Calendar,
  FileText,
  Clock,
  User,
  CheckCircle,
  XCircle,
  Eye,
  X,
  Filter,
} from "lucide-react";

const pendingItems = [
  {
    id: "1",
    type: "booking",
    title: "Function Room Booking",
    resident: "John Doe",
    unit: "#12-34",
    email: "john.doe@email.com",
    details: {
      facility: "Function Room",
      date: "22 Feb 2026",
      time: "2:00 PM - 6:00 PM",
      purpose: "Birthday party for my daughter",
      guests: 30,
    },
    amount: 120,
    deposit: 100,
    depositPaid: true,
    submittedAt: "2026-02-07T10:30:00",
  },
  {
    id: "2",
    type: "eform",
    formType: "renovation",
    title: "Renovation Permit",
    resident: "Sarah Tan",
    unit: "#08-12",
    email: "sarah.tan@email.com",
    details: {
      startDate: "1 Mar 2026",
      duration: "4 weeks",
      contractor: "ABC Renovation Pte Ltd (9123-4567)",
      description: "Kitchen cabinet replacement and flooring works",
    },
    deposit: 1000,
    depositPaid: true,
    submittedAt: "2026-02-07T08:15:00",
  },
  {
    id: "3",
    type: "booking",
    title: "BBQ Pavilion A",
    resident: "Michael Lee",
    unit: "#15-03",
    email: "michael.lee@email.com",
    details: {
      facility: "BBQ Pavilion A",
      date: "28 Feb 2026",
      time: "4:00 PM - 9:00 PM",
      purpose: "Family gathering",
      guests: 15,
    },
    amount: 50,
    deposit: 50,
    depositPaid: false,
    submittedAt: "2026-02-06T14:20:00",
  },
  {
    id: "4",
    type: "eform",
    formType: "bulky-item",
    title: "Bulky Item Delivery",
    resident: "Jenny Wong",
    unit: "#10-08",
    email: "jenny.wong@email.com",
    details: {
      date: "12 Feb 2026",
      timeSlot: "Afternoon (1PM - 5PM)",
      description: "New sofa and dining table delivery from IKEA",
    },
    deposit: 100,
    depositPaid: true,
    submittedAt: "2026-02-05T16:45:00",
  },
];

export default function ApprovalsPage() {
  const [filter, setFilter] = useState<"all" | "booking" | "eform">("all");
  const [selectedItem, setSelectedItem] = useState<typeof pendingItems[0] | null>(null);
  const [adminNotes, setAdminNotes] = useState("");

  const filteredItems = pendingItems.filter(
    (item) => filter === "all" || item.type === filter
  );

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    if (diffHours > 0) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    return "Just now";
  };

  const handleApprove = (id: string) => {
    // In production, this would call an API
    alert(`Approved item ${id}`);
    setSelectedItem(null);
  };

  const handleReject = (id: string) => {
    // In production, this would call an API
    alert(`Rejected item ${id}`);
    setSelectedItem(null);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pending Approvals</h1>
          <p className="text-gray-500">Review and approve resident requests</p>
        </div>
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <select
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
          >
            <option value="all">All Types</option>
            <option value="booking">Bookings</option>
            <option value="eform">eForms</option>
          </select>
        </div>
      </div>

      {/* Pending Items List */}
      <Card>
        <CardContent className="p-0">
          {filteredItems.length > 0 ? (
            <div className="divide-y">
              {filteredItems.map((item) => (
                <div
                  key={item.id}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        item.type === "booking"
                          ? "bg-blue-100 text-blue-600"
                          : "bg-purple-100 text-purple-600"
                      }`}>
                        {item.type === "booking" ? (
                          <Calendar className="h-5 w-5" />
                        ) : (
                          <FileText className="h-5 w-5" />
                        )}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{item.title}</h3>
                          <Badge variant={item.type === "booking" ? "default" : "secondary"}>
                            {item.type === "booking" ? "Booking" : "eForm"}
                          </Badge>
                          {!item.depositPaid && (
                            <Badge variant="warning">Deposit Pending</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <User className="h-4 w-4" />
                            {item.resident} ({item.unit})
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {formatTimeAgo(item.submittedAt)}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 ml-14 md:ml-0">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedItem(item)}
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        Review
                      </Button>
                      <Button
                        variant="default"
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleApprove(item.id)}
                      >
                        <CheckCircle className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleReject(item.id)}
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500">
              <CheckSquare className="h-12 w-12 mx-auto mb-2 text-gray-300" />
              <p>No pending approvals</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Detail Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Review Request</CardTitle>
              <button onClick={() => setSelectedItem(null)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Request Info */}
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  selectedItem.type === "booking"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-purple-100 text-purple-600"
                }`}>
                  {selectedItem.type === "booking" ? (
                    <Calendar className="h-5 w-5" />
                  ) : (
                    <FileText className="h-5 w-5" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{selectedItem.title}</h3>
                  <p className="text-sm text-gray-500">
                    {selectedItem.type === "booking" ? "Facility Booking" : "eForm Application"}
                  </p>
                </div>
              </div>

              {/* Resident Info */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Resident</h4>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="font-medium">{selectedItem.resident}</p>
                  <p className="text-sm text-gray-500">Unit {selectedItem.unit}</p>
                  <p className="text-sm text-gray-500">{selectedItem.email}</p>
                </div>
              </div>

              {/* Request Details */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Details</h4>
                <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                  {Object.entries(selectedItem.details).map(([key, value]) => (
                    <div key={key} className="flex justify-between text-sm">
                      <span className="text-gray-500 capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}:
                      </span>
                      <span className="font-medium">{String(value)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment Status */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Payment</h4>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-500">Deposit:</span>
                    <span className="font-medium">${selectedItem.deposit}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Status:</span>
                    <Badge variant={selectedItem.depositPaid ? "success" : "warning"}>
                      {selectedItem.depositPaid ? "Paid" : "Pending"}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Admin Notes */}
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Admin Notes</h4>
                <Textarea
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="Add notes for this request (optional)..."
                  rows={3}
                />
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-4">
                <Button
                  variant="destructive"
                  className="flex-1"
                  onClick={() => handleReject(selectedItem.id)}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => handleApprove(selectedItem.id)}
                >
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approve
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
