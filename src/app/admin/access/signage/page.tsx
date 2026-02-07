"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select } from "@/components/ui/select";
import {
  Building2,
  QrCode,
  Printer,
  Download,
  ChevronLeft,
  Smartphone,
  DoorOpen,
} from "lucide-react";
import Link from "next/link";

// Access points matching the updated vendor spec
const accessPoints = [
  { id: "ap-1", name: "Main Lobby", location: "Tower B Ground Floor" },
  { id: "ap-2", name: "Entrance A", location: "Tower A Side" },
  { id: "ap-3", name: "Entrance B", location: "Tower B Side" },
  { id: "ap-4", name: "Entrance C", location: "Tower C Side" },
  { id: "ap-5", name: "Entrance D", location: "Tower D Side" },
];

export default function SignagePage() {
  const [selectedEntrance, setSelectedEntrance] = useState("ap-1");
  const [signageSize, setSignageSize] = useState<"a4" | "a5">("a4");

  const currentEntrance = accessPoints.find((ap) => ap.id === selectedEntrance) || accessPoints[0];
  
  // In production, this would be your actual domain
  const baseUrl = "https://tennery.sg";
  const qrUrl = `${baseUrl}/visitor-access?entrance=${selectedEntrance}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="p-4 md:p-8">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/admin/access">
          <Button variant="outline" size="icon">
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">QR Code Signage</h1>
          <p className="text-gray-500">Generate printable signs for each entrance</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Configuration Panel */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Configure Signage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Select Entrance
                </label>
                <Select
                  value={selectedEntrance}
                  onChange={(e) => setSelectedEntrance(e.target.value)}
                >
                  {accessPoints.map((ap) => (
                    <option key={ap.id} value={ap.id}>
                      {ap.name} - {ap.location}
                    </option>
                  ))}
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Paper Size
                </label>
                <div className="flex gap-2">
                  <Button
                    variant={signageSize === "a4" ? "default" : "outline"}
                    onClick={() => setSignageSize("a4")}
                    className="flex-1"
                  >
                    A4 (210 × 297mm)
                  </Button>
                  <Button
                    variant={signageSize === "a5" ? "default" : "outline"}
                    onClick={() => setSignageSize("a5")}
                    className="flex-1"
                  >
                    A5 (148 × 210mm)
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4">
                <p className="text-sm text-gray-500 mb-2">QR Code URL:</p>
                <code className="block bg-gray-100 p-2 rounded text-xs break-all">
                  {qrUrl}
                </code>
              </div>

              <div className="flex gap-2">
                <Button onClick={handlePrint} className="flex-1">
                  <Printer className="h-4 w-4 mr-2" />
                  Print Signage
                </Button>
                <Button variant="outline" className="flex-1">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Instructions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-600">
              <p>1. Select the entrance where this sign will be placed</p>
              <p>2. Choose the paper size for printing</p>
              <p>3. Click "Print Signage" to print directly or download as PDF</p>
              <p>4. Laminate the sign for durability</p>
              <p>5. Mount at eye level near the entrance intercom</p>
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
                <p className="text-yellow-800 font-medium">💡 Tip</p>
                <p className="text-yellow-700 text-xs mt-1">
                  Generate a unique sign for each entrance so visitors are automatically identified at the correct location.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Preview Panel */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="border-2 border-dashed border-gray-300 rounded-lg overflow-hidden">
                {/* Printable Signage */}
                <div
                  id="printable-signage"
                  className={`bg-white ${signageSize === "a4" ? "aspect-[210/297]" : "aspect-[148/210]"} p-8 flex flex-col`}
                >
                  {/* Header */}
                  <div className="text-center mb-6">
                    <div className="flex items-center justify-center gap-2 mb-2">
                      <Building2 className="h-8 w-8 text-[#BA006F]" />
                      <span className="font-display font-bold text-2xl text-[#58595B]">The Tennery</span>
                    </div>
                    <Badge variant="secondary" className="text-sm">
                      {currentEntrance.name}
                    </Badge>
                  </div>

                  {/* Main Content */}
                  <div className="flex-1 flex flex-col items-center justify-center">
                    <div className="flex items-center gap-2 mb-4">
                      <Smartphone className="h-6 w-6 text-[#BA006F]" />
                      <h2 className="text-xl font-bold text-gray-800">Visitor Access</h2>
                    </div>

                    <p className="text-gray-600 text-center mb-6 max-w-xs">
                      Scan the QR code below to request entry from the resident you are visiting
                    </p>

                    {/* QR Code Placeholder */}
                    <div className="bg-white border-4 border-[#BA006F] rounded-2xl p-4 mb-6">
                      <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                        <div className="text-center">
                          <QrCode className="h-32 w-32 text-gray-800 mx-auto" />
                          <p className="text-xs text-gray-500 mt-2">QR Code</p>
                        </div>
                      </div>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Or visit:</p>
                      <p className="font-mono text-sm text-[#BA006F] font-medium">
                        tennery.sg/visitor
                      </p>
                    </div>
                  </div>

                  {/* Instructions */}
                  <div className="bg-gray-50 rounded-lg p-4 mt-6">
                    <h3 className="font-semibold text-gray-800 mb-2 text-sm">How it works:</h3>
                    <ol className="text-xs text-gray-600 space-y-1">
                      <li>1. Scan QR code with your phone camera</li>
                      <li>2. Enter the unit number you are visiting</li>
                      <li>3. Wait for the resident to grant access</li>
                      <li>4. Door will unlock automatically</li>
                    </ol>
                  </div>

                  {/* Footer */}
                  <div className="text-center mt-4 pt-4 border-t">
                    <p className="text-xs text-gray-400">
                      For assistance, contact security: +65 6763 8978
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-signage,
          #printable-signage * {
            visibility: visible;
          }
          #printable-signage {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            padding: 20mm;
          }
        }
      `}</style>
    </div>
  );
}
