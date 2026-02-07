"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  DoorOpen,
  Plus,
  X,
  Copy,
  CheckCircle,
  Clock,
  Users,
  Car,
  Trash2,
  Send,
  QrCode,
  History,
  Lock,
  Unlock,
  Video,
  AlertCircle,
  Building2,
  Bell,
  Phone,
  XCircle,
  MapPin,
} from "lucide-react";

// Mock access points for The Tennery (5 glass door entrances)
const accessPoints = [
  { id: "ap-1", name: "Main Lobby", type: "MAIN_LOBBY", status: "ONLINE", location: "Block A Ground Floor" },
  { id: "ap-2", name: "Side Entrance A", type: "SIDE_ENTRANCE", status: "ONLINE", location: "Block A Side" },
  { id: "ap-3", name: "Side Entrance B", type: "SIDE_ENTRANCE", status: "ONLINE", location: "Block B Side" },
  { id: "ap-4", name: "Car Park Lobby", type: "CAR_PARK", status: "ONLINE", location: "Basement 1" },
  { id: "ap-5", name: "Pool Deck Gate", type: "POOL_AREA", status: "MAINTENANCE", location: "Level 2 Pool Area" },
];

// Mock visitor invites
const mockInvites = [
  {
    id: "inv-1",
    inviteCode: "847291",
    visitorName: "John Delivery",
    visitorPhone: "+65 9123 4567",
    purpose: "Delivery",
    validFrom: "2026-02-07T09:00",
    validUntil: "2026-02-07T18:00",
    maxEntries: 1,
    entriesUsed: 0,
    status: "ACTIVE",
    accessPoints: ["ap-1", "ap-4"],
    notifyOnArrival: true,
  },
  {
    id: "inv-2",
    inviteCode: "563829",
    visitorName: "Sarah Chen",
    visitorPhone: "+65 8765 4321",
    purpose: "Guest",
    validFrom: "2026-02-08T14:00",
    validUntil: "2026-02-08T22:00",
    maxEntries: 2,
    entriesUsed: 0,
    status: "PENDING",
    accessPoints: ["ap-1", "ap-2", "ap-5"],
    notifyOnArrival: true,
  },
  {
    id: "inv-3",
    inviteCode: "192847",
    visitorName: "Aircon Repair",
    visitorPhone: "+65 6234 5678",
    purpose: "Contractor",
    validFrom: "2026-02-05T10:00",
    validUntil: "2026-02-05T17:00",
    maxEntries: 3,
    entriesUsed: 3,
    status: "USED",
    accessPoints: ["ap-1"],
    notifyOnArrival: false,
  },
];

// Mock access history
const mockAccessHistory = [
  { id: "log-1", action: "UNLOCK_SUCCESS", accessPoint: "Main Lobby", visitor: "John Delivery", time: "2026-02-07 10:32", method: "Visitor Code" },
  { id: "log-2", action: "UNLOCK_SUCCESS", accessPoint: "Main Lobby", visitor: null, time: "2026-02-07 09:15", method: "Remote Unlock" },
  { id: "log-3", action: "VISITOR_CHECKIN", accessPoint: "Car Park Lobby", visitor: "Aircon Repair", time: "2026-02-05 10:45", method: "Visitor Code" },
  { id: "log-4", action: "UNLOCK_SUCCESS", accessPoint: "Side Entrance A", visitor: null, time: "2026-02-04 18:30", method: "Remote Unlock" },
];

// Mock pending visitor requests (walk-up visitors who scanned QR)
const mockVisitorRequests = [
  {
    id: "vr-1",
    requestCode: "VR-ABC123",
    visitorName: "Michael Tan",
    visitorPhone: "+65 9876 5432",
    purpose: "delivery",
    accessPoint: "ap-1",
    accessPointName: "Main Lobby",
    createdAt: new Date(Date.now() - 45000), // 45 seconds ago
    expiresAt: new Date(Date.now() + 135000), // 2:15 remaining
  },
];

const purposeOptions = [
  { value: "guest", label: "Guest / Friend" },
  { value: "family", label: "Family Member" },
  { value: "delivery", label: "Delivery" },
  { value: "contractor", label: "Contractor / Service" },
  { value: "agent", label: "Property Agent" },
  { value: "other", label: "Other" },
];

export default function AccessControlPage() {
  const [activeTab, setActiveTab] = useState<"doors" | "invites" | "history">("doors");
  const [showNewInvite, setShowNewInvite] = useState(false);
  const [showInviteSuccess, setShowInviteSuccess] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");
  const [unlockingDoor, setUnlockingDoor] = useState<string | null>(null);
  const [invites, setInvites] = useState(mockInvites);
  const [visitorRequests, setVisitorRequests] = useState(mockVisitorRequests);
  const [showVisitorRequest, setShowVisitorRequest] = useState<typeof mockVisitorRequests[0] | null>(null);
  
  const [inviteForm, setInviteForm] = useState({
    visitorName: "",
    visitorPhone: "",
    visitorEmail: "",
    purpose: "",
    vehiclePlate: "",
    validFrom: "",
    validUntil: "",
    maxEntries: "1",
    accessPoints: [] as string[],
    notifyOnArrival: true,
    notes: "",
  });

  // Generate random 6-digit code
  const generateCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Handle remote door unlock
  const handleUnlockDoor = async (doorId: string) => {
    setUnlockingDoor(doorId);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setUnlockingDoor(null);
    // Show success feedback
    alert(`Door unlocked successfully! The door will remain unlocked for 10 seconds.`);
  };

  // Handle creating new invite
  const handleCreateInvite = () => {
    const code = generateCode();
    setGeneratedCode(code);
    
    const newInvite = {
      id: `inv-${Date.now()}`,
      inviteCode: code,
      visitorName: inviteForm.visitorName,
      visitorPhone: inviteForm.visitorPhone,
      purpose: inviteForm.purpose,
      validFrom: inviteForm.validFrom,
      validUntil: inviteForm.validUntil,
      maxEntries: parseInt(inviteForm.maxEntries),
      entriesUsed: 0,
      status: "ACTIVE",
      accessPoints: inviteForm.accessPoints,
      notifyOnArrival: inviteForm.notifyOnArrival,
    };
    
    setInvites([newInvite, ...invites]);
    setShowNewInvite(false);
    setShowInviteSuccess(true);
  };

  // Copy code to clipboard
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // Cancel invite
  const handleCancelInvite = (inviteId: string) => {
    setInvites(invites.map((inv) => 
      inv.id === inviteId ? { ...inv, status: "CANCELLED" } : inv
    ));
  };

  // Handle visitor request approval
  const handleApproveVisitorRequest = async (requestId: string, doorId: string) => {
    setUnlockingDoor(doorId);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setUnlockingDoor(null);
    setVisitorRequests(visitorRequests.filter((r) => r.id !== requestId));
    setShowVisitorRequest(null);
    alert("Access granted! The door has been unlocked for the visitor.");
  };

  // Handle visitor request denial
  const handleDenyVisitorRequest = (requestId: string) => {
    setVisitorRequests(visitorRequests.filter((r) => r.id !== requestId));
    setShowVisitorRequest(null);
  };

  // Toggle access point selection
  const toggleAccessPoint = (apId: string) => {
    if (inviteForm.accessPoints.includes(apId)) {
      setInviteForm({
        ...inviteForm,
        accessPoints: inviteForm.accessPoints.filter((id) => id !== apId),
      });
    } else {
      setInviteForm({
        ...inviteForm,
        accessPoints: [...inviteForm.accessPoints, apId],
      });
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE":
        return <Badge variant="success">Active</Badge>;
      case "PENDING":
        return <Badge variant="warning">Pending</Badge>;
      case "USED":
        return <Badge variant="secondary">Used</Badge>;
      case "EXPIRED":
        return <Badge variant="secondary">Expired</Badge>;
      case "CANCELLED":
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getDoorStatusBadge = (status: string) => {
    switch (status) {
      case "ONLINE":
        return <Badge variant="success">Online</Badge>;
      case "OFFLINE":
        return <Badge variant="destructive">Offline</Badge>;
      case "MAINTENANCE":
        return <Badge variant="warning">Maintenance</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <div className="p-4 md:p-8">
      {/* Pending Visitor Request Alert */}
      {visitorRequests.length > 0 && (
        <div className="mb-6">
          {visitorRequests.map((request) => (
            <div
              key={request.id}
              className="bg-[#BA006F] text-white rounded-xl p-4 mb-2 animate-pulse cursor-pointer"
              onClick={() => setShowVisitorRequest(request)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                    <Bell className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">Visitor at {request.accessPointName}</p>
                    <p className="text-white/80">
                      {request.visitorName} • {request.purpose}
                    </p>
                  </div>
                </div>
                <Button variant="secondary" size="sm" className="bg-white text-[#BA006F] hover:bg-white/90">
                  Respond
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Access Control</h1>
          <p className="text-gray-500">Manage door access and visitor invitations</p>
        </div>
        <Button onClick={() => setShowNewInvite(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Invite Visitor
        </Button>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab("doors")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "doors"
              ? "text-[#BA006F] border-b-2 border-[#BA006F]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <DoorOpen className="h-4 w-4 inline mr-2" />
          Door Access
        </button>
        <button
          onClick={() => setActiveTab("invites")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "invites"
              ? "text-[#BA006F] border-b-2 border-[#BA006F]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Users className="h-4 w-4 inline mr-2" />
          Visitor Invites
        </button>
        <button
          onClick={() => setActiveTab("history")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "history"
              ? "text-[#BA006F] border-b-2 border-[#BA006F]"
              : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <History className="h-4 w-4 inline mr-2" />
          Access History
        </button>
      </div>

      {/* Door Access Tab */}
      {activeTab === "doors" && (
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DoorOpen className="h-5 w-5" />
                Remote Door Unlock
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-500 mb-4">
                Tap to remotely unlock any entrance. The door will remain unlocked for 10 seconds.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {accessPoints.map((door) => (
                  <div
                    key={door.id}
                    className={`border rounded-lg p-4 ${
                      door.status === "ONLINE" ? "hover:border-[#BA006F]" : "opacity-60"
                    } transition-colors`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          door.status === "ONLINE" ? "bg-[#BA006F]/10" : "bg-gray-100"
                        }`}>
                          {door.type === "CAR_PARK" ? (
                            <Car className={`h-5 w-5 ${door.status === "ONLINE" ? "text-[#BA006F]" : "text-gray-400"}`} />
                          ) : (
                            <DoorOpen className={`h-5 w-5 ${door.status === "ONLINE" ? "text-[#BA006F]" : "text-gray-400"}`} />
                          )}
                        </div>
                        <div>
                          <h3 className="font-semibold">{door.name}</h3>
                          <p className="text-xs text-gray-500">{door.location}</p>
                        </div>
                      </div>
                      {getDoorStatusBadge(door.status)}
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        className="flex-1"
                        disabled={door.status !== "ONLINE" || unlockingDoor === door.id}
                        onClick={() => handleUnlockDoor(door.id)}
                      >
                        {unlockingDoor === door.id ? (
                          <>
                            <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                            Unlocking...
                          </>
                        ) : (
                          <>
                            <Unlock className="h-4 w-4 mr-2" />
                            Unlock
                          </>
                        )}
                      </Button>
                      <Button variant="outline" size="icon" title="View Camera">
                        <Video className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">4</p>
                    <p className="text-xs text-gray-500">Doors Online</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">1</p>
                    <p className="text-xs text-gray-500">Maintenance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#BA006F]/10 flex items-center justify-center">
                    <Users className="h-5 w-5 text-[#BA006F]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{invites.filter((i) => i.status === "ACTIVE").length}</p>
                    <p className="text-xs text-gray-500">Active Invites</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Unlock className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-xs text-gray-500">Unlocks Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Visitor Invites Tab */}
      {activeTab === "invites" && (
        <Card>
          <CardHeader>
            <CardTitle>Your Visitor Invites</CardTitle>
          </CardHeader>
          <CardContent>
            {invites.length === 0 ? (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                <p className="text-gray-500">No visitor invites yet</p>
                <Button className="mt-4" onClick={() => setShowNewInvite(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create First Invite
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {invites.map((invite) => (
                  <div
                    key={invite.id}
                    className="border rounded-lg p-4 hover:border-[#BA006F]/30 transition-colors"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="font-semibold">{invite.visitorName}</h3>
                          {getStatusBadge(invite.status)}
                          <Badge variant="outline">{invite.purpose}</Badge>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            {new Date(invite.validFrom).toLocaleDateString("en-SG", {
                              day: "numeric",
                              month: "short",
                            })}{" "}
                            {new Date(invite.validFrom).toLocaleTimeString("en-SG", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                            {" - "}
                            {new Date(invite.validUntil).toLocaleTimeString("en-SG", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                          <span>
                            Entries: {invite.entriesUsed}/{invite.maxEntries}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-1 mt-2">
                          {invite.accessPoints.map((apId) => {
                            const ap = accessPoints.find((a) => a.id === apId);
                            return ap ? (
                              <Badge key={apId} variant="secondary" className="text-xs">
                                {ap.name}
                              </Badge>
                            ) : null;
                          })}
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2">
                        <div className="bg-gray-100 px-4 py-2 rounded-lg text-center">
                          <p className="text-xs text-gray-500">Access Code</p>
                          <p className="text-2xl font-mono font-bold tracking-wider">{invite.inviteCode}</p>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => copyToClipboard(invite.inviteCode)}
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => {
                              const message = `Hi ${invite.visitorName}, here's your access code for The Tennery: ${invite.inviteCode}. Valid from ${new Date(invite.validFrom).toLocaleString()} to ${new Date(invite.validUntil).toLocaleString()}.`;
                              window.open(`https://wa.me/${invite.visitorPhone?.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`);
                            }}
                          >
                            <Send className="h-4 w-4 mr-1" />
                            Share
                          </Button>
                          {(invite.status === "ACTIVE" || invite.status === "PENDING") && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-red-600 hover:bg-red-50"
                              onClick={() => handleCancelInvite(invite.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {/* Access History Tab */}
      {activeTab === "history" && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Access Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {mockAccessHistory.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      log.action === "UNLOCK_SUCCESS" ? "bg-green-100" : "bg-blue-100"
                    }`}>
                      {log.action === "UNLOCK_SUCCESS" ? (
                        <Unlock className="h-5 w-5 text-green-600" />
                      ) : (
                        <Users className="h-5 w-5 text-blue-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium">
                        {log.action === "UNLOCK_SUCCESS" ? "Door Unlocked" : "Visitor Check-in"}
                      </p>
                      <p className="text-sm text-gray-500">
                        {log.accessPoint} • {log.method}
                        {log.visitor && ` • ${log.visitor}`}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm text-gray-500">{log.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* New Invite Modal */}
      {showNewInvite && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Invite a Visitor</CardTitle>
              <button onClick={() => setShowNewInvite(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Visitor Name *
                </label>
                <Input
                  value={inviteForm.visitorName}
                  onChange={(e) => setInviteForm({ ...inviteForm, visitorName: e.target.value })}
                  placeholder="Enter visitor's name"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <Input
                    value={inviteForm.visitorPhone}
                    onChange={(e) => setInviteForm({ ...inviteForm, visitorPhone: e.target.value })}
                    placeholder="+65 9123 4567"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email (Optional)
                  </label>
                  <Input
                    type="email"
                    value={inviteForm.visitorEmail}
                    onChange={(e) => setInviteForm({ ...inviteForm, visitorEmail: e.target.value })}
                    placeholder="visitor@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Purpose *
                  </label>
                  <Select
                    value={inviteForm.purpose}
                    onChange={(e) => setInviteForm({ ...inviteForm, purpose: e.target.value })}
                  >
                    <option value="">Select purpose</option>
                    {purposeOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Vehicle Plate (Optional)
                  </label>
                  <Input
                    value={inviteForm.vehiclePlate}
                    onChange={(e) => setInviteForm({ ...inviteForm, vehiclePlate: e.target.value })}
                    placeholder="SBA1234X"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valid From *
                  </label>
                  <Input
                    type="datetime-local"
                    value={inviteForm.validFrom}
                    onChange={(e) => setInviteForm({ ...inviteForm, validFrom: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Valid Until *
                  </label>
                  <Input
                    type="datetime-local"
                    value={inviteForm.validUntil}
                    onChange={(e) => setInviteForm({ ...inviteForm, validUntil: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Max Entries
                </label>
                <Select
                  value={inviteForm.maxEntries}
                  onChange={(e) => setInviteForm({ ...inviteForm, maxEntries: e.target.value })}
                >
                  <option value="1">1 entry (single use)</option>
                  <option value="2">2 entries</option>
                  <option value="3">3 entries</option>
                  <option value="5">5 entries</option>
                  <option value="10">10 entries</option>
                  <option value="999">Unlimited</option>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Access Points *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {accessPoints.map((ap) => (
                    <label
                      key={ap.id}
                      className={`flex items-center gap-2 p-3 border rounded-lg cursor-pointer transition-colors ${
                        inviteForm.accessPoints.includes(ap.id)
                          ? "border-[#BA006F] bg-[#BA006F]/5"
                          : "border-gray-200 hover:border-[#BA006F]/50"
                      } ${ap.status !== "ONLINE" ? "opacity-50" : ""}`}
                    >
                      <input
                        type="checkbox"
                        checked={inviteForm.accessPoints.includes(ap.id)}
                        onChange={() => toggleAccessPoint(ap.id)}
                        disabled={ap.status !== "ONLINE"}
                        className="text-[#BA006F]"
                      />
                      <div>
                        <p className="font-medium text-sm">{ap.name}</p>
                        <p className="text-xs text-gray-500">{ap.location}</p>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="notifyOnArrival"
                  checked={inviteForm.notifyOnArrival}
                  onChange={(e) => setInviteForm({ ...inviteForm, notifyOnArrival: e.target.checked })}
                  className="text-[#BA006F]"
                />
                <label htmlFor="notifyOnArrival" className="text-sm text-gray-700">
                  Notify me when visitor arrives
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Notes (Optional)
                </label>
                <Textarea
                  value={inviteForm.notes}
                  onChange={(e) => setInviteForm({ ...inviteForm, notes: e.target.value })}
                  placeholder="Any special instructions..."
                  rows={2}
                />
              </div>

              <Button
                className="w-full"
                onClick={handleCreateInvite}
                disabled={!inviteForm.visitorName || !inviteForm.purpose || !inviteForm.validFrom || !inviteForm.validUntil || inviteForm.accessPoints.length === 0}
              >
                <QrCode className="h-4 w-4 mr-2" />
                Generate Access Code
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Invite Success Modal */}
      {showInviteSuccess && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md text-center">
            <CardContent className="pt-8 pb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Invite Created!</h2>
              <p className="text-gray-500 mb-6">
                Share this access code with your visitor
              </p>
              
              <div className="bg-gray-100 p-6 rounded-xl mb-6">
                <p className="text-sm text-gray-500 mb-2">Access Code</p>
                <p className="text-4xl font-mono font-bold tracking-[0.3em]">{generatedCode}</p>
              </div>

              <div className="flex gap-2 mb-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => copyToClipboard(generatedCode)}
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </Button>
                <Button
                  className="flex-1"
                  onClick={() => {
                    const message = `Hi ${inviteForm.visitorName}, here's your access code for The Tennery: ${generatedCode}. Valid from ${new Date(inviteForm.validFrom).toLocaleString()} to ${new Date(inviteForm.validUntil).toLocaleString()}.`;
                    window.open(`https://wa.me/${inviteForm.visitorPhone?.replace(/\D/g, "")}?text=${encodeURIComponent(message)}`);
                  }}
                >
                  <Send className="h-4 w-4 mr-2" />
                  Share via WhatsApp
                </Button>
              </div>

              <Button
                variant="outline"
                onClick={() => {
                  setShowInviteSuccess(false);
                  setInviteForm({
                    visitorName: "",
                    visitorPhone: "",
                    visitorEmail: "",
                    purpose: "",
                    vehiclePlate: "",
                    validFrom: "",
                    validUntil: "",
                    maxEntries: "1",
                    accessPoints: [],
                    notifyOnArrival: true,
                    notes: "",
                  });
                }}
              >
                Done
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Visitor Request Modal */}
      {showVisitorRequest && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between bg-[#BA006F] text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Visitor Request
              </CardTitle>
              <button onClick={() => setShowVisitorRequest(null)}>
                <X className="h-5 w-5" />
              </button>
            </CardHeader>
            <CardContent className="pt-6">
              {/* Visitor Info */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-bold text-lg">{showVisitorRequest.visitorName}</p>
                    <p className="text-gray-500 text-sm">{showVisitorRequest.purpose}</p>
                  </div>
                </div>

                {showVisitorRequest.visitorPhone && (
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="h-4 w-4" />
                    <span>{showVisitorRequest.visitorPhone}</span>
                  </div>
                )}

                <div className="flex items-center gap-2 text-gray-600">
                  <MapPin className="h-4 w-4" />
                  <span>At: <strong>{showVisitorRequest.accessPointName}</strong></span>
                </div>

                <div className="flex items-center gap-2 text-gray-600">
                  <Clock className="h-4 w-4" />
                  <span>Request expires in ~2 minutes</span>
                </div>
              </div>

              {/* Video Preview Placeholder */}
              <div className="bg-gray-900 rounded-lg aspect-video mb-6 flex items-center justify-center">
                <div className="text-center text-gray-400">
                  <Video className="h-12 w-12 mx-auto mb-2" />
                  <p className="text-sm">Live Camera Feed</p>
                  <p className="text-xs">(Requires hardware integration)</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                  onClick={() => handleDenyVisitorRequest(showVisitorRequest.id)}
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Deny
                </Button>
                <Button
                  className="flex-1 bg-green-600 hover:bg-green-700"
                  onClick={() => handleApproveVisitorRequest(showVisitorRequest.id, showVisitorRequest.accessPoint)}
                  disabled={unlockingDoor === showVisitorRequest.accessPoint}
                >
                  {unlockingDoor === showVisitorRequest.accessPoint ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
                      Unlocking...
                    </>
                  ) : (
                    <>
                      <Unlock className="h-4 w-4 mr-2" />
                      Grant Access
                    </>
                  )}
                </Button>
              </div>

              <p className="text-xs text-gray-500 text-center mt-4">
                Granting access will unlock {showVisitorRequest.accessPointName} for 10 seconds
              </p>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
