import Link from "next/link";
import Image from "next/image";

export function Footer() {
  return (
    <footer className="bg-primary pt-12 pb-6 text-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-2xl mb-4">Kontakt</h3>
            <p className="mb-2">Mund të na kontaktoni me DM ne instagram.</p>
            <p className="mb-2">Ne do t'iu kthejm një përgjigje sa më shpejt!</p>
          </div>

          <div>
            <h3 className="text-2xl mb-4">Social!</h3>
            <div className="flex items-center mb-2">
              <Link href="https://www.instagram.com/dangelo.albania" target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-80">
                <div className="relative w-6 h-6 mr-2">
                  <Image
                    src="https://ext.same-assets.com/852613963/2394298570.svg"
                    alt="Instagram"
                    fill
                    className="object-contain"
                  />
                </div>
                dangelo.albania
              </Link>
            </div>
            <div className="flex items-center">
              <Link href="https://www.facebook.com/dangelo.albania" target="_blank" rel="noopener noreferrer" className="flex items-center hover:opacity-80">
                <div className="relative w-6 h-6 mr-2">
                  <Image
                    src="https://ext.same-assets.com/852613963/2407917852.svg"
                    alt="Facebook"
                    fill
                    className="object-contain"
                  />
                </div>
                D'Angelo Albania
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-2xl mb-4">Info</h3>
            <p className="mb-1"><strong>Legal Entity:</strong> VIAN BRANDS SH.P.K.</p>
            <p className="mb-4"><strong>VAT Number:</strong> L62231020M</p>
            <p className="text-sm">D'Angelo is a registered trademark. All rights reserved.</p>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/20">
          <nav className="flex flex-wrap justify-center gap-6">
            <Link href="/" className="text-white hover:text-white/80 text-sm">
              FILLIMI
            </Link>
            <Link href="/menu" className="text-white hover:text-white/80 text-sm">
              MENU
            </Link>
            <Link href="/delivery" className="text-white hover:text-white/80 text-sm">
              DELIVERY
            </Link>
            <Link href="/locations" className="text-white hover:text-white/80 text-sm">
              PIKAT
            </Link>
            <Link href="/contact" className="text-white hover:text-white/80 text-sm">
              KONTAKT
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
