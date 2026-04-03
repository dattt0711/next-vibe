import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchLocations, createLocation, visitLocation, type CreateLocationPayload } from "@/lib/api";
import type { LocationFilters } from "@/lib/types";

export function useLocations(filters: LocationFilters) {
  return useQuery({
    queryKey: ["locations", filters],
    queryFn: () => fetchLocations(filters),
  });
}

export function useCreateLocation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateLocationPayload) => createLocation(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
}

export function useVisitLocation() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => visitLocation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["locations"] });
    },
  });
}
