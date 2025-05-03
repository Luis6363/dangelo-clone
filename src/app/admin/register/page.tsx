"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { Check, Eye, EyeOff, FileCheck, UserCog } from "lucide-react";

export default function AdminRegister() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "waiter", // Default role
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [registrationCode, setRegistrationCode] = useState("");
  const [codeVerified, setCodeVerified] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      role: value,
    }));
  };

  const verifyRegistrationCode = () => {
    // In a real app, this would be a server verification
    // For this demo, we'll accept a simple code
    if (registrationCode === "dangelo2025") {
      setCodeVerified(true);
      toast.success("Kodi i regjistrimit u verifikua me sukses!");
    } else {
      toast.error("Kodi i regjistrimit nuk është i vlefshëm!");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!codeVerified) {
      toast.error("Ju lutemi verifikoni kodin e regjistrimit së pari!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Fjalëkalimet nuk përputhen!");
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, this data would be sent to a server for registration
      // For demo purposes, we'll simulate a successful registration
      setTimeout(() => {
        toast.success("Regjistrimi u krye me sukses! Ju lutemi hyni në sistem.");
        router.push("/admin/login");
      }, 1500);
    } catch (error) {
      console.error("Registration error:", error);
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
    <div className="min-h-screen flex items-center justify-center bg-slate-100 py-10">
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
          <p className="text-slate-600">Regjistro staf të ri</p>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="border-none shadow-lg">
            <CardHeader className="bg-primary text-white rounded-t-lg">
              <CardTitle className="text-xl">Regjistrimi i stafit</CardTitle>
              <CardDescription className="text-white/80">
                Krijoni një llogari të re për stafin e restorantit
              </CardDescription>
            </CardHeader>

            {!codeVerified ? (
              <CardContent className="pt-6">
                <div className="text-center mb-4">
                  <FileCheck className="h-12 w-12 text-primary mx-auto mb-2" />
                  <h2 className="text-lg font-medium">Verifikimi i kodit</h2>
                  <p className="text-slate-600 text-sm">
                    Ju lutemi vendosni kodin e regjistrimit për të vazhduar
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="registrationCode">Kodi i regjistrimit</Label>
                    <Input
                      id="registrationCode"
                      value={registrationCode}
                      onChange={(e) => setRegistrationCode(e.target.value)}
                      placeholder="Vendosni kodin e regjistrimit"
                      className="h-10"
                    />
                    <p className="text-xs text-slate-500 mt-1">
                      Demo kodi: dangelo2025
                    </p>
                  </div>
                  <Button
                    type="button"
                    onClick={verifyRegistrationCode}
                    className="w-full bg-primary hover:bg-primary/90"
                  >
                    Verifiko kodin
                  </Button>
                </div>
              </CardContent>
            ) : (
              <CardContent className="pt-6">
                <div className="flex items-center justify-center bg-green-50 p-2 rounded-md mb-4">
                  <Check className="h-4 w-4 text-green-600 mr-2" />
                  <span className="text-green-600 text-sm">Kodi u verifikua</span>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Emri i plotë</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Emri i plotë"
                      required
                      className="h-10"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="email@dangelo.al"
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
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        minLength={6}
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
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Konfirmo fjalëkalimin</Label>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        required
                        minLength={6}
                        className="h-10 pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Roli</Label>
                    <RadioGroup
                      value={formData.role}
                      onValueChange={handleRoleChange}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="admin" id="admin" />
                        <Label htmlFor="admin" className="cursor-pointer">Admin</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="waiter" id="waiter" />
                        <Label htmlFor="waiter" className="cursor-pointer">Kamarier</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="kitchen" id="kitchen" />
                        <Label htmlFor="kitchen" className="cursor-pointer">Staf kuzhine</Label>
                      </div>
                    </RadioGroup>
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
                          Duke u regjistruar...
                        </div>
                      ) : (
                        "Regjistrohu"
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            )}

            <CardFooter className="border-t pt-4 flex justify-center">
              <Link href="/admin/login" className="text-sm text-primary hover:underline">
                Ke një llogari? Hyr në sistem
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
