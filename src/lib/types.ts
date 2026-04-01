export type WishStatus = "pending" | "done";
export type WishOwner = "chún" | "em bé";

export interface Wish {
  id: string;
  name: string;
  category: string;
  categoryEmoji: string;
  owner: WishOwner;
  status: WishStatus;
  date: string;
}

export interface Category {
  emoji: string;
  name: string;
  count: number;
}

export interface WishStats {
  total: number;
  done: number;
  pending: number;
}

export interface WishFilters {
  search: string;
  category: string | null;
  owner: WishOwner | null;
  status: WishStatus | null;
  page: number;
  perPage: number;
}

export interface WishListResponse {
  wishes: Wish[];
  total: number;
  page: number;
  perPage: number;
  stats: WishStats;
  categories: Category[];
}

// Location types
export type LocationStatus = "want_to_go" | "visited";
export type LocationOwner = "anh" | "em";

export interface Location {
  id: string;
  name: string;
  type: string;
  typeEmoji: string;
  proposedBy: LocationOwner;
  status: LocationStatus;
  date: string;
}

export interface LocationCategory {
  emoji: string;
  name: string;
  count: number;
}

export interface LocationStats {
  total: number;
  visited: number;
  wantToGo: number;
}

export interface LocationFilters {
  search: string;
  type: string | null;
  proposedBy: LocationOwner | null;
  status: LocationStatus | null;
  page: number;
  perPage: number;
}

export interface LocationListResponse {
  locations: Location[];
  total: number;
  page: number;
  perPage: number;
  stats: LocationStats;
  categories: LocationCategory[];
}

// Badge types
export interface Badge {
  id: string;
  emoji: string;
  icon: string;
  name: string;
  description: string;
  unlocked: boolean;
  date: string | null;
}

export interface BadgeStats {
  total: number;
  rare: number;
  currentStreak: number;
}
