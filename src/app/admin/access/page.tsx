"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import {
  DoorOpen,
  Settings,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Car,
  History,
  Lock,
  Unlock,
  Video,
  AlertCircle,
  Shield,
  Activity,
  Search,
  Download,
  RefreshCw,
  Power,
  Wifi,
  WifiOff,
  QrCode,
} from "lucide-react";
import Link from "next/link";

// Mock access points for The Tennery (5 glass door entrances)
const accessPoints = [
  { id: "ap-1", name: "Main Lobby", type: "MAIN_LOBBY", status: "ONLINE", location: "Block A Ground Floor", deviceId: "AKV-001", lastHeartbeat: "2026-02-07 15:42:00", firmware: "v2.4.1" },
  { id: "ap-2", name: "Side Entrance A", type: "SIDE_ENTRANCE", status: "ONLINE", location: "Block A Side", deviceId: "AKV-002", lastHeartbeat: "2026-02-07 15:42:05", firmware: "v2.4.1" },
  { id: "ap-3", name: "Side Entrance B", type: "SIDE_ENTRANCE", status: "ONLINE", location: "Block B Side", deviceId: "AKV-003", lastHeartbeat: "2026-02-07 15:41:58", firmware: "v2.4.1" },
  { id: "ap-4", name: "Car Park Lobby", type: "CAR_PARK", status: "ONLINE", location: "Basement 1", deviceId: "AKV-004", lastHeartbeat: "2026-02-07 15:42:02", firmware: "v2.4.1" },
  { id: "ap-5", name: "Pool Deck Gate", type: "POOL_AREA", status: "MAINTENANCE", location: "Level 2 Pool Area", deviceId: "AKV-005", lastHeartbeat: "2026-02-07 10:15:00", firmware: "v2.4.0" },
];

// Mock all visitor invites (from all residents)
const allInvites = [
  { id: "inv-1", inviteCode: "847291", visitorName: "John Delivery", hostUnit: "#05-12", hostName: "Tan Wei Ming", purpose: "Delivery", validFrom: "2026-02-07T09:00", validUntil: "2026-02-07T18:00", status: "ACTIVE", entriesUsed: 1 },
  { id: "inv-2", inviteCode: "563829", visitorName: "Sarah Chen", hostUnit: "#08-05", hostName: "Lee Mei Ling", purpose: "Guest", validFrom: "2026-02-08T14:00", validUntil: "2026-02-08T22:00", status: "PENDING", entriesUsed: 0 },
  { id: "inv-3", inviteCode: "192847", visitorName: "Aircon Repair", hostUnit: "#03-08", hostName: "Ahmad bin Hassan", purpose: "Contractor", validFrom: "2026-02-05T10:00", validUntil: "2026-02-05T17:00", status: "USED", entriesUsed: 3 },
  { id: "inv-4", inviteCode: "738291", visitorName: "Pizza Delivery", hostUnit: "#12-01", hostName: "Ng Siew Kee", purpose: "Delivery", validFrom: "2026-02-07T12:00", validUntil: "2026-02-07T13:00", status: "EXPIRED", entriesUsed: 1 },
  { id: "inv-5", inviteCode: "482917", visitorName: "Property Agent", hostUnit: "#06-15", hostName: "Ravi Kumar", purpose: "Agent", validFrom: "2026-02-07T15:00", validUntil: "2026-02-07T17:00", status: "ACTIVE", entriesUsed: 0 },
];

// Mock comprehensive access logs
const accessLogs = [
  { id: "log-1", time: "2026-02-07 15:32:45", action: "UNLOCK_SUCCESS", accessPoint: "Main Lobby", user: "Tan Wei Ming (#05-12)", method: "Remote App", ip: "192.168.1.45" },
  { id: "log-2", time: "2026-02-07 15:28:12", action: "VISITOR_CHECKIN", accessPoint: "Main Lobby", user: "John Delivery", method: "Visitor Code: 847291", ip: null },
  { id: "log-3", time: "2026-02-07 14:55:00", action: "UNLOCK_SUCCESS", accessPoint: "Car Park Lobby", user: "Lee Mei Ling (#08-05)", method: "Remote App", ip: "192.168.1.67" },
  { id: "log-4", time: "2026-02-07 14:30:22", action: "UNLOCK_FAILED", accessPoint: "Side Entrance A", user: "Unknown", method: "Invalid Code: 999999", ip: null },
  { id: "log-5", time: "2026-02-07 13:45:10", action: "EMERGENCY_UNLOCK", accessPoint: "All Doors", user: "Admin (System)", method: "Emergency Override", ip: "192.168.1.1" },
  { id: "log-6", time: "2026-02-07 12:15:33", action: "VISITOR_CHECKIN", accessPoint: "Main Lobby", user: "Pizza Delivery", method: "Visitor Code: 738291", ip: null },
  { id: "log-7", time: "2026-02-07 11:00:00", action: "SYSTEM_LOCK", accessPoint: "Pool Deck Gate", user: "Admin (System)", method: "Maintenance Mode", ip: "192.168.1.1" },
  { id: "log-8", time: "2026-02-07 10:45:00", action: "UNLOCK_SUCCESS", accessPoint: "Side Entrance B", user: "Ahmad bin Hassan (#03-08)", method: "Remote App", ip: "192.168.1.89" },
];

// Stats
const stats = {
  totalUnlocksToday: 47,
  activeVisitors: 3,
  failedAttempts: 2,
  doorsOnline: 4,
  doorsMaintenance: 1,
};

export default function AdminAccessControlPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "doors" | "invites" | "logs">("overview");
  const [searchQuery, setSearchQuery] = useState("");
  const [logFilter, setLogFilter] = useState("all");
  const [emergencyMode, setEmergencyMode] = useState(false);

  const handleEmergencyUnlock = () => {
    if (confirm("⚠️ EMERGENCY UNLOCK\n\nThis will unlock ALL doors for 60 seconds.\n\nAre you sure you want to proceed?")) {
      setEmergencyMode(true);
      setTimeout(() => setEmergencyMode(false), 60000);
      alert("All doors have been unlocked for 60 seconds.");
    }
  };

  const handleEmergencyLockdown = () => {
    if (confirm("🔒 EMERGENCY LOCKDOWN\n\nThis will lock ALL doors and disable all access codes.\n\nAre you sure you want to proceed?")) {
      alert("All doors have been locked. Contact security to restore access.");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ACTIVE": return <Badge variant="success">Active</Badge>;
      case "PENDING": return <Badge variant="warning">Pending</Badge>;
      case "USED": return <Badge variant="secondary">Used</Badge>;
      case "EXPIRED": return <Badge variant="secondary">Expired</Badge>;
      case "CANCELLED": return <Badge variant="destructive">Cancelled</Badge>;
      default: return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case "UNLOCK_SUCCESS": return <Badge variant="success">Unlock Success</Badge>;
      case "UNLOCK_FAILED": return <Badge variant="destructive">Unlock Failed</Badge>;
      case "VISITOR_CHECKIN": return <Badge variant="default">Visitor Check-in</Badge>;
      case "EMERGENCY_UNLOCK": return <Badge variant="warning">Emergency Unlock</Badge>;
      case "SYSTEM_LOCK": return <Badge variant="secondary">System Lock</Badge>;
      default: return <Badge variant="secondary">{action}</Badge>;
    }
  };

  const filteredLogs = accessLogs.filter((log) => {
    if (logFilter === "all") return true;
    return log.action === logFilter;
  });

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Access Control Management</h1>
          <p className="text-gray-500">Monitor and manage building access systems</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/access/signage">
            <Button variant="outline">
              <QrCode className="h-4 w-4 mr-2" />
              QR Signage
            </Button>
          </Link>
          <Button variant="outline" onClick={handleEmergencyUnlock} className="text-yellow-600 border-yellow-600 hover:bg-yellow-50">
            <Unlock className="h-4 w-4 mr-2" />
            Emergency Unlock
          </Button>
          <Button variant="destructive" onClick={handleEmergencyLockdown}>
            <Lock className="h-4 w-4 mr-2" />
            Lockdown
          </Button>
        </div>
      </div>

      {/* Emergency Mode Banner */}
      {emergencyMode && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 px-4 py-3 rounded-lg mb-6 flex items-center gap-3">
          <AlertTriangle className="h-5 w-5" />
          <div>
            <p className="font-semibold">Emergency Unlock Active</p>
            <p className="text-sm">All doors are currently unlocked. They will automatically lock in 60 seconds.</p>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="flex gap-2 mb-6 border-b">
        <button
          onClick={() => setActiveTab("overview")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "overview" ? "text-[#BA006F] border-b-2 border-[#BA006F]" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Activity className="h-4 w-4 inline mr-2" />
          Overview
        </button>
        <button
          onClick={() => setActiveTab("doors")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "doors" ? "text-[#BA006F] border-b-2 border-[#BA006F]" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <DoorOpen className="h-4 w-4 inline mr-2" />
          Access Points
        </button>
        <button
          onClick={() => setActiveTab("invites")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "invites" ? "text-[#BA006F] border-b-2 border-[#BA006F]" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <Users className="h-4 w-4 inline mr-2" />
          All Visitor Invites
        </button>
        <button
          onClick={() => setActiveTab("logs")}
          className={`px-4 py-2 font-medium transition-colors ${
            activeTab === "logs" ? "text-[#BA006F] border-b-2 border-[#BA006F]" : "text-gray-500 hover:text-gray-700"
          }`}
        >
          <History className="h-4 w-4 inline mr-2" />
          Access Logs
        </button>
      </div>

      {/* Overview Tab */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-[#BA006F]/10 flex items-center justify-center">
                    <Unlock className="h-5 w-5 text-[#BA006F]" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.totalUnlocksToday}</p>
                    <p className="text-xs text-gray-500">Unlocks Today</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center">
                    <Users className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.activeVisitors}</p>
                    <p className="text-xs text-gray-500">Active Visitors</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                    <AlertCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.failedAttempts}</p>
                    <p className="text-xs text-gray-500">Failed Attempts</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center">
                    <Wifi className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.doorsOnline}</p>
                    <p className="text-xs text-gray-500">Doors Online</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <Settings className="h-5 w-5 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stats.doorsMaintenance}</p>
                    <p className="text-xs text-gray-500">Maintenance</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Quick Status */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  System Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {accessPoints.map((door) => (
                    <div key={door.id} className="flex items-center justify-between p-2 border rounded-lg">
                      <div className="flex items-center gap-3">
                        {door.status === "ONLINE" ? (
                          <Wifi className="h-4 w-4 text-green-600" />
                        ) : (
                          <WifiOff className="h-4 w-4 text-yellow-600" />
                        )}
                        <span className="font-medium">{door.name}</span>
                      </div>
                      <Badge variant={door.status === "ONLINE" ? "success" : "warning"}>
                        {door.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {accessLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center justify-between text-sm">
                      <div>
                        <p className="font-medium">{log.user}</p>
                        <p className="text-gray-500">{log.accessPoint}</p>
                      </div>
                      <div className="text-right">
                        {getActionBadge(log.action)}
                        <p className="text-xs text-gray-500 mt-1">{log.time.split(" ")[1]}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Access Points Tab */}
      {activeTab === "doors" && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-semibold">Access Point Configuration</h2>
            <Button variant="outline">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh Status
            </Button>
          </div>
          
          <div className="grid gap-4">
            {accessPoints.map((door) => (
              <Card key={door.id}>
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        door.status === "ONLINE" ? "bg-green-100" : "bg-yellow-100"
                      }`}>
                        {door.type === "CAR_PARK" ? (
                          <Car className={`h-6 w-6 ${door.status === "ONLINE" ? "text-green-600" : "text-yellow-600"}`} />
                        ) : (
                          <DoorOpen className={`h-6 w-6 ${door.status === "ONLINE" ? "text-green-600" : "text-yellow-600"}`} />
                        )}
                      </div>
                      <div>
                        <h3 className="font-semibold">{door.name}</h3>
                        <p className="text-sm text-gray-500">{door.location}</p>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Device ID</p>
                        <p className="font-mono">{door.deviceId}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Firmware</p>
                        <p>{door.firmware}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Last Heartbeat</p>
                        <p>{door.lastHeartbeat}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Status</p>
                        <Badge variant={door.status === "ONLINE" ? "success" : "warning"}>
                          {door.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" disabled={door.status !== "ONLINE"}>
                        <Unlock className="h-4 w-4 mr-1" />
                        Unlock
                      </Button>
                      <Button variant="outline" size="sm">
                        <Video className="h-4 w-4 mr-1" />
                        Camera
                      </Button>
                      <Button variant="outline" size="sm">
                        <Settings className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* All Invites Tab */}
      {activeTab === "invites" && (
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle>All Visitor Invites</CardTitle>
              <div className="flex gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search invites..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9 w-64"
                  />
                </div>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Code</th>
                    <th className="text-left py-3 px-2">Visitor</th>
                    <th className="text-left py-3 px-2">Host</th>
                    <th className="text-left py-3 px-2">Purpose</th>
                    <th className="text-left py-3 px-2">Valid Period</th>
                    <th className="text-left py-3 px-2">Entries</th>
                    <th className="text-left py-3 px-2">Status</th>
                    <th className="text-left py-3 px-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {allInvites.map((invite) => (
                    <tr key={invite.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-2 font-mono font-bold">{invite.inviteCode}</td>
                      <td className="py-3 px-2">{invite.visitorName}</td>
                      <td className="py-3 px-2">
                        <p className="font-medium">{invite.hostName}</p>
                        <p className="text-gray-500 text-xs">{invite.hostUnit}</p>
                      </td>
                      <td className="py-3 px-2">{invite.purpose}</td>
                      <td className="py-3 px-2 text-xs">
                        {new Date(invite.validFrom).toLocaleString("en-SG", { dateStyle: "short", timeStyle: "short" })}
                        <br />
                        to {new Date(invite.validUntil).toLocaleString("en-SG", { dateStyle: "short", timeStyle: "short" })}
                      </td>
                      <td className="py-3 px-2">{invite.entriesUsed}</td>
                      <td className="py-3 px-2">{getStatusBadge(invite.status)}</td>
                      <td className="py-3 px-2">
                        <Button variant="outline" size="sm">View</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Access Logs Tab */}
      {activeTab === "logs" && (
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle>Access Logs</CardTitle>
              <div className="flex gap-2">
                <Select value={logFilter} onChange={(e) => setLogFilter(e.target.value)}>
                  <option value="all">All Actions</option>
                  <option value="UNLOCK_SUCCESS">Unlock Success</option>
                  <option value="UNLOCK_FAILED">Unlock Failed</option>
                  <option value="VISITOR_CHECKIN">Visitor Check-in</option>
                  <option value="EMERGENCY_UNLOCK">Emergency Unlock</option>
                  <option value="SYSTEM_LOCK">System Lock</option>
                </Select>
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Export Logs
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2">Timestamp</th>
                    <th className="text-left py-3 px-2">Action</th>
                    <th className="text-left py-3 px-2">Access Point</th>
                    <th className="text-left py-3 px-2">User/Visitor</th>
                    <th className="text-left py-3 px-2">Method</th>
                    <th className="text-left py-3 px-2">IP Address</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log) => (
                    <tr key={log.id} className={`border-b hover:bg-gray-50 ${
                      log.action === "UNLOCK_FAILED" ? "bg-red-50" : 
                      log.action === "EMERGENCY_UNLOCK" ? "bg-yellow-50" : ""
                    }`}>
                      <td className="py-3 px-2 font-mono text-xs">{log.time}</td>
                      <td className="py-3 px-2">{getActionBadge(log.action)}</td>
                      <td className="py-3 px-2">{log.accessPoint}</td>
                      <td className="py-3 px-2">{log.user}</td>
                      <td className="py-3 px-2 text-xs">{log.method}</td>
                      <td className="py-3 px-2 font-mono text-xs">{log.ip || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
