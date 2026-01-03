import { useEffect, useState } from "react";
import { Search, MapPin } from "lucide-react";
import BannerCarousel from "../components/public/BannerCarousel";
import ProductCarousel from "../components/public/ProductCarousel";

const Home = ({ navigateTo }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Jakarta");
  const [concerts, setConcerts] = useState([]);

  const cities = [
    "semua",
    "Jakarta",
    "Bandung",
    "Surabaya",
    "Bali",
    "Yogyakarta",
  ];
  useEffect(() => {
    fetch("https://694e8adab5bc648a93c0aad8.mockapi.io/api/v1/concerts")
      .then((res) => res.json())
      .then((data) => setConcerts(data));
  }, []);

  const filteredConcerts = concerts.filter((concert) => {
    if (!concert) return false;

    const matchCity = selectedCity === "semua" || concert.city === selectedCity;

    const matchSearch = concert.artist
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());

    return matchCity && matchSearch;
  });
  const handleBuy = (concert) => {
    navigateTo("checkout", concert);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-6 py-5">
          {/* SEARCH */}
          <div className="mt-6">
            <div className="bg-white rounded-2xl p-4 shadow-lg flex items-center">
              <Search className="w-6 h-6 text-gray-400 ml-2" />
              <input
                type="text"
                placeholder="Cari Konser..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 px-4 py-2 text-gray-800 outline-none text-lg"
              />
            </div>
          </div>

          {/* CITY FILTER */}
          <div className="bg-white mt-6 rounded-xl">
            <div className="px-6 py-6">
              <div className="flex items-center gap-3 mb-4">
                <MapPin className="w-5 h-5 text-gray-800" />
                <h2 className="text-lg font-semibold text-gray-800">
                  Pilih Kota
                </h2>
              </div>

              <div className="flex gap-3 overflow-x-auto pb-2">
                {cities.map((city) => (
                  <button
                    key={city}
                    onClick={() => setSelectedCity(city)}
                    className={`px-8 py-3 rounded-full font-medium transition whitespace-nowrap ${
                      selectedCity === city
                        ? "bg-blue-900 text-white shadow-lg"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {city}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <BannerCarousel />
        <ProductCarousel concerts={filteredConcerts} onBuy={handleBuy} />
      </div>
    </div>
  );
};
export default Home;
