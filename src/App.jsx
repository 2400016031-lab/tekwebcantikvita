import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/public/Navbar";
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
        <Route path="/checkout/:id" element={<Checkout />} />

        <Route path="/concert/:id" element={<ConcertDetail />} />
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
