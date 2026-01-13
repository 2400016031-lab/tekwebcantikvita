import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/public/Footer";

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [concert, setConcert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("transfer-bank");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");

  useEffect(() => {
    fetchConcertDetail();
  }, [id]);

  const fetchConcertDetail = async () => {
    try {
      const response = await fetch(`/api/api/v1/concerts/${id}`);
      const data = await response.json();
      setConcert(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching concert detail:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (!concert) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <p className="text-gray-500 mb-6 text-xl">Konser tidak ditemukan</p>
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold transition-colors"
          >
            Kembali ke Home
          </button>
        </div>
      </div>
    );
  }

  const pricePerTicket = Number(concert.price) || 0;
  const subtotal = pricePerTicket * quantity;
  const adminFee = subtotal * 0.05; // 5% admin fee
  const total = subtotal + adminFee;

  const handleCheckout = () => {
    // Validasi input
    if (!customerName.trim()) {
      alert("Mohon isi nama lengkap Anda");
      return;
    }
    if (!customerEmail.trim()) {
      alert("Mohon isi email Anda");
      return;
    }
    if (!customerPhone.trim()) {
      alert("Mohon isi nomor telepon Anda");
      return;
    }

    // Format pesan WhatsApp yang lebih detail
    const message = `🎫 *PEMESANAN TIKET KONSER*\n\n` +
                   `━━━━━━━━━━━━━━━━━━━\n` +
                   `📋 *DETAIL KONSER*\n` +
                   `🎵 Konser: ${concert.name}\n` +
                   `👤 Artis: ${concert.artist || 'N/A'}\n` +
                   `📅 Tanggal: ${new Date(concert.date).toLocaleDateString('id-ID', { 
                     weekday: 'long', 
                     year: 'numeric', 
                     month: 'long', 
                     day: 'numeric' 
                   })}\n` +
                   `📍 Venue: ${concert.venue}\n` +
                   `📍 Lokasi: ${concert.location}\n\n` +
                   `━━━━━━━━━━━━━━━━━━━\n` +
                   `👤 *DATA PEMESAN*\n` +
                   `Nama: ${customerName}\n` +
                   `Email: ${customerEmail}\n` +
                   `Telepon: ${customerPhone}\n\n` +
                   `━━━━━━━━━━━━━━━━━━━\n` +
                   `💰 *RINCIAN PEMBAYARAN*\n` +
                   `Jumlah Tiket: ${quantity}x\n` +
                   `Harga/Tiket: Rp ${pricePerTicket.toLocaleString('id-ID')}\n` +
                   `Subtotal: Rp ${subtotal.toLocaleString('id-ID')}\n` +
                   `Biaya Admin (5%): Rp ${adminFee.toLocaleString('id-ID')}\n` +
                   `*Total Bayar: Rp ${total.toLocaleString('id-ID')}*\n\n` +
                   `━━━━━━━━━━━━━━━━━━━\n` +
                   `💳 *METODE PEMBAYARAN*\n` +
                   `${paymentMethod === 'transfer-bank' ? '🏦 Transfer Bank' : 
                     paymentMethod === 'e-wallet' ? '📱 E-Wallet' : 
                     '💳 Kartu Kredit/Debit'}\n\n` +
                   `Mohon konfirmasi pemesanan dan info pembayaran. Terima kasih! 🙏`;
    
    // Encode pesan untuk URL
    const encodedMessage = encodeURIComponent(message);
    
    // Nomor WhatsApp
    const phoneNumber = '6282333506761';
    
    // Buka WhatsApp
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');

    // Optional: Show success message
    setTimeout(() => {
      alert('✅ Anda akan dihubungkan ke WhatsApp untuk konfirmasi pemesanan!');
    }, 500);
  };

  return (
    <div className="min-h-screen bg-gray-50">
    
      
      <div className="container mx-auto px-4 py-8 mt-20">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold mb-4"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Kembali
          </button>
          <h1 className="text-3xl font-bold text-gray-800">Checkout Tiket</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Concert Details */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Detail Tiket</h2>
              
              <div className="flex gap-6 pb-6 border-b">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  {concert.image ? (
                    <img src={concert.image} alt={concert.name} className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20 12c0-1.1-.9-2-2-2V7c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v3c-1.1 0-2 .9-2 2v5h1.33L6 19h1l.67-2h8.67l.66 2h1l.67-2H20v-5z"/>
                    </svg>
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="font-bold text-lg mb-2">{concert.name}</h3>
                  <div className="space-y-1 text-gray-600">
                    <p className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {new Date(concert.date).toLocaleDateString('id-ID', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                    <p className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {concert.venue}, {concert.location}
                    </p>
                  </div>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mt-6">
                <p className="font-semibold mb-3 text-gray-800">Jumlah Tiket</p>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-500 font-bold transition-colors"
                  >
                    -
                  </button>
                  <span className="text-2xl font-bold text-gray-800 min-w-[3rem] text-center">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 border-2 border-gray-300 rounded-lg hover:border-blue-500 hover:text-blue-500 font-bold transition-colors"
                  >
                    +
                  </button>
                  <span className="text-gray-600 ml-4">
                    @ Rp {pricePerTicket.toLocaleString('id-ID')}
                  </span>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Data Pemesan</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="contoh@email.com"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Nomor Telepon *
                  </label>
                  <input
                    type="tel"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    placeholder="08xxxxxxxxxx"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Metode Pembayaran</h2>

              <div className="space-y-3">
                {[
                  { value: "transfer-bank", label: "🏦 Transfer Bank", desc: "BCA, Mandiri, BNI, BRI" },
                  { value: "e-wallet", label: "📱 E-Wallet", desc: "GoPay, OVO, DANA, ShopeePay" },
                  { value: "credit-card", label: "💳 Kartu Kredit/Debit", desc: "Visa, Mastercard" },
                ].map(({ value, label, desc }) => (
                  <label
                    key={value}
                    className={`flex items-start gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === value
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      checked={paymentMethod === value}
                      onChange={() => setPaymentMethod(value)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <span className="font-semibold text-gray-800">{label}</span>
                      <p className="text-sm text-gray-500 mt-1">{desc}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24 z-50">
              <h2 className="text-xl font-bold mb-4 text-gray-800">Ringkasan Pembayaran</h2>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Harga Tiket</span>
                  <span>Rp {pricePerTicket.toLocaleString("id-ID")}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Jumlah</span>
                  <span>{quantity}x</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>Rp {subtotal.toLocaleString("id-ID")}</span>
                </div>

                <div className="flex justify-between text-gray-600">
                  <span>Biaya Admin (5%)</span>
                  <span>Rp {adminFee.toLocaleString("id-ID")}</span>
                </div>

                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between text-xl font-bold text-gray-800">
                    <span>Total</span>
                    <span className="text-green-600">
                      Rp {total.toLocaleString("id-ID")}
                    </span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full py-4 bg-green-600 hover:bg-green-700 text-white text-lg font-bold rounded-xl shadow-lg transition-all hover:shadow-xl transform hover:-translate-y-1"
              >
                💬 Lanjutkan ke WhatsApp
              </button>

              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-600 text-center">
                  <span className="font-semibold">ℹ️ Info:</span> Setelah klik tombol, Anda akan diarahkan ke WhatsApp untuk konfirmasi pemesanan
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;