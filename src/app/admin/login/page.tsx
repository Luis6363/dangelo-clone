"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Eye, EyeOff, UserCog } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Demo admin credentials (in a real app, this would be validated against a backend)
      if (formData.email === "admin@dangelo.al" && formData.password === "admin123") {
        // Store admin authentication status
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("adminUser", JSON.stringify({
          name: "Admin User",
          email: formData.email,
          role: "admin"
        }));

        toast.success("Hyrja me sukses!");
        router.push("/admin/dashboard");
      } else if (formData.email === "waiter@dangelo.al" && formData.password === "waiter123") {
        // Store waiter authentication status
        localStorage.setItem("isAdminLoggedIn", "true");
        localStorage.setItem("adminUser", JSON.stringify({
          name: "Waiter Staff",
          email: formData.email,
          role: "waiter"
        }));

        toast.success("Hyrja me sukses!");
        router.push("/admin/dashboard");
      } else {
        toast.error("Email-i ose fjalëkalimi i gabuar!");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("Ka ndodhur një gabim. Ju lutemi provoni përsëri.");
    } finally {
      setIsLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md px-4"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="flex items-center justify-center mb-2">
            <UserCog className="h-10 w-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-primary">D&apos;Angelo Admin</h1>
          <p className="text-slate-600">Hyr në panelin e administratorit</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-none shadow-lg">
            <CardHeader className="bg-primary text-white rounded-t-lg">
              <CardTitle className="text-xl">Hyrje në sistem</CardTitle>
              <CardDescription className="text-white/80">
                Ju lutemi identifikohuni për të vazhduar
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="admin@dangelo.al"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="h-10"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Fjalëkalimi</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      className="h-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="pt-2">
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                        Duke u ngarkuar...
                      </div>
                    ) : (
                      "Hyr"
                    )}
                  </Button>
                </div>
              </form>
              <div className="mt-4 text-sm text-center text-slate-600">
                <p>Demo kredenciale:</p>
                <p className="text-xs text-slate-500 mt-1">
                  Admin: admin@dangelo.al / admin123
                  <br />
                  Kamarier: waiter@dangelo.al / waiter123
                </p>
              </div>
            </CardContent>
            <CardFooter className="border-t pt-4 flex justify-center">
              <Link href="/" className="text-sm text-primary hover:underline">
                Kthehu te faqja kryesore
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
