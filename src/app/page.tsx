import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import MenuBook from "@/components/MenuBook";

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section
        className="relative h-[400px] md:h-[500px] flex items-center text-white overflow-hidden"
        style={{ backgroundColor: "#6d4b2d" }}
      >
        <div className="absolute left-0 bottom-0 w-24 h-32 md:w-40 md:h-52">
          <Image
            src="https://ext.same-assets.com/852613963/548389142.svg"
            alt="Cherry Tree"
            fill
            className="object-contain"
          />
        </div>
        <div className="absolute right-0 bottom-0 w-24 h-32 md:w-40 md:h-52">
          <Image
            src="https://ext.same-assets.com/852613963/548389142.svg"
            alt="Cherry Tree"
            fill
            className="object-contain"
          />
        </div>
        <div className="container mx-auto px-4 z-10 flex flex-col items-center">
          <h1 className="dangelo-logo text-5xl md:text-7xl text-center">D'Angel</h1>
          <div className="relative h-16 w-16 ml-1">
            <Image
              src="https://ext.same-assets.com/852613963/3783633550.svg"
              alt="D'Angelo Logo Cherry"
              fill
              className="object-contain"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="dangelo-section bg-primary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-4xl mb-6">Ciao!</h2>
              <p className="mb-4">
                D'Angelo është <strong>lumturi</strong>! Është një vend ku mund të ndani momente të <strong>bukura</strong> me njerëzit që doni.
              </p>
              <p className="mb-4">
                Në zemër të D'Angelo është <strong>dashuria për çokolatën</strong>. Të gjitha produktet tona janë të bëra me dorë, me <strong>cilësi premium</strong>, për të dhuruar një eksperiencë të paharrueshme dhe unike.
              </p>
              <div className="mt-6">
                <Link href="/menu" className="dangelo-menu-button inline-block">
                  Shiko Menunë
                </Link>
              </div>
            </div>
            <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
              <iframe
                src="https://player.vimeo.com/video/145464019?background=1"
                allow="autoplay; fullscreen"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full"
                title="D'Angelo Video"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Menu Preview Section */}
      <section className="dangelo-section bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-4xl mb-4 text-foreground">Menu</h2>
            <p className="text-foreground text-lg mb-2">Klikoni cepat për të ndërruar faqet.</p>
            <p className="text-foreground text-sm text-gray-500">Shfleto menunë tonë si një libër</p>
          </div>

          <div className="relative mx-auto max-w-5xl flex justify-center">
            <MenuBook width={320} height={480} className="mx-auto" />
          </div>
        </div>
      </section>

      {/* Delivery Section */}
      <section className="dangelo-section bg-primary">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-4xl mb-4 text-white">Shërbim Delivery</h2>
            <p className="text-white text-lg mb-6">
              Tani mund ta shijoni D'Angelon në shtëpinë ose zyrën tuaj!
            </p>
            <p className="text-white text-lg">Klikoni në metodën tuaj të preferuar:</p>
          </div>

          <div className="flex flex-col md:flex-row gap-4 justify-center mt-8">
            <Link
              href="/order-online"
              className="bg-accent text-white font-bold py-3 px-8 rounded-lg text-center hover:bg-accent/90 transition-all"
            >
              ONLINE
            </Link>
            <Link
              href="tel:0699779669"
              className="bg-white text-foreground font-bold py-3 px-8 rounded-lg text-center hover:bg-white/90 transition-all"
            >
              TEL 069 9779 669
            </Link>
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/delivery"
              className="text-white hover:text-white/80 underline text-lg"
            >
              KENI PYETJE?
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
