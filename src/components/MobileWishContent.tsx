"use client";

import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import CelebrationModal from "@/components/CelebrationModal";
import AddWishModal from "@/components/AddWishModal";
import type { Wish, WishFilters, WishStats, Category } from "@/lib/types";

interface MobileWishContentProps {
  wishes: Wish[];
  total: number;
  stats: WishStats;
  categories: Category[];
  filters: WishFilters;
  onFilterChange: (filters: Partial<WishFilters>) => void;
  isLoading: boolean;
}

export default function MobileWishContent({
  wishes,
  total,
  stats,
  categories,
  filters,
  onFilterChange,
  isLoading,
}: MobileWishContentProps) {
  const [celebrateWish, setCelebrateWish] = useState<Wish | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const ownerFilters = [
    { value: null, label: "Tất cả" },
    { value: "chún" as const, label: "chún" },
    { value: "em bé" as const, label: "em bé" },
  ];

  const grouped = {
    chún: wishes.filter((w) => w.owner === "chún" && w.status === "pending"),
    "em bé": wishes.filter(
      (w) => w.owner === "em bé" && w.status === "pending"
    ),
    done: wishes.filter((w) => w.status === "done"),
  };

  return (
    <div
      className={`flex-1 flex flex-col gap-5 p-4 pb-28 overflow-auto ${isLoading ? "opacity-50" : ""}`}
    >
      {/* Couple pill */}
      <div className="flex items-center justify-center py-1.5 px-4 bg-duckie-white border-3 border-duckie-black self-start">
        <span className="text-[13px] font-[800] text-duckie-black font-geist">
          <img
            src="/icons/emoji/duck.png"
            alt=""
            width={14}
            height={14}
            className="inline-block mr-1"
          />
          chún ❤️ em bé{" "}
          <img
            src="/icons/emoji/boo.png"
            alt=""
            width={14}
            height={14}
            className="inline-block ml-1"
          />
        </span>
      </div>

      {/* Stats Row */}
      <div className="flex gap-2 w-full">
        <div className="flex-1 flex flex-col items-center gap-1 p-2.5 bg-duckie-white border-3 border-duckie-black shadow-[4px_4px_0_var(--duckie-black)]">
          <span className="text-base">📋</span>
          <span className="font-mono text-[22px] font-bold text-duckie-dark">
            {stats.total}
          </span>
          <span className="font-mono text-[8px] font-bold tracking-[0.5px] text-duckie-brown">
            TỔNG WISH
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-1 p-2.5 bg-duckie-white border-3 border-duckie-black shadow-[4px_4px_0_var(--duckie-black)]">
          <span className="text-base">✅</span>
          <span className="font-mono text-[22px] font-bold text-duckie-dark">
            {stats.done}
          </span>
          <span className="font-mono text-[8px] font-bold tracking-[0.5px] text-duckie-brown">
            HOÀN THÀNH
          </span>
        </div>
        <div className="flex-1 flex flex-col items-center gap-1 p-2.5 bg-duckie-primary border-3 border-duckie-black shadow-[4px_4px_0_var(--duckie-black)]">
          <span className="text-base">⭐</span>
          <span className="font-mono text-[22px] font-bold text-duckie-dark">
            {stats.pending}
          </span>
          <span className="font-mono text-[8px] font-bold tracking-[0.5px] text-duckie-brown">
            CÒN LẠI
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="flex flex-col gap-1.5 w-full">
        <div className="flex justify-between">
          <span className="text-xs font-bold text-duckie-dark font-geist">
            Đang thực hiện ước mơ
          </span>
          <span className="text-xs font-[800] text-duckie-dark font-geist">
            {stats.total > 0
              ? Math.round((stats.done / stats.total) * 100)
              : 0}
            %
          </span>
        </div>
        <div className="w-full h-5 bg-duckie-white border-3 border-duckie-black">
          <div
            className="h-full bg-duckie-primary"
            style={{
              width: `${stats.total > 0 ? (stats.done / stats.total) * 100 : 0}%`,
            }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-2.5">
        {/* Owner Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="font-mono text-[9px] font-[800] tracking-[2px] text-duckie-black shrink-0">
            LỌC
          </span>
          {ownerFilters.map((f) => {
            const isActive = filters.owner === f.value;
            return (
              <button
                key={f.label}
                className={`shrink-0 flex items-center gap-1 px-2.5 py-1.5 border-3 border-duckie-black text-[11px] font-bold font-geist cursor-pointer ${
                  isActive
                    ? "bg-duckie-black text-white"
                    : "bg-duckie-white text-duckie-black"
                }`}
                onClick={() =>
                  onFilterChange({
                    owner: f.value as typeof filters.owner,
                    page: 1,
                  })
                }
              >
                {f.value === "chún" && (
                  <img
                    src="/icons/emoji/duck.png"
                    alt=""
                    width={14}
                    height={14}
                  />
                )}
                {f.value === "em bé" && (
                  <img
                    src="/icons/emoji/boo.png"
                    alt=""
                    width={14}
                    height={14}
                  />
                )}
                {f.label}
              </button>
            );
          })}
        </div>
        {/* Category Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto">
          {categories.map((cat) => {
            const isActive =
              (cat.name === "All Wishes" && !filters.category) ||
              filters.category === cat.name;
            return (
              <button
                key={cat.name}
                className={`shrink-0 flex items-center gap-1 px-2.5 py-1 border-3 text-[10px] font-bold font-geist cursor-pointer ${
                  isActive
                    ? "bg-duckie-primary border-duckie-black"
                    : "bg-duckie-white border-duckie-black/20"
                }`}
                onClick={() =>
                  onFilterChange({
                    category:
                      cat.name === "All Wishes" ? null : cat.name,
                    page: 1,
                  })
                }
              >
                <img src={cat.emoji} alt="" width={14} height={14} />
                {isActive && cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Wish Lists - grouped by owner */}
      <div className="flex flex-col gap-4">
        {/* chún section */}
        {grouped.chún.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#DBEAFE] border-3 border-duckie-black w-full">
              <img
                src="/icons/emoji/duck.png"
                alt=""
                width={14}
                height={14}
              />
              <span className="text-sm font-[900] text-duckie-black font-geist">
                chún thích
              </span>
              <div className="flex items-center justify-center px-2 py-0.5 bg-[#DBEAFE] border-2 border-duckie-black">
                <span className="font-mono text-[10px] font-[900] text-duckie-black">
                  {grouped.chún.length}
                </span>
              </div>
            </div>
            {grouped.chún.map((wish) => (
              <WishCard
                key={wish.id}
                wish={wish}
                onCheck={() => setCelebrateWish(wish)}
              />
            ))}
          </div>
        )}

        {/* em bé section */}
        {grouped["em bé"].length > 0 && (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 px-3.5 py-2.5 bg-[#FFE4E6] border-3 border-duckie-black w-full">
              <img
                src="/icons/emoji/boo.png"
                alt=""
                width={14}
                height={14}
              />
              <span className="text-sm font-[900] text-duckie-black font-geist">
                em bé thích
              </span>
              <div className="flex items-center justify-center px-2 py-0.5 bg-[#FFE4E6] border-2 border-duckie-black">
                <span className="font-mono text-[10px] font-[900] text-duckie-black">
                  {grouped["em bé"].length}
                </span>
              </div>
            </div>
            {grouped["em bé"].map((wish) => (
              <WishCard
                key={wish.id}
                wish={wish}
                onCheck={() => setCelebrateWish(wish)}
              />
            ))}
          </div>
        )}

        {/* Done section */}
        {grouped.done.length > 0 && (
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2 px-3.5 py-2.5 bg-duckie-primary border-3 border-duckie-black w-full">
              <span className="text-sm font-[900] text-duckie-black font-geist">
                ✨ Đã hoàn thành
              </span>
              <div className="flex items-center justify-center px-2 py-0.5 bg-duckie-primary border-2 border-duckie-black">
                <span className="font-mono text-[10px] font-[900] text-duckie-black">
                  {grouped.done.length}
                </span>
              </div>
            </div>
            {grouped.done.map((wish) => (
              <WishCard
                key={wish.id}
                wish={wish}
                done
                onCheck={() => setCelebrateWish(wish)}
              />
            ))}
          </div>
        )}
      </div>

      {/* FAB */}
      <button
        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-40 flex items-center gap-2 px-5 py-3 bg-duckie-primary border-3 border-duckie-black shadow-[5px_5px_0_var(--duckie-black)] cursor-pointer md:hidden"
        onClick={() => setShowAddModal(true)}
      >
        <CirclePlus size={16} className="text-duckie-black" />
        <span className="text-[13px] font-[900] text-duckie-black font-geist">
          Thêm điều ước
        </span>
      </button>

      <CelebrationModal
        wish={celebrateWish}
        open={celebrateWish !== null}
        onClose={() => setCelebrateWish(null)}
      />
      <AddWishModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
}

function WishCard({
  wish,
  done,
  onCheck,
}: {
  wish: Wish;
  done?: boolean;
  onCheck: () => void;
}) {
  return (
    <div
      className={`flex gap-2.5 p-3 px-3.5 border-3 border-duckie-black shadow-[4px_4px_0_var(--duckie-black)] ${
        done ? "bg-duckie-primary opacity-70" : "bg-duckie-white"
      }`}
    >
      <Checkbox
        checked={wish.status === "done"}
        onCheckedChange={onCheck}
        className="mt-0.5"
      />
      <div className="flex flex-col gap-1 flex-1">
        <div className="flex items-center gap-1.5">
          <span className="px-2 py-0.5 border-2 border-duckie-black text-[9px] font-mono font-[900] tracking-[0.5px] bg-duckie-bg">
            <img
              src={wish.categoryEmoji}
              alt=""
              width={10}
              height={10}
              className="inline-block mr-1"
            />
            {wish.category}
          </span>
        </div>
        <span
          className={`text-sm font-[800] font-geist ${done ? "line-through text-duckie-brown" : "text-duckie-black"}`}
        >
          {wish.name}
        </span>
      </div>
    </div>
  );
}
