import { config } from "./config";
import { mockWishes, mockCategories, mockStats } from "./mock-data";
import { mockLocations, mockLocationCategories, mockLocationStats } from "./mock-locations";
import type { WishFilters, WishListResponse, LocationFilters, LocationListResponse } from "./types";

async function delay(ms = 300) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWishesMock(
  filters: WishFilters
): Promise<WishListResponse> {
  await delay();

  let filtered = [...mockWishes];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter((w) => w.name.toLowerCase().includes(q));
  }

  if (filters.category && filters.category !== "All Wishes") {
    filtered = filtered.filter((w) => w.category === filters.category);
  }

  if (filters.owner) {
    filtered = filtered.filter((w) => w.owner === filters.owner);
  }

  if (filters.status) {
    filtered = filtered.filter((w) => w.status === filters.status);
  }

  const total = filters.category ? filtered.length : mockStats.total;
  const start = (filters.page - 1) * filters.perPage;
  const paged = filtered.slice(start, start + filters.perPage);

  return {
    wishes: paged,
    total,
    page: filters.page,
    perPage: filters.perPage,
    stats: mockStats,
    categories: mockCategories,
  };
}

async function fetchWishesReal(
  filters: WishFilters
): Promise<WishListResponse> {
  const params = new URLSearchParams();
  params.set("page", String(filters.page));
  params.set("perPage", String(filters.perPage));
  if (filters.search) params.set("search", filters.search);
  if (filters.category) params.set("category", filters.category);
  if (filters.owner) params.set("owner", filters.owner);
  if (filters.status) params.set("status", filters.status);

  const res = await fetch(`${config.apiBaseUrl}/wishes?${params}`);
  if (!res.ok) throw new Error("Failed to fetch wishes");
  return res.json();
}

export async function fetchWishes(
  filters: WishFilters
): Promise<WishListResponse> {
  if (config.useMock) {
    return fetchWishesMock(filters);
  }
  return fetchWishesReal(filters);
}

async function fetchLocationsMock(
  filters: LocationFilters
): Promise<LocationListResponse> {
  await delay();

  let filtered = [...mockLocations];

  if (filters.search) {
    const q = filters.search.toLowerCase();
    filtered = filtered.filter((l) => l.name.toLowerCase().includes(q));
  }

  if (filters.type && filters.type !== "Tất cả") {
    filtered = filtered.filter((l) => l.type === filters.type);
  }

  if (filters.proposedBy) {
    filtered = filtered.filter((l) => l.proposedBy === filters.proposedBy);
  }

  if (filters.status) {
    filtered = filtered.filter((l) => l.status === filters.status);
  }

  const total = filters.type ? filtered.length : mockLocationStats.total;
  const start = (filters.page - 1) * filters.perPage;
  const paged = filtered.slice(start, start + filters.perPage);

  return {
    locations: paged,
    total,
    page: filters.page,
    perPage: filters.perPage,
    stats: mockLocationStats,
    categories: mockLocationCategories,
  };
}

export async function fetchLocations(
  filters: LocationFilters
): Promise<LocationListResponse> {
  return fetchLocationsMock(filters);
}
