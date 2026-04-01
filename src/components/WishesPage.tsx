"use client";

import { useState } from "react";
import { useWishes } from "@/hooks/use-wishes";
import { useLocations } from "@/hooks/use-locations";
import { useIsMobile } from "@/hooks/use-mobile";
import Header, { type ActiveTab } from "@/components/Header";
import MobileHeader from "@/components/MobileHeader";
import MobileBottomNav from "@/components/MobileBottomNav";
import Sidebar from "@/components/Sidebar";
import LocationSidebar from "@/components/LocationSidebar";
import MainContent from "@/components/MainContent";
import LocationContent from "@/components/LocationContent";
import MobileWishContent from "@/components/MobileWishContent";
import MobileLocationContent from "@/components/MobileLocationContent";
import BadgesContent from "@/components/BadgesContent";
import { mockBadges, mockBadgeStats } from "@/lib/mock-badges";
import type { WishFilters, LocationFilters } from "@/lib/types";

const defaultWishFilters: WishFilters = {
  search: "",
  category: null,
  owner: null,
  status: null,
  page: 1,
  perPage: 15,
};

const defaultLocationFilters: LocationFilters = {
  search: "",
  type: null,
  proposedBy: null,
  status: null,
  page: 1,
  perPage: 10,
};

export default function WishesPage() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("wishes");
  const [wishFilters, setWishFilters] =
    useState<WishFilters>(defaultWishFilters);
  const [locationFilters, setLocationFilters] = useState<LocationFilters>(
    defaultLocationFilters
  );
  const isMobile = useIsMobile();

  const { data: wishData, isLoading: wishLoading } = useWishes(wishFilters);
  const { data: locData, isLoading: locLoading } =
    useLocations(locationFilters);

  function handleWishFilterChange(partial: Partial<WishFilters>) {
    setWishFilters((prev) => ({ ...prev, ...partial }));
  }

  function handleLocationFilterChange(partial: Partial<LocationFilters>) {
    setLocationFilters((prev) => ({ ...prev, ...partial }));
  }

  const wishStats = wishData?.stats ?? { total: 0, done: 0, pending: 0 };
  const wishCategories = wishData?.categories ?? [];
  const wishes = wishData?.wishes ?? [];
  const wishTotal = wishData?.total ?? 0;

  const locStats = locData?.stats ?? { total: 0, visited: 0, wantToGo: 0 };
  const locCategories = locData?.categories ?? [];
  const locations = locData?.locations ?? [];
  const locTotal = locData?.total ?? 0;

  if (isMobile) {
    return (
      <div className="flex flex-col h-full bg-duckie-bg">
        <MobileHeader />
        <div className="flex flex-1 min-h-0">
          {activeTab === "wishes" && (
            <MobileWishContent
              wishes={wishes}
              total={wishTotal}
              stats={wishStats}
              categories={wishCategories}
              filters={wishFilters}
              onFilterChange={handleWishFilterChange}
              isLoading={wishLoading}
            />
          )}
          {activeTab === "locations" && (
            <MobileLocationContent
              locations={locations}
              total={locTotal}
              stats={locStats}
              categories={locCategories}
              filters={locationFilters}
              onFilterChange={handleLocationFilterChange}
              isLoading={locLoading}
            />
          )}
          {activeTab === "badges" && (
            <BadgesContent
              badges={mockBadges}
              stats={mockBadgeStats}
              onBack={() => setActiveTab("wishes")}
            />
          )}
        </div>
        <MobileBottomNav activeTab={activeTab} onTabChange={setActiveTab} />
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-duckie-bg">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="flex flex-1 min-h-0">
        {activeTab === "wishes" && (
          <>
            <Sidebar
              stats={wishStats}
              categories={wishCategories}
              filters={wishFilters}
              onFilterChange={handleWishFilterChange}
            />
            <MainContent
              wishes={wishes}
              total={wishTotal}
              filters={wishFilters}
              onFilterChange={handleWishFilterChange}
              isLoading={wishLoading}
            />
          </>
        )}
        {activeTab === "locations" && (
          <>
            <LocationSidebar
              stats={locStats}
              categories={locCategories}
              filters={locationFilters}
              onFilterChange={handleLocationFilterChange}
            />
            <LocationContent
              locations={locations}
              total={locTotal}
              filters={locationFilters}
              onFilterChange={handleLocationFilterChange}
              isLoading={locLoading}
            />
          </>
        )}
        {activeTab === "badges" && (
          <BadgesContent
            badges={mockBadges}
            stats={mockBadgeStats}
            onBack={() => setActiveTab("wishes")}
          />
        )}
      </div>
    </div>
  );
}
