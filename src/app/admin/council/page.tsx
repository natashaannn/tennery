"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Calendar,
  Plus,
  Clock,
  MapPin,
  Users,
  FileText,
  Download,
  X,
  Upload,
  CheckCircle,
} from "lucide-react";

const meetings = [
  {
    id: "1",
    title: "Monthly Council Meeting",
    date: "2026-02-15",
    time: "7:00 PM",
    location: "Function Room",
    status: "upcoming",
    attendees: ["Michael Lee", "Lisa Lim", "David Tan", "Sarah Wong", "James Ng"],
    agenda: "1. Review of January financials\n2. Facility upgrade proposals\n3. Security contract renewal\n4. Resident feedback review\n5. AOB",
    minutesUrl: null,
  },
  {
    id: "2",
    title: "AGM 2026",
    date: "2026-03-15",
    time: "2:00 PM",
    location: "Function Room",
    status: "upcoming",
    attendees: [],
    agenda: "1. Adoption of previous AGM minutes\n2. Financial report FY2025\n3. Election of council members\n4. Proposed budget FY2026\n5. Special resolutions",
    minutesUrl: null,
  },
  {
    id: "3",
    title: "Monthly Council Meeting",
    date: "2026-01-18",
    time: "7:00 PM",
    location: "Function Room",
    status: "completed",
    attendees: ["Michael Lee", "Lisa Lim", "David Tan", "Sarah Wong"],
    agenda: "1. Year-end review\n2. Budget planning 2026\n3. Contractor performance review\n4. AOB",
    minutesUrl: "/documents/minutes-jan-2026.pdf",
    actionItems: [
      { task: "Get quotes for lift upgrading", assignee: "David Tan", status: "in-progress" },
      { task: "Review security contract terms", assignee: "Lisa Lim", status: "completed" },
      { task: "Send CNY notice to residents", assignee: "Management", status: "completed" },
    ],
  },
  {
    id: "4",
    title: "Emergency Meeting - Water Leak",
    date: "2026-01-05",
    time: "8:00 PM",
    location: "Online (Zoom)",
    status: "completed",
    attendees: ["Michael Lee", "Lisa Lim", "James Ng"],
    agenda: "1. Water leak incident report\n2. Immediate remediation actions\n3. Insurance claim process",
    minutesUrl: "/documents/minutes-emergency-jan-2026.pdf",
  },
];

export default function CouncilPage() {
  const [showNewMeeting, setShowNewMeeting] = useState(false);
  const [selectedMeeting, setSelectedMeeting] = useState<typeof meetings[0] | null>(null);

  const upcomingMeetings = meetings.filter((m) => m.status === "upcoming");
  const pastMeetings = meetings.filter((m) => m.status === "completed");

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Council Meetings</h1>
          <p className="text-gray-500">Schedule meetings and manage minutes</p>
        </div>
        <Button onClick={() => setShowNewMeeting(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Schedule Meeting
        </Button>
      </div>

      {/* Upcoming Meetings */}
      <div className="mb-8">
        <h2 className="text-lg font-semibold mb-4">Upcoming Meetings</h2>
        <div className="grid md:grid-cols-2 gap-4">
          {upcomingMeetings.map((meeting) => (
            <Card key={meeting.id} className="border-emerald-200 bg-emerald-50/30">
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{meeting.title}</h3>
                    <Badge variant="default" className="mt-1">Upcoming</Badge>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">
                      {new Date(meeting.date).toLocaleDateString("en-SG", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                    <p className="text-sm text-gray-500">{meeting.time}</p>
                  </div>
                </div>

                <div className="space-y-2 text-sm mb-4">
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="h-4 w-4" />
                    {meeting.location}
                  </div>
                  {meeting.attendees.length > 0 && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Users className="h-4 w-4" />
                      {meeting.attendees.length} confirmed attendees
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    onClick={() => setSelectedMeeting(meeting)}
                  >
                    View Details
                  </Button>
                  <Button size="sm" className="flex-1">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Past Meetings */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Past Meetings</h2>
        <Card>
          <CardContent className="p-0 divide-y">
            {pastMeetings.map((meeting) => (
              <div
                key={meeting.id}
                className="p-4 hover:bg-gray-50 cursor-pointer"
                onClick={() => setSelectedMeeting(meeting)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center">
                      <Calendar className="h-6 w-6 text-gray-500" />
                    </div>
                    <div>
                      <h3 className="font-medium">{meeting.title}</h3>
                      <p className="text-sm text-gray-500">
                        {new Date(meeting.date).toLocaleDateString("en-SG", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })} • {meeting.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {meeting.minutesUrl && (
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-1" />
                        Minutes
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* New Meeting Modal */}
      {showNewMeeting && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Schedule Meeting</CardTitle>
              <button onClick={() => setShowNewMeeting(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Meeting Title
                </label>
                <Input placeholder="e.g., Monthly Council Meeting" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Date
                  </label>
                  <Input type="date" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Time
                  </label>
                  <Input type="time" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <Input placeholder="e.g., Function Room" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Agenda
                </label>
                <Textarea
                  placeholder="Enter meeting agenda items..."
                  rows={5}
                />
              </div>
              <div className="flex gap-2 pt-4">
                <Button variant="outline" className="flex-1" onClick={() => setShowNewMeeting(false)}>
                  Cancel
                </Button>
                <Button className="flex-1">
                  Schedule Meeting
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Meeting Detail Modal */}
      {selectedMeeting && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{selectedMeeting.title}</CardTitle>
              <button onClick={() => setSelectedMeeting(null)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  {new Date(selectedMeeting.date).toLocaleDateString("en-SG", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-400" />
                  {selectedMeeting.time}
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-400" />
                {selectedMeeting.location}
              </div>

              {selectedMeeting.attendees.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Attendees</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedMeeting.attendees.map((attendee, index) => (
                      <Badge key={index} variant="secondary">{attendee}</Badge>
                    ))}
                  </div>
                </div>
              )}

              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Agenda</h4>
                <div className="bg-gray-50 p-3 rounded-lg text-sm whitespace-pre-line">
                  {selectedMeeting.agenda}
                </div>
              </div>

              {selectedMeeting.actionItems && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 mb-2">Action Items</h4>
                  <div className="space-y-2">
                    {selectedMeeting.actionItems.map((item, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
                        <div>
                          <p className="text-sm font-medium">{item.task}</p>
                          <p className="text-xs text-gray-500">{item.assignee}</p>
                        </div>
                        <Badge variant={item.status === "completed" ? "success" : "warning"}>
                          {item.status}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedMeeting.status === "completed" && (
                <div className="flex gap-2 pt-4">
                  {selectedMeeting.minutesUrl ? (
                    <Button variant="outline" className="flex-1">
                      <Download className="h-4 w-4 mr-2" />
                      Download Minutes
                    </Button>
                  ) : (
                    <Button variant="outline" className="flex-1">
                      <Upload className="h-4 w-4 mr-2" />
                      Upload Minutes
                    </Button>
                  )}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
