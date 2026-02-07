"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  DollarSign,
  Search,
  Download,
  Filter,
  CheckCircle,
  AlertCircle,
  Clock,
  TrendingUp,
  Home,
} from "lucide-react";

const feeRecords = [
  {
    id: "1",
    unit: "#01-01",
    resident: "Ahmad bin Hassan",
    period: "Q1 2026",
    amount: 350,
    dueDate: "2026-02-28",
    status: "paid",
    paidDate: "2026-02-01",
  },
  {
    id: "2",
    unit: "#01-02",
    resident: "Tan Wei Ming",
    period: "Q1 2026",
    amount: 350,
    dueDate: "2026-02-28",
    status: "pending",
    paidDate: null,
  },
  {
    id: "3",
    unit: "#02-01",
    resident: "Priya Sharma",
    period: "Q1 2026",
    amount: 350,
    dueDate: "2026-02-28",
    status: "overdue",
    paidDate: null,
  },
  {
    id: "4",
    unit: "#02-02",
    resident: "John Smith",
    period: "Q1 2026",
    amount: 350,
    dueDate: "2026-02-28",
    status: "paid",
    paidDate: "2026-01-28",
  },
  {
    id: "5",
    unit: "#03-01",
    resident: "Lee Mei Ling",
    period: "Q1 2026",
    amount: 350,
    dueDate: "2026-02-28",
    status: "pending",
    paidDate: null,
  },
  {
    id: "6",
    unit: "#03-02",
    resident: "Mohamed Ali",
    period: "Q1 2026",
    amount: 350,
    dueDate: "2026-02-28",
    status: "overdue",
    paidDate: null,
  },
];

const statusConfig = {
  paid: { color: "bg-green-100 text-green-700", icon: CheckCircle },
  pending: { color: "bg-yellow-100 text-yellow-700", icon: Clock },
  overdue: { color: "bg-red-100 text-red-700", icon: AlertCircle },
};

export default function FeesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [periodFilter, setPeriodFilter] = useState<string>("Q1 2026");

  const filteredRecords = feeRecords.filter((record) => {
    const matchesSearch =
      record.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      record.resident.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || record.status === statusFilter;
    const matchesPeriod = record.period === periodFilter;
    return matchesSearch && matchesStatus && matchesPeriod;
  });

  const totalCollected = feeRecords
    .filter((r) => r.status === "paid")
    .reduce((sum, r) => sum + r.amount, 0);
  const totalPending = feeRecords
    .filter((r) => r.status === "pending")
    .reduce((sum, r) => sum + r.amount, 0);
  const totalOverdue = feeRecords
    .filter((r) => r.status === "overdue")
    .reduce((sum, r) => sum + r.amount, 0);

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Maintenance Fees</h1>
          <p className="text-gray-500">Track and manage maintenance fee payments</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
          <Button>
            Send Reminders
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-green-600 mb-1">
              <CheckCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Collected</span>
            </div>
            <p className="text-2xl font-bold">${totalCollected.toLocaleString()}</p>
            <p className="text-xs text-gray-500">{feeRecords.filter(r => r.status === "paid").length} units</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-yellow-600 mb-1">
              <Clock className="h-5 w-5" />
              <span className="text-sm font-medium">Pending</span>
            </div>
            <p className="text-2xl font-bold">${totalPending.toLocaleString()}</p>
            <p className="text-xs text-gray-500">{feeRecords.filter(r => r.status === "pending").length} units</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-red-600 mb-1">
              <AlertCircle className="h-5 w-5" />
              <span className="text-sm font-medium">Overdue</span>
            </div>
            <p className="text-2xl font-bold">${totalOverdue.toLocaleString()}</p>
            <p className="text-xs text-gray-500">{feeRecords.filter(r => r.status === "overdue").length} units</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 text-blue-600 mb-1">
              <TrendingUp className="h-5 w-5" />
              <span className="text-sm font-medium">Collection Rate</span>
            </div>
            <p className="text-2xl font-bold">
              {Math.round((feeRecords.filter(r => r.status === "paid").length / feeRecords.length) * 100)}%
            </p>
            <p className="text-xs text-gray-500">Q1 2026</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search by unit or resident..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <select
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                value={periodFilter}
                onChange={(e) => setPeriodFilter(e.target.value)}
              >
                <option value="Q1 2026">Q1 2026</option>
                <option value="Q4 2025">Q4 2025</option>
                <option value="Q3 2025">Q3 2025</option>
              </select>
              <select
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Fee Records Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                    Unit
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                    Resident
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden md:table-cell">
                    Period
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                    Amount
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden md:table-cell">
                    Due Date
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredRecords.map((record) => {
                  const config = statusConfig[record.status as keyof typeof statusConfig];
                  return (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Home className="h-4 w-4 text-gray-400" />
                          <span className="font-medium">{record.unit}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-gray-600">
                        {record.resident}
                      </td>
                      <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                        {record.period}
                      </td>
                      <td className="px-4 py-3 font-medium">
                        ${record.amount}
                      </td>
                      <td className="px-4 py-3 text-gray-600 hidden md:table-cell">
                        {new Date(record.dueDate).toLocaleDateString("en-SG", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </td>
                      <td className="px-4 py-3">
                        <Badge className={config.color}>
                          <config.icon className="h-3 w-3 mr-1" />
                          {record.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        {record.status !== "paid" ? (
                          <Button variant="outline" size="sm">
                            Mark Paid
                          </Button>
                        ) : (
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
