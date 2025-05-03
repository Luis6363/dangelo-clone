"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Bell, ShoppingBag, MapPin } from "lucide-react";

// Define an interface for the order type
interface Order {
  id: string;
  date: string;
  status: string;
  total: string;
  items: string[];
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      router.push("/login");
      return;
    }

    try {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Mock some recent orders
      setRecentOrders([
        { id: "ORD-1234", date: "2023-05-01", status: "Delivered", total: "€15.99", items: ["Picante Pizza", "Cola"] },
        { id: "ORD-1235", date: "2023-04-28", status: "Processing", total: "€22.50", items: ["Carbonara Pasta", "Tiramisu", "Water"] },
        { id: "ORD-1236", date: "2023-04-20", status: "Delivered", total: "€18.75", items: ["Margherita Pizza", "Salad", "Ice Tea"] },
      ]);
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto" />
          <p className="mt-4 text-lg">Duke u ngarkuar...</p>
        </div>
      </div>
    );
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="mb-8"
      >
        <h1 className="text-3xl font-bold text-primary mb-2">Mirë se vini, {user?.name}!</h1>
        <p className="text-muted-foreground">Menaxhoni porositë dhe pëlqimet tuaja të preferuara D&apos;Angelo.</p>
      </motion.div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="overview">Përmbledhje</TabsTrigger>
          <TabsTrigger value="orders">Porositë</TabsTrigger>
          <TabsTrigger value="favorites">Të preferuarat</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <ShoppingBag className="h-4 w-4 mr-2 text-primary" />
                    Porositë e fundit
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">{recentOrders.length}</p>
                  <p className="text-muted-foreground text-sm">Në 30 ditët e fundit</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <MapPin className="h-4 w-4 mr-2 text-primary" />
                    Adresa e ruajtur
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-md">Rruga "Dëshmorët e Kombit", Tiranë</p>
                  <Button variant="link" className="px-0 text-primary">Ndrysho</Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg font-medium flex items-center">
                    <Bell className="h-4 w-4 mr-2 text-primary" />
                    Njoftime
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">2</p>
                  <p className="text-muted-foreground text-sm">Njoftime të palexuara</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Porositë e fundit</CardTitle>
                <CardDescription>Historiku i porosive tuaja të fundit në D&apos;Angelo</CardDescription>
              </CardHeader>
              <CardContent>
                {recentOrders.length > 0 ? (
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="border rounded-lg p-4 flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="font-medium">{order.id}</h4>
                            <span className={`text-xs px-2 py-1 rounded ${
                              order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                            }`}>
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{order.date}</p>
                          <div className="mt-2">
                            <p className="text-sm">{order.items.join(", ")}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{order.total}</p>
                          <Button variant="link" className="text-primary p-0 h-auto text-sm">
                            Shiko detajet
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-6">
                    <p className="text-muted-foreground">Nuk keni porosi të fundit</p>
                    <Button className="mt-4 bg-primary hover:bg-primary/90" onClick={() => router.push("/order-online")}>
                      Porosit tani
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </TabsContent>

        <TabsContent value="orders" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Historiku i porosive</CardTitle>
              <CardDescription>Shikoni të gjitha porositë tuaja të mëparshme</CardDescription>
            </CardHeader>
            <CardContent>
              {recentOrders.length > 0 ? (
                <div className="space-y-4">
                  {recentOrders.map((order) => (
                    <div key={order.id} className="border rounded-lg p-4 flex justify-between items-start">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{order.id}</h4>
                          <span className={`text-xs px-2 py-1 rounded ${
                            order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-amber-100 text-amber-800"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">{order.date}</p>
                        <div className="mt-2">
                          <p className="text-sm">{order.items.join(", ")}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">{order.total}</p>
                        <div className="flex space-x-2 mt-2 justify-end">
                          <Button variant="outline" size="sm">Riktheje</Button>
                          <Button variant="secondary" size="sm">Detaje</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-muted-foreground">Nuk keni porosi të mëparshme</p>
                  <Button className="mt-4 bg-primary hover:bg-primary/90" onClick={() => router.push("/order-online")}>
                    Porosit tani
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="favorites" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Gatimet tuaja të preferuara</CardTitle>
              <CardDescription>Gatimet që ju keni shënuar si të preferuara</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4 relative group">
                  <div className="aspect-square relative overflow-hidden rounded-md">
                    <Image
                      src="/images/pizza1.jpg"
                      alt="Picante Pizza"
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-medium mt-3">Picante Pizza</h4>
                  <p className="text-sm text-muted-foreground">Salcë, djathë, proshutë, kërpudha</p>
                  <p className="font-medium mt-2">€12.99</p>
                  <Button className="w-full mt-3 bg-primary hover:bg-primary/90" size="sm">
                    Shto në shportë
                  </Button>
                </div>

                <div className="border rounded-lg p-4 relative group">
                  <div className="aspect-square relative overflow-hidden rounded-md">
                    <Image
                      src="/images/pasta1.jpg"
                      alt="Carbonara Pasta"
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                  <h4 className="font-medium mt-3">Carbonara Pasta</h4>
                  <p className="text-sm text-muted-foreground">Salcë e bardhë, proshutë, vezë, djathë</p>
                  <p className="font-medium mt-2">€10.50</p>
                  <Button className="w-full mt-3 bg-primary hover:bg-primary/90" size="sm">
                    Shto në shportë
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
