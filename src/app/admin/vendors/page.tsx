"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  FileText,
  Search,
  Plus,
  Calendar,
  Phone,
  Mail,
  DollarSign,
  Clock,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  MoreVertical,
} from "lucide-react";

const vendors = [
  {
    id: "1",
    name: "CleanPro Services Pte Ltd",
    serviceType: "Cleaning",
    description: "Common area cleaning and maintenance",
    startDate: "2024-01-01",
    endDate: "2026-03-15",
    contractValue: 48000,
    contactPerson: "Mr. Lim Ah Kow",
    contactEmail: "operations@cleanpro.sg",
    contactPhone: "+65 6123 4567",
    status: "active",
    daysToExpiry: 36,
  },
  {
    id: "2",
    name: "SecureGuard Pte Ltd",
    serviceType: "Security",
    description: "24/7 security guard services and CCTV monitoring",
    startDate: "2023-06-01",
    endDate: "2026-03-31",
    contractValue: 120000,
    contactPerson: "Mr. Tan Beng Huat",
    contactEmail: "contracts@secureguard.sg",
    contactPhone: "+65 6234 5678",
    status: "active",
    daysToExpiry: 52,
  },
  {
    id: "3",
    name: "GreenScape Landscaping",
    serviceType: "Landscaping",
    description: "Garden maintenance and landscaping services",
    startDate: "2024-04-01",
    endDate: "2026-12-31",
    contractValue: 24000,
    contactPerson: "Ms. Wong Mei Ling",
    contactEmail: "info@greenscape.sg",
    contactPhone: "+65 6345 6789",
    status: "active",
    daysToExpiry: 327,
  },
  {
    id: "4",
    name: "LiftTech Engineering",
    serviceType: "Lift Maintenance",
    description: "Lift maintenance and emergency repair services",
    startDate: "2023-01-01",
    endDate: "2025-12-31",
    contractValue: 36000,
    contactPerson: "Mr. Goh Chee Keong",
    contactEmail: "service@lifttech.sg",
    contactPhone: "+65 6456 7890",
    status: "expiring",
    daysToExpiry: -38,
  },
  {
    id: "5",
    name: "PoolCare Solutions",
    serviceType: "Pool Maintenance",
    description: "Swimming pool cleaning and chemical treatment",
    startDate: "2024-06-01",
    endDate: "2026-05-31",
    contractValue: 18000,
    contactPerson: "Mr. Ahmad bin Ismail",
    contactEmail: "service@poolcare.sg",
    contactPhone: "+65 6567 8901",
    status: "active",
    daysToExpiry: 113,
  },
];

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredVendors = vendors.filter(
    (vendor) =>
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.serviceType.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusBadge = (vendor: typeof vendors[0]) => {
    if (vendor.daysToExpiry < 0) {
      return <Badge variant="destructive">Expired</Badge>;
    } else if (vendor.daysToExpiry <= 60) {
      return <Badge variant="warning">Expiring Soon</Badge>;
    }
    return <Badge variant="success">Active</Badge>;
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vendor Contracts</h1>
          <p className="text-gray-500">Manage service provider contracts</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Contract
        </Button>
      </div>

      {/* Alerts */}
      {vendors.filter((v) => v.daysToExpiry <= 60).length > 0 && (
        <Card className="mb-6 border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
              <div>
                <h3 className="font-medium text-yellow-800">Contract Renewal Required</h3>
                <p className="text-sm text-yellow-700">
                  {vendors.filter((v) => v.daysToExpiry <= 60).length} contract(s) expiring within 60 days. Please review and initiate renewal process.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search by vendor name or service type..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      {/* Vendor Cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {filteredVendors.map((vendor) => (
          <Card key={vendor.id} className={vendor.daysToExpiry <= 60 ? "border-yellow-200" : ""}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{vendor.name}</h3>
                  <p className="text-sm text-gray-500">{vendor.serviceType}</p>
                </div>
                {getStatusBadge(vendor)}
              </div>

              <p className="text-sm text-gray-600 mb-4">{vendor.description}</p>

              <div className="grid grid-cols-2 gap-3 text-sm mb-4">
                <div>
                  <p className="text-gray-500">Contract Period</p>
                  <p className="font-medium">
                    {new Date(vendor.startDate).toLocaleDateString("en-SG", { month: "short", year: "numeric" })} - {new Date(vendor.endDate).toLocaleDateString("en-SG", { month: "short", year: "numeric" })}
                  </p>
                </div>
                <div>
                  <p className="text-gray-500">Annual Value</p>
                  <p className="font-medium">${vendor.contractValue.toLocaleString()}</p>
                </div>
              </div>

              <div className="border-t pt-3 space-y-2">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4" />
                  {vendor.contactPerson} • {vendor.contactPhone}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Mail className="h-4 w-4" />
                  {vendor.contactEmail}
                </div>
              </div>

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="flex-1">
                  View Details
                </Button>
                {vendor.daysToExpiry <= 60 && (
                  <Button size="sm" className="flex-1">
                    Initiate Renewal
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
