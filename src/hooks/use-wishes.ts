import { useQuery } from "@tanstack/react-query";
import { fetchWishes } from "@/lib/api";
import type { WishFilters } from "@/lib/types";

export function useWishes(filters: WishFilters) {
  return useQuery({
    queryKey: ["wishes", filters],
    queryFn: () => fetchWishes(filters),
  });
}
