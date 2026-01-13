import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/public/Navbar";
import Footer from "./components/public/Footer";

import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import AdminDashboard from "./pages/AdminDasboard";
import ConcertDetail from "./pages/ConcertDetail";

const AppLayout = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/concert/:id" element={<ConcertDetail />} />
        <Route path="/checkout/:id" element={<Checkout />} />
        <Route path="/admin" element={<AdminDashboard />} />
      </Routes>

      {!isAdminPage && <Footer />}
    </>
  );
};

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
