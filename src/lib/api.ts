import { config, resolveUploadUrl } from "./config";
import { mockWishes, mockCategories, mockStats } from "./mock-data";
import { mockLocations, mockLocationCategories, mockLocationStats } from "./mock-locations";
import type { Wish, WishStatus, Category, WishFilters, WishListResponse, Location, LocationStatus, LocationCategory, LocationFilters, LocationListResponse } from "./types";

// Raw API wish shape
interface ApiWish {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  category_id: string;
  owner: string;
  status: string;
  created_at: string;
  updated_at: string;
  category_name: string;
  category_emoji: string | null;
}

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
  // Fetch categories first to resolve category name to ID
  const categoriesData = await fetchCategories("wish");

  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.owner) params.set("owner", filters.owner === "chún" ? "duckie" : "baby");
  if (filters.category) {
    const cat = categoriesData.find((c) => c.name === filters.category);
    if (cat) params.set("category_id", String(cat.id));
  }

  const wishesRes = await fetch(`${config.apiBaseUrl}/wishes?${params}`);
  if (!wishesRes.ok) throw new Error("Failed to fetch wishes");
  const wishesJson = await wishesRes.json();
  const rawWishes: ApiWish[] = wishesJson.data ?? wishesJson;

  // Map API response to frontend Wish type
  let wishes: Wish[] = rawWishes.map((w) => ({
    id: String(w.id),
    name: w.name,
    description: w.description,
    imageUrl: resolveUploadUrl(w.image_url),
    category: w.category_name,
    categoryEmoji: resolveUploadUrl(w.category_emoji) || "/icons/emoji/duck.png",
    owner: w.owner === "duckie" ? "chún" as const : "em bé" as const,
    status: (w.status === "pending" ? "pending" : "done") as WishStatus,
    date: w.created_at.split(" ")[0],
  }));

  // Client-side filtering for status (API doesn't support it)
  if (filters.status) {
    wishes = wishes.filter((w) => w.status === filters.status);
  }

  const total = wishes.length;
  const done = wishes.filter((w) => w.status === "done").length;
  const pending = wishes.filter((w) => w.status === "pending").length;

  // Client-side pagination
  const start = (filters.page - 1) * filters.perPage;
  const paged = wishes.slice(start, start + filters.perPage);

  // Map categories
  const cats: Category[] = [
    { emoji: "/icons/emoji/duck.png", name: "All Wishes", count: total },
    ...categoriesData.map((c) => ({
      emoji: resolveUploadUrl(c.emoji_img) || "/icons/emoji/duck.png",
      name: c.name,
      count: wishes.filter((w) => w.category === c.name).length,
    })),
  ];

  return {
    wishes: paged,
    total,
    page: filters.page,
    perPage: filters.perPage,
    stats: { total, done, pending },
    categories: cats,
  };
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

  if (filters.type && filters.type !== "All") {
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

// Raw API location shape
interface ApiLocation {
  id: string;
  name: string;
  category_id: string;
  address: string | null;
  proposed_by: string;
  note: string | null;
  location_img: string | null;
  status: string;
  created_at: string;
  updated_at: string;
  category_name: string;
  category_emoji: string | null;
}

async function fetchLocationsReal(
  filters: LocationFilters
): Promise<LocationListResponse> {
  const categoriesData = await fetchCategories("location");

  const params = new URLSearchParams();
  if (filters.search) params.set("search", filters.search);
  if (filters.proposedBy) params.set("proposed_by", filters.proposedBy === "anh" ? "duckie" : "baby");
  if (filters.type) {
    const cat = categoriesData.find((c) => c.name === filters.type);
    if (cat) params.set("category_id", String(cat.id));
  }
  if (filters.status) {
    params.set("status", filters.status === "want_to_go" ? "pending" : "visited");
  }

  const res = await fetch(`${config.apiBaseUrl}/locations?${params}`);
  if (!res.ok) throw new Error("Failed to fetch locations");
  const json = await res.json();
  const rawLocations: ApiLocation[] = json.data ?? json;

  let locations: Location[] = rawLocations.map((l) => ({
    id: String(l.id),
    name: l.name,
    type: l.category_name,
    typeEmoji: resolveUploadUrl(l.category_emoji) || "/icons/emoji/duck.png",
    proposedBy: (l.proposed_by === "duckie" ? "anh" : "em") as "anh" | "em",
    status: (l.status === "visited" ? "visited" : "want_to_go") as LocationStatus,
    date: l.created_at.split(" ")[0],
    address: l.address,
    note: l.note,
    locationImg: resolveUploadUrl(l.location_img),
  }));

  const total = locations.length;
  const visited = locations.filter((l) => l.status === "visited").length;
  const wantToGo = locations.filter((l) => l.status === "want_to_go").length;

  const start = (filters.page - 1) * filters.perPage;
  const paged = locations.slice(start, start + filters.perPage);

  const cats: LocationCategory[] = [
    { emoji: "/icons/emoji/duck.png", name: "All", count: total },
    ...categoriesData.map((c) => ({
      emoji: resolveUploadUrl(c.emoji_img) || "/icons/emoji/duck.png",
      name: c.name,
      count: locations.filter((l) => l.type === c.name).length,
    })),
  ];

  return {
    locations: paged,
    total,
    page: filters.page,
    perPage: filters.perPage,
    stats: { total, visited, wantToGo },
    categories: cats,
  };
}

export async function fetchLocations(
  filters: LocationFilters
): Promise<LocationListResponse> {
  if (config.useMock) {
    return fetchLocationsMock(filters);
  }
  return fetchLocationsReal(filters);
}

// Categories API
export interface CreateCategoryPayload {
  name: string;
  type: "wish" | "location";
  emoji_img?: string | null;
}

export async function createCategory(
  payload: CreateCategoryPayload
): Promise<CategoryItem> {
  const res = await fetch(`${config.apiBaseUrl}/categories`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to create category");
  }
  const json = await res.json();
  return json.data ?? json;
}

export interface CategoryItem {
  id: string;
  name: string;
  type: string;
  emoji_img: string | null;
}

export async function fetchCategories(type?: "wish" | "location"): Promise<CategoryItem[]> {
  const params = new URLSearchParams();
  if (type) params.set("type", type);
  const res = await fetch(`${config.apiBaseUrl}/categories?${params}`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  const json = await res.json();
  return json.data ?? json;
}

// Wishes CRUD API
export interface CreateWishPayload {
  name: string;
  category_id: string;
  owner: string;
  description?: string | null;
  image_url?: string | null;
}

export interface UpdateWishPayload {
  name?: string;
  description?: string | null;
  image_url?: string | null;
  category_id?: string;
  owner?: string;
  status?: "pending" | "granted" | "declined";
}

export async function createWish(payload: CreateWishPayload): Promise<ApiWish> {
  const res = await fetch(`${config.apiBaseUrl}/wishes`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || "Failed to create wish");
  }
  const json = await res.json();
  return json.data ?? json;
}

export async function updateWish(id: string, payload: UpdateWishPayload): Promise<ApiWish> {
  const res = await fetch(`${config.apiBaseUrl}/wishes/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || "Failed to update wish");
  }
  const json = await res.json();
  return json.data ?? json;
}

export async function completeWish(id: string): Promise<ApiWish> {
  const res = await fetch(`${config.apiBaseUrl}/wishes/${id}/complete`, {
    method: "PATCH",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || "Failed to complete wish");
  }
  const json = await res.json();
  return json.data ?? json;
}

export async function deleteWish(id: string): Promise<void> {
  const res = await fetch(`${config.apiBaseUrl}/wishes/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || "Failed to delete wish");
  }
}

// Locations CRUD API
export interface CreateLocationPayload {
  name: string;
  category_id: string;
  proposed_by: string;
  address?: string | null;
  note?: string | null;
  location_img?: string | null;
}

export async function createLocation(payload: CreateLocationPayload) {
  const res = await fetch(`${config.apiBaseUrl}/locations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || "Failed to create location");
  }
  const json = await res.json();
  return json.data ?? json;
}

export async function visitLocation(id: string) {
  const res = await fetch(`${config.apiBaseUrl}/locations/${id}/visit`, {
    method: "PATCH",
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || err.error || "Failed to mark as visited");
  }
  const json = await res.json();
  return json.data ?? json;
}
