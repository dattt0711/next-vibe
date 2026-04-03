"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { tabs, getActiveTab } from "@/lib/navigation";

export default function MobileBottomNav() {
  const pathname = usePathname();
  const activeTab = getActiveTab(pathname);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-duckie-bg px-4 pb-5 pt-3 md:hidden">
      <div className="flex items-center rounded-full bg-duckie-white border-2 border-duckie-black p-1 h-[62px]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <Link
              key={tab.key}
              href={tab.href}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 h-full rounded-[26px] ${
                isActive ? "bg-duckie-primary" : ""
              }`}
            >
              <img src={tab.icon} alt="" width={16} height={16} />
              <span
                className={`text-[9px] font-semibold tracking-[0.5px] font-geist ${
                  isActive ? "text-duckie-black" : "text-duckie-gray"
                }`}
              >
                {tab.mobileLabel}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
