"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation, Pagination } from 'swiper/modules';

// Import required Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Menu pages data
const menuPages = [
  {
    id: 1,
    title: 'Waffles',
    color: '#92c634',
    image: 'https://ext.same-assets.com/852613963/3783633550.svg'
  },
  {
    id: 2,
    title: 'Crepes',
    color: '#e75981',
    image: 'https://ext.same-assets.com/852613963/3783633550.svg'
  },
  {
    id: 3,
    title: 'Gelato',
    color: '#6d4b2d',
    image: 'https://ext.same-assets.com/852613963/3783633550.svg'
  },
  {
    id: 4,
    title: 'Smoothies',
    color: '#98bfa0',
    image: 'https://ext.same-assets.com/852613963/3783633550.svg'
  },
  {
    id: 5,
    title: 'Coffee',
    color: '#7f7164',
    image: 'https://ext.same-assets.com/852613963/3783633550.svg'
  }
];

export default function MenuSlider() {
  const [domLoaded, setDomLoaded] = useState(false);

  // Wait for DOM to be loaded before rendering Swiper
  // This prevents hydration errors
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  if (!domLoaded) {
    return (
      <div className="h-96 w-full max-w-lg mx-auto bg-gray-100 rounded-lg flex items-center justify-center">
        <p className="text-gray-400">Loading menu...</p>
      </div>
    );
  }

  return (
    <div className="menu-slider-container">
      <style jsx global>{`
        .swiper-pagination-bullet {
          background: #fff;
          opacity: 0.6;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #fff;
        }
        .swiper-button-next,
        .swiper-button-prev {
          color: #fff;
          background: rgba(0, 0, 0, 0.2);
          width: 35px;
          height: 35px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .swiper-button-next:after,
        .swiper-button-prev:after {
          font-size: 18px;
        }
        .swiper-3d .swiper-slide-shadow-left,
        .swiper-3d .swiper-slide-shadow-right {
          background-image: none;
        }
        .menu-card {
          transition: transform 0.3s ease;
        }
        .menu-card:hover {
          transform: translateY(-10px);
        }
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        .floating-icon {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>

      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="mySwiper"
      >
        {menuPages.map((page) => (
          <SwiperSlide key={page.id} style={{ width: '300px', height: '400px' }}>
            <div
              className="menu-card relative h-full w-full rounded-xl overflow-hidden flex items-center justify-center"
              style={{ backgroundColor: page.color }}
            >
              <div className="text-center text-white z-10">
                <div className="transform -rotate-90">
                  <h2 className="dangelo-logo text-white text-4xl">{page.title}</h2>
                </div>
                <div className="absolute bottom-8 right-8">
                  <div className="relative h-16 w-16 floating-icon">
                    <Image
                      src={page.image}
                      alt="Cherry"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute inset-0 bg-black/10 hover:bg-black/0 transition-all duration-300" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="text-center mt-8">
        <p className="text-sm text-gray-500 mb-4">Swipe or click arrows to browse menu categories</p>
        <Link href="/menu" className="dangelo-menu-button inline-block">
          View Full Menu
        </Link>
      </div>
    </div>
  );
}
