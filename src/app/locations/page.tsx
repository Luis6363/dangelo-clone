import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";

// Location data
const locations = [
  {
    id: 1,
    name: "D'Angelo - Blv. Zogu I",
    address: "Blv. Zogu I, Tiranë",
    phone: "069 977 9669",
    hours: "08:00 - 22:00",
    mapCoords: { lat: 41.3274, lng: 19.8186 }
  },
  {
    id: 2,
    name: "D'Angelo - City Park",
    address: "City Park, Rruga e Kavajës, Tiranë",
    phone: "069 977 9670",
    hours: "09:00 - 22:00",
    mapCoords: { lat: 41.3224, lng: 19.8079 }
  },
  {
    id: 3,
    name: "D'Angelo - TEG",
    address: "Tirana East Gate, Tiranë",
    phone: "069 977 9671",
    hours: "10:00 - 22:00",
    mapCoords: { lat: 41.3382, lng: 19.8438 }
  },
  {
    id: 4,
    name: "D'Angelo - QTU",
    address: "Qendra Tregtare Univers, Tiranë",
    phone: "069 977 9672",
    hours: "10:00 - 22:00",
    mapCoords: { lat: 41.3448, lng: 19.7179 }
  }
];

export default function LocationsPage() {
  return (
    <div className="py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl text-center mb-8">Pikat</h1>
        <p className="text-center text-lg mb-12">
          Gjeni D'Angelon më të afërt me ju
        </p>

        {/* Map Section */}
        <section className="mb-16 rounded-lg overflow-hidden shadow-lg">
          <div className="relative h-[400px] w-full bg-gray-200">
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h3 className="text-xl mb-2">Interactive Map</h3>
              <p className="text-sm text-gray-600 mb-4">Imagjinatë: Këtu do të ishte harta me lokacionet e D'Angelo</p>
              <p className="text-xs text-gray-500">Për shkak të kufizimeve, harta interaktive nuk është e disponueshme në këtë version.</p>
              <div className="mt-8">
                <Image
                  src="https://ext.same-assets.com/852613963/1170023793.png"
                  alt="Cherry location marker"
                  width={50}
                  height={50}
                  className="mx-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Locations List */}
        <section>
          <h2 className="text-2xl md:text-3xl text-center mb-8">Të gjitha lokacionet</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {locations.map((location) => (
              <Card key={location.id} className="p-6 hover:shadow-lg transition-all">
                <div className="flex gap-4 items-start">
                  <div className="relative w-10 h-10 flex-shrink-0 mt-1">
                    <Image
                      src="https://ext.same-assets.com/852613963/3726448606.webp"
                      alt="Cherry location marker"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">{location.name}</h3>
                    <p className="text-gray-700 mb-1">{location.address}</p>
                    <p className="text-gray-700 mb-1">
                      <strong>Tel:</strong> {location.phone}
                    </p>
                    <p className="text-gray-700 mb-3">
                      <strong>Orari:</strong> {location.hours}
                    </p>
                    <Link
                      href={`https://maps.google.com/?q=${location.mapCoords.lat},${location.mapCoords.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-accent hover:text-accent/80 underline text-sm"
                    >
                      Shiko në hartë
                    </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h2 className="text-2xl mb-4">Porosit nga lokacioni më i afërt</h2>
          <p className="mb-6">Zgjidh lokacionin më të afërt me ty dhe porosit menjëherë</p>
          <Link
            href="/delivery"
            className="dangelo-delivery-button inline-block"
          >
            Shko te Delivery
          </Link>
        </div>
      </div>
    </div>
  );
}
