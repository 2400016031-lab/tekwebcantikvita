import React from 'react';
import { Calendar, MapPin, Heart } from 'lucide-react';

const ProductCard = ({ concert }) => {
  if (!concert) return null; // ⛑️ PENGAMAN

  return (
    <div className="bg-white rounded-2xl shadow w-[260px] overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-900 to-slate-800 h-36 flex items-center justify-center relative">
        <span className="text-5xl text-white">🎵</span>

        {concert.tag && (
          <span
            className={`absolute top-3 left-3 ${concert.tagColor} text-white text-xs px-3 py-1 rounded-full`}
          >
            {concert.tag}
          </span>
        )}

        <Heart className="absolute top-3 right-3 text-white" />
      </div>

      {/* Body */}
      <div className="p-4">
        <h3 className="font-bold mb-2">{concert.title}</h3>

        <div className="text-sm text-gray-600 space-y-1 mb-3">
          <div className="flex items-center gap-2">
            <Calendar size={14} /> {concert.date}
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={14} /> {concert.venue}
          </div>
        </div>

        <div className="flex justify-between items-center">
          <span className="font-bold text-blue-900">
            Rp {concert.price.toLocaleString('id-ID')}
          </span>

          <button className="bg-blue-900 text-white px-4 py-2 rounded-lg text-sm">
            Beli
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
