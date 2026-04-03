"use client";

import { useState } from "react";
import { useLocations } from "@/hooks/use-locations";
import LocationSidebar from "@/components/locations/LocationSidebar";
import LocationContent from "@/components/locations/LocationContent";
import MobileLocationContent from "@/components/locations/MobileLocationContent";
import { mockLocations, mockLocationCategories, mockLocationStats } from "@/lib/mock-locations";
import type { LocationFilters } from "@/lib/types";

const defaultLocationFilters: LocationFilters = {
  search: "",
  type: null,
  proposedBy: null,
  status: null,
  page: 1,
  perPage: 30,
};

export default function LocationsPage() {
  const [filters, setFilters] = useState<LocationFilters>(defaultLocationFilters);
  const { data, isFetching, isLoading } = useLocations(filters);

  function handleFilterChange(partial: Partial<LocationFilters>) {
    setFilters((prev) => ({ ...prev, ...partial }));
  }

  const stats = data?.stats ?? mockLocationStats;
  const categories = data?.categories ?? mockLocationCategories;
  const locations = data?.locations ?? (isLoading ? [] : mockLocations.slice(0, defaultLocationFilters.perPage));
  const total = data?.total ?? (isLoading ? 0 : mockLocationStats.total);

  return (
    <>
      {/* Mobile */}
      <div className="flex-1 flex flex-col min-h-0 md:hidden">
        <MobileLocationContent
          locations={locations}
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
        <LocationSidebar
          stats={stats}
          categories={categories}
          filters={filters}
          onFilterChange={handleFilterChange}
        />
        <LocationContent
          locations={locations}
          total={total}
          filters={filters}
          onFilterChange={handleFilterChange}
          isLoading={isFetching}
        />
      </div>
    </>
  );
}
