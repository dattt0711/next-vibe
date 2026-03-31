"use client";

import { useState } from "react";
import {
  LayoutGrid,
  List,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
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
import CelebrationModal from "@/components/CelebrationModal";
import type { Wish, WishFilters } from "@/lib/types";

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
            <button className="flex items-center px-3 py-2 bg-duckie-white">
              <LayoutGrid size={16} className="text-duckie-brown" />
            </button>
            <button className="flex items-center px-3 py-2 bg-duckie-primary border-l-3 border-duckie-black">
              <List size={16} className="text-duckie-dark" />
            </button>
          </div>
          {/* Sort */}
          <Button variant="outline" size="default" className="gap-1.5">
            <ArrowUpDown size={14} />
            <span className="text-xs font-semibold">Sort</span>
          </Button>
        </div>
      </div>

      {/* Table */}
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
            <TableRow key={wish.id}>
              <TableCell>
                <Checkbox
                  checked={wish.status === "done"}
                  onCheckedChange={() => setCelebrateWish(wish)}
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
                {wish.categoryEmoji} {wish.category}
              </TableCell>
              <TableCell className="text-xs text-duckie-dark">
                {wish.owner === "me" ? "🐥 Me" : "🦆 Boo"}
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

      {/* Pagination */}
      <div className="flex items-center justify-between w-full">
        <span className="text-xs text-duckie-brown">
          Showing {(filters.page - 1) * filters.perPage + 1}-
          {Math.min(filters.page * filters.perPage, total)} of {total} wishes
        </span>
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
    </div>
  );
}
