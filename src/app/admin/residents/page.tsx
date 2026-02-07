"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Users,
  Search,
  Mail,
  Phone,
  Home,
  MoreVertical,
  UserPlus,
  Download,
  Filter,
} from "lucide-react";

const residents = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@email.com",
    phone: "+65 9123 4567",
    unit: "#12-34",
    role: "RESIDENT",
    status: "active",
    moveInDate: "2020-03-15",
  },
  {
    id: "2",
    name: "Sarah Tan",
    email: "sarah.tan@email.com",
    phone: "+65 9234 5678",
    unit: "#08-12",
    role: "RESIDENT",
    status: "active",
    moveInDate: "2019-06-01",
  },
  {
    id: "3",
    name: "Michael Lee",
    email: "michael.lee@email.com",
    phone: "+65 9345 6789",
    unit: "#15-03",
    role: "COUNCIL",
    status: "active",
    moveInDate: "2018-01-20",
  },
  {
    id: "4",
    name: "Jenny Wong",
    email: "jenny.wong@email.com",
    phone: "+65 9456 7890",
    unit: "#10-08",
    role: "RESIDENT",
    status: "active",
    moveInDate: "2021-09-10",
  },
  {
    id: "5",
    name: "David Chen",
    email: "david.chen@email.com",
    phone: "+65 9567 8901",
    unit: "#03-15",
    role: "RESIDENT",
    status: "inactive",
    moveInDate: "2017-04-05",
  },
  {
    id: "6",
    name: "Lisa Lim",
    email: "lisa.lim@email.com",
    phone: "+65 9678 9012",
    unit: "#20-01",
    role: "COUNCIL",
    status: "active",
    moveInDate: "2016-11-30",
  },
];

const roleColors: Record<string, string> = {
  RESIDENT: "bg-blue-100 text-blue-700",
  COUNCIL: "bg-purple-100 text-purple-700",
  ADMIN: "bg-red-100 text-red-700",
};

export default function ResidentsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");

  const filteredResidents = residents.filter((resident) => {
    const matchesSearch =
      resident.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resident.unit.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resident.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || resident.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Residents</h1>
          <p className="text-gray-500">Manage resident accounts and information</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button>
            <UserPlus className="h-4 w-4 mr-2" />
            Add Resident
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">338</p>
            <p className="text-sm text-gray-500">Total Units</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">331</p>
            <p className="text-sm text-gray-500">Occupied</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">7</p>
            <p className="text-sm text-gray-500">Vacant</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <p className="text-2xl font-bold">5</p>
            <p className="text-sm text-gray-500">Council Members</p>
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
                placeholder="Search by name, unit, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-gray-400" />
              <select
                className="rounded-lg border border-gray-300 px-3 py-2 text-sm"
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
              >
                <option value="all">All Roles</option>
                <option value="RESIDENT">Residents</option>
                <option value="COUNCIL">Council</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Residents Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                    Resident
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500">
                    Unit
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden md:table-cell">
                    Contact
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden lg:table-cell">
                    Role
                  </th>
                  <th className="text-left px-4 py-3 text-sm font-medium text-gray-500 hidden lg:table-cell">
                    Status
                  </th>
                  <th className="text-right px-4 py-3 text-sm font-medium text-gray-500">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredResidents.map((resident) => (
                  <tr key={resident.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center">
                          <span className="text-emerald-600 font-medium text-sm">
                            {resident.name.split(" ").map((n) => n[0]).join("")}
                          </span>
                        </div>
                        <div>
                          <p className="font-medium">{resident.name}</p>
                          <p className="text-sm text-gray-500 md:hidden">{resident.unit}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center gap-1 text-gray-600">
                        <Home className="h-4 w-4" />
                        {resident.unit}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="space-y-1">
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Mail className="h-3 w-3" />
                          {resident.email}
                        </div>
                        <div className="flex items-center gap-1 text-sm text-gray-600">
                          <Phone className="h-3 w-3" />
                          {resident.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <Badge className={roleColors[resident.role]}>
                        {resident.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <Badge variant={resident.status === "active" ? "success" : "secondary"}>
                        {resident.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
