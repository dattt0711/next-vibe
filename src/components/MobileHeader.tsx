"use client";

import { Menu } from "lucide-react";

export default function MobileHeader() {
  return (
    <header className="flex items-center gap-2.5 h-14 px-4 bg-duckie-white border-b-4 border-duckie-black">
      <div className="flex items-center justify-center w-[34px] h-[34px] bg-duckie-primary border-3 border-duckie-black">
        <img src="/icons/logo-duck.png" alt="Duckie" className="w-5 h-5" />
      </div>
      <span className="text-base font-[800] text-duckie-black font-geist">
        Duckie Wishes
      </span>
      <div className="flex-1" />
      <Menu size={22} className="text-duckie-black" />
    </header>
  );
}
