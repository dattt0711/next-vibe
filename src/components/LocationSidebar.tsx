"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type {
  LocationCategory,
  LocationStats,
  LocationFilters,
  LocationOwner,
  LocationStatus,
} from "@/lib/types";

interface LocationSidebarProps {
  stats: LocationStats;
  categories: LocationCategory[];
  filters: LocationFilters;
  onFilterChange: (filters: Partial<LocationFilters>) => void;
}

export default function LocationSidebar({
  stats,
  categories,
  filters,
  onFilterChange,
}: LocationSidebarProps) {
  const activeType = filters.type || "Tất cả";

  return (
    <aside className="flex flex-col gap-4 w-65 shrink-0 p-5 bg-duckie-white border-r-3 border-duckie-black font-geist overflow-y-auto">
      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-duckie-black pointer-events-none"
        />
        <Input
          placeholder="Tìm địa điểm..."
          value={filters.search}
          onChange={(e) => onFilterChange({ search: e.target.value, page: 1 })}
          className="pl-9"
        />
      </div>

      {/* Stats */}
      <div className="flex gap-2 w-full">
        <div className="flex-1 flex flex-col items-center justify-center gap-0.5 h-14 p-2 bg-duckie-primary border-3 border-duckie-black">
          <span className="font-mono text-lg font-black text-duckie-black">
            {stats.total}
          </span>
          <span className="text-[10px] font-semibold text-duckie-black">
            Tổng
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-0.5 h-14 p-2 bg-duckie-white border-3 border-duckie-black">
          <span className="font-mono text-lg font-black text-duckie-dark">
            {stats.visited}
          </span>
          <span className="text-[10px] font-semibold text-duckie-brown">
            Đã đi
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-0.5 h-14 p-2 bg-duckie-white border-3 border-duckie-black">
          <span className="font-mono text-lg font-black text-duckie-dark">
            {stats.wantToGo}
          </span>
          <span className="text-[10px] font-semibold text-duckie-brown">
            Muốn đi
          </span>
        </div>
      </div>

      {/* Categories */}
      <span className="font-mono text-[11px] font-extrabold tracking-[1.5px] text-duckie-brown">
        LOẠI ĐỊA ĐIỂM
      </span>
      <div className="flex flex-col gap-0.5 w-full">
        {categories.map((cat) => {
          const isActive = activeType === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() =>
                onFilterChange({
                  type: cat.name === "Tất cả" ? null : cat.name,
                  page: 1,
                })
              }
              className={`flex items-center justify-between h-8 px-2 text-left ${
                isActive
                  ? "bg-duckie-primary border-2 border-duckie-black"
                  : "hover:bg-duckie-bg"
              }`}
            >
              <span
                className={`text-xs text-duckie-dark ${
                  isActive ? "font-bold" : "font-medium"
                }`}
              >
                <img src={cat.emoji} alt={cat.name} width={14} height={14} className="inline-block mr-1.5 align-middle" />
                {cat.name}
              </span>
              <span
                className={`font-mono text-[11px] ${
                  isActive
                    ? "font-extrabold text-duckie-black"
                    : "font-normal text-duckie-brown"
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="w-full h-0 border-t-2 border-duckie-black" />

      {/* Proposed By */}
      <span className="font-mono text-[11px] font-extrabold tracking-[1.5px] text-duckie-brown">
        NGƯỜI ĐỀ XUẤT
      </span>
      <div className="flex gap-1.5 w-full">
        {([null, "anh", "em"] as const).map((value) => {
          const isActive = filters.proposedBy === value;
          const label =
            value === null ? "Tất cả" : value === "anh" ? "chún" : "em bé";
          return (
            <Button
              key={label}
              variant={isActive ? "default" : "secondary"}
              size="sm"
              className="text-[11px]"
              onClick={() =>
                onFilterChange({
                  proposedBy: value as LocationOwner | null,
                  page: 1,
                })
              }
            >
              {label}
            </Button>
          );
        })}
      </div>

      {/* Divider */}
      <div className="w-full h-0 border-t-2 border-duckie-black" />

      {/* Status */}
      <span className="font-mono text-[11px] font-extrabold tracking-[1.5px] text-duckie-brown">
        ĐÃ ĐI CHƯA
      </span>
      <div className="flex gap-1.5 w-full">
        {([null, "want_to_go", "visited"] as const).map((value) => {
          const isActive = filters.status === value;
          const label =
            value === null
              ? "Tất cả"
              : value === "want_to_go"
                ? "Chưa đi"
                : "Đã đi";
          return (
            <Button
              key={label}
              variant={isActive ? "default" : "secondary"}
              size="sm"
              className="text-[11px]"
              onClick={() =>
                onFilterChange({
                  status: value as LocationStatus | null,
                  page: 1,
                })
              }
            >
              {label}
            </Button>
          );
        })}
      </div>
    </aside>
  );
}
