"use client";

import { useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

// FAQ Data
const faqData = [
  {
    id: 1,
    question: "Sa është porosia minimale?",
    answer: "Porosia minimale është 600 Lekë."
  },
  {
    id: 2,
    question: "A ka ndonjë tarifë për delivery?",
    answer: "Shërbimi ynë delivery varet nga vendndodhja juaj, mund të jetë falas ose kundrejt një pagese minimale. Nëse porosisni online, website do të llogarisë automatikisht tarifën delivery bazuar në adresën që ju përcaktoni. Nëse telefononi apo shkruani në WhatsApp për këtë do t'ju informoj një anëtar i stafit tonë."
  },
  {
    id: 3,
    question: "Sa vonohet porosia?",
    answer: "Rreth 30-45 minuta, në varësi të vendndodhjes tuaj. Ju lutemi duhet të kuptoni se gjithçka që përgatisim e bëjmë në çast për arsye sepse duam q'iu servirim një produkt të freskët dhe cilësor."
  },
  {
    id: 4,
    question: "Në cila zonat e ofroni shërbimin?",
    answer: "Kudo në Tiranë!"
  },
  {
    id: 5,
    question: "Cilat produkte mund të porosis?",
    answer: "Të gjitha! Shikoni menunë më sipër."
  }
];

export default function DeliveryPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const toggleFaq = (id: number) => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl text-center mb-8">Shërbim Delivery</h1>
        <p className="text-center text-xl mb-12">
          Tani mund ta shijoni D'Angelon në shtëpinë ose zyrën tuaj!
        </p>

        {/* Delivery Options */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl text-center mb-8">Klikoni në metodën tuaj të preferuar:</h2>

          <div className="flex flex-col md:flex-row gap-6 max-w-2xl mx-auto">
            <Card className="flex-1 p-6 text-center hover:shadow-lg transition-all">
              <h3 className="text-xl mb-4 font-bold">Online Order</h3>
              <p className="mb-6">Porositni online në platformën tonë të porositjes</p>
              <Link
                href="/order-online"
                className="dangelo-menu-button inline-block w-full"
              >
                ONLINE
              </Link>
            </Card>

            <Card className="flex-1 p-6 text-center hover:shadow-lg transition-all">
              <h3 className="text-xl mb-4 font-bold">Telefon</h3>
              <p className="mb-6">Telefono drejtpërdrejt për të bërë porosinë tënde</p>
              <Link
                href="tel:0699779669"
                className="dangelo-delivery-button inline-block w-full"
              >
                TEL: 069 9779 669
              </Link>
            </Card>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="bg-white rounded-lg p-8 max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl text-center mb-8">Pyetje të Shpeshta</h2>

          <div className="space-y-4">
            {faqData.map((faq) => (
              <div key={faq.id} className="border rounded-lg overflow-hidden">
                <button
                  className="w-full p-4 text-left font-semibold flex justify-between items-center"
                  onClick={() => toggleFaq(faq.id)}
                >
                  {faq.question}
                  <span className="text-xl">
                    {expandedFaq === faq.id ? "−" : "+"}
                  </span>
                </button>

                {expandedFaq === faq.id && (
                  <div className="p-4 pt-0 bg-gray-50">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl mb-6">Gati për të porositur?</h2>
          <Link
            href="/order-online"
            className="dangelo-online-button inline-block"
          >
            POROSIT TANI
          </Link>
        </div>
      </div>
    </div>
  );
}
