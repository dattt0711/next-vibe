"use client";

import type { Badge, BadgeStats } from "@/lib/types";

interface BadgesContentProps {
  badges: Badge[];
  stats: BadgeStats;
}

function BadgeCard({ badge }: { badge: Badge }) {
  return (
    <div
      className={`flex-1 flex flex-col items-center gap-2.5 p-4 md:p-6 md:px-4 border-3 border-duckie-black ${
        badge.unlocked
          ? "bg-duckie-white shadow-[4px_4px_0_var(--duckie-black)]"
          : "bg-[#F5F5F5] opacity-50"
      }`}
    >
      <img
        src={badge.icon}
        alt={badge.name}
        className="w-12 h-12 md:w-16 md:h-16"
      />
      <span className="text-xs md:text-sm font-extrabold text-duckie-black text-center">
        {badge.name}
      </span>
      <span className="text-[10px] md:text-xs text-duckie-black text-center">
        {badge.description}
      </span>
      <span className="font-mono text-[10px] md:text-[11px] font-bold text-duckie-black">
        {badge.unlocked ? `✅ ${badge.date}` : "🔒 Chưa đạt"}
      </span>
    </div>
  );
}

export default function BadgesContent({
  badges,
  stats,
}: BadgesContentProps) {
  return (
    <div className="flex-1 flex flex-col gap-5 md:gap-7 p-4 pb-28 md:p-8 md:px-14 md:pb-8 bg-duckie-bg font-geist overflow-auto">
      {/* Stats row */}
      <div className="flex gap-2 md:gap-4 w-full">
        <div className="flex-1 flex flex-col md:flex-row items-center gap-1 md:gap-3.5 p-3 md:p-5 bg-duckie-white border-3 border-duckie-black shadow-[4px_4px_0_var(--duckie-black)]">
          <span className="text-lg md:text-2xl">🏆</span>
          <div className="flex flex-col items-center md:items-start gap-0.5">
            <span className="font-mono text-xl md:text-[28px] font-black text-duckie-black">
              {stats.total}
            </span>
            <span className="text-[10px] md:text-[13px] font-bold text-duckie-black">
              Huy hiệu
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-col md:flex-row items-center gap-1 md:gap-3.5 p-3 md:p-5 bg-duckie-white border-3 border-duckie-black shadow-[4px_4px_0_var(--duckie-black)]">
          <span className="text-lg md:text-2xl">⭐</span>
          <div className="flex flex-col items-center md:items-start gap-0.5">
            <span className="font-mono text-xl md:text-[28px] font-black text-duckie-black">
              {stats.rare}
            </span>
            <span className="text-[10px] md:text-[13px] font-bold text-duckie-black">
              Hiếm
            </span>
          </div>
        </div>
        <div className="flex-1 flex flex-col md:flex-row items-center gap-1 md:gap-3.5 p-3 md:p-5 bg-duckie-white border-3 border-duckie-black shadow-[4px_4px_0_var(--duckie-black)]">
          <span className="text-lg md:text-2xl">🔥</span>
          <div className="flex flex-col items-center md:items-start gap-0.5">
            <span className="font-mono text-xl md:text-[28px] font-black text-duckie-black">
              {stats.currentStreak}
            </span>
            <span className="text-[10px] md:text-[13px] font-bold text-duckie-black">
              Streak hiện tại
            </span>
          </div>
        </div>
      </div>

      {/* Badge grid — 2 cols on mobile, 3 cols on desktop */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 w-full">
        {badges.map((badge) => (
          <BadgeCard key={badge.id} badge={badge} />
        ))}
      </div>
    </div>
  );
}
