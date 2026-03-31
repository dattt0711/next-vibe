export type WishStatus = "pending" | "done";
export type WishOwner = "me" | "boo";

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
