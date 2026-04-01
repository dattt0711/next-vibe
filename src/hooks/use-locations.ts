import { useQuery } from "@tanstack/react-query";
import { fetchLocations } from "@/lib/api";
import type { LocationFilters } from "@/lib/types";

export function useLocations(filters: LocationFilters) {
  return useQuery({
    queryKey: ["locations", filters],
    queryFn: () => fetchLocations(filters),
  });
}
