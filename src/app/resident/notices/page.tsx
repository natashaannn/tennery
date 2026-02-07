import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  AlertTriangle,
  Calendar,
  Wrench,
  Megaphone,
  FileText,
  ChevronRight,
  Pin,
} from "lucide-react";

const notices = [
  {
    id: "1",
    title: "Water Supply Maintenance",
    content: "There will be scheduled water supply maintenance on 10 Feb 2026 from 10:00 AM to 2:00 PM. Please store sufficient water for your needs during this period.",
    category: "maintenance",
    publishedAt: "2026-02-07",
    isPinned: true,
    isNew: true,
  },
  {
    id: "2",
    title: "Chinese New Year Celebration 2026",
    content: "Join us for the annual CNY celebration at the function room on 15 Feb 2026 at 7:00 PM. Light refreshments will be served. RSVP by 12 Feb.",
    category: "event",
    publishedAt: "2026-02-05",
    isPinned: true,
    isNew: true,
  },
  {
    id: "3",
    title: "Updated Facility Booking Rules",
    content: "Please note the updated facility booking rules effective from 1 Feb 2026. Key changes include advance booking period and cancellation policy.",
    category: "general",
    publishedAt: "2026-02-01",
    isPinned: false,
    isNew: false,
  },
  {
    id: "4",
    title: "Lift Upgrading Works - Block A",
    content: "Lift upgrading works for Block A will commence on 20 Feb 2026 and is expected to complete by end March 2026. One lift will remain operational at all times.",
    category: "maintenance",
    publishedAt: "2026-01-28",
    isPinned: false,
    isNew: false,
  },
  {
    id: "5",
    title: "Security Advisory",
    content: "Please ensure your unit doors are locked at all times. Report any suspicious activities to the security guard house immediately.",
    category: "emergency",
    publishedAt: "2026-01-25",
    isPinned: false,
    isNew: false,
  },
  {
    id: "6",
    title: "Annual General Meeting Notice",
    content: "The AGM for The Tennery MCST will be held on 15 Mar 2026 at 2:00 PM in the Function Room. All owners are encouraged to attend.",
    category: "meeting",
    publishedAt: "2026-01-20",
    isPinned: false,
    isNew: false,
  },
];

const categoryConfig: Record<string, { icon: typeof Bell; color: string; label: string }> = {
  general: { icon: Megaphone, color: "bg-blue-100 text-blue-600", label: "General" },
  maintenance: { icon: Wrench, color: "bg-orange-100 text-orange-600", label: "Maintenance" },
  emergency: { icon: AlertTriangle, color: "bg-red-100 text-red-600", label: "Emergency" },
  event: { icon: Calendar, color: "bg-purple-100 text-purple-600", label: "Event" },
  meeting: { icon: FileText, color: "bg-green-100 text-green-600", label: "Meeting" },
};

export default function NoticesPage() {
  const pinnedNotices = notices.filter((n) => n.isPinned);
  const otherNotices = notices.filter((n) => !n.isPinned);

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Notices</h1>
        <p className="text-gray-500">Stay updated with the latest announcements</p>
      </div>

      {/* Pinned Notices */}
      {pinnedNotices.length > 0 && (
        <div className="mb-6">
          <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3 flex items-center gap-2">
            <Pin className="h-4 w-4" />
            Pinned
          </h2>
          <div className="space-y-4">
            {pinnedNotices.map((notice) => {
              const config = categoryConfig[notice.category];
              return (
                <Card key={notice.id} className="border-emerald-200 bg-emerald-50/50">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center flex-shrink-0`}>
                        <config.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-semibold">{notice.title}</h3>
                          {notice.isNew && <Badge>New</Badge>}
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2 mb-2">
                          {notice.content}
                        </p>
                        <div className="flex items-center gap-3 text-xs text-gray-500">
                          <Badge variant="outline">{config.label}</Badge>
                          <span>{new Date(notice.publishedAt).toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" })}</span>
                        </div>
                      </div>
                      <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* All Notices */}
      <div>
        <h2 className="text-sm font-medium text-gray-500 uppercase tracking-wide mb-3">
          All Notices
        </h2>
        <Card>
          <CardContent className="p-0 divide-y">
            {otherNotices.map((notice) => {
              const config = categoryConfig[notice.category];
              return (
                <div
                  key={notice.id}
                  className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-lg ${config.color} flex items-center justify-center flex-shrink-0`}>
                      <config.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{notice.title}</h3>
                        {notice.isNew && <Badge>New</Badge>}
                      </div>
                      <p className="text-sm text-gray-500 line-clamp-2 mb-2">
                        {notice.content}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <Badge variant="outline">{config.label}</Badge>
                        <span>{new Date(notice.publishedAt).toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" })}</span>
                      </div>
                    </div>
                    <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0" />
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
