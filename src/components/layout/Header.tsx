"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { tabs, getActiveTab } from "@/lib/navigation";

export default function Header() {
  const pathname = usePathname();
  const activeTab = getActiveTab(pathname);

  return (
    <header className="flex items-center gap-3 h-16 px-8 border-b-4 border-duckie-black bg-duckie-white font-geist">
      {/* Logo */}
      <img src="/icons/logo-duck.png" alt="Duckie" className="w-9 h-9" />

      {/* Title */}
      <span className="text-lg font-black text-duckie-black">
        Our Wishes
      </span>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-duckie-white border-3 border-duckie-black">
        {tabs.map((tab) => (
          <Link
            key={tab.key}
            href={tab.href}
            className={cn(
              buttonVariants({
                variant: activeTab === tab.key ? "default" : "ghost",
                size: "sm",
              }),
              `text-[13px] ${activeTab !== tab.key ? "font-semibold text-duckie-gray" : ""}`
            )}
          >
            {tab.label}
          </Link>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />
    </header>
  );
}
