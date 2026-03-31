"use client";

import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { Category, WishStats, WishFilters, WishOwner, WishStatus } from "@/lib/types";

interface SidebarProps {
  stats: WishStats;
  categories: Category[];
  filters: WishFilters;
  onFilterChange: (filters: Partial<WishFilters>) => void;
}

export default function Sidebar({
  stats,
  categories,
  filters,
  onFilterChange,
}: SidebarProps) {
  const activeCategory = filters.category || "All Wishes";

  return (
    <aside className="flex flex-col gap-4 w-65 shrink-0 p-5 bg-duckie-white border-r-3 border-duckie-black font-geist overflow-y-auto">
      {/* Search */}
      <div className="relative">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-duckie-black pointer-events-none"
        />
        <Input
          placeholder="Search wishes..."
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
            Total
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-0.5 h-14 p-2 bg-duckie-white border-3 border-duckie-black">
          <span className="font-mono text-lg font-black text-duckie-black">
            {stats.done}
          </span>
          <span className="text-[10px] font-semibold text-duckie-black">
            Done
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-0.5 h-14 p-2 bg-duckie-white border-3 border-duckie-black">
          <span className="font-mono text-lg font-black text-duckie-black">
            {stats.pending}
          </span>
          <span className="text-[10px] font-semibold text-duckie-black">
            Pending
          </span>
        </div>
      </div>

      {/* Categories */}
      <span className="font-mono text-[11px] font-extrabold tracking-[1.5px] text-duckie-black">
        CATEGORIES
      </span>
      <div className="flex flex-col gap-0.5 w-full">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.name;
          return (
            <button
              key={cat.name}
              onClick={() =>
                onFilterChange({
                  category: cat.name === "All Wishes" ? null : cat.name,
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
                className={`text-xs text-duckie-black ${
                  isActive ? "font-bold" : "font-medium"
                }`}
              >
                {cat.emoji} {cat.name}
              </span>
              <span
                className={`font-mono text-[11px] text-duckie-black ${
                  isActive ? "font-extrabold" : "font-normal"
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

      {/* Owner */}
      <span className="font-mono text-[11px] font-extrabold tracking-[1.5px] text-duckie-black">
        OWNER
      </span>
      <div className="flex gap-1.5 w-full">
        {([null, "me", "boo"] as const).map((value) => {
          const isActive = filters.owner === value;
          const label =
            value === null ? "All" : value === "me" ? "🐥 Me" : "🦆 Boo";
          return (
            <Button
              key={label}
              variant={isActive ? "default" : "secondary"}
              size="sm"
              className="text-[11px]"
              onClick={() =>
                onFilterChange({ owner: value as WishOwner | null, page: 1 })
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
      <span className="font-mono text-[11px] font-extrabold tracking-[1.5px] text-duckie-black">
        STATUS
      </span>
      <div className="flex gap-1.5 w-full">
        {([null, "pending", "done"] as const).map((value) => {
          const isActive = filters.status === value;
          const label =
            value === null
              ? "All"
              : value === "pending"
                ? "Pending"
                : "Done";
          return (
            <Button
              key={label}
              variant={isActive ? "default" : "secondary"}
              size="sm"
              className="text-[11px]"
              onClick={() =>
                onFilterChange({ status: value as WishStatus | null, page: 1 })
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
