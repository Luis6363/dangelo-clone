"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Mesazhi juaj u dërgua me sukses! Do t'ju kontaktojmë së shpejti.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl text-center mb-8">Kontakt</h1>
        <p className="text-center text-lg mb-12">
          Mund të na kontaktoni me DM ne instagram. Ne do t'iu kthejm një përgjigje sa më shpejt!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-6">
            <h2 className="text-2xl mb-6">Na Kontaktoni</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Emri*</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="email">Email*</Label>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="phone">Telefon</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1"
                />
              </div>
              <div>
                <Label htmlFor="message">Mesazhi*</Label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full p-2 border rounded-md mt-1"
                />
              </div>
              <Button
                type="submit"
                className="dangelo-menu-button mt-2 w-full"
              >
                Dërgo Mesazhin
              </Button>
            </form>
          </Card>

          {/* Contact Info and Social */}
          <div>
            <Card className="p-6 mb-6">
              <h2 className="text-2xl mb-6">Detaje Kontakti</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-bold mb-1">Telefon:</h3>
                  <p>069 977 9669</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Email:</h3>
                  <p>info@dangelo.al</p>
                </div>
                <div>
                  <h3 className="font-bold mb-1">Adresa e Zyrës Qendrore:</h3>
                  <p>Blv. Zogu I, Tiranë, Shqipëri</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h2 className="text-2xl mb-6">Social!</h2>
              <div className="space-y-4">
                <Link
                  href="https://www.instagram.com/dangelo.albania"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:opacity-80"
                >
                  <div className="relative w-8 h-8">
                    <Image
                      src="https://ext.same-assets.com/852613963/2394298570.svg"
                      alt="Instagram"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>dangelo.albania</span>
                </Link>

                <Link
                  href="https://www.facebook.com/dangelo.albania"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:opacity-80"
                >
                  <div className="relative w-8 h-8">
                    <Image
                      src="https://ext.same-assets.com/852613963/2407917852.svg"
                      alt="Facebook"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span>D'Angelo Albania</span>
                </Link>
              </div>
            </Card>
          </div>
        </div>

        {/* Company Info */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl mb-4">Informacion Ligjor</h2>
          <div className="max-w-xl mx-auto">
            <p className="mb-1"><strong>Legal Entity:</strong> VIAN BRANDS SH.P.K.</p>
            <p><strong>VAT Number:</strong> L62231020M</p>
            <p className="mt-4 text-sm text-gray-600">D'Angelo is a registered trademark. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
