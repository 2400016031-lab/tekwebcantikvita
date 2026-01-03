import { useEffect, useState } from "react";
import AdminHeader from "../components/admin/AdminHeader";
import FormData from "../components/admin/FormData";
import DataTable from "../components/admin/DataTable";

const API_URL = "https://694e8adab5bc648a93c0aad8.mockapi.io/api/v1/concerts";

// STAT CARD
const StatsCard = ({ icon, title, value, color }) => (
  <div className="bg-white rounded-xl p-6 shadow hover:-translate-y-1 transition flex items-center gap-5">
    <div
      className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl ${color}`}
    >
      {icon}
    </div>
    <div>
      <p className="text-sm text-slate-500 font-medium">{title}</p>
      <h2 className="text-2xl font-bold text-slate-800">{value}</h2>
    </div>
  </div>
);

export default function AdminDashboard ({navigateTo}) {
  const [concerts, setConcerts] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  const handleLogout = () => {
    navigateTo("home");
  };

  // =====================
  // FETCH DATA
  // =====================
  const fetchConcerts = async () => {
    const res = await fetch(API_URL);
    const data = await res.json();
    setConcerts(data);
  };

  useEffect(() => {
    fetchConcerts();
  }, []);

  // =====================
  // CREATE / UPDATE
  // =====================
  const handleSubmit = async (formData) => {
    if (editData) {
      await fetch(`${API_URL}/${editData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
    }

    setShowForm(false);
    setEditData(null);
    fetchConcerts();
  };

  // =====================
  // DELETE
  // =====================
  const handleDelete = async (id) => {
    if (!confirm("Yakin hapus event ini?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchConcerts();
  };

  // =====================
  // STATS
  // =====================
  const totalRevenue = concerts.reduce(
    (sum, c) => sum + Number(c.harga || 0),
    0
  );

  return (
    <div className="min-h-screen bg-slate-100">
      <AdminHeader onLogout={handleLogout}/>

      <div className="p-10 space-y-10">
        {/* STATS */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard
            icon="📅"
            title="Total Event"
            value={concerts.length}
            color="bg-blue-500 text-white"
          />
          <StatsCard
            icon="💰"
            title="Total Pendapatan"
            value={`Rp ${(totalRevenue / 1_000_000).toFixed(1)}M`}
            color="bg-emerald-500 text-white"
          />
          <StatsCard
            icon="📊"
            title="Tiket Terjual"
            value="—"
            color="bg-yellow-500 text-white"
          />
          <StatsCard
            icon="📍"
            title="Lokasi Aktif"
            value="—"
            color="bg-purple-500 text-white"
          />
        </div>

        {/* HEADER */}
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-800">
            Manajemen Event Konser
          </h2>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg font-semibold shadow"
          >
            ➕ Tambah Event
          </button>
        </div>

        {/* TABLE */}
        <DataTable
          data={concerts}
          onEdit={(item) => {
            setEditData(item);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      </div>

      {showForm && (
        <FormData
          editData={editData}
          onSubmit={handleSubmit}
          onCancel={() => {
            setShowForm(false);
            setEditData(null);
          }}
        />
        )}
    </div>
  );
}
