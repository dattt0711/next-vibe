"use client";

import type { ActiveTab } from "@/components/Header";

interface MobileBottomNavProps {
  activeTab: ActiveTab;
  onTabChange: (tab: ActiveTab) => void;
}

const tabs: { key: ActiveTab; icon: string; label: string }[] = [
  { key: "wishes", icon: "/icons/emoji/gift.png", label: "QUÀ TẶNG" },
  { key: "locations", icon: "/icons/emoji/map.png", label: "ĐỊA ĐIỂM" },
  { key: "badges", icon: "/icons/emoji/activities.png", label: "HUY HIỆU" },
];

export default function MobileBottomNav({
  activeTab,
  onTabChange,
}: MobileBottomNavProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-duckie-bg px-4 pb-5 pt-3 md:hidden">
      <div className="flex items-center rounded-full bg-duckie-white border-2 border-duckie-black p-1 h-[62px]">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              className={`flex-1 flex flex-col items-center justify-center gap-0.5 h-full rounded-[26px] cursor-pointer ${
                isActive ? "bg-duckie-primary" : ""
              }`}
              onClick={() => onTabChange(tab.key)}
            >
              <img src={tab.icon} alt="" width={16} height={16} />
              <span
                className={`text-[9px] font-semibold tracking-[0.5px] font-geist ${
                  isActive ? "text-duckie-black" : "text-duckie-gray"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
