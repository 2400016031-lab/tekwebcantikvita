import { useState } from "react";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";

const App = () => {
  const [currentPage, setCurrentPage] = useState("home");
  const [selectedConcert, setSelectedConcert] = useState(null);

  const navigateTo = (page, concert = null) => {
    console.log("NAVIGATE:", page, concert)
    setCurrentPage(page);

    if (page === "checkout" && concert) {
      setSelectedConcert(concert);
    }
  };

  return (
    <div>
      {currentPage === "home" && <Home navigateTo={navigateTo} />}

      {currentPage === "checkout" && (
        <Checkout
          concert={selectedConcert}
          navigateTo={navigateTo}
        />
      )}
    </div>
  );
};

export default App;
