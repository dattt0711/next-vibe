"use client";

import { useState } from "react";
import {
  LayoutGrid,
  List,
  ArrowUpDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Plus,
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
import AddLocationModal from "@/components/AddLocationModal";
import type { Location, LocationFilters, Wish } from "@/lib/types";

interface LocationContentProps {
  locations: Location[];
  total: number;
  filters: LocationFilters;
  onFilterChange: (filters: Partial<LocationFilters>) => void;
  isLoading: boolean;
}

export default function LocationContent({
  locations,
  total,
  filters,
  onFilterChange,
  isLoading,
}: LocationContentProps) {
  const [celebrateLocation, setCelebrateLocation] = useState<Location | null>(
    null
  );
  const [showAddModal, setShowAddModal] = useState(false);
  const totalPages = Math.ceil(total / filters.perPage);

  // Convert location to wish-like shape for celebration modal
  const celebrateWish: Wish | null = celebrateLocation
    ? {
        id: celebrateLocation.id,
        name: celebrateLocation.name,
        category: celebrateLocation.type,
        categoryEmoji: celebrateLocation.typeEmoji,
        owner: celebrateLocation.proposedBy === "anh" ? "chún" : "em bé",
        status: "done",
        date: celebrateLocation.date,
      }
    : null;

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
            Địa Điểm
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
          {/* Filter */}
          <Button variant="outline" size="default" className="gap-1.5">
            <MapPin size={14} />
            <span className="text-xs font-semibold">Tỉ. Sắp xếp</span>
          </Button>
          {/* Add */}
          <Button
            variant="default"
            size="default"
            className="gap-1.5"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={14} />
            <span className="text-xs font-extrabold">Thêm địa điểm</span>
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
            <TableHead className="w-75">ĐỊA ĐIỂM</TableHead>
            <TableHead className="w-35">LOẠI</TableHead>
            <TableHead className="w-28">ĐỀ XUẤT</TableHead>
            <TableHead className="w-30">TRẠNG THÁI</TableHead>
            <TableHead>NGÀY THÊM</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.map((loc) => (
            <TableRow key={loc.id}>
              <TableCell>
                <Checkbox
                  checked={loc.status === "visited"}
                  onCheckedChange={() => setCelebrateLocation(loc)}
                />
              </TableCell>
              <TableCell
                className={`font-semibold ${
                  loc.status === "visited"
                    ? "text-duckie-brown"
                    : "text-duckie-dark"
                }`}
              >
                {loc.name}
              </TableCell>
              <TableCell className="text-xs text-duckie-brown">
                {loc.typeEmoji} {loc.type}
              </TableCell>
              <TableCell className="text-xs text-duckie-dark">
                <span className="inline-flex items-center gap-1.5">
                  <img src={loc.proposedBy === "anh" ? "/icons/emoji/duck.png" : "/icons/emoji/boo.png"} alt="" width={16} height={16} className="inline-block" />
                  {loc.proposedBy === "anh" ? "chún" : "em bé"}
                </span>
              </TableCell>
              <TableCell>
                <Badge
                  variant={
                    loc.status === "want_to_go" ? "pending" : "done"
                  }
                >
                  {loc.status === "want_to_go" ? "Muốn đi" : "Đã đi ✓"}
                </Badge>
              </TableCell>
              <TableCell className="text-xs text-duckie-brown">
                {loc.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-between w-full">
        <span className="text-xs text-duckie-brown font-mono font-semibold">
          Trang {filters.page} / {totalPages} — {total} địa điểm
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
        open={celebrateLocation !== null}
        onClose={() => setCelebrateLocation(null)}
      />
      <AddLocationModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
    </div>
  );
}
