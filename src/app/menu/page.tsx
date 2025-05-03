"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

// Menu data
const categories = [
  { id: "all", name: "All Items" },
  { id: "waffles", name: "Waffles" },
  { id: "crepes", name: "Crepes" },
  { id: "gelato", name: "Soft Gelato" },
  { id: "smoothies", name: "Smoothies" },
  { id: "coffee", name: "Coffee & Drinks" },
];

const menuItems = [
  {
    id: 1,
    name: "Waffle Chocolate Banana",
    description: "Classic waffle with chocolate sauce and fresh banana slices",
    price: "450 Lekë",
    category: "waffles",
    image: "/images/waffle-chocolate.jpg"
  },
  {
    id: 2,
    name: "Waffle Nutella Strawberry",
    description: "Delicious waffle with Nutella spread and fresh strawberries",
    price: "550 Lekë",
    category: "waffles",
    image: "/images/waffle-nutella.jpg"
  },
  {
    id: 3,
    name: "Crepe Fruits Forest",
    description: "Thin crepe with mixed forest fruits and powdered sugar",
    price: "400 Lekë",
    category: "crepes",
    image: "/images/crepe-fruits.jpg"
  },
  {
    id: 4,
    name: "Gelato Classic",
    description: "Soft vanilla gelato with your choice of sauce and toppings",
    price: "300 Lekë",
    category: "gelato",
    image: "/images/gelato-vanilla.jpg"
  },
  {
    id: 5,
    name: "Mango Smoothie",
    description: "Refreshing mango smoothie with yogurt and a hint of mint",
    price: "350 Lekë",
    category: "smoothies",
    image: "/images/mango-smoothie.jpg"
  },
  {
    id: 6,
    name: "Classic Cappuccino",
    description: "Italian style cappuccino with rich espresso and steamed milk",
    price: "250 Lekë",
    category: "coffee",
    image: "/images/cappuccino.jpg"
  },
  {
    id: 7,
    name: "Crepe Nutella",
    description: "Crepe filled with Nutella chocolate spread",
    price: "380 Lekë",
    category: "crepes",
    image: "/images/crepe-nutella.jpg"
  },
  {
    id: 8,
    name: "Chocolate Gelato",
    description: "Rich chocolate gelato with chocolate chips",
    price: "320 Lekë",
    category: "gelato",
    image: "/images/gelato-chocolate.jpg"
  },
];

// Framer Motion animation variants
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemAnimation = {
  hidden: { y: 20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100
    }
  }
};

export default function MenuPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredItems = selectedCategory === "all"
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  useEffect(() => {
    // Add or remove overflow hidden on the body when modal is open/closed
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isModalOpen]);

  const handleViewDetails = (id: number) => {
    setSelectedItem(id);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <motion.h1
          className="text-4xl md:text-5xl text-center mb-8"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Menu
        </motion.h1>
        <motion.p
          className="text-center text-lg mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          Kliko dhe eksploro produktet tona të bëra me cilësi premium
        </motion.p>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {categories.map((category, index) => (
            <motion.div key={category.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 + (index * 0.1) }}>
              <Button
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`${
                  selectedCategory === category.id ? "bg-accent hover:bg-accent/90" : ""
                } transition-all duration-200 hover:scale-105`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name}
              </Button>
            </motion.div>
          ))}
        </motion.div>

        {/* Menu Items */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {filteredItems.map((item) => (
            <motion.div key={item.id} variants={itemAnimation}>
              <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-2">
                <div className="aspect-video relative bg-muted">
                  <div className="absolute inset-0 flex items-center justify-center bg-accent/20 text-center p-4">
                    <p className="text-2xl font-bold">{item.name}</p>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{item.name}</h3>
                  <p className="text-gray-600 mb-4">{item.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-accent font-bold text-lg">{item.price}</p>
                    <Button
                      className="dangelo-menu-button"
                      onClick={() => handleViewDetails(item.id)}
                    >
                      View Details
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Full Menu Download */}
      <motion.div
        className="mt-16 text-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        <h2 className="text-2xl mb-4">View Our Full Menu</h2>
        <p className="mb-6">Download our complete menu with all items and prices</p>
        <Button className="dangelo-menu-button hover:scale-105 transition-transform duration-200">
          Download Menu PDF
        </Button>
      </motion.div>

      {/* Item Detail Modal */}
      {isModalOpen && selectedItem && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <motion.div
            className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-auto"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <div className="p-6">
              {menuItems.find(item => item.id === selectedItem) && (
                <>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">{menuItems.find(item => item.id === selectedItem)?.name}</h3>
                    <button
                      onClick={closeModal}
                      className="text-gray-500 hover:text-gray-800 text-2xl"
                    >
                      ×
                    </button>
                  </div>
                  <div className="aspect-video rounded-lg bg-muted mb-6 flex items-center justify-center">
                    <p className="text-gray-400 text-sm">Product Image</p>
                  </div>
                  <p className="text-gray-600 mb-6">{menuItems.find(item => item.id === selectedItem)?.description}</p>
                  <div className="mb-6">
                    <h4 className="font-bold mb-2">Ingredients:</h4>
                    <ul className="list-disc list-inside text-gray-600">
                      <li>Premium Ingredients</li>
                      <li>Made with Love</li>
                      <li>100% Fresh Products</li>
                    </ul>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-accent font-bold text-xl">{menuItems.find(item => item.id === selectedItem)?.price}</p>
                    <Button className="dangelo-online-button">
                      Add to Order
                    </Button>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
