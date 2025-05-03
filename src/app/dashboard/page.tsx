"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  User,
  Package,
  Gift,
  CreditCard,
  Settings,
  LogOut,
  Award,
  Clock,
  ChevronRight
} from "lucide-react";

// Mock order data
const mockOrders = [
  {
    id: "ORD-1234",
    date: "2025-03-15T14:30:00",
    items: [
      { name: "Waffle Chocolate Banana", quantity: 1, price: 450 },
      { name: "Mango Smoothie", quantity: 2, price: 350 }
    ],
    total: 1150,
    status: "Delivered"
  },
  {
    id: "ORD-1235",
    date: "2025-03-10T12:15:00",
    items: [
      { name: "Crepe Nutella", quantity: 1, price: 380 },
      { name: "Classic Cappuccino", quantity: 1, price: 250 }
    ],
    total: 630,
    status: "Delivered"
  },
  {
    id: "ORD-1236",
    date: "2025-02-28T18:45:00",
    items: [
      { name: "Chocolate Gelato", quantity: 2, price: 320 }
    ],
    total: 640,
    status: "Delivered"
  }
];

// Mock rewards
const mockRewards = [
  { id: 1, name: "Free Cappuccino", points: 500, image: "/rewards/coffee.png" },
  { id: 2, name: "50% Off Any Waffle", points: 800, image: "/rewards/waffle.png" },
  { id: 3, name: "Free Crepe", points: 1000, image: "/rewards/crepe.png" },
  { id: 4, name: "Free Smoothie", points: 750, image: "/rewards/smoothie.png" },
  { id: 5, name: "Special Dessert Sampler", points: 1500, image: "/rewards/dessert.png" }
];

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [loyaltyPoints, setLoyaltyPoints] = useState(750);
  const [orders, setOrders] = useState(mockOrders);
  const [rewards, setRewards] = useState(mockRewards);
  const [selectedReward, setSelectedReward] = useState<any>(null);
  const [showRedeemConfirm, setShowRedeemConfirm] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    // Get user data
    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setUser(userData);
    } catch (error) {
      console.error('Error parsing user data:', error);
    }

    setLoading(false);
  }, [router]);

  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    router.push('/');
  };

  const handleRedeemPoints = (reward: any) => {
    setSelectedReward(reward);
    setShowRedeemConfirm(true);
  };

  const confirmRedemption = () => {
    // Process redemption
    setLoyaltyPoints(loyaltyPoints - selectedReward.points);
    setShowRedeemConfirm(false);
    setSelectedReward(null);

    // Add redemption to "orders"
    const newRedemption = {
      id: `RDM-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString(),
      items: [
        { name: `Redemption: ${selectedReward.name}`, quantity: 1, price: 0 }
      ],
      total: 0,
      status: "Processing",
      isRedemption: true
    };

    setOrders([newRedemption, ...orders]);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <Card className="p-6">
            <div className="flex flex-col items-center mb-6">
              <div className="w-24 h-24 bg-primary rounded-full flex items-center justify-center text-white text-3xl mb-3">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <h2 className="text-xl font-bold">{user?.name || 'User'}</h2>
              <p className="text-gray-600">{user?.email}</p>
            </div>

            <div className="border-t pt-4 mt-2">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-primary">
                  <Award className="h-5 w-5" />
                  <span className="font-medium">Loyalty Points</span>
                </div>
                <span className="font-bold">{loyaltyPoints}</span>
              </div>

              <div className="bg-gray-100 rounded-full h-2.5 mb-6">
                <div
                  className="bg-accent h-2.5 rounded-full"
                  style={{ width: `${Math.min(100, (loyaltyPoints / 1500) * 100)}%` }}
                ></div>
              </div>

              <p className="text-xs text-gray-500 mb-6 text-center">
                {loyaltyPoints < 500 ? (
                  `Earn ${500 - loyaltyPoints} more points for your first reward!`
                ) : (
                  `You have enough points to redeem rewards!`
                )}
              </p>
            </div>

            <div className="space-y-2">
              <Link href="/dashboard" className="flex items-center gap-3 p-2 bg-primary/5 rounded-md hover:bg-primary/10">
                <User className="h-5 w-5 text-primary" />
                <span>Dashboard</span>
              </Link>
              <Link href="/dashboard/profile" className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10">
                <Settings className="h-5 w-5 text-gray-500" />
                <span>Profile Settings</span>
              </Link>
              <Link href="/order-online" className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10">
                <CreditCard className="h-5 w-5 text-gray-500" />
                <span>New Order</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-red-50 text-red-500 w-full text-left"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>
          </Card>
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4">
          <h1 className="text-3xl font-bold mb-6">My Dashboard</h1>

          <Tabs defaultValue="overview">
            <TabsList className="mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="orders">Order History</TabsTrigger>
              <TabsTrigger value="rewards">Rewards</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <Card className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Loyalty Status</h3>
                      <p className="text-gray-500 text-sm mb-4">Your current rewards</p>
                      <div className="flex items-center gap-2">
                        <Award className="h-6 w-6 text-accent" />
                        <span className="text-2xl font-bold">{loyaltyPoints} points</span>
                      </div>
                    </div>
                    <div className="bg-accent/10 p-3 rounded-full">
                      <Award className="h-8 w-8 text-accent" />
                    </div>
                  </div>
                  <Link href="/dashboard?tab=rewards" className="text-accent hover:underline text-sm mt-4 inline-block">
                    View available rewards
                  </Link>
                </Card>

                <Card className="p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold mb-1">Recent Orders</h3>
                      <p className="text-gray-500 text-sm mb-4">Your order history</p>
                      <div className="flex items-center gap-2">
                        <Package className="h-6 w-6 text-primary" />
                        <span className="text-2xl font-bold">{orders.length} orders</span>
                      </div>
                    </div>
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Package className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <Link href="/dashboard?tab=orders" className="text-primary hover:underline text-sm mt-4 inline-block">
                    View all orders
                  </Link>
                </Card>
              </div>

              <h2 className="text-xl font-bold mb-4">Latest Orders</h2>
              <div className="space-y-4 mb-8">
                {orders.slice(0, 2).map((order) => (
                  <Card key={order.id} className="p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {order.isRedemption ? (
                            <Gift className="h-5 w-5 text-accent" />
                          ) : (
                            <Package className="h-5 w-5 text-primary" />
                          )}
                          <h3 className="font-semibold">{order.id}</h3>
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-0.5 rounded-full">
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-2">{formatDate(order.date)}</p>
                        <div className="text-sm">
                          {order.items.map((item, idx) => (
                            <div key={idx} className="flex gap-2">
                              <span>{item.quantity}x</span>
                              <span>{item.name}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 flex items-center">
                        {!order.isRedemption && (
                          <div className="text-right mr-6">
                            <div className="font-semibold">{order.total} Lekë</div>
                            <div className="text-xs text-green-600">+{Math.round(order.total * 0.1)} points earned</div>
                          </div>
                        )}
                        <ChevronRight className="h-5 w-5 text-gray-400" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <h2 className="text-xl font-bold mb-4">Recommended Rewards</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {rewards.slice(0, 2).map((reward) => (
                  <Card key={reward.id} className="p-4 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="bg-accent/10 p-2 rounded-full">
                        <Gift className="h-6 w-6 text-accent" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{reward.name}</h3>
                        <p className="text-sm text-gray-500">{reward.points} points</p>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-accent border-accent hover:bg-accent/10"
                      disabled={loyaltyPoints < reward.points}
                      onClick={() => handleRedeemPoints(reward)}
                    >
                      Redeem
                    </Button>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="orders">
              <h2 className="text-xl font-bold mb-6">Order History</h2>

              <div className="space-y-6">
                {orders.map((order) => (
                  <Card key={order.id} className="p-6">
                    <div className="flex flex-col md:flex-row justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {order.isRedemption ? (
                            <Gift className="h-5 w-5 text-accent" />
                          ) : (
                            <Package className="h-5 w-5 text-primary" />
                          )}
                          <h3 className="font-semibold">{order.id}</h3>
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            order.status === 'Delivered'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {order.status}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500">{formatDate(order.date)}</p>
                      </div>
                      {!order.isRedemption && (
                        <div className="mt-4 md:mt-0">
                          <div className="font-semibold">{order.total} Lekë</div>
                          <div className="text-xs text-green-600">+{Math.round(order.total * 0.1)} points earned</div>
                        </div>
                      )}
                    </div>

                    <div className="border-t pt-4">
                      <h4 className="font-medium mb-2">Order Items</h4>
                      <table className="w-full text-sm">
                        <thead className="text-left text-gray-500">
                          <tr>
                            <th className="pb-2">Item</th>
                            <th className="pb-2">Quantity</th>
                            <th className="pb-2 text-right">Price</th>
                          </tr>
                        </thead>
                        <tbody>
                          {order.items.map((item, idx) => (
                            <tr key={idx}>
                              <td className="py-1">{item.name}</td>
                              <td>{item.quantity}</td>
                              <td className="text-right">{item.price * item.quantity} Lekë</td>
                            </tr>
                          ))}
                          {!order.isRedemption && (
                            <tr className="font-semibold">
                              <td colSpan={2} className="pt-2">Total</td>
                              <td className="text-right pt-2">{order.total} Lekë</td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>

                    {!order.isRedemption && order.status === 'Delivered' && (
                      <div className="mt-4 flex justify-end">
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="rewards">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold">Rewards & Loyalty</h2>
                <div className="bg-primary/10 px-4 py-2 rounded-lg flex items-center gap-2">
                  <Award className="h-5 w-5 text-primary" />
                  <span className="font-bold">{loyaltyPoints} points available</span>
                </div>
              </div>

              <Card className="p-6 mb-8">
                <h3 className="font-semibold mb-4">How it works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <CreditCard className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium mb-1">Order and Earn</h4>
                    <p className="text-sm text-gray-500">Earn 10% of your order total in loyalty points</p>
                  </div>
                  <div className="p-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Award className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium mb-1">Collect Points</h4>
                    <p className="text-sm text-gray-500">Points are added to your account after delivery</p>
                  </div>
                  <div className="p-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Gift className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-medium mb-1">Redeem Rewards</h4>
                    <p className="text-sm text-gray-500">Use your points to claim exciting rewards</p>
                  </div>
                </div>
              </Card>

              <h3 className="font-semibold mb-4">Available Rewards</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {rewards.map((reward) => (
                  <Card key={reward.id} className="p-6 flex justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <Gift className="h-5 w-5 text-accent" />
                        <h4 className="font-semibold">{reward.name}</h4>
                      </div>
                      <p className="text-sm text-gray-500 mb-4">
                        Redeem this reward for {reward.points} points
                      </p>
                      <Button
                        className="bg-accent hover:bg-accent/90"
                        disabled={loyaltyPoints < reward.points}
                        onClick={() => handleRedeemPoints(reward)}
                      >
                        {loyaltyPoints >= reward.points ? 'Redeem Now' : `Need ${reward.points - loyaltyPoints} more points`}
                      </Button>
                    </div>
                    <div className="bg-accent/10 p-3 rounded-full h-fit">
                      <Gift className="h-10 w-10 text-accent" />
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Redemption Confirmation Modal */}
      {showRedeemConfirm && selectedReward && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Confirm Redemption</h2>
            <p className="mb-6">
              Are you sure you want to redeem <strong>{selectedReward.name}</strong> for <strong>{selectedReward.points} points</strong>?
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setShowRedeemConfirm(false)}>
                Cancel
              </Button>
              <Button className="bg-accent hover:bg-accent/90" onClick={confirmRedemption}>
                Confirm Redemption
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
