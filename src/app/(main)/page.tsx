"use client";

import { useState } from "react";
import { useWishes } from "@/hooks/use-wishes";
import Sidebar from "@/components/wishes/Sidebar";
import MainContent from "@/components/wishes/MainContent";
import MobileWishContent from "@/components/wishes/MobileWishContent";
import { mockWishes, mockCategories, mockStats } from "@/lib/mock-data";
import type { WishFilters } from "@/lib/types";

const defaultWishFilters: WishFilters = {
  search: "",
  category: null,
  owner: null,
  status: null,
  page: 1,
  perPage: 30,
};

export default function WishesPage() {
  const [filters, setFilters] = useState<WishFilters>(defaultWishFilters);
  const { data, isFetching, isLoading } = useWishes(filters);

  function handleFilterChange(partial: Partial<WishFilters>) {
    setFilters((prev) => ({ ...prev, ...partial }));
  }

  const stats = data?.stats ?? mockStats;
  const categories = data?.categories ?? mockCategories;
  const wishes = data?.wishes ?? (isLoading ? [] : mockWishes.slice(0, defaultWishFilters.perPage));
  const total = data?.total ?? (isLoading ? 0 : mockStats.total);

  return (
    <>
      {/* Mobile */}
      <div className="flex-1 flex flex-col min-h-0 md:hidden">
        <MobileWishContent
          wishes={wishes}
          total={total}
          stats={stats}
          categories={categories}
          filters={filters}
          onFilterChange={handleFilterChange}
          isLoading={isFetching}
        />
      </div>
      {/* Desktop */}
      <div className="hidden md:contents">
        <Sidebar
          stats={stats}
          categories={categories}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        <MainContent
          wishes={wishes}
          total={total}
          filters={filters}
          onFilterChange={handleFilterChange}
          isLoading={isFetching}
        />
      </div>
    </>
  );
}
