"use client";

import { useState, useRef, useEffect, ReactNode } from 'react';
import HTMLFlipBook from 'react-pageflip';
import Image from 'next/image';
import Link from 'next/link';

// Types definition
interface Feature {
  label: string;
  options: string[];
}

interface CoverContent {
  type: 'cover';
  title: string;
  image: string;
  qrCode?: boolean;
}

interface ProductContent {
  type: 'product';
  title: string;
  subtitle: string;
  price?: string;
  description: string;
  image?: string;
  pageNumber: number | string;
  features?: Feature[];
}

interface BackCoverContent {
  type: 'backcover';
  title: string;
  subtitle: string;
  contact: {
    phone: string;
    web: string;
    social: string;
  };
}

type PageContent = CoverContent | ProductContent | BackCoverContent;

interface MenuPage {
  id: number;
  backgroundColor: string;
  content: PageContent;
}

interface PageComponentProps {
  content: PageContent;
  backgroundColor: string;
}

interface HTMLFlipBookRef {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
  };
}

interface FlipPageEvent {
  data: number;
}

// Menu pages data
const menuPages: MenuPage[] = [
  {
    id: 1,
    backgroundColor: "#92c634", // Green
    content: {
      type: "cover",
      title: "d'angelo",
      image: "https://ext.same-assets.com/852613963/3783633550.svg",
      qrCode: true
    }
  },
  {
    id: 2,
    backgroundColor: "#e8b7d5", // Pink
    content: {
      type: "product",
      title: "GRANOLA",
      subtitle: "FROZEN FRUIT CUP",
      price: "480",
      description: "GREEK FROZEN YOGURT, GRANOLA, NUTELLA, SEASONAL FRUITS.",
      image: "/menu/granola.png", // Placeholder
      pageNumber: 2
    }
  },
  {
    id: 3,
    backgroundColor: "#a6d9e3", // Light Blue
    content: {
      type: "product",
      title: "Ciao Bella!",
      subtitle: "from italy",
      description: "prepared freshly\nnatural ingredients\ncreamy goodness",
      features: [
        { label: "CUP", options: ["1 FLAVOR 140", "2 FLAVORS 200", "3 FLAVORS 450"] },
        { label: "TOPPINGS", options: ["MILK CHOCOLATE +100", "NUTS +100"] }
      ],
      image: "/menu/gelato.png", // Placeholder
      pageNumber: "3A"
    }
  },
  {
    id: 4,
    backgroundColor: "#f0d78c", // Light Yellow
    content: {
      type: "product",
      title: "WAFFLE",
      subtitle: "CHOCOLATE DELUXE",
      price: "550",
      description: "FRESH MADE WAFFLE WITH NUTELLA, SEASONAL FRUITS AND WHIPPED CREAM",
      image: "/menu/waffle.png", // Placeholder
      pageNumber: 4
    }
  },
  {
    id: 5,
    backgroundColor: "#98bfa0", // Green from the main color scheme
    content: {
      type: "product",
      title: "SMOOTHIES",
      subtitle: "FRUIT EXPLOSION",
      price: "350",
      description: "FRESH FRUITS, YOGURT, AND HONEY BLENDED TO PERFECTION",
      image: "/menu/smoothie.png", // Placeholder
      pageNumber: 5
    }
  },
  {
    id: 6,
    backgroundColor: "#e75981", // Cherry color
    content: {
      type: "backcover",
      title: "VISIT US",
      subtitle: "OR ORDER ONLINE",
      contact: {
        phone: "069 977 9669",
        web: "www.dangelo.al",
        social: "@dangelo.albania"
      }
    }
  }
];

// Page components
const CoverPage = ({ content, backgroundColor }: { content: CoverContent; backgroundColor: string }) => (
  <div
    className="relative w-full h-full rounded-lg overflow-hidden flex flex-col items-center justify-center text-white"
    style={{ backgroundColor }}
  >
    <div className="transform rotate-90 text-center">
      <h1 className="dangelo-logo text-white text-6xl mb-4">{content.title}</h1>
      <div className="relative w-24 h-24 mx-auto">
        <Image
          src={content.image}
          alt="Cherry logo"
          fill
          className="object-contain"
        />
      </div>
    </div>

    {content.qrCode && (
      <div className="absolute bottom-10 left-0 right-0 text-center">
        <div className="w-20 h-20 mx-auto bg-white/20 rounded-md flex items-center justify-center mb-2">
          <span className="text-xs text-white">QR CODE</span>
        </div>
        <p className="text-xs text-white">ONLINE MENU</p>
      </div>
    )}
  </div>
);

const ProductPage = ({ content, backgroundColor }: { content: ProductContent; backgroundColor: string }) => (
  <div
    className="relative w-full h-full rounded-lg overflow-hidden p-8"
    style={{ backgroundColor }}
  >
    <div className="absolute top-5 right-5 text-white font-bold">
      {content.pageNumber}
    </div>

    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h2 className="text-white text-4xl font-bold">{content.title}</h2>
        <h3 className="text-white text-xl mt-1">{content.subtitle}</h3>

        {content.price && (
          <div className="absolute top-10 right-10 bg-white/30 rounded-full w-14 h-14 flex items-center justify-center">
            <span className="text-white font-bold">{content.price}</span>
          </div>
        )}
      </div>

      <div className="flex-grow flex items-center justify-center relative">
        {/* Cloud decorations */}
        <div className="absolute top-5 left-10 w-12 h-8 bg-white rounded-full" />
        <div className="absolute bottom-20 right-5 w-10 h-6 bg-white rounded-full" />

        <div className="w-48 h-48 rounded-full mx-auto relative">
          <div className="absolute inset-0 bg-white/20 rounded-full" />
          <div className="text-center pt-16">
            <p className="text-white">Product Image</p>
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <p className="text-white text-center mb-4 whitespace-pre-line">{content.description}</p>

        {content.features && (
          <div className="mt-4">
            {content.features.map((feature, idx) => (
              <div key={`feature-${feature.label}-${idx}`} className="mb-2">
                <span className="text-white font-bold mr-2">{feature.label}:</span>
                <div className="flex flex-wrap gap-2">
                  {feature.options.map((option, i) => (
                    <span key={`option-${option}-${i}`} className="bg-white/20 text-white px-2 py-1 rounded-full text-xs">
                      {option}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="absolute bottom-5 left-5">
          <div className="relative w-8 h-8">
            <Image
              src="https://ext.same-assets.com/852613963/3783633550.svg"
              alt="Cherry logo"
              fill
              className="object-contain"
            />
          </div>
        </div>

        <div className="absolute bottom-5 right-5 text-white text-xs">
          <p>ORDER ONLINE</p>
          <p>WWW.DANGELO.AL</p>
        </div>
      </div>
    </div>
  </div>
);

const BackCoverPage = ({ content, backgroundColor }: { content: BackCoverContent; backgroundColor: string }) => (
  <div
    className="relative w-full h-full rounded-lg overflow-hidden flex flex-col items-center justify-center text-white p-8"
    style={{ backgroundColor }}
  >
    <h2 className="text-white text-4xl font-bold mb-2">{content.title}</h2>
    <h3 className="text-white text-2xl mb-8">{content.subtitle}</h3>

    <div className="text-center mb-8">
      <p className="mb-2">
        <span className="font-bold">Tel:</span> {content.contact.phone}
      </p>
      <p className="mb-2">
        <span className="font-bold">Web:</span> {content.contact.web}
      </p>
      <p className="mb-2">
        <span className="font-bold">Instagram:</span> {content.contact.social}
      </p>
    </div>

    <div className="absolute bottom-8 left-0 right-0 text-center">
      <div className="relative w-12 h-12 mx-auto mb-2">
        <Image
          src="https://ext.same-assets.com/852613963/3783633550.svg"
          alt="Cherry logo"
          fill
          className="object-contain"
        />
      </div>
      <p className="text-xs">© D'Angelo 2025</p>
    </div>
  </div>
);

// Generate a page component based on type
const PageComponent = ({ page }: { page: MenuPage }) => {
  const { content, backgroundColor } = page;

  switch (content.type) {
    case "cover":
      return <CoverPage content={content} backgroundColor={backgroundColor} />;
    case "product":
      return <ProductPage content={content} backgroundColor={backgroundColor} />;
    case "backcover":
      return <BackCoverPage content={content} backgroundColor={backgroundColor} />;
    default:
      return <div>Invalid page type</div>;
  }
};

interface MenuBookProps {
  width?: number;
  height?: number;
  className?: string;
}

const MenuBook: React.FC<MenuBookProps> = ({
  width = 400,
  height = 600,
  className = ""
}) => {
  const [totalPage, setTotalPage] = useState(menuPages.length);
  const [currentPage, setCurrentPage] = useState(0);
  const bookRef = useRef<HTMLFlipBookRef | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  // Prevent hydration issues
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div
        style={{ width, height }}
        className={`bg-gray-100 rounded-lg flex items-center justify-center ${className}`}
      >
        <p className="text-gray-400">Loading menu book...</p>
      </div>
    );
  }

  const handlePageFlip = (e: FlipPageEvent) => {
    setCurrentPage(e.data);
  };

  const nextButtonClick = () => {
    if (bookRef.current && currentPage < totalPage - 1) {
      bookRef.current.pageFlip().flipNext();
    }
  };

  const prevButtonClick = () => {
    if (bookRef.current && currentPage > 0) {
      bookRef.current.pageFlip().flipPrev();
    }
  };

  return (
    <div className="menu-book-container relative">
      <style jsx global>{`
        .page-cover {
          background-color: #92c634;
          color: white;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }
        .page {
          background-color: white;
          border-radius: 7px;
          overflow: hidden;
        }
        @keyframes float {
          0% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0);
          }
        }
        .floating-hint {
          animation: float 2s ease-in-out infinite;
        }
      `}</style>

      <div className="relative">
        <HTMLFlipBook
          width={width}
          height={height}
          size="fixed"
          minWidth={width}
          maxWidth={width * 1.5}
          minHeight={height}
          maxHeight={height * 1.5}
          showCover={true}
          flippingTime={1000}
          className="menu-book"
          startPage={0}
          drawShadow={true}
          useMouseEvents={true}
          ref={bookRef}
          onFlip={handlePageFlip}
          startZIndex={10}
          autoSize={false}
          maxShadowOpacity={0.5}
        >
          {menuPages.map((page) => (
            <div
              key={page.id}
              className={page.id === 1 || page.id === menuPages.length ? "page-cover" : "page"}
            >
              <PageComponent page={page} />
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      <div className="flex justify-center mt-6 space-x-4">
        <button
          onClick={prevButtonClick}
          className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <span className="px-4 py-2">
          {currentPage + 1} / {totalPage}
        </span>
        <button
          onClick={nextButtonClick}
          className="bg-accent text-white px-4 py-2 rounded disabled:opacity-50"
          disabled={currentPage === totalPage - 1}
        >
          Next
        </button>
      </div>

      {currentPage === 0 && (
        <div className="absolute top-1/2 right-4 transform -translate-y-1/2 floating-hint">
          <div className="bg-white/80 rounded-full p-2 shadow-md">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.59 16.59L13.17 12L8.59 7.41L10 6L16 12L10 18L8.59 16.59Z" fill="#92c634"/>
            </svg>
          </div>
          <p className="text-xs text-center mt-1 text-white bg-accent/70 rounded-md px-1">Swipe</p>
        </div>
      )}

      <div className="text-center mt-6">
        <Link href="/menu" className="dangelo-menu-button inline-block">
          View Full Menu
        </Link>
      </div>
    </div>
  );
};

export default MenuBook;
