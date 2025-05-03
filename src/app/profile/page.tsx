"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    notifications: {
      orderUpdates: true,
      promotions: false,
      newsletter: true,
      loyaltyProgram: true
    },
    passwordForm: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

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
      setFormState(prev => ({
        ...prev,
        name: parsedUser.name || "",
        email: parsedUser.email || "",
        phone: parsedUser.phone || "",
        address: parsedUser.address || "",
        city: parsedUser.city || ""
      }));
    } catch (error) {
      console.error("Error parsing user data:", error);
      router.push("/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({
      ...prev,
      passwordForm: {
        ...prev.passwordForm,
        [name]: value
      }
    }));
  };

  const handleToggleNotification = (key: keyof typeof formState.notifications) => {
    setFormState(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    // Update user data in localStorage
    if (user) {
      const updatedUser = {
        ...user,
        name: formState.name,
        email: formState.email,
        phone: formState.phone,
        address: formState.address,
        city: formState.city
      };

      localStorage.setItem("user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success("Profili juaj u përditësua me sukses!");
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = formState.passwordForm;

    // Simple validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Ju lutemi plotësoni të gjitha fushat e kërkuara");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Fjalëkalimet e reja nuk përputhen");
      return;
    }

    // In a real app, we would send this to an API
    // For now, just show success message
    toast.success("Fjalëkalimi juaj u ndryshua me sukses!");

    // Reset password form
    setFormState(prev => ({
      ...prev,
      passwordForm: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }
    }));
  };

  const handleSaveNotifications = () => {
    toast.success("Preferencat e njoftimeve u përditësuan me sukses!");
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
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
        <h1 className="text-3xl font-bold text-primary mb-2">Profili Juaj</h1>
        <p className="text-muted-foreground">Menaxhoni detajet tuaja personale dhe preferencat.</p>
      </motion.div>

      <Tabs defaultValue="personal" className="space-y-6">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="personal">Të dhënat personale</TabsTrigger>
          <TabsTrigger value="password">Fjalëkalimi</TabsTrigger>
          <TabsTrigger value="notifications">Njoftimet</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Informacioni personal</CardTitle>
              <CardDescription>Përditësoni të dhënat tuaja personale dhe të kontaktit.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Emri i plotë</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formState.name}
                      onChange={handleInputChange}
                      placeholder="Emri juaj i plotë"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formState.email}
                      onChange={handleInputChange}
                      placeholder="email@example.com"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Numri i telefonit</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formState.phone}
                      onChange={handleInputChange}
                      placeholder="+355 69 XXX XXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="address">Adresa</Label>
                    <Input
                      id="address"
                      name="address"
                      value={formState.address}
                      onChange={handleInputChange}
                      placeholder="Adresa juaj e shtëpisë/punës"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">Qyteti</Label>
                    <Input
                      id="city"
                      name="city"
                      value={formState.city}
                      onChange={handleInputChange}
                      placeholder="Qyteti juaj"
                    />
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Ruaj ndryshimet
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Ndrysho Fjalëkalimin</CardTitle>
              <CardDescription>Përditësoni fjalëkalimin tuaj për të ruajtur sigurinë e llogarisë.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Fjalëkalimi aktual</Label>
                  <Input
                    id="currentPassword"
                    name="currentPassword"
                    type="password"
                    value={formState.passwordForm.currentPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="newPassword">Fjalëkalimi i ri</Label>
                  <Input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    value={formState.passwordForm.newPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmo fjalëkalimin e ri</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formState.passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex justify-end">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Ndrysho fjalëkalimin
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preferencat e njoftimeve</CardTitle>
              <CardDescription>Zgjidhni se cilat njoftime dëshironi të merrni.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Përditësimet e porosive</h3>
                    <p className="text-sm text-muted-foreground">Merrni njoftime për statusin e porosive tuaja.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <Switch
                      checked={formState.notifications.orderUpdates}
                      onCheckedChange={() => handleToggleNotification('orderUpdates')}
                    />
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Promocione dhe oferta speciale</h3>
                    <p className="text-sm text-muted-foreground">Merrni njoftim për oferta të reja dhe promocione.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <Switch
                      checked={formState.notifications.promotions}
                      onCheckedChange={() => handleToggleNotification('promotions')}
                    />
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Buletini D'Angelo</h3>
                    <p className="text-sm text-muted-foreground">Merrni lajmet më të fundit për D'Angelo.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <Switch
                      checked={formState.notifications.newsletter}
                      onCheckedChange={() => handleToggleNotification('newsletter')}
                    />
                  </label>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Programi i besnikërisë</h3>
                    <p className="text-sm text-muted-foreground">Merrni njoftime për pikët dhe përfitimet tuaja të besnikërisë.</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <Switch
                      checked={formState.notifications.loyaltyProgram}
                      onCheckedChange={() => handleToggleNotification('loyaltyProgram')}
                    />
                  </label>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleSaveNotifications} className="bg-primary hover:bg-primary/90">
                    Ruaj preferencat
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
