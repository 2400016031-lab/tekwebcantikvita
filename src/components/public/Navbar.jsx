import React, { useEffect } from "react";

const SimpleSplashScreen = ({ onComplete }) => {
  useEffect(() => {
    // Auto redirect after 2.5 seconds
    const timer = setTimeout(() => {
      if (onComplete) {
        onComplete();
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100vh",
        background: "linear-gradient(180deg, #2b7db5 0%, #1a5580 100%)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif"
      }}
    >
      {/* Logo E-TIX */}
      <div style={{ textAlign: "center", animation: "fadeIn 0.8s ease-out" }}>
        <h1
          style={{
            fontSize: "140px",
            fontWeight: "900",
            margin: 0,
            letterSpacing: "10px",
            color: "white",
            fontFamily: "'Arial Black', sans-serif",
            textShadow: "0 4px 20px rgba(0,0,0,0.2)"
          }}
        >
          E-TI
          <span style={{ color: "#ff9e3d" }}>X</span>
        </h1>
      </div>

      {/* CSS Animation */}
      <style>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
            transform: scale(0.95);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
};

// Demo Component
const SplashDemo = () => {
  const [showSplash, setShowSplash] = React.useState(true);

  if (showSplash) {
    return <SimpleSplashScreen onComplete={() => setShowSplash(false)} />;
  }

  // After splash
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(180deg, #2b7db5 0%, #1a5580 100%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        color: "white",
        padding: "40px",
        textAlign: "center"
      }}
    >
      <div style={{ fontSize: "80px", marginBottom: "20px" }}>✅</div>
      <h1 style={{ fontSize: "42px", margin: "0 0 15px 0" }}>
        Splash Selesai!
      </h1>
      <p style={{ fontSize: "16px", color: "rgba(255,255,255,0.8)", marginBottom: "30px" }}>
        Ini halaman setelah splash screen
      </p>
      
      <button
        onClick={() => setShowSplash(true)}
        style={{
          padding: "14px 35px",
          backgroundColor: "#ff9e3d",
          border: "none",
          borderRadius: "10px",
          color: "white",
          fontSize: "15px",
          fontWeight: "bold",
          cursor: "pointer",
          boxShadow: "0 4px 15px rgba(255, 158, 61, 0.3)",
          transition: "all 0.3s"
        }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = "#f59231";
          e.target.style.transform = "translateY(-2px)";
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = "#ff9e3d";
          e.target.style.transform = "translateY(0)";
        }}
      >
        🔄 Lihat Splash Lagi
      </button>
    </div>
  );
};

export default SplashDemo;