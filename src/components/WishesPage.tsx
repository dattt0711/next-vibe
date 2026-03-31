"use client";

import { useState } from "react";
import { useWishes } from "@/hooks/use-wishes";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import MainContent from "@/components/MainContent";
import type { WishFilters } from "@/lib/types";

const defaultFilters: WishFilters = {
  search: "",
  category: null,
  owner: null,
  status: null,
  page: 1,
  perPage: 15,
};

export default function WishesPage() {
  const [filters, setFilters] = useState<WishFilters>(defaultFilters);
  const { data, isLoading } = useWishes(filters);

  function handleFilterChange(partial: Partial<WishFilters>) {
    setFilters((prev) => ({ ...prev, ...partial }));
  }

  const stats = data?.stats ?? { total: 0, done: 0, pending: 0 };
  const categories = data?.categories ?? [];
  const wishes = data?.wishes ?? [];
  const total = data?.total ?? 0;

  return (
    <div className="flex flex-col h-full bg-duckie-bg">
      <Header />
      <div className="flex flex-1 min-h-0">
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
          isLoading={isLoading}
        />
      </div>
    </div>
  );
}
