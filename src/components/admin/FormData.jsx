import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


const FormData = ({ onSubmit, onCancel, editData }) => {
  const [formData, setFormData] = useState({
    artist: "",
    date: "",
    venue: "",
    city: "",
    price: "",
    category: "",
  });

  useEffect(() => {
    if (editData) setFormData(editData);
  }, [editData]);

  const handleChange = (artist, value) => {
    setFormData((prev) => ({ ...prev, [artist]: value }));
  };

  const handleSubmit = () => {
    const { artist, date, venue, city, price } = formData;
    if (!artist || !date || !venue || !city || !price) {
      alert("Mohon lengkapi semua field");
      return;
    }
    onSubmit(formData);
  };

  return (
    <Dialog open={true} onOpenChange={onCancel}>
      <DialogContent className="sm:max-w-lg" 
      aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>
            {editData ? "Edit Event Konser" : "Tambah Event Konser"}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">
                artist</p>
            <Input
              value={formData.artist}
              onChange={(e) => handleChange("artist", e.target.value)}
              placeholder="Coldplay - Music of The Spheres"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">
                date</p>
            <Input
              type="date"
              value={formData.tanggal}
              onChange={(e) => handleChange("date", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">
                venue</p>
            <Input
              value={formData.venue}
              onChange={(e) => handleChange("venue", e.target.value)}
              placeholder="GBK"
            />
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">
                city</p>
            <Input
              value={formData.city}
              onChange={(e) => handleChange("city", e.target.value)}
              placeholder="Jakarta"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">
                price (Rp)</p>
            <Input
              type="number"
              value={formData.price}
              onChange={(e) => handleChange("price", e.target.value)}
              placeholder="1500000"
            />
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-700">
                category</p>
            <Select
              value={formData.category}
              onValueChange={(value) => handleChange("category", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Tersedia">Tersedia</SelectItem>
                <SelectItem value="HOT">HOT</SelectItem>
                <SelectItem value="SOLD OUT">SOLD OUT</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={onCancel}>
              Batal
            </Button>
            <Button onClick={handleSubmit}>
              {editData ? "Update Event" : "Simpan Event"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FormData;
