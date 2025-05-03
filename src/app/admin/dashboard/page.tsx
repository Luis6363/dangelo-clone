"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart3, Check, ChefHat, Clock, FileCheck, ShoppingBag, User, UserCog, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

// Demo data for orders
const recentOrders = [
  {
    id: "ORD-1234",
    customer: "Arben Maloku",
    date: "2023-05-01 14:30",
    items: [
      { name: "Picante Pizza", quantity: 1, price: 12.99 },
      { name: "Cola", quantity: 2, price: 2.50 }
    ],
    total: 17.99,
    status: "Pending",
    table: "5",
    type: "Dine-in"
  },
  {
    id: "ORD-1235",
    customer: "Luljeta Hoxha",
    date: "2023-05-01 14:25",
    items: [
      { name: "Carbonara Pasta", quantity: 1, price: 10.50 },
      { name: "Tiramisu", quantity: 1, price: 6.50 },
      { name: "Water", quantity: 1, price: 1.50 }
    ],
    total: 18.50,
    status: "Preparing",
    table: null,
    type: "Delivery"
  },
  {
    id: "ORD-1236",
    customer: "Fatmir Berisha",
    date: "2023-05-01 14:15",
    items: [
      { name: "Margherita Pizza", quantity: 1, price: 9.99 },
      { name: "Greek Salad", quantity: 1, price: 5.99 },
      { name: "Ice Tea", quantity: 2, price: 2.50 }
    ],
    total: 20.98,
    status: "Ready",
    table: "3",
    type: "Dine-in"
  },
  {
    id: "ORD-1237",
    customer: "Drita Krasniqi",
    date: "2023-05-01 14:00",
    items: [
      { name: "Four Seasons Pizza", quantity: 1, price: 13.99 },
      { name: "Chocolate Cake", quantity: 1, price: 5.99 },
      { name: "Coffee", quantity: 2, price: 2.50 }
    ],
    total: 24.98,
    status: "Completed",
    table: null,
    type: "Takeaway"
  }
];

// Demo data for staff
const staffMembers = [
  { id: 1, name: "Blerina Krasniqi", role: "Waiter", status: "Active", avatar: "/images/staff1.jpg" },
  { id: 2, name: "Liridon Gashi", role: "Kitchen", status: "Active", avatar: "/images/staff2.jpg" },
  { id: 3, name: "Zana Hoti", role: "Waiter", status: "Break", avatar: "/images/staff3.jpg" },
  { id: 4, name: "Agron Shala", role: "Admin", status: "Active", avatar: "/images/staff4.jpg" }
];

// Demo data for analytics
const todaySummary = {
  orders: 24,
  revenue: 587.50,
  customers: 19,
  avgOrderValue: 24.48
};

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeOrders, setActiveOrders] = useState(recentOrders);

  useEffect(() => {
    // Check if admin is logged in
    const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";
    if (!isAdminLoggedIn) {
      router.push("/admin/login");
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem("adminUser") || "{}");
      setUser(userData);
    } catch (error) {
      console.error("Error parsing admin data:", error);
      router.push("/admin/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  const changeOrderStatus = (orderId: string, newStatus: string) => {
    setActiveOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
    toast.success(`Porosia ${orderId} u përditësua në: ${newStatus}`);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="mt-4 text-lg text-primary font-medium">Duke u ngarkuar...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100">
      {/* Admin Header */}
      <header className="sticky top-0 z-40 bg-white border-b">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Link href="/admin/dashboard" className="flex items-center">
              <h1 className="text-xl font-bold text-primary">D&apos;Angelo Admin</h1>
            </Link>
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              {user?.role === "admin" ? "Administrator" : user?.role === "waiter" ? "Kamarier" : "Staf"}
            </Badge>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden md:inline-block">
              {user?.name || user?.email}
            </span>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 hover:bg-red-50"
            >
              Dilni
            </Button>
          </div>
        </div>
      </header>

      {/* Main Dashboard */}
      <main className="container mx-auto px-4 py-6">
        <div className="mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Mirë se vini, {user?.name?.split(" ")[0] || "Admin"}
            </h1>
            <p className="text-slate-600">
              Paneli i menaxhimit të restorantit - {new Date().toLocaleDateString("sq-AL", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href="/admin/profile">
                Profili
              </Link>
            </Button>
            <Button className="bg-primary hover:bg-primary/90" size="sm" asChild>
              <Link href="/admin/register">
                Regjistro staf
              </Link>
            </Button>
          </div>
        </div>

        {/* Dashboard Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="bg-white border-none shadow-sm">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-500">Porosia Totale</p>
                <h3 className="text-2xl font-bold">{todaySummary.orders}</h3>
                <p className="text-xs text-green-600 mt-1">+8% nga dje</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-sm">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-500">Të ardhurat</p>
                <h3 className="text-2xl font-bold">€{todaySummary.revenue.toFixed(2)}</h3>
                <p className="text-xs text-green-600 mt-1">+12% nga dje</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-sm">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-500">Klientë</p>
                <h3 className="text-2xl font-bold">{todaySummary.customers}</h3>
                <p className="text-xs text-green-600 mt-1">+5% nga dje</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                <User className="h-6 w-6 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-none shadow-sm">
            <CardContent className="p-4 flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-slate-500">Vlerë mesatare</p>
                <h3 className="text-2xl font-bold">€{todaySummary.avgOrderValue.toFixed(2)}</h3>
                <p className="text-xs text-green-600 mt-1">+3% nga dje</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-amber-100 flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-amber-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content - Orders Management */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Porositë aktive</CardTitle>
                <CardDescription>Menaxhoni porositë e fundit dhe ndryshoni statusin e tyre</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {activeOrders.map((order) => (
                    <div
                      key={order.id}
                      className={`p-4 ${
                        order.status === "Completed" ? "bg-gray-50" :
                        order.status === "Ready" ? "bg-green-50" :
                        order.status === "Preparing" ? "bg-blue-50" : "bg-amber-50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center">
                            <h3 className="font-medium">{order.id}</h3>
                            <Badge
                              className={`ml-2 ${
                                order.status === "Completed" ? "bg-gray-100 text-gray-800" :
                                order.status === "Ready" ? "bg-green-100 text-green-800" :
                                order.status === "Preparing" ? "bg-blue-100 text-blue-800" :
                                "bg-amber-100 text-amber-800"
                              }`}
                            >
                              {order.status}
                            </Badge>
                            <Badge variant="outline" className="ml-2 bg-gray-50">
                              {order.type}
                            </Badge>
                            {order.table && (
                              <Badge variant="outline" className="ml-2 bg-primary/10 text-primary">
                                Tavolina {order.table}
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground flex items-center mt-1">
                            <Clock className="h-3 w-3 mr-1" /> {order.date}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">€{order.total.toFixed(2)}</p>
                        </div>
                      </div>
                      <div className="bg-white rounded p-2 mb-3">
                        <p className="text-sm font-medium mb-1">Klient: {order.customer}</p>
                        <ul className="space-y-1">
                          {order.items.map((item, idx) => (
                            <li key={`${order.id}-item-${idx}`} className="text-sm flex justify-between">
                              <span>
                                {item.quantity}x {item.name}
                              </span>
                              <span>€{(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="flex items-center justify-end space-x-2">
                        {order.status !== "Completed" && (
                          <>
                            {order.status === "Pending" && (
                              <Button
                                size="sm"
                                variant="default"
                                className="bg-blue-500 hover:bg-blue-600"
                                onClick={() => changeOrderStatus(order.id, "Preparing")}
                              >
                                <ChefHat className="h-4 w-4 mr-1" /> Përgatitje
                              </Button>
                            )}
                            {order.status === "Preparing" && (
                              <Button
                                size="sm"
                                variant="default"
                                className="bg-green-500 hover:bg-green-600"
                                onClick={() => changeOrderStatus(order.id, "Ready")}
                              >
                                <Check className="h-4 w-4 mr-1" /> Gati
                              </Button>
                            )}
                            {order.status === "Ready" && (
                              <Button
                                size="sm"
                                variant="default"
                                className="bg-gray-500 hover:bg-gray-600"
                                onClick={() => changeOrderStatus(order.id, "Completed")}
                              >
                                <Check className="h-4 w-4 mr-1" /> Kompletuar
                              </Button>
                            )}
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => changeOrderStatus(order.id, "Cancelled")}
                            >
                              <X className="h-4 w-4 mr-1" /> Anullo
                            </Button>
                          </>
                        )}
                        <Button size="sm" variant="outline">
                          Detaje
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t p-4">
                <Link href="#" className="text-primary hover:underline text-sm">
                  Shiko të gjitha porositë
                </Link>
              </CardFooter>
            </Card>
          </div>

          {/* Sidebar - Staff & Quick Actions */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Stafi aktiv</CardTitle>
                <CardDescription>Stafi në detyrë sot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {staffMembers.map((staff) => (
                    <div key={staff.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="relative w-10 h-10 rounded-full overflow-hidden bg-slate-200">
                          {/* In a real app, you'd use actual staff photos */}
                          <div className="absolute inset-0 flex items-center justify-center text-slate-600 font-medium">
                            {staff.name.charAt(0)}
                          </div>
                        </div>
                        <div>
                          <p className="font-medium text-sm">{staff.name}</p>
                          <p className="text-xs text-muted-foreground">{staff.role}</p>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={staff.status === "Active" ? "bg-green-100 text-green-800 border-green-200" : "bg-amber-100 text-amber-800 border-amber-200"}
                      >
                        {staff.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-center border-t p-4">
                <Link href="#" className="text-primary hover:underline text-sm">
                  Menaxho stafin
                </Link>
              </CardFooter>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Veprime të shpejta</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Button
                    className="w-full bg-blue-500 hover:bg-blue-600 justify-start"
                    size="sm"
                  >
                    <FileCheck className="mr-2 h-4 w-4" />
                    Krijo porosi të re
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <UserCog className="mr-2 h-4 w-4" />
                    Rezervimet
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <BarChart3 className="mr-2 h-4 w-4" />
                    Raportet e shitjeve
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    size="sm"
                  >
                    <ChefHat className="mr-2 h-4 w-4" />
                    Menaxho menunë
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
