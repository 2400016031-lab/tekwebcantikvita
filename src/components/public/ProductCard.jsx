import React from "react";
import { Calendar, MapPin, Ticket } from "lucide-react";

const ProductCard = ({ concert, onBuy }) => {
  if (!concert) return null;
  const { artist, date, venue, price, category } = concert;

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
        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-1">
          {artist}
        </h3>

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

          <button
            onClick={() => {
              console.log("beli diklik", concert); 
              onBuy(concert);}}
            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-5 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition font-medium text-sm"
          >
            Beli
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
