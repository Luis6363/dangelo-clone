"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";
import { Eye, EyeOff, UserCog } from "lucide-react";

export default function AdminProfile() {
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string; role: string } | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferences: {
      darkMode: false,
      orderNotifications: true,
      emailUpdates: false
    },
    passwordForm: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    }
  });

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

      // Prefill form with user data
      setFormData(prev => ({
        ...prev,
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || ""
      }));
    } catch (error) {
      console.error("Error parsing admin data:", error);
      router.push("/admin/login");
    } finally {
      setIsLoading(false);
    }
  }, [router]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      passwordForm: {
        ...prev.passwordForm,
        [name]: value
      }
    }));
  };

  const handleTogglePreference = (key: keyof typeof formData.preferences) => {
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [key]: !prev.preferences[key]
      }
    }));
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    if (user) {
      const updatedUser = {
        ...user,
        name: formData.name,
        email: formData.email,
        phone: formData.phone
      };

      localStorage.setItem("adminUser", JSON.stringify(updatedUser));
      setUser(updatedUser);
      toast.success("Profili juaj u përditësua me sukses!");
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();

    const { currentPassword, newPassword, confirmPassword } = formData.passwordForm;

    // Simple validation
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Ju lutemi plotësoni të gjitha fushat e kërkuara");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Fjalëkalimet e reja nuk përputhen");
      return;
    }

    // In a real app, this would validate against current password
    toast.success("Fjalëkalimi juaj u ndryshua me sukses!");

    // Reset password form
    setFormData(prev => ({
      ...prev,
      passwordForm: {
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      }
    }));
  };

  const handleSavePreferences = () => {
    toast.success("Preferencat tuaja u ruajtën me sukses!");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
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

      <main className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Profili im</h1>
          <p className="text-slate-600">Menaxhoni profilein dhe preferencat tuaja</p>
        </div>

        <div className="bg-white rounded-lg overflow-hidden shadow mb-6">
          <div className="bg-primary p-6 text-white">
            <div className="flex items-center">
              <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-2xl">
                {user?.name?.charAt(0) || user?.email?.charAt(0) || "A"}
              </div>
              <div className="ml-4">
                <h2 className="text-xl font-bold">{user?.name}</h2>
                <p className="text-white/80">{user?.email}</p>
                <div className="mt-1">
                  <Badge className="bg-white/20 text-white border-white/30 font-normal">
                    {user?.role === "admin" ? "Administrator" : user?.role === "waiter" ? "Kamarier" : "Staf kuzhine"}
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          <Tabs defaultValue="personal" className="p-6">
            <TabsList className="bg-muted/50 mb-6">
              <TabsTrigger value="personal">Të dhënat personale</TabsTrigger>
              <TabsTrigger value="password">Fjalëkalimi</TabsTrigger>
              <TabsTrigger value="preferences">Preferencat</TabsTrigger>
            </TabsList>

            <TabsContent value="personal">
              <form onSubmit={handleSaveProfile} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Emri i plotë</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Emri i plotë"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="email@dangelo.al"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Numri i telefonit</Label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+355 69 XXX XXXX"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Roli</Label>
                    <Input
                      value={user?.role === "admin" ? "Administrator" : user?.role === "waiter" ? "Kamarier" : "Staf kuzhine"}
                      disabled
                      className="bg-muted/30"
                    />
                    <p className="text-xs text-muted-foreground">Roli mund të ndryshohet vetëm nga administratori</p>
                  </div>
                </div>
                <div className="flex justify-end pt-4">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Ruaj ndryshimet
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="password">
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Fjalëkalimi aktual</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      name="currentPassword"
                      type={showPassword ? "text" : "password"}
                      value={formData.passwordForm.currentPassword}
                      onChange={handlePasswordChange}
                      placeholder="••••••••"
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
                  <Label htmlFor="newPassword">Fjalëkalimi i ri</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      name="newPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      value={formData.passwordForm.newPassword}
                      onChange={handlePasswordChange}
                      placeholder="••••••••"
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
                  <Label htmlFor="confirmPassword">Konfirmoni fjalëkalimin e ri</Label>
                  <Input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    value={formData.passwordForm.confirmPassword}
                    onChange={handlePasswordChange}
                    placeholder="••••••••"
                  />
                </div>
                <div className="flex justify-end pt-4">
                  <Button type="submit" className="bg-primary hover:bg-primary/90">
                    Ndrysho fjalëkalimin
                  </Button>
                </div>
              </form>
            </TabsContent>

            <TabsContent value="preferences">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Tema e errët</h3>
                    <p className="text-sm text-muted-foreground">Aktivizo pamjen e errët për aplikacionin</p>
                  </div>
                  <Switch
                    checked={formData.preferences.darkMode}
                    onCheckedChange={() => handleTogglePreference('darkMode')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Njoftime porosish</h3>
                    <p className="text-sm text-muted-foreground">Merr njoftime për porositë e reja</p>
                  </div>
                  <Switch
                    checked={formData.preferences.orderNotifications}
                    onCheckedChange={() => handleTogglePreference('orderNotifications')}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Përditësime me email</h3>
                    <p className="text-sm text-muted-foreground">Merr përmbledhje ditore me email</p>
                  </div>
                  <Switch
                    checked={formData.preferences.emailUpdates}
                    onCheckedChange={() => handleTogglePreference('emailUpdates')}
                  />
                </div>

                <div className="border-t pt-6 mt-6">
                  <Button
                    onClick={handleSavePreferences}
                    className="bg-primary hover:bg-primary/90"
                  >
                    Ruaj preferencat
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            size="sm"
            asChild
          >
            <Link href="/admin/dashboard">
              Kthehu në panel
            </Link>
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleLogout}
          >
            Dilni nga sistemi
          </Button>
        </div>
      </main>
    </div>
  );
}
