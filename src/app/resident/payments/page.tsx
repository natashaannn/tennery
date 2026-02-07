"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CreditCard,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  QrCode,
  X,
  Download,
  History,
} from "lucide-react";

const maintenanceFees = [
  {
    id: "1",
    period: "Q1 2026",
    amount: 350,
    dueDate: "2026-02-28",
    status: "pending",
  },
  {
    id: "2",
    period: "Q4 2025",
    amount: 350,
    dueDate: "2025-11-30",
    status: "paid",
    paidDate: "2025-11-15",
  },
  {
    id: "3",
    period: "Q3 2025",
    amount: 350,
    dueDate: "2025-08-31",
    status: "paid",
    paidDate: "2025-08-20",
  },
  {
    id: "4",
    period: "Q2 2025",
    amount: 350,
    dueDate: "2025-05-31",
    status: "paid",
    paidDate: "2025-05-25",
  },
];

const otherPayments = [
  {
    id: "1",
    description: "BBQ Pavilion A Booking - 15 Feb",
    amount: 90,
    type: "booking",
    status: "paid",
    date: "2026-02-01",
  },
  {
    id: "2",
    description: "Renovation Deposit Refund",
    amount: -1000,
    type: "refund",
    status: "completed",
    date: "2026-01-20",
  },
];

export default function PaymentsPage() {
  const [showPayment, setShowPayment] = useState(false);
  const [selectedFee, setSelectedFee] = useState<typeof maintenanceFees[0] | null>(null);

  const pendingFees = maintenanceFees.filter((f) => f.status === "pending");
  const totalPending = pendingFees.reduce((sum, f) => sum + f.amount, 0);

  const handlePaymentComplete = () => {
    setShowPayment(false);
    setSelectedFee(null);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Payments</h1>
        <p className="text-gray-500">Manage your maintenance fees and other payments</p>
      </div>

      {/* Summary Card */}
      {pendingFees.length > 0 && (
        <Card className="mb-6 border-yellow-200 bg-yellow-50">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-yellow-100 flex items-center justify-center">
                  <AlertCircle className="h-6 w-6 text-yellow-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-800">Payment Due</h3>
                  <p className="text-sm text-yellow-700">
                    You have {pendingFees.length} pending payment(s) totaling ${totalPending}
                  </p>
                </div>
              </div>
              <Button
                onClick={() => {
                  setSelectedFee(pendingFees[0]);
                  setShowPayment(true);
                }}
              >
                Pay Now
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Maintenance Fees */}
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Maintenance Fees
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {maintenanceFees.map((fee) => (
              <div
                key={fee.id}
                className={`flex flex-col md:flex-row md:items-center justify-between p-4 rounded-lg border ${
                  fee.status === "pending" ? "border-yellow-200 bg-yellow-50" : "border-gray-200"
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-medium">{fee.period}</h3>
                    <Badge
                      variant={fee.status === "paid" ? "success" : "warning"}
                    >
                      {fee.status === "paid" ? "Paid" : "Pending"}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Due: {new Date(fee.dueDate).toLocaleDateString("en-SG")}
                    </span>
                    {fee.paidDate && (
                      <span className="flex items-center gap-1">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        Paid: {new Date(fee.paidDate).toLocaleDateString("en-SG")}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 md:mt-0">
                  <span className="text-xl font-bold">${fee.amount}</span>
                  {fee.status === "pending" ? (
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedFee(fee);
                        setShowPayment(true);
                      }}
                    >
                      Pay
                    </Button>
                  ) : (
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-1" />
                      Receipt
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History className="h-5 w-5" />
            Other Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {otherPayments.map((payment) => (
              <div
                key={payment.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div>
                  <p className="font-medium">{payment.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(payment.date).toLocaleDateString("en-SG")}
                  </p>
                </div>
                <span
                  className={`font-semibold ${
                    payment.amount < 0 ? "text-green-600" : "text-gray-900"
                  }`}
                >
                  {payment.amount < 0 ? "+" : ""}${Math.abs(payment.amount)}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Modal */}
      {showPayment && selectedFee && (
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
                  <span className="font-mono">TEN-MF-{selectedFee.period.replace(" ", "")}</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Description:</span>
                  <span>Maintenance Fee {selectedFee.period}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Amount:</span>
                  <span className="font-bold text-lg">${selectedFee.amount}</span>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4 text-left">
                <p className="text-sm text-blue-700">
                  <strong>Important:</strong> Please use the exact reference number above when making payment for faster verification.
                </p>
              </div>

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
