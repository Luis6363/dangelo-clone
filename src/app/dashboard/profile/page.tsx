"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Settings, CreditCard, LogOut, Bell, Lock, Shield } from "lucide-react";

export default function ProfileSettings() {
  const router = useRouter();
  const [profileForm, setProfileForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notificationSettings, setNotificationSettings] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    loyaltyUpdates: true,
  });

  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }

    // Get user data and pre-fill form
    try {
      const userData = JSON.parse(localStorage.getItem('user') || '{}');
      setProfileForm(prev => ({
        ...prev,
        name: userData.name || '',
        email: userData.email || '',
        phone: userData.phone || '',
        address: userData.address || '',
        city: userData.city || '',
        zip: userData.zip || '',
      }));
    } catch (error) {
      console.error('Error parsing user data:', error);
    }

    setLoading(false);
  }, [router]);

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({ ...prev, [name]: value }));
    // Clear any error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordForm(prev => ({ ...prev, [name]: value }));
    // Clear any error for this field
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleToggleNotification = (setting: string) => {
    setNotificationSettings(prev => ({
      ...prev,
      [setting]: !prev[setting as keyof typeof prev]
    }));
  };

  const validateProfileForm = () => {
    const errors: Record<string, string> = {};

    if (!profileForm.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!profileForm.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(profileForm.email)) {
      errors.email = 'Email is invalid';
    }

    if (profileForm.phone && !/^\+?[0-9]{10,15}$/.test(profileForm.phone.replace(/\s/g, ''))) {
      errors.phone = 'Please enter a valid phone number';
    }

    return errors;
  };

  const validatePasswordForm = () => {
    const errors: Record<string, string> = {};

    if (!passwordForm.currentPassword) {
      errors.currentPassword = 'Current password is required';
    }

    if (!passwordForm.newPassword) {
      errors.newPassword = 'New password is required';
    } else if (passwordForm.newPassword.length < 8) {
      errors.newPassword = 'Password must be at least 8 characters';
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validateProfileForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // In a real app, this would be an API call
    try {
      // Simulate API delay
      setTimeout(() => {
        // Get existing user data and update it
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        const updatedUser = { ...userData, ...profileForm };
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Show success message
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }, 800);
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();

    const errors = validatePasswordForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    // In a real app, this would be an API call to update password
    setTimeout(() => {
      // For demo purposes, just show success and reset form
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
    }, 800);
  };

  const handleSaveNotifications = () => {
    // In a real app, this would be an API call to update notification preferences
    setTimeout(() => {
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    }, 500);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    router.push('/');
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
                {profileForm.name ? profileForm.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <h2 className="text-xl font-bold">{profileForm.name || 'User'}</h2>
              <p className="text-gray-600">{profileForm.email}</p>
            </div>

            <div className="space-y-2 mt-6">
              <Link href="/dashboard" className="flex items-center gap-3 p-2 rounded-md hover:bg-primary/10">
                <User className="h-5 w-5 text-gray-500" />
                <span>Dashboard</span>
              </Link>
              <Link href="/dashboard/profile" className="flex items-center gap-3 p-2 bg-primary/5 rounded-md hover:bg-primary/10">
                <Settings className="h-5 w-5 text-primary" />
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
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold">Profile Settings</h1>
            <Link href="/dashboard" className="text-sm text-primary hover:underline">
              Back to Dashboard
            </Link>
          </div>

          {saveSuccess && (
            <div className="bg-green-100 text-green-800 px-4 py-3 rounded-md mb-6 flex items-center justify-between">
              <span>Your changes have been saved successfully!</span>
              <button onClick={() => setSaveSuccess(false)} className="text-green-800">×</button>
            </div>
          )}

          <Tabs defaultValue="profile">
            <TabsList className="mb-6">
              <TabsTrigger value="profile">Personal Info</TabsTrigger>
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="p-6">
                <form onSubmit={handleSaveProfile}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={profileForm.name}
                        onChange={handleProfileChange}
                        className={`mt-1 ${formErrors.name ? 'border-red-500' : ''}`}
                      />
                      {formErrors.name && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={profileForm.email}
                        onChange={handleProfileChange}
                        className={`mt-1 ${formErrors.email ? 'border-red-500' : ''}`}
                      />
                      {formErrors.email && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.email}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        value={profileForm.phone}
                        onChange={handleProfileChange}
                        className={`mt-1 ${formErrors.phone ? 'border-red-500' : ''}`}
                        placeholder="Optional"
                      />
                      {formErrors.phone && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.phone}</p>
                      )}
                    </div>

                    <div className="md:col-span-2">
                      <Label htmlFor="address">Delivery Address</Label>
                      <Input
                        id="address"
                        name="address"
                        value={profileForm.address}
                        onChange={handleProfileChange}
                        className="mt-1"
                        placeholder="Optional"
                      />
                    </div>

                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        name="city"
                        value={profileForm.city}
                        onChange={handleProfileChange}
                        className="mt-1"
                        placeholder="Optional"
                      />
                    </div>

                    <div>
                      <Label htmlFor="zip">Postal/ZIP Code</Label>
                      <Input
                        id="zip"
                        name="zip"
                        value={profileForm.zip}
                        onChange={handleProfileChange}
                        className="mt-1"
                        placeholder="Optional"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="dangelo-menu-button">
                      Save Changes
                    </Button>
                  </div>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="password">
              <Card className="p-6">
                <form onSubmit={handleChangePassword}>
                  <div className="space-y-6 mb-6">
                    <div>
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        name="currentPassword"
                        type="password"
                        value={passwordForm.currentPassword}
                        onChange={handlePasswordChange}
                        className={`mt-1 ${formErrors.currentPassword ? 'border-red-500' : ''}`}
                      />
                      {formErrors.currentPassword && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.currentPassword}</p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input
                        id="newPassword"
                        name="newPassword"
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={handlePasswordChange}
                        className={`mt-1 ${formErrors.newPassword ? 'border-red-500' : ''}`}
                      />
                      {formErrors.newPassword && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.newPassword}</p>
                      )}
                      <p className="text-gray-500 text-xs mt-1">
                        Password must be at least 8 characters long
                      </p>
                    </div>

                    <div>
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input
                        id="confirmPassword"
                        name="confirmPassword"
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={handlePasswordChange}
                        className={`mt-1 ${formErrors.confirmPassword ? 'border-red-500' : ''}`}
                      />
                      {formErrors.confirmPassword && (
                        <p className="text-red-500 text-sm mt-1">{formErrors.confirmPassword}</p>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button type="submit" className="dangelo-menu-button">
                      Update Password
                    </Button>
                  </div>
                </form>
              </Card>
            </TabsContent>

            <TabsContent value="notifications">
              <Card className="p-6">
                <div className="space-y-6 mb-6">
                  <div className="flex justify-between items-center pb-4 border-b">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Bell className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Order Updates</h3>
                        <p className="text-sm text-gray-500">Receive notifications about your orders</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationSettings.orderUpdates}
                        onChange={() => handleToggleNotification('orderUpdates')}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Bell className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Promotions</h3>
                        <p className="text-sm text-gray-500">Receive notifications about promotions and special offers</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationSettings.promotions}
                        onChange={() => handleToggleNotification('promotions')}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Bell className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Newsletter</h3>
                        <p className="text-sm text-gray-500">Receive our monthly newsletter</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationSettings.newsletter}
                        onChange={() => handleToggleNotification('newsletter')}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>

                  <div className="flex justify-between items-center pb-4">
                    <div className="flex items-start gap-3">
                      <div className="bg-primary/10 p-2 rounded-full">
                        <Bell className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Loyalty Updates</h3>
                        <p className="text-sm text-gray-500">Receive notifications about your loyalty points and rewards</p>
                      </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={notificationSettings.loyaltyUpdates}
                        onChange={() => handleToggleNotification('loyaltyUpdates')}
                      />
                      <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button
                    type="button"
                    className="dangelo-menu-button"
                    onClick={handleSaveNotifications}
                  >
                    Save Preferences
                  </Button>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
