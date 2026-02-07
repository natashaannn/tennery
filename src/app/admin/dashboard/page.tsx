import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  CheckSquare,
  Users,
  DollarSign,
  AlertCircle,
  TrendingUp,
  Calendar,
  ChevronRight,
  Clock,
  FileText,
} from "lucide-react";

const stats = [
  {
    title: "Pending Approvals",
    value: "12",
    change: "+3 today",
    icon: CheckSquare,
    color: "text-orange-600 bg-orange-100",
    href: "/admin/approvals",
  },
  {
    title: "Total Residents",
    value: "338",
    change: "98% occupied",
    icon: Users,
    color: "text-blue-600 bg-blue-100",
    href: "/admin/residents",
  },
  {
    title: "Fees Collected",
    value: "$98,350",
    change: "Q1 2026",
    icon: DollarSign,
    color: "text-green-600 bg-green-100",
    href: "/admin/fees",
  },
  {
    title: "Overdue Fees",
    value: "15",
    change: "$5,250 total",
    icon: AlertCircle,
    color: "text-red-600 bg-red-100",
    href: "/admin/fees",
  },
];

const pendingApprovals = [
  {
    id: "1",
    type: "booking",
    title: "Function Room Booking",
    resident: "John Doe (#12-34)",
    date: "22 Feb 2026",
    submittedAt: "2 hours ago",
  },
  {
    id: "2",
    type: "eform",
    title: "Renovation Permit",
    resident: "Sarah Tan (#08-12)",
    date: "Start: 1 Mar 2026",
    submittedAt: "5 hours ago",
  },
  {
    id: "3",
    type: "booking",
    title: "BBQ Pavilion A",
    resident: "Michael Lee (#15-03)",
    date: "28 Feb 2026",
    submittedAt: "1 day ago",
  },
];

const upcomingMeetings = [
  {
    id: "1",
    title: "Monthly Council Meeting",
    date: "15 Feb 2026",
    time: "7:00 PM",
  },
  {
    id: "2",
    title: "AGM 2026",
    date: "15 Mar 2026",
    time: "2:00 PM",
  },
];

const expiringContracts = [
  {
    id: "1",
    vendor: "CleanPro Services",
    service: "Cleaning",
    expiresIn: "30 days",
  },
  {
    id: "2",
    vendor: "SecureGuard Pte Ltd",
    service: "Security",
    expiresIn: "45 days",
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-1">The Tennery Management Portal</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <Link key={stat.title} href={stat.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <stat.icon className="h-5 w-5" />
                  </div>
                </div>
                <div className="mt-3">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-xs text-gray-400 mt-1">{stat.change}</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Approvals */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Pending Approvals</CardTitle>
            <Link href="/admin/approvals">
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingApprovals.map((item) => (
                <div
                  key={item.id}
                  className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      item.type === "booking" ? "bg-blue-100 text-blue-600" : "bg-purple-100 text-purple-600"
                    }`}>
                      {item.type === "booking" ? (
                        <Calendar className="h-4 w-4" />
                      ) : (
                        <FileText className="h-4 w-4" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-gray-500">{item.resident}</p>
                      <p className="text-xs text-gray-400">{item.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">{item.submittedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Upcoming Meetings */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Upcoming Meetings</CardTitle>
              <Link href="/admin/council">
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingMeetings.map((meeting) => (
                  <div
                    key={meeting.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{meeting.title}</p>
                        <p className="text-xs text-gray-500">
                          {meeting.date} • {meeting.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expiring Contracts */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg">Contract Renewals</CardTitle>
              <Link href="/admin/vendors">
                <Button variant="ghost" size="sm">
                  View All <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expiringContracts.map((contract) => (
                  <div
                    key={contract.id}
                    className="flex items-center justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                  >
                    <div>
                      <p className="font-medium text-sm">{contract.vendor}</p>
                      <p className="text-xs text-gray-500">{contract.service}</p>
                    </div>
                    <Badge variant="warning">
                      <Clock className="h-3 w-3 mr-1" />
                      {contract.expiresIn}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
