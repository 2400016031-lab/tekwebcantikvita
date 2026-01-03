import React from "react";

const statusStyle = {
  "SOLD OUT": "bg-red-100 text-red-600",
  HOT: "bg-yellow-100 text-yellow-600",
  Tersedia: "bg-blue-100 text-blue-600",
};

const DataTable = ({ data, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-hidden">
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-slate-50 border-b-2 border-slate-200 text-sm text-slate-600 font-bold">
            <th className="p-4 text-left">artist</th>
            <th className="p-4 text-left">date</th>
            <th className="p-4 text-left">venue</th>
            <th className="p-4 text-left">city</th>
            <th className="p-4 text-left">price</th>
            <th className="p-4 text-center">category</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td
                colSpan="6"
                className="p-10 text-center text-slate-400 text-sm"
              >
                Belum ada data event. Klik tombol "Tambah Event".
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-slate-50 transition"
              >
                <td className="p-4 font-semibold text-slate-800">
                  {item.artist}
                </td>
                <td className="p-4 text-slate-600">{item.date}</td>
                <td className="p-4 text-slate-600">{item.venue}</td>
                <td className="p-4 text-slate-600">{item.city}</td>
                <td className="p-4 font-semibold text-emerald-600">
                  Rp {Number(item.price).toLocaleString("id-ID")}
                </td>
                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-md text-xs font-semibold ${
                      statusStyle[item.category?.toUpperCase()] ||
                      statusStyle.Tersedia
                    }`}
                  >
                    {item.category}
                  </span>
                </td>
                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <button
                      onClick={() => onEdit(item)}
                      className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-xs font-semibold"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() => onDelete(item.id)}
                      className="px-3 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-md text-xs font-semibold"
                    >
                      🗑️ Hapus
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
