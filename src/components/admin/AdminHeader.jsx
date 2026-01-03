import React from "react";
import { Button } from "../ui/button";

const AdminHeader = ({ onLogout }) => {
  return (
    <header className="bg-gradient-to-r from-blue-900 to-blue-500 px-10 py-5 text-white shadow-md">
      <div className="flex items-center justify-between">
        {/* LEFT */}
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white text-blue-700 rounded-full flex items-center justify-center text-2xl">
            🎫
          </div>
          <div>
            <h1 className="text-xl font-bold">E-Tix Admin</h1>
            <p className="text-sm opacity-90">
              Concert Management System
            </p>
          </div>
        </div>

        {/* RIGHT */}
        <Button
          variant="destructive"
          onClick={onLogout}
          className="bg-red-500 hover:bg-red-600 transition px-6 py-2.5 rounded-lg text-sm font-semibold shadow"
        >
          Logout
        </Button>
      </div>
    </header>
  );
};

export default AdminHeader;
