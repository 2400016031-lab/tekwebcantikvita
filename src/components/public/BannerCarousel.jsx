import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Percent, Ticket } from 'lucide-react';

const BannerCard = ({ title, subtitle, description, discount, buttonText, bgColor }) => {
  return (
    <div className={`min-w-full snap-start rounded-2xl overflow-hidden ${bgColor} p-8 md:p-12 flex-shrink-0`}>
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="text-white space-y-4">
          {discount && (
            <div className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold animate-pulse">
              <Percent className="w-4 h-4" />
              {discount}
            </div>
          )}
          
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2 leading-tight">
              {title}
            </h2>
            <p className="text-lg md:text-xl font-semibold text-blue-200">
              {subtitle}
            </p>
          </div>

          <p className="text-base text-blue-100">
            {description}
          </p>

          <button className="bg-white text-blue-900 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all hover:scale-105 shadow-xl">
            {buttonText || "Dapatkan Sekarang"}
          </button>
        </div>

        <div className="hidden md:flex items-center justify-center">
          <div className="relative w-full h-64 bg-white/10 rounded-2xl backdrop-blur-sm flex items-center justify-center">
            <Ticket className="w-32 h-32 text-white/30" />
          </div>
        </div>
      </div>
    </div>
  );
};

const BannerCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const scrollRef = useRef(null);
  const autoPlayRef = useRef(null);

  const banners = [
    {
      id: 1,
      title: "Diskon 50% Festival Musik 2025",
      subtitle: "Jangan Lewatkan!",
      description: "Beli tiket sekarang dan dapatkan diskon hingga 50%!",
      discount: "DISKON 50%",
      buttonText: "Beli Sekarang",
      bgColor: "bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600"
    },
    {
      id: 2,
      title: "Early Bird Special",
      subtitle: "Harga Spesial Pembeli Pertama",
      description: "Dapatkan harga terbaik! Terbatas 100 pembeli pertama!",
      discount: "EARLY BIRD",
      buttonText: "Cek Konser",
      bgColor: "bg-gradient-to-br from-orange-500 via-red-500 to-pink-600"
    },
    {
      id: 3,
      title: "Promo Member Card",
      subtitle: "Keuntungan Eksklusif Member",
      description: "Daftar member dan nikmati diskon + akses pre-sale!",
      discount: "MEMBER ONLY",
      buttonText: "Daftar Member",
      bgColor: "bg-gradient-to-br from-green-600 via-teal-600 to-blue-600"
    }
  ];

  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [currentSlide, banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    if (autoPlayRef.current) clearInterval(autoPlayRef.current);
  };

  useEffect(() => {
    if (scrollRef.current) {
      const slideWidth = scrollRef.current.offsetWidth;
      scrollRef.current.scrollTo({
        left: slideWidth * currentSlide,
        behavior: 'smooth'
      });
    }
  }, [currentSlide]);

  return (
    <div className="relative w-full overflow-hidden group mb-6">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {banners.map((banner) => (
          <BannerCard key={banner.id} {...banner} />
        ))}
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-5 h-5 text-gray-800" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-5 h-5 text-gray-800" />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full ${
              currentSlide === index ? 'w-8 h-3 bg-white' : 'w-3 h-3 bg-white/50 hover:bg-white/80'
            }`}
          />
        ))}
      </div>

      
    </div>
  );
};

export default BannerCarousel;