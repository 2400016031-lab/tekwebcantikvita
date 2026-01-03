import React from "react";
import { Bell, User } from "lucide-react";
import Logo from "../../assets/Logo.png";

export default function Navbar({ navigateTo }) {
  return (
    <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
      <div className="max-w-7xl mx-auto px-6 py-5">
        {/* NAVBAR */}
        <div className="flex items-center">
          
          {/* LOGO + TITLE */}
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-blue-400 bg-white">
              <img
                src={Logo}
                alt="E-tix Logo"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold">E-tix</h1>
              <p className="text-sm text-blue-200">
                Your Concert Journey
              </p>
            </div>

            <button
              onClick={() => navigateTo("admin")}
              className="px-4 py-2 bg-slate-800 text-white rounded-md ml-4"
            >
              Admin
            </button>
          </div>

          {/* ICONS */}
          <div className="flex items-center gap-4 ml-auto">
            <div className="relative">
              <Bell className="w-6 h-6 cursor-pointer hover:text-blue-200 transition" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                6
              </span>
            </div>
            <User className="w-6 h-6 cursor-pointer hover:text-blue-200 transition" />
          </div>

        </div>
      </div>
    </div>
  );
}
