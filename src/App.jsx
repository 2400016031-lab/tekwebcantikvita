import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/public/Navbar";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDasboard";

// Wrapper supaya bisa pakai useLocation
const AppLayout = () => {
  const location = useLocation();

  // Navbar TIDAK tampil di halaman admin
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <Routes>
        {/* USER */}
        <Route path="/" element={<Home />} />
        <Route path="/checkout/:id" element={<Checkout />} />

        {/* ADMIN */}
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>
    </>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
};

export default App;
