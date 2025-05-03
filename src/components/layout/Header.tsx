"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { Menu, X, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState<{ name?: string; email: string } | null>(null);

  // Check login status when component mounts (client-side only)
  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    if (loggedIn) {
      try {
        const userData = JSON.parse(localStorage.getItem('user') || '{}');
        setUser(userData);
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUser(null);
    window.location.href = '/'; // Refresh the page
  };

  return (
    <header className="sticky top-0 z-50 bg-primary">
      <div className="container mx-auto px-4 py-2 flex justify-between items-center">
        <Link href="/" className="flex items-center">
          <h1 className="dangelo-logo text-white">D'Angel</h1>
          <div className="relative h-10 w-10 ml-1">
            <Image
              src="https://ext.same-assets.com/852613963/3783633550.svg"
              alt="D'Angelo Logo Cherry"
              fill
              className="object-contain"
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-white hover:text-white/80 text-sm font-bold uppercase">
            D'Angelo
          </Link>
          <Link href="/menu" className="text-white hover:text-white/80 text-sm font-bold uppercase">
            Menu
          </Link>
          <Link href="/delivery" className="text-white hover:text-white/80 text-sm font-bold uppercase">
            Delivery
          </Link>
          <Link href="/locations" className="text-white hover:text-white/80 text-sm font-bold uppercase">
            Pikat
          </Link>
          <Link href="/contact" className="text-white hover:text-white/80 text-sm font-bold uppercase">
            Kontakt
          </Link>

          {isLoggedIn ? (
            <div className="flex items-center gap-4">
              <div className="text-white text-sm">
                Hello, {user?.name || user?.email || 'User'}
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:text-white/80 p-2"
                onClick={handleLogout}
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link href="/login" className="text-white hover:text-white/80 text-sm font-bold">
                Log In
              </Link>
              <Link
                href="/register"
                className="dangelo-online-button"
              >
                Register
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-primary py-4 px-4 absolute w-full">
          <nav className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-white hover:text-white/80 text-sm font-bold uppercase"
              onClick={() => setMobileMenuOpen(false)}
            >
              D'Angelo
            </Link>
            <Link
              href="/menu"
              className="text-white hover:text-white/80 text-sm font-bold uppercase"
              onClick={() => setMobileMenuOpen(false)}
            >
              Menu
            </Link>
            <Link
              href="/delivery"
              className="text-white hover:text-white/80 text-sm font-bold uppercase"
              onClick={() => setMobileMenuOpen(false)}
            >
              Delivery
            </Link>
            <Link
              href="/locations"
              className="text-white hover:text-white/80 text-sm font-bold uppercase"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pikat
            </Link>
            <Link
              href="/contact"
              className="text-white hover:text-white/80 text-sm font-bold uppercase"
              onClick={() => setMobileMenuOpen(false)}
            >
              Kontakt
            </Link>

            {isLoggedIn ? (
              <>
                <div className="text-white text-sm pt-2 border-t border-white/20">
                  Hello, {user?.name || user?.email || 'User'}
                </div>
                <button
                  className="text-white hover:text-white/80 text-sm font-bold flex items-center"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-white hover:text-white/80 text-sm font-bold flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-4 w-4 mr-1" />
                  Log In
                </Link>
                <Link
                  href="/register"
                  className="dangelo-online-button inline-block text-center w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
