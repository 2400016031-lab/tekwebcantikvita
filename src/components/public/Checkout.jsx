import React from "react";

const Checkout = () => {
  return (
    <div style={{ padding: "40px" }}>
      <h1>Halaman Pembayaran</h1>
      <p>Silakan lakukan pembayaran 💳</p>

      <button
        style={{
          marginTop: "20px",
          padding: "10px 20px",
          backgroundColor: "green",
          color: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
        }}
        onClick={() => alert("Pembayaran berhasil!")}
      >
        BAYAR SEKARANG
      </button>
    </div>
  );
};

export default Checkout;
