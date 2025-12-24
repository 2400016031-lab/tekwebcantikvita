import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Calendar, MapPin, Ticket } from 'lucide-react';

const ProductCard = ({ artist, date, venue, price, category }) => {
  return (
    <div className="min-w-[260px] md:min-w-[300px] snap-start bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex-shrink-0">
      <div className="relative h-56 overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600">
        <div className="w-full h-full flex items-center justify-center">
          <Ticket className="w-20 h-20 text-white/30" />
        </div>
        {category && (
          <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
            {category}
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-1">{artist}</h3>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <Calendar className="w-4 h-4" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600 text-sm">
            <MapPin className="w-4 h-4" />
            <span className="line-clamp-1">{venue}</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-200">
          <div>
            <p className="text-xs text-gray-500">Mulai dari</p>
            <p className="text-base font-bold text-blue-600">{price}</p>
          </div>
          <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-medium text-sm">
            Beli
          </button>
        </div>
      </div>
    </div>
  );
};

const ProductCarousel = () => {
  const concerts = [
    {
      id: 1,
      artist: "Coldplay - Music of The Spheres",
      date: "15 Januari 2025",
      venue: "Gelora Bung Karno, Jakarta",
      price: "Rp 1.500.000",
      category: "HOT"
    },
    {
      id: 2,
      artist: "Bruno Mars - 24K Magic",
      date: "20 Februari 2025",
      venue: "Indonesia Arena, Jakarta",
      price: "Rp 2.000.000",
      category: "SOLD OUT"
    },
    {
      id: 3,
      artist: "Ed Sheeran - Mathematics Tour",
      date: "5 Maret 2025",
      venue: "JIS, Jakarta",
      price: "Rp 1.800.000",
      category: "NEW"
    },
    {
      id: 4,
      artist: "Taylor Swift - Eras Tour",
      date: "12 April 2025",
      venue: "GBK Stadium, Jakarta",
      price: "Rp 3.000.000",
      category: "HOT"
    },
    {
      id: 5,
      artist: "Imagine Dragons",
      date: "25 Mei 2025",
      venue: "ICE BSD, Tangerang",
      price: "Rp 1.200.000",
      category: ""
    }
  ];

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg text-gray-800">Konser Terpopuler</h3>
        <button className="text-blue-900 text-sm font-semibold">Semua</button>
      </div>

      <div className="relative group">
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-3"
        >
          <ChevronLeft className="w-5 h-5 text-gray-800" />
        </button>

        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth pb-2"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch'
          }}
        >
          {concerts.map(concert => (
            <ProductCard key={concert.id} {...concert} />
          ))}
        </div>

        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-3"
        >
          <ChevronRight className="w-5 h-5 text-gray-800" />
        </button>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
};

export default ProductCarousel;