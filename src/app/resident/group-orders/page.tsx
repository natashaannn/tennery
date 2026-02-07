"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  ShoppingBag,
  Clock,
  Users,
  Truck,
  Plus,
  Minus,
  X,
  QrCode,
  CheckCircle,
  Calendar,
} from "lucide-react";

const groupOrders = [
  {
    id: "1",
    title: "Fresh Durians from Pahang",
    vendor: "Ah Seng Durian",
    description: "Premium Musang King durians direct from Pahang. Minimum order 5kg per household.",
    pricePerUnit: 35,
    unit: "kg",
    minOrders: 50,
    currentOrders: 38,
    deadline: "2026-02-10",
    deliveryDate: "2026-02-15",
    status: "open",
    image: "🍈",
  },
  {
    id: "2",
    title: "CNY Cookies Bundle",
    vendor: "Mdm Tan's Kitchen",
    description: "Homemade CNY cookies - pineapple tarts, kueh bangkit, love letters. Set of 4 containers.",
    pricePerUnit: 48,
    unit: "set",
    minOrders: 30,
    currentOrders: 42,
    deadline: "2026-02-08",
    deliveryDate: "2026-02-12",
    status: "open",
    image: "🍪",
  },
  {
    id: "3",
    title: "Organic Vegetables Box",
    vendor: "Green Farm SG",
    description: "Weekly organic vegetable box with seasonal produce. Subscription available.",
    pricePerUnit: 25,
    unit: "box",
    minOrders: 20,
    currentOrders: 25,
    deadline: "2026-02-05",
    deliveryDate: "2026-02-07",
    status: "closed",
    image: "🥬",
  },
];

const myOrders = [
  {
    id: "1",
    groupOrderId: "2",
    title: "CNY Cookies Bundle",
    quantity: 2,
    totalAmount: 96,
    status: "confirmed",
    deliveryDate: "2026-02-12",
  },
];

export default function GroupOrdersPage() {
  const [selectedOrder, setSelectedOrder] = useState<typeof groupOrders[0] | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [showPayment, setShowPayment] = useState(false);

  const handleJoinOrder = () => {
    setShowPayment(true);
  };

  const handlePaymentComplete = () => {
    setShowPayment(false);
    setSelectedOrder(null);
    setQuantity(1);
  };

  return (
    <div className="p-4 md:p-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Group Orders</h1>
        <p className="text-gray-500">Join group buys and save together</p>
      </div>

      {/* My Orders */}
      {myOrders.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">My Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {myOrders.map((order) => (
                <div
                  key={order.id}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <p className="font-medium">{order.title}</p>
                    <p className="text-sm text-gray-500">
                      Qty: {order.quantity} • Delivery: {new Date(order.deliveryDate).toLocaleDateString("en-SG", { day: "numeric", month: "short" })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">${order.totalAmount}</p>
                    <Badge variant="success">{order.status}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Available Group Orders */}
      <h2 className="text-lg font-semibold mb-4">Available Group Orders</h2>
      <div className="grid md:grid-cols-2 gap-4">
        {groupOrders.map((order) => {
          const progress = (order.currentOrders / order.minOrders) * 100;
          const isOpen = order.status === "open";

          return (
            <Card key={order.id} className={!isOpen ? "opacity-75" : ""}>
              <CardContent className="p-4">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-3xl">
                    {order.image}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <h3 className="font-semibold">{order.title}</h3>
                      <Badge variant={isOpen ? "success" : "secondary"}>
                        {isOpen ? "Open" : "Closed"}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{order.vendor}</p>
                  </div>
                </div>

                <p className="text-sm text-gray-600 mb-4">{order.description}</p>

                <div className="space-y-3">
                  {/* Progress Bar */}
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-500">
                        {order.currentOrders} / {order.minOrders} orders
                      </span>
                      <span className={progress >= 100 ? "text-green-600 font-medium" : "text-gray-500"}>
                        {progress >= 100 ? "Goal reached!" : `${Math.round(progress)}%`}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          progress >= 100 ? "bg-green-500" : "bg-emerald-500"
                        }`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Details */}
                  <div className="flex flex-wrap gap-3 text-sm">
                    <span className="flex items-center gap-1 text-gray-500">
                      <ShoppingBag className="h-4 w-4" />
                      ${order.pricePerUnit}/{order.unit}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Clock className="h-4 w-4" />
                      Ends {new Date(order.deadline).toLocaleDateString("en-SG", { day: "numeric", month: "short" })}
                    </span>
                    <span className="flex items-center gap-1 text-gray-500">
                      <Truck className="h-4 w-4" />
                      {new Date(order.deliveryDate).toLocaleDateString("en-SG", { day: "numeric", month: "short" })}
                    </span>
                  </div>

                  {isOpen && (
                    <Button
                      className="w-full"
                      onClick={() => setSelectedOrder(order)}
                    >
                      Join Order
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Join Order Modal */}
      {selectedOrder && !showPayment && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Join Group Order</CardTitle>
              <button onClick={() => setSelectedOrder(null)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg bg-gray-100 flex items-center justify-center text-3xl">
                  {selectedOrder.image}
                </div>
                <div>
                  <h3 className="font-semibold">{selectedOrder.title}</h3>
                  <p className="text-sm text-gray-500">{selectedOrder.vendor}</p>
                </div>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-500">Price per {selectedOrder.unit}:</span>
                  <span className="font-medium">${selectedOrder.pricePerUnit}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Delivery:</span>
                  <span>{new Date(selectedOrder.deliveryDate).toLocaleDateString("en-SG", { day: "numeric", month: "short", year: "numeric" })}</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 text-center"
                    min={1}
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total:</span>
                  <span>${selectedOrder.pricePerUnit * quantity}</span>
                </div>
              </div>

              <Button className="w-full" onClick={handleJoinOrder}>
                Proceed to Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Payment Modal */}
      {showPayment && selectedOrder && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <Card className="w-full max-w-md">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>PayNow Payment</CardTitle>
              <button onClick={() => setShowPayment(false)}>
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </CardHeader>
            <CardContent className="text-center">
              <div className="bg-gray-100 p-8 rounded-lg mb-4">
                <QrCode className="h-32 w-32 mx-auto text-gray-400" />
                <p className="text-sm text-gray-500 mt-2">
                  Scan with your banking app
                </p>
              </div>

              <div className="text-left mb-4">
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">PayNow UEN:</span>
                  <span className="font-mono">T12345678A</span>
                </div>
                <div className="flex justify-between py-2 border-b">
                  <span className="text-gray-500">Reference:</span>
                  <span className="font-mono">TEN-GO-{selectedOrder.id}-{Date.now().toString(36).toUpperCase()}</span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-500">Amount:</span>
                  <span className="font-bold text-lg">${selectedOrder.pricePerUnit * quantity}</span>
                </div>
              </div>

              <Button className="w-full" onClick={handlePaymentComplete}>
                <CheckCircle className="h-4 w-4 mr-2" />
                I Have Made Payment
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
