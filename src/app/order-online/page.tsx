"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select";

// Menu categories for the order page
const categories = [
  { id: "waffles", name: "Waffles" },
  { id: "crepes", name: "Crepes" },
  { id: "gelato", name: "Soft Gelato" },
  { id: "smoothies", name: "Smoothies" },
  { id: "coffee", name: "Coffee & Drinks" },
];

// Sample popular items
const popularItems = [
  {
    id: 1,
    name: "Waffle Chocolate Banana",
    price: 450,
    category: "waffles",
  },
  {
    id: 2,
    name: "Crepe Nutella",
    price: 380,
    category: "crepes",
  },
  {
    id: 3,
    name: "Mango Smoothie",
    price: 350,
    category: "smoothies",
  },
  {
    id: 4,
    name: "Classic Cappuccino",
    price: 250,
    category: "coffee",
  },
];

export default function OrderOnlinePage() {
  const [selectedCategory, setSelectedCategory] = useState("waffles");
  const [cart, setCart] = useState<{ id: number; name: string; price: number; quantity: number }[]>([]);
  const [orderInfo, setOrderInfo] = useState({
    name: "",
    phone: "",
    address: "",
    notes: "",
  });

  const handleAddToCart = (item: { id: number; name: string; price: number }) => {
    const existingItem = cart.find(cartItem => cartItem.id === item.id);

    if (existingItem) {
      setCart(cart.map(cartItem =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      ));
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handleQuantityChange = (id: number, quantity: number) => {
    if (quantity < 1) return;

    setCart(cart.map(item =>
      item.id === id ? { ...item, quantity } : item
    ));
  };

  const handleOrderInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setOrderInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Porosia juaj u dërgua me sukses! Ju do të merrni një konfirmim së shpejti.");
    setCart([]);
    setOrderInfo({
      name: "",
      phone: "",
      address: "",
      notes: "",
    });
  };

  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl text-center mb-8">Porosit Online</h1>
        <p className="text-center text-lg mb-12">
          Zgjidhni produktet tuaja të preferuara dhe porositni online
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Menu Section */}
          <div className="lg:col-span-2">
            <Card className="p-6 mb-8">
              <h2 className="text-2xl mb-6">Menu</h2>

              {/* Category Selection */}
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map((category) => (
                  <Button
                    key={category.id}
                    variant={selectedCategory === category.id ? "default" : "outline"}
                    className={`${
                      selectedCategory === category.id ? "bg-accent hover:bg-accent/90" : ""
                    }`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>

              {/* Most Popular Items */}
              <h3 className="text-xl mb-4">Më Populloret</h3>
              <div className="space-y-4 mb-8">
                {popularItems
                  .filter(item => item.category === selectedCategory)
                  .map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 border rounded-md hover:bg-gray-50">
                      <div>
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.price} Lekë</p>
                      </div>
                      <Button
                        className="dangelo-menu-button"
                        onClick={() => handleAddToCart(item)}
                      >
                        Shto
                      </Button>
                    </div>
                  ))}
              </div>

              <p className="text-center text-sm text-gray-500 mt-4">
                * Për të parë menunë e plotë, vizitoni
                <Link href="/menu" className="text-accent hover:underline ml-1">
                  seksionin e menusë
                </Link>
              </p>
            </Card>
          </div>

          {/* Cart & Checkout Section */}
          <div>
            <Card className="p-6 mb-6">
              <h2 className="text-2xl mb-6">Shporta juaj</h2>

              {cart.length === 0 ? (
                <p className="text-gray-500 text-center py-4">Shporta juaj është bosh</p>
              ) : (
                <div className="space-y-4 mb-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-center p-3 border rounded-md">
                      <div className="flex-1">
                        <h4 className="font-semibold">{item.name}</h4>
                        <p className="text-sm text-gray-600">{item.price} Lekë</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="px-2 py-1 border rounded-md"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          className="px-2 py-1 border rounded-md"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                        <button
                          className="ml-2 text-red-500"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}

                  <div className="mt-4 pt-4 border-t flex justify-between">
                    <span className="font-bold">Totali:</span>
                    <span className="font-bold">{totalAmount} Lekë</span>
                  </div>
                </div>
              )}
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl mb-6">Informacioni i Dorëzimit</h2>
              <form onSubmit={handleSubmitOrder} className="space-y-4">
                <div>
                  <Label htmlFor="name">Emri Mbiemri*</Label>
                  <Input
                    id="name"
                    name="name"
                    value={orderInfo.name}
                    onChange={handleOrderInfoChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefon*</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={orderInfo.phone}
                    onChange={handleOrderInfoChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="address">Adresa*</Label>
                  <Input
                    id="address"
                    name="address"
                    value={orderInfo.address}
                    onChange={handleOrderInfoChange}
                    required
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Shënime shtesë</Label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={orderInfo.notes}
                    onChange={handleOrderInfoChange}
                    rows={3}
                    className="w-full p-2 border rounded-md mt-1"
                    placeholder="Udhëzime për dorëzim, alergjitë, etj."
                  />
                </div>
                <Button
                  type="submit"
                  className="dangelo-online-button mt-2 w-full"
                  disabled={cart.length === 0}
                >
                  POROSIT TANI
                </Button>
              </form>
            </Card>
          </div>
        </div>

        {/* Alternative Order Methods */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl mb-4">Metodat Alternative të Porositjes</h2>
          <p className="mb-6">Telefononi drejtpërdrejt ose vizitoni një nga lokacionet tona</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="tel:0699779669"
              className="dangelo-delivery-button inline-block"
            >
              Telefono: 069 977 9669
            </Link>
            <Link
              href="/locations"
              className="dangelo-menu-button inline-block"
            >
              Shiko Lokacionet
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
