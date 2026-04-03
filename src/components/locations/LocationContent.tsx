"use client";

import { useState } from "react";
import {
  LayoutGrid,
  List,
  ChevronLeft,
  ChevronRight,
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
import CelebrationModal from "@/components/shared/CelebrationModal";
import AddLocationModal from "@/components/locations/AddLocationModal";
import LocationDetailModal from "@/components/locations/LocationDetailModal";
import { useVisitLocation } from "@/hooks/use-locations";
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
  const [celebrateLocation, setCelebrateLocation] = useState<Location | null>(null);
  const [detailLocation, setDetailLocation] = useState<Location | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [view, setView] = useState<"grid" | "list">("list");
  const { mutate: visitLocation, isPending: isVisiting } = useVisitLocation();

  const totalPages = Math.ceil(total / filters.perPage);

  function handleVisit(loc: Location) {
    if (loc.status === "visited") return;
    visitLocation(Number(loc.id), {
      onSuccess: () => setCelebrateLocation(loc),
    });
  }

  // Convert location to wish-like shape for celebration modal
  const celebrateWish: Wish | null = celebrateLocation
    ? {
        id: celebrateLocation.id,
        name: celebrateLocation.name,
        category: celebrateLocation.type,
        categoryEmoji: celebrateLocation.typeEmoji,
        owner: celebrateLocation.proposedBy === "anh" ? "chún" : "em bé",
        status: "done",
        description: null,
        imageUrl: null,
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
            Locations
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
          {/* Add */}
          <Button
            variant="default"
            size="default"
            className="gap-1.5"
            onClick={() => setShowAddModal(true)}
          >
            <Plus size={14} />
            <span className="text-xs font-extrabold">Add new location</span>
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
              <TableHead className="w-75">LOCATION</TableHead>
              <TableHead className="w-35">TYPE</TableHead>
              <TableHead className="w-28">PROPOSED BY</TableHead>
              <TableHead className="w-30">STATUS</TableHead>
              <TableHead>ADDED</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {locations.map((loc) => (
              <TableRow key={loc.id} className="cursor-pointer" onClick={() => setDetailLocation(loc)}>
                <TableCell onClick={(e) => e.stopPropagation()}>
                  <Checkbox
                    checked={loc.status === "visited"}
                    disabled={loc.status === "visited" || isVisiting}
                    onCheckedChange={() => handleVisit(loc)}
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
                  <span className="inline-flex items-center gap-1.5">
                    <img src={loc.typeEmoji} alt={loc.type} width={16} height={16} className="inline-block" />
                    {loc.type}
                  </span>
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
                    {loc.status === "want_to_go" ? "Want to go" : "Visited ✓"}
                  </Badge>
                </TableCell>
                <TableCell className="text-xs text-duckie-brown">
                  {loc.date}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className={`grid grid-cols-2 xl:grid-cols-3 gap-4 ${isLoading ? "opacity-50" : ""}`}>
          {locations.map((loc) => {
            const isVisited = loc.status === "visited";
            return (
              <div
                key={loc.id}
                className={`flex flex-col gap-3 p-4 border-3 border-duckie-black shadow-[4px_4px_0_var(--duckie-black)] cursor-pointer ${
                  isVisited ? "bg-duckie-primary opacity-70" : "bg-duckie-white"
                }`}
                onClick={() => setDetailLocation(loc)}
              >
                <div className="flex items-start justify-between">
                  <span className="inline-flex items-center gap-1.5 px-2 py-0.5 border-2 border-duckie-black text-[9px] font-mono font-black tracking-[0.5px] bg-duckie-bg">
                    <img src={loc.typeEmoji} alt="" width={12} height={12} className="inline-block" />
                    {loc.type}
                  </span>
                  <span onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      checked={isVisited}
                      disabled={isVisited || isVisiting}
                      onCheckedChange={() => handleVisit(loc)}
                    />
                  </span>
                </div>
                <span className={`text-sm font-extrabold font-geist ${isVisited ? "line-through text-duckie-brown" : "text-duckie-dark"}`}>
                  {loc.name}
                </span>
                <div className="flex items-center justify-between mt-auto">
                  <span className="inline-flex items-center gap-1.5 text-xs text-duckie-dark">
                    <img src={loc.proposedBy === "anh" ? "/icons/emoji/duck.png" : "/icons/emoji/boo.png"} alt="" width={14} height={14} className="inline-block" />
                    {loc.proposedBy === "anh" ? "chún" : "em bé"}
                  </span>
                  <Badge variant={isVisited ? "done" : "pending"}>
                    {isVisited ? "Visited ✓" : "Want to go"}
                  </Badge>
                </div>
                <span className="text-[10px] text-duckie-brown">{loc.date}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-3">
          <span className="text-xs text-duckie-brown font-mono font-semibold">
            Page {filters.page} / {totalPages} — {total} locations
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
        open={celebrateLocation !== null}
        onClose={() => setCelebrateLocation(null)}
      />
      <AddLocationModal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
      />
      <LocationDetailModal
        location={detailLocation}
        open={detailLocation !== null}
        onClose={() => setDetailLocation(null)}
      />
    </div>
  );
}
