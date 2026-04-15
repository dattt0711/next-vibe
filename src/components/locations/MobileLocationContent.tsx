"use client";

import { useState } from "react";
import { Search, ArrowUpDown } from "lucide-react";
import CelebrationModal from "@/components/shared/CelebrationModal";

import type {
  Location,
  LocationFilters,
  LocationStats,
  LocationCategory,
  Wish,
} from "@/lib/types";

interface MobileLocationContentProps {
  locations: Location[];
  total: number;
  stats: LocationStats;
  categories: LocationCategory[];
  filters: LocationFilters;
  onFilterChange: (filters: Partial<LocationFilters>) => void;
  isLoading: boolean;
}

export default function MobileLocationContent({
  locations,
  total,
  stats,
  categories,
  filters,
  onFilterChange,
  isLoading,
}: MobileLocationContentProps) {
  const [celebrateLocation, setCelebrateLocation] = useState<Location | null>(
    null
  );

  const celebrateWish: Wish | null = celebrateLocation
    ? {
        id: celebrateLocation.id,
        name: celebrateLocation.name,
        category: celebrateLocation.type,
        categoryEmoji: celebrateLocation.typeEmoji,
        owner: celebrateLocation.proposedBy === "anh" ? "chún" : "em bé",
        status: "done",
        description: "",
        imageUrl: "",
        budget: null,
        date: celebrateLocation.date,
      }
    : null;

  return (
    <div
      className={`flex-1 flex flex-col gap-3.5 p-4 pb-28 overflow-auto ${isLoading ? "opacity-50" : ""}`}
    >
      {/* Search */}
      <div className="flex items-center gap-2 w-full">
        <div className="flex items-center flex-1 h-[42px] px-3 bg-duckie-white border-3 border-duckie-black gap-2">
          <Search size={16} className="text-duckie-brown shrink-0" />
          <input
            type="text"
            placeholder="Search locations..."
            className="flex-1 bg-transparent text-sm font-geist text-duckie-dark placeholder:text-duckie-brown outline-none"
            value={filters.search}
            onChange={(e) =>
              onFilterChange({ search: e.target.value, page: 1 })
            }
          />
        </div>
        <button className="flex items-center justify-center w-[42px] h-[42px] bg-duckie-primary border-3 border-duckie-black shadow-[3px_3px_0_var(--duckie-black)]">
          <Search size={18} className="text-duckie-black" />
        </button>
      </div>

      {/* Stats Row */}
      <div className="flex gap-2 w-full">
        <div className="flex-1 flex flex-col items-center gap-0.5 p-2 bg-duckie-white border-3 border-duckie-black shadow-[4px_4px_0_var(--duckie-black)]">
          <span className="font-mono text-xl font-bold text-duckie-dark">
            {stats.total}
          </span>
          <span className="font-mono text-[8px] font-bold tracking-[0.5px] text-duckie-brown">
            TOTAL
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-0.5 p-2 bg-duckie-white border-3 border-duckie-black shadow-[4px_4px_0_var(--duckie-black)]">
          <span className="font-mono text-xl font-bold text-duckie-dark">
            {stats.visited}
          </span>
          <span className="font-mono text-[8px] font-bold tracking-[0.5px] text-duckie-brown">
            VISITED
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-0.5 p-2 bg-duckie-primary border-3 border-duckie-black shadow-[4px_4px_0_var(--duckie-black)]">
          <span className="font-mono text-xl font-bold text-duckie-dark">
            {stats.wantToGo}
          </span>
          <span className="font-mono text-[8px] font-bold tracking-[0.5px] text-duckie-brown">
            WANT TO GO
          </span>
        </div>
      </div>

      {/* Category Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto">
        {categories.map((cat) => {
          const isAll = cat.name === "All";
          const isActive = isAll ? !filters.type : filters.type === cat.name;
          return (
            <button
              key={cat.name}
              className={`shrink-0 flex items-center gap-1 px-2.5 py-1 border-3 text-[11px] font-bold font-geist cursor-pointer ${
                isActive
                  ? "bg-duckie-primary border-duckie-black"
                  : "bg-duckie-white border-duckie-black/30"
              }`}
              onClick={() =>
                onFilterChange({ type: isAll ? null : cat.name, page: 1 })
              }
            >
              <img src={cat.emoji} alt="" width={14} height={14} />
              {cat.count}
            </button>
          );
        })}
      </div>

      {/* Sort Row */}
      {/* <div className="flex items-center justify-between">
        <span className="text-xs text-duckie-brown font-geist">
          {total} địa điểm · Mới nhất
        </span>
        <button className="flex items-center gap-1 text-xs font-semibold text-duckie-dark font-geist">
          <ArrowUpDown size={12} />
          Sắp xếp
        </button>
      </div> */}

      {/* Location List */}
      <div className="flex flex-col border-3 border-duckie-black w-full">
        {locations.map((loc, i) => (
          <button
            key={loc.id}
            className={`flex items-center gap-2.5 px-3 h-[68px] w-full cursor-pointer ${
              i % 2 === 0 ? "bg-duckie-white" : "bg-duckie-bg"
            } ${i < locations.length - 1 ? "border-b-2 border-duckie-black/10" : ""}`}
            onClick={() => {
              if (loc.status === "want_to_go") setCelebrateLocation(loc);
            }}
          >
            {/* Icon */}
            <div
              className={`flex items-center justify-center w-9 h-9 shrink-0 border-2 border-duckie-black ${
                loc.status === "want_to_go" ? "bg-duckie-primary" : "bg-duckie-white"
              }`}
            >
              <img
                src={loc.typeEmoji}
                alt=""
                width={18}
                height={18}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            {/* Info */}
            <div className="flex flex-col gap-0.5 flex-1 min-w-0 text-left">
              <span
                className={`text-[13px] font-bold font-geist truncate ${
                  loc.status === "visited"
                    ? "text-duckie-brown"
                    : "text-duckie-dark"
                }`}
              >
                {loc.name}
              </span>
              <div className="flex items-center gap-2 text-[11px] text-duckie-brown font-geist">
                <span>{loc.type}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <img
                    src={
                      loc.proposedBy === "anh"
                        ? "/icons/emoji/duck.png"
                        : "/icons/emoji/boo.png"
                    }
                    alt=""
                    width={12}
                    height={12}
                  />
                  {loc.proposedBy === "anh" ? "chún" : "em bé"}
                </span>
              </div>
            </div>
            {/* Status */}
            <div
              className={`shrink-0 px-2 py-0.5 border-2 text-[9px] font-mono font-bold ${
                loc.status === "visited"
                  ? "bg-[#22C55E33] border-[#22C55E] text-[#16A34A]"
                  : "bg-[#FFD93D33] border-duckie-primary text-[#B8860B]"
              }`}
            >
              {loc.status === "visited" ? "Visited ✓" : "Want to go"}
            </div>
          </button>
        ))}
      </div>


      <CelebrationModal
        wish={celebrateWish}
        open={celebrateLocation !== null}
        onClose={() => setCelebrateLocation(null)}
      />
    </div>
  );
}
