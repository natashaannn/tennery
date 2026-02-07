import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  FileText,
  CreditCard,
  Bell,
  ChevronRight,
  Clock,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

const quickActions = [
  {
    icon: Calendar,
    title: "Book Facility",
    href: "/resident/bookings",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: FileText,
    title: "Submit eForm",
    href: "/resident/eforms",
    color: "bg-purple-50 text-purple-600",
  },
  {
    icon: CreditCard,
    title: "Pay Fees",
    href: "/resident/payments",
    color: "bg-green-50 text-green-600",
  },
  {
    icon: Bell,
    title: "View Notices",
    href: "/resident/notices",
    color: "bg-orange-50 text-orange-600",
  },
];

const upcomingBookings = [
  {
    id: "1",
    facility: "BBQ Pavilion A",
    date: "15 Feb 2026",
    time: "4:00 PM - 8:00 PM",
    status: "confirmed",
  },
  {
    id: "2",
    facility: "Function Room",
    date: "22 Feb 2026",
    time: "2:00 PM - 6:00 PM",
    status: "pending",
  },
];

const recentNotices = [
  {
    id: "1",
    title: "Water Supply Maintenance",
    date: "7 Feb 2026",
    category: "maintenance",
    isNew: true,
  },
  {
    id: "2",
    title: "Chinese New Year Celebration",
    date: "5 Feb 2026",
    category: "event",
    isNew: true,
  },
  {
    id: "3",
    title: "Updated Facility Booking Rules",
    date: "1 Feb 2026",
    category: "general",
    isNew: false,
  },
];

const pendingPayments = [
  {
    id: "1",
    description: "Maintenance Fee - Q1 2026",
    amount: 350,
    dueDate: "28 Feb 2026",
    status: "due",
  },
];

export default function ResidentDashboard() {
  return (
    <div className="p-4 md:p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Welcome back, John
        </h1>
        <p className="text-gray-500 mt-1">Unit #12-34 • The Tennery</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {quickActions.map((action) => (
          <Link key={action.title} href={action.href}>
            <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
              <CardContent className="p-4 flex flex-col items-center text-center">
                <div className={`w-12 h-12 rounded-lg ${action.color} flex items-center justify-center mb-3`}>
                  <action.icon className="h-6 w-6" />
                </div>
                <span className="text-sm font-medium">{action.title}</span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Upcoming Bookings */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Upcoming Bookings</CardTitle>
            <Link href="/resident/bookings">
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {upcomingBookings.length > 0 ? (
              <div className="space-y-4">
                {upcomingBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{booking.facility}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <Calendar className="h-4 w-4" />
                        {booking.date}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="h-4 w-4" />
                        {booking.time}
                      </div>
                    </div>
                    <Badge
                      variant={booking.status === "confirmed" ? "success" : "warning"}
                    >
                      {booking.status}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No upcoming bookings</p>
            )}
          </CardContent>
        </Card>

        {/* Pending Payments */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Pending Payments</CardTitle>
            <Link href="/resident/payments">
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {pendingPayments.length > 0 ? (
              <div className="space-y-4">
                {pendingPayments.map((payment) => (
                  <div
                    key={payment.id}
                    className="flex items-start justify-between p-3 bg-yellow-50 border border-yellow-200 rounded-lg"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4 text-yellow-600" />
                        <p className="font-medium">{payment.description}</p>
                      </div>
                      <p className="text-sm text-gray-500 mt-1">
                        Due: {payment.dueDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg">${payment.amount}</p>
                      <Link href="/resident/payments">
                        <Button size="sm" className="mt-2">
                          Pay Now
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-4">
                <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
                <p className="text-gray-500">All payments up to date</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Notices */}
        <Card className="md:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-lg">Recent Notices</CardTitle>
            <Link href="/resident/notices">
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentNotices.map((notice) => (
                <Link
                  key={notice.id}
                  href={`/resident/notices/${notice.id}`}
                  className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{notice.title}</p>
                        {notice.isNew && (
                          <Badge variant="default" className="text-xs">New</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-500">{notice.date}</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
