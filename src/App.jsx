import React, { useState } from "react";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedConcert, setSelectedConcert] = useState(null);

  const navigateTo = (page, concert = null) => {
    setCurrentPage(page);
    if (concert) {
      setSelectedConcert(concert);
    }
  };

  return (
    <div>
      {currentPage === "home" && <Home navigateTo={navigateTo} />}
      {currentPage === "checkout" && (
        <Checkout concert={selectedConcert} navigateTo={navigateTo} />
      )}
    </div>
  );
};

const Home = ({ navigateTo }) => {
  const [selectedCity, setSelectedCity] = useState("Jakarta");
  const [currentBanner, setCurrentBanner] = useState(0);

  const cities = ["Jakarta", "Bandung", "Bali", "Surabaya", "Yogyakarta"];

  const banners = [
    {
      title: "Diskon 50% Festival Musik 2025",
      subtitle: "Jangan Lewatkan!",
      desc: "Beli tiket sekarang dan dapatkan diskon hingga 50%!",
      badge: "DISKON 50%",
      gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    },
    {
      title: "Early Bird Special",
      subtitle: "Harga Spesial Pembeli Pertama",
      desc: "Dapatkan harga terbaik! Terbatas 100 pembeli pertama!",
      badge: "EARLY BIRD",
      gradient: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    },
  ];

  const concerts = [
    {
      id: 1,
      title: "Coldplay - Music of The Spheres",
      date: "15 Januari 2025",
      venue: "Gelora Bung Karno, Jakarta",
      city: "Jakarta",
      price: 1500000,
      status: "HOT",
      badge: "HOT",
      badgeColor: "#ff6b6b",
    },
    {
      id: 2,
      title: "Bruno Mars - 24K Magic",
      date: "20 Februari 2025",
      venue: "Indonesia Arena, Jakarta",
      city: "Jakarta",
      price: 2000000,
      status: "SOLD OUT",
      badge: "SOLD OUT",
      badgeColor: "#dc3545",
    },
    {
      id: 3,
      title: "Ed Sheeran - Mathematics Tour",
      date: "5 Maret 2025",
      venue: "JIS, Jakarta",
      city: "Jakarta",
      price: 1800000,
      status: null,
      badge: null,
    },
    {
      id: 4,
      title: "Taylor Swift - Eras",
      date: "12 April 2025",
      venue: "GBK Stadium, Jakarta",
      city: "Jakarta",
      price: 3000000,
      status: "NEW",
      badge: "NEW",
      badgeColor: "#28a745",
    },
  ];

  React.useEffect(() => {
    const timer = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ backgroundColor: "#f5f6fa", minHeight: "100vh" }}>
      <header
        style={{
          backgroundColor: "#1e3a8a",
          padding: "20px 40px",
          color: "white",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <div
              style={{
                backgroundColor: "white",
                borderRadius: "50%",
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "24px",
              }}
            >
              🎫
            </div>
            <div>
              <h1 style={{ margin: 0, fontSize: "24px", fontWeight: "bold" }}>
                E-tix
              </h1>
              <p style={{ margin: 0, fontSize: "12px", opacity: 0.9 }}>
                Your Concert Journey
              </p>
            </div>
          </div>
          <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
            <div style={{ position: "relative" }}>
              🔔
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  backgroundColor: "#dc3545",
                  borderRadius: "50%",
                  width: "16px",
                  height: "16px",
                  fontSize: "10px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                1
              </span>
            </div>
            <div style={{ fontSize: "24px", cursor: "pointer" }}>👤</div>
          </div>
        </div>

        <div style={{ maxWidth: "1200px", margin: "20px auto 0" }}>
          <input
            type="text"
            placeholder="Cari Konser..."
            style={{
              width: "100%",
              padding: "15px 20px",
              borderRadius: "12px",
              border: "none",
              fontSize: "16px",
            }}
          />
        </div>

        <div style={{ maxWidth: "1200px", margin: "20px auto 0" }}>
          <p style={{ marginBottom: "10px", fontSize: "14px" }}>
            📍 Pilih Kota
          </p>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setSelectedCity(city)}
                style={{
                  padding: "10px 24px",
                  borderRadius: "25px",
                  border: "none",
                  backgroundColor:
                    selectedCity === city ? "#3b82f6" : "rgba(255,255,255,0.2)",
                  color: "white",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: selectedCity === city ? "bold" : "normal",
                  transition: "all 0.3s",
                }}
              >
                {city}
              </button>
            ))}
          </div>
        </div>
      </header>

      <div
        style={{
          maxWidth: "1200px",
          margin: "30px auto",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            position: "relative",
            borderRadius: "20px",
            overflow: "hidden",
            height: "300px",
          }}
        >
          <div
            style={{
              display: "flex",
              transition: "transform 0.5s ease",
              transform: `translateX(-${currentBanner * 100}%)`,
            }}
          >
            {banners.map((banner, idx) => (
              <div
                key={idx}
                style={{
                  minWidth: "100%",
                  height: "300px",
                  background: banner.gradient,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  color: "white",
                  textAlign: "center",
                  padding: "40px",
                  position: "relative",
                }}
              >
                <span
                  style={{
                    backgroundColor: "rgba(255,255,255,0.3)",
                    padding: "6px 16px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                    marginBottom: "20px",
                  }}
                >
                  🎉 {banner.badge}
                </span>
                <h2 style={{ fontSize: "36px", margin: "0 0 10px 0" }}>
                  {banner.title}
                </h2>
                <p
                  style={{
                    fontSize: "16px",
                    margin: "0 0 10px 0",
                    opacity: 0.9,
                  }}
                >
                  {banner.subtitle}
                </p>
                <p
                  style={{
                    fontSize: "14px",
                    marginBottom: "20px",
                    opacity: 0.8,
                  }}
                >
                  {banner.desc}
                </p>
                <button
                  style={{
                    backgroundColor: "white",
                    color: "#333",
                    padding: "12px 30px",
                    borderRadius: "25px",
                    border: "none",
                    fontWeight: "bold",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  {idx === 0 ? "Beli Sekarang" : "Cek Konser"}
                </button>
                <div
                  style={{
                    position: "absolute",
                    right: "60px",
                    fontSize: "120px",
                    opacity: 0.2,
                  }}
                >
                  🎟️
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              position: "absolute",
              bottom: "20px",
              left: "50%",
              transform: "translateX(-50%)",
              display: "flex",
              gap: "8px",
            }}
          >
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentBanner(idx)}
                style={{
                  width: currentBanner === idx ? "24px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor:
                    currentBanner === idx ? "white" : "rgba(255,255,255,0.5)",
                  cursor: "pointer",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <h2 style={{ fontSize: "24px", color: "#1e3a8a" }}>
            Konser Terpopuler
          </h2>
          <a
            href="#"
            style={{
              color: "#3b82f6",
              textDecoration: "none",
              fontWeight: "bold",
            }}
          >
            Semua →
          </a>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: "20px",
          }}
        >
          {concerts
            .filter((c) => c.city === selectedCity)
            .map((concert) => (
              <ProductCard
                key={concert.id}
                concert={concert}
                navigateTo={navigateTo}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

const ProductCard = ({ concert, navigateTo }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleBuyClick = () => {
    if (concert.status === "SOLD OUT") {
      alert("Maaf, tiket sudah habis!");
      return;
    }

    navigateTo("checkout", concert);
  };

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "16px",
        overflow: "hidden",
        boxShadow: isHovered
          ? "0 10px 30px rgba(0,0,0,0.15)"
          : "0 4px 15px rgba(0,0,0,0.08)",
        transform: isHovered ? "translateY(-8px)" : "translateY(0)",
        transition: "all 0.3s ease",
        cursor: "pointer",
        position: "relative",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        style={{
          height: "180px",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "70px",
          position: "relative",
        }}
      >
        🎟️
        {concert.badge && (
          <span
            style={{
              position: "absolute",
              top: "12px",
              right: "12px",
              backgroundColor: concert.badgeColor,
              color: "white",
              padding: "6px 14px",
              borderRadius: "20px",
              fontSize: "11px",
              fontWeight: "bold",
            }}
          >
            {concert.badge}
          </span>
        )}
      </div>

      <div style={{ padding: "20px" }}>
        <h3
          style={{
            margin: "0 0 12px 0",
            fontSize: "16px",
            fontWeight: "bold",
            color: "#1e293b",
            lineHeight: "1.4",
          }}
        >
          {concert.title}
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "8px",
            color: "#64748b",
            fontSize: "13px",
          }}
        >
          <span>📅</span>
          <span>{concert.date}</span>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            marginBottom: "16px",
            color: "#64748b",
            fontSize: "13px",
          }}
        >
          <span>📍</span>
          <span>{concert.venue}</span>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            paddingTop: "12px",
            borderTop: "1px solid #e2e8f0",
          }}
        >
          <div>
            <p
              style={{
                margin: "0 0 4px 0",
                fontSize: "11px",
                color: "#94a3b8",
              }}
            >
              Mulai dari
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "18px",
                fontWeight: "bold",
                color: "#059669",
              }}
            >
              Rp {concert.price.toLocaleString("id-ID")}
            </p>
          </div>

          <button
            onClick={handleBuyClick}
            disabled={concert.status === "SOLD OUT"}
            style={{
              backgroundColor:
                concert.status === "SOLD OUT" ? "#94a3b8" : "#3b82f6",
              color: "white",
              border: "none",
              padding: "12px 24px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "14px",
              cursor: concert.status === "SOLD OUT" ? "not-allowed" : "pointer",
              transition: "all 0.3s",
            }}
            onMouseOver={(e) => {
              if (concert.status !== "SOLD OUT") {
                e.target.style.backgroundColor = "#2563eb";
              }
            }}
            onMouseOut={(e) => {
              if (concert.status !== "SOLD OUT") {
                e.target.style.backgroundColor = "#3b82f6";
              }
            }}
          >
            Beli
          </button>
        </div>
      </div>
    </div>
  );
};

const Checkout = ({ concert, navigateTo }) => {
  const [quantity, setQuantity] = useState(1);
  const [paymentMethod, setPaymentMethod] = useState("credit-card");

  if (!concert) {
    return (
      <div style={{ padding: "40px", textAlign: "center" }}>
        <p>Tidak ada tiket yang dipilih</p>
        <button
          onClick={() => navigateTo("home")}
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            backgroundColor: "#3b82f6",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Kembali ke Home
        </button>
      </div>
    );
  }

  const total = concert.price * quantity;

  const handlePayment = () => {
    alert(
      `✅ Pembayaran Berhasil!\n\nKonser: ${
        concert.title
      }\nJumlah Tiket: ${quantity}\nTotal: Rp ${total.toLocaleString(
        "id-ID"
      )}\n\nTiket akan dikirim ke email Anda!`
    );
    navigateTo("home");
  };

  return (
    <div style={{ backgroundColor: "#f5f6fa", minHeight: "100vh" }}>
     
      <div
        style={{
          backgroundColor: "#1e3a8a",
          padding: "20px 40px",
          color: "white",
        }}
      >
        <div
          style={{
            maxWidth: "800px",
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            gap: "20px",
          }}
        >
          <button
            onClick={() => navigateTo("home")}
            style={{
              backgroundColor: "transparent",
              border: "none",
              color: "white",
              fontSize: "24px",
              cursor: "pointer",
            }}
          >
            ←
          </button>
          <h1 style={{ margin: 0, fontSize: "24px" }}>Checkout</h1>
        </div>
      </div>

      <div
        style={{
          maxWidth: "800px",
          margin: "40px auto",
          padding: "0 20px",
        }}
      >
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "20px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{ margin: "0 0 20px 0", fontSize: "20px", color: "#1e293b" }}
          >
            Detail Tiket
          </h2>

          <div
            style={{
              display: "flex",
              gap: "20px",
              paddingBottom: "20px",
              borderBottom: "1px solid #e2e8f0",
            }}
          >
            <div
              style={{
                width: "120px",
                height: "120px",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                borderRadius: "12px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "50px",
              }}
            >
              🎟️
            </div>
            <div style={{ flex: 1 }}>
              <h3 style={{ margin: "0 0 12px 0", fontSize: "18px" }}>
                {concert.title}
              </h3>
              <div style={{ color: "#64748b", fontSize: "14px" }}>
                <p style={{ margin: "6px 0" }}>📅 {concert.date}</p>
                <p style={{ margin: "6px 0" }}>📍 {concert.venue}</p>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "20px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "bold",
              }}
            >
              Jumlah Tiket
            </label>
            <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                -
              </button>
              <span
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                  minWidth: "40px",
                  textAlign: "center",
                }}
              >
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                style={{
                  width: "40px",
                  height: "40px",
                  border: "1px solid #cbd5e1",
                  borderRadius: "8px",
                  backgroundColor: "white",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                +
              </button>
            </div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "20px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{ margin: "0 0 20px 0", fontSize: "20px", color: "#1e293b" }}
          >
            Metode Pembayaran
          </h2>

          {["credit-card", "bank-transfer", "e-wallet"].map((method) => (
            <label
              key={method}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "16px",
                border: `2px solid ${
                  paymentMethod === method ? "#3b82f6" : "#e2e8f0"
                }`,
                borderRadius: "12px",
                marginBottom: "12px",
                cursor: "pointer",
                backgroundColor: paymentMethod === method ? "#eff6ff" : "white",
              }}
            >
              <input
                type="radio"
                name="payment"
                value={method}
                checked={paymentMethod === method}
                onChange={(e) => setPaymentMethod(e.target.value)}
                style={{ marginRight: "12px", width: "20px", height: "20px" }}
              />
              <span style={{ fontSize: "16px" }}>
                {method === "credit-card" && "💳 Kartu Kredit/Debit"}
                {method === "bank-transfer" && "🏦 Transfer Bank"}
                {method === "e-wallet" && "📱 E-Wallet (GoPay, OVO, Dana)"}
              </span>
            </label>
          ))}
        </div>

        <div
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
            padding: "24px",
            marginBottom: "20px",
            boxShadow: "0 4px 15px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{ margin: "0 0 20px 0", fontSize: "20px", color: "#1e293b" }}
          >
            Ringkasan Pembayaran
          </h2>

          <div
            style={{
              marginBottom: "12px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ color: "#64748b" }}>Harga Tiket</span>
            <span>Rp {concert.price.toLocaleString("id-ID")}</span>
          </div>
          <div
            style={{
              marginBottom: "12px",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span style={{ color: "#64748b" }}>Jumlah</span>
            <span>{quantity}x</span>
          </div>
          <div
            style={{
              marginTop: "16px",
              paddingTop: "16px",
              borderTop: "2px solid #e2e8f0",
              display: "flex",
              justifyContent: "space-between",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            <span>Total</span>
            <span style={{ color: "#059669" }}>
              Rp {total.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          style={{
            width: "100%",
            padding: "18px",
            backgroundColor: "#059669",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
            boxShadow: "0 4px 15px rgba(5,150,105,0.3)",
            transition: "all 0.3s",
          }}
          onMouseOver={(e) => {
            e.target.style.backgroundColor = "#047857";
            e.target.style.transform = "scale(1.02)";
          }}
          onMouseOut={(e) => {
            e.target.style.backgroundColor = "#059669";
            e.target.style.transform = "scale(1)";
          }}
        >
          💳 Bayar Sekarang - Rp {total.toLocaleString("id-ID")}
        </button>
      </div>
    </div>
  );
};

export default App;
