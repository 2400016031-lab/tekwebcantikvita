import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, Ticket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const API_URL = "https://694e8adab5bc648a93c0aad8.mockapi.io/api/v1/concerts";

const ConcertDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [concert, setConcert] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/${id}`)
      .then((res) => res.json())
      .then((data) => setConcert(data));
  }, [id]);

  if (!concert) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">

       
        <Button variant="ghost" onClick={() => navigate(-1)}>
          ← Kembali
        </Button>

      
        <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl h-72 flex items-center justify-center">
          <Ticket className="w-24 h-24 text-white/40" />
        </div>

       
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <h1 className="text-3xl font-bold">{concert.artist}</h1>

          <div className="flex gap-2 flex-wrap">
            <Badge>{concert.city}</Badge>
            <Badge variant="secondary">{concert.date}</Badge>
            {concert.category && (
              <Badge variant="outline">{concert.category}</Badge>
            )}
          </div>

          <div className="space-y-2 text-gray-600">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {concert.date}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              {concert.venue}
            </div>
          </div>

          
          <div className="pt-4 border-t">
            <h2 className="font-semibold mb-2">Deskripsi Konser</h2>
            <p className="text-gray-600 leading-relaxed">
              Konser {concert.artist} akan diselenggarakan di {concert.venue}, {concert.city}.
              Nikmati pengalaman musik secara langsung dengan tata panggung dan
              sistem audio terbaik.
            </p>
          </div>

          
          <div className="pt-4 border-t">
            <p className="text-sm text-gray-500">Harga tiket mulai dari</p>
            <p className="text-2xl font-bold text-blue-600">
              Rp {Number(concert.price).toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConcertDetail;