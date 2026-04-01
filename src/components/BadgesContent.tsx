"use client";

import type { Badge, BadgeStats } from "@/lib/types";

interface BadgesContentProps {
  badges: Badge[];
  stats: BadgeStats;
  onBack: () => void;
}

function BadgeCard({ badge }: { badge: Badge }) {
  return (
    <div
      className={`flex-1 flex flex-col items-center gap-2.5 p-6 px-4 border-3 border-duckie-black ${
        badge.unlocked
          ? "bg-duckie-white shadow-[4px_4px_0_var(--duckie-black)]"
          : "bg-[#F5F5F5] opacity-50"
      }`}
    >
      {/* Circle icon */}
      <img
        src={badge.icon}
        alt={badge.name}
        className="w-16 h-16"
      />
      {/* Name */}
      <span className="text-sm font-extrabold text-duckie-black text-center">
        {badge.name}
      </span>
      {/* Description */}
      <span className="text-xs text-duckie-black text-center">
        {badge.description}
      </span>
      {/* Date / Lock */}
      <span className="font-mono text-[11px] font-bold text-duckie-black">
        {badge.unlocked ? `✅ ${badge.date}` : "🔒 Chưa đạt"}
      </span>
    </div>
  );
}

export default function BadgesContent({
  badges,
  stats,
  onBack,
}: BadgesContentProps) {
  // Split badges into rows of 3
  const rows: Badge[][] = [];
  for (let i = 0; i < badges.length; i += 3) {
    rows.push(badges.slice(i, i + 3));
  }

  return (
    <div className="flex-1 flex flex-col gap-7 p-8 px-14 bg-duckie-bg font-geist overflow-auto">
      {/* Stats row */}
      <div className="flex gap-4 w-full">
        <div className="flex-1 flex items-center gap-3.5 p-5 bg-duckie-white border-3 border-duckie-black shadow-[4px_4px_0_var(--duckie-black)]">
          <span className="text-2xl">🏆</span>
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[28px] font-black text-duckie-black">
              {stats.total}
            </span>
            <span className="text-[13px] font-bold text-duckie-black">
              Huy hiệu
            </span>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-3.5 p-5 bg-duckie-white border-3 border-duckie-black shadow-[4px_4px_0_var(--duckie-black)]">
          <span className="text-2xl">⭐</span>
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[28px] font-black text-duckie-black">
              {stats.rare}
            </span>
            <span className="text-[13px] font-bold text-duckie-black">
              Hiếm
            </span>
          </div>
        </div>
        <div className="flex-1 flex items-center gap-3.5 p-5 bg-duckie-white border-3 border-duckie-black shadow-[4px_4px_0_var(--duckie-black)]">
          <span className="text-2xl">🔥</span>
          <div className="flex flex-col gap-0.5">
            <span className="font-mono text-[28px] font-black text-duckie-black">
              {stats.currentStreak}
            </span>
            <span className="text-[13px] font-bold text-duckie-black">
              Streak hiện tại
            </span>
          </div>
        </div>
      </div>

      {/* Badge grid */}
      <div className="flex flex-col gap-4 w-full">
        {rows.map((row, i) => (
          <div key={i} className="flex gap-4 w-full">
            {row.map((badge) => (
              <BadgeCard key={badge.id} badge={badge} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
