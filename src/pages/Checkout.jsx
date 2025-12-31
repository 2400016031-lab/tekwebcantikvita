import { useState } from "react";

const Checkout = ({ concert, navigateTo }) => {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  if (!concert) {
    return (
      <div className="p-10 text-center">
        <p className="text-gray-500 mb-6">Tidak ada tiket yang dipilih</p>
        <button
          onClick={() => navigateTo("home")}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg font-bold"
        >
          Kembali ke Home
        </button>
      </div>
    );
  }

  const total = Number(concert.price) * quantity;

  const handlePayment = () => {
    alert(
      `✅ Pembayaran Berhasil!\n\nKonser: ${concert.artist}\nJumlah Tiket: ${quantity}\nTotal: Rp ${total.toLocaleString(
        "id-ID"
      )}`
    );
    navigateTo("home");
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* HEADER */}
      <div className="bg-blue-900 text-white px-10 py-5 flex items-center gap-4">
        <button
          onClick={() => navigateTo("home")}
          className="text-2xl font-bold"
        >
          ←
        </button>
        <h1 className="text-xl font-semibold">Home</h1>
      </div>

      <div className="max-w-3xl mx-auto p-6 space-y-6">
        {/* DETAIL TIKET */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-lg font-bold mb-4">Detail Tiket</h2>

          <div className="flex gap-6 border-b pb-4">
            <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-4xl">
              🎟️
            </div>

            <div>
              <h3 className="font-bold text-lg">{concert.artist}</h3>
              <p className="text-gray-600">📅 {concert.date}</p>
              <p className="text-gray-600">📍 {concert.venue}</p>
            </div>
          </div>

          {/* JUMLAH TIKET */}
          <div className="mt-6">
            <p className="font-semibold mb-2">Jumlah Tiket</p>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 border rounded-lg"
              >
                -
              </button>
              <span className="text-xl font-bold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border rounded-lg"
              >
                +
              </button>
            </div>
          </div>
        </div>

        {/* METODE PEMBAYARAN */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-lg font-bold mb-4">Metode Pembayaran</h2>

          {[
            ["credit-card", "💳 Kartu Kredit / Debit"],
            ["bank-transfer", "🏦 Transfer Bank"],
            ["e-wallet", "📱 E-Wallet"],
          ].map(([value, label]) => (
            <label
              key={value}
              className={`flex items-center gap-3 p-4 border-2 rounded-xl mb-3 cursor-pointer ${
                paymentMethod === value
                  ? "border-blue-500 bg-blue-50"
                  : "border-gray-200"
              }`}
            >
              <input
                type="radio"
                checked={paymentMethod === value}
                onChange={() => setPaymentMethod(value)}
              />
              <span>{label}</span>
            </label>
          ))}
        </div>

        {/* RINGKASAN */}
        <div className="bg-white rounded-2xl p-6 shadow">
          <h2 className="text-lg font-bold mb-4">Ringkasan Pembayaran</h2>

          <div className="flex justify-between mb-2">
            <span>Harga Tiket</span>
            <span>Rp {Number(concert.price).toLocaleString("id-ID")}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span>Jumlah</span>
            <span>{quantity}x</span>
          </div>

          <div className="flex justify-between border-t pt-4 text-xl font-bold">
            <span>Total</span>
            <span className="text-green-600">
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* BUTTON BAYAR */}
        <button
          onClick={handlePayment}
          className="w-full py-5 bg-green-600 hover:bg-green-700 text-white text-lg font-bold rounded-xl shadow-lg transition"
        >
          💳 Bayar Sekarang - Rp {total.toLocaleString("id-ID")}
        </button>
      </div>
    </div>
  );
};

export default Checkout;
