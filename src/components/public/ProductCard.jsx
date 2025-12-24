import { useNavigate } from "react-router-dom";
import React from 'react';
import { Calendar, MapPin, Heart } from 'lucide-react';

const ProductCard = ({ concert }) => {
  if (!concert) return null; // ⛑️ PENGAMAN

  useEffect(() => {
    const data = localStorage.getItem("selectedConcert");
    if (data) {
      setConcert(JSON.parse(data));
    }
  }, []);

 if (!concert) {
    return <p className="p-6">Tidak ada tiket dipilih</p>;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-4">Checkout Tiket</h2>

      <p className="font-semibold">{concert.title}</p>
      <p>{concert.date}</p>
      <p>{concert.venue}</p>

      <p className="font-bold text-lg mt-4">
        Rp {concert.price.toLocaleString("id-ID")}
      </p>

      <button
        className="mt-6 w-full bg-green-600 text-white py-3 rounded-lg font-bold"
        onClick={() => alert("Pembayaran berhasil 🎉")}
      >
        Bayar Sekarang
      </button>
    </div>
  );
};

export default Checkout;
