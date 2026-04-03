"use client";

import { useState } from "react";
import {
  LayoutGrid,
  List,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import CelebrationModal from "@/components/shared/CelebrationModal";
import AddWishModal from "@/components/wishes/AddWishModal";
import WishDetailModal from "@/components/wishes/WishDetailModal";
import type { Wish, WishFilters } from "@/lib/types";
import { useCompleteWish } from "@/hooks/use-wishes";

interface MainContentProps {
  wishes: Wish[];
  total: number;
  filters: WishFilters;
  onFilterChange: (filters: Partial<WishFilters>) => void;
  isLoading: boolean;
}

export default function MainContent({
  wishes,
  total,
  filters,
  onFilterChange,
  isLoading,
}: MainContentProps) {
  const [celebrateWish, setCelebrateWish] = useState<Wish | null>(null);
  const { mutate: completeWish, isPending: isCompleting } = useCompleteWish();

  function handleComplete(wish: Wish) {
    if (wish.status === "done") return;
    completeWish(Number(wish.id), {
      onSuccess: () => setCelebrateWish(wish),
    });
  }
  const [detailWish, setDetailWish] = useState<Wish | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [view, setView] = useState<"grid" | "list">("list");
  const totalPages = Math.ceil(total / filters.perPage);

  function renderPageButtons() {
    const pages: (number | "...")[] = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1, 2, 3, "...", totalPages);
    }
    return pages.map((p, i) =>
      p === "..." ? (
        <span
          key={`dots-${i}`}
          className="font-mono text-[13px] font-semibold text-duckie-brown"
        >
          ...
        </span>
      ) : (
        <Button
          key={p}
          variant={p === filters.page ? "default" : "outline"}
          className="w-9 h-9 p-0 font-mono text-[13px]"
          onClick={() => onFilterChange({ page: p as number })}
        >
          {p}
        </Button>
      )
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-5 p-6 px-8 bg-duckie-bg font-geist overflow-auto">
      {/* Toolbar */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xl font-black text-duckie-dark">
            All Wishes
          </span>
          <Badge variant="default" className="text-xs font-extrabold">
            {total}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          {/* View Toggle */}
          <div className="flex border-3 border-duckie-black">
            <button
              className={`flex items-center px-3 py-2 cursor-pointer ${view === "grid" ? "bg-duckie-primary" : "bg-duckie-white"}`}
              onClick={() => setView("grid")}
            >
              <LayoutGrid size={16} className={view === "grid" ? "text-duckie-dark" : "text-duckie-brown"} />
            </button>
            <button
              className={`flex items-center px-3 py-2 border-l-3 border-duckie-black cursor-pointer ${view === "list" ? "bg-duckie-primary" : "bg-duckie-white"}`}
              onClick={() => setView("list")}
            >
              <List size={16} className={view === "list" ? "text-duckie-dark" : "text-duckie-brown"} />
            </button>
          </div>
          {/* Sort */}
          {/* <Button variant="outline" size="default" className="gap-1.5">
            <ArrowUpDown size={14} />
            <span className="text-xs font-semibold">Sort</span>
          </Button> */}
{/* Add wish */}
          <Button
            variant="default"
            size="default"
            className="gap-1.5"
            onClick={() => setShowAddModal(true)}
          >
            <CirclePlus size={14} />
            <span className="text-xs font-extrabold">Add new gift</span>
          </Button>
        </div>
      </div>

      {/* Content */}
      {view === "list" ? (
        <Table className={isLoading ? "opacity-50" : ""}>
          <TableHeader>
            <TableRow className="border-0 hover:bg-transparent">
              <TableHead className="w-7.5">
                <Checkbox />
              </TableHead>
              <TableHead className="w-75">WISH NAME</TableHead>
              <TableHead className="w-35">CATEGORY</TableHead>
              <TableHead className="w-25">OWNER</TableHead>
              <TableHead className="w-25">STATUS</TableHead>
              <TableHead>ADDED</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {wishes.map((wish) => (
              <TableRow key={wish.id} className="cursor-pointer" onClick={() => setDetailWish(wish)}>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={wish.status === "done"}
                    disabled={wish.status === "done" || isCompleting}
                    onCheckedChange={() => handleComplete(wish)}
                  />
                </TableCell>
                <TableCell
                  className={`font-semibold ${
                    wish.status === "done"
                      ? "text-duckie-brown"
                      : "text-duckie-dark"
                  }`}
                >
                  {wish.name}
                </TableCell>
                <TableCell className="text-xs text-duckie-brown">
                  <span className="inline-flex items-center gap-1.5">
                    <img src={wish.categoryEmoji} alt={wish.category} width={16} height={16} className="inline-block" />
                    {wish.category}
                  </span>
                </TableCell>
                <TableCell className="text-xs text-duckie-dark">
                  <span className="inline-flex items-center gap-1.5">
                    <img src={wish.owner === "chún" ? "/icons/emoji/duck.png" : "/icons/emoji/boo.png"} alt="" width={16} height={16} className="inline-block" />
                    {wish.owner === "chún" ? "chún" : "em bé"}
                  </span>
                </TableCell>
                <TableCell>
                  <Badge variant={wish.status === "pending" ? "pending" : "done"}>
                    {wish.status === "pending" ? "Pending" : "Done ✓"}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-duckie-brown">
                  {wish.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className={`grid grid-cols-2 xl:grid-cols-3 gap-4 ${isLoading ? "opacity-50" : ""}`}>
          {wishes.map((wish) => {
            const isDone = wish.status === "done";
            return (
              <div
                key={wish.id}
                className={`flex flex-col gap-3 p-4 border-3 border-duckie-black shadow-[4px_4px_0_var(--duckie-black)] cursor-pointer ${
                  isDone ? "bg-duckie-primary opacity-70" : "bg-duckie-white"
                }`}
                onClick={() => setDetailWish(wish)}
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border-2 border-duckie-black text-[9px] font-mono font-[900] tracking-[0.5px] bg-duckie-bg">
                    <img src={wish.categoryEmoji} alt="" width={12} height={12} className="inline-block" />
                    {wish.category}
                  </span>
                  <span onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={isDone}
                      disabled={isDone || isCompleting}
                      onCheckedChange={() => handleComplete(wish)}
                    />
                  </span>
                </div>
                <span className={`text-sm font-[800] font-geist ${isDone ? "line-through text-duckie-brown" : "text-duckie-dark"}`}>
                  {wish.name}
                </span>
                <div className="flex items-center justify-between mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-xs text-duckie-dark">
                    <img src={wish.owner === "chún" ? "/icons/emoji/duck.png" : "/icons/emoji/boo.png"} alt="" width={14} height={14} className="inline-block" />
                    {wish.owner}
                  </span>
                  <Badge variant={isDone ? "done" : "pending"}>
                    {isDone ? "Done ✓" : "Pending"}
                  </Badge>
                </div>
                <span className="text-[10px] text-duckie-brown">{wish.date}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <span className="text-xs text-duckie-brown">
            Showing {(filters.page - 1) * filters.perPage + 1}-
            {Math.min(filters.page * filters.perPage, total)} of {total} wishes
          </span>
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-mono font-semibold text-duckie-brown">Show</span>
            <div className="flex border-2 border-duckie-black">
              {[10, 30, 50].map((n) => (
                <button
                  key={n}
                  className={`px-2 py-0.5 text-[11px] font-mono font-bold cursor-pointer ${
                    filters.perPage === n
                      ? "bg-duckie-primary text-duckie-dark"
                      : "bg-duckie-white text-duckie-brown"
                  } ${n !== 10 ? "border-l-2 border-duckie-black" : ""}`}
                  onClick={() => onFilterChange({ perPage: n, page: 1 })}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="outline"
            size="default"
            className="gap-1"
            disabled={filters.page <= 1}
            onClick={() => onFilterChange({ page: filters.page - 1 })}
          >
            <ChevronLeft size={14} className="text-duckie-brown" />
            <span className="text-xs font-semibold text-duckie-brown">
              Prev
            </span>
          </Button>
          {renderPageButtons()}
          <Button
            variant="outline"
            size="default"
            className="gap-1 shadow-[3px_3px_0_var(--duckie-black)]"
            disabled={filters.page >= totalPages}
            onClick={() => onFilterChange({ page: filters.page + 1 })}
          >
            <span className="text-xs font-bold text-duckie-dark">Next</span>
            <ChevronRight size={14} className="text-duckie-dark" />
          </Button>
        </div>
      </div>
<CelebrationModal
        wish={celebrateWish}
        open={celebrateWish !== null}
        onClose={() => setCelebrateWish(null)}
      />
      <AddWishModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
      <WishDetailModal
        wish={detailWish}
        open={detailWish !== null}
        onClose={() => setDetailWish(null)}
      />
    </div>
  );
}
