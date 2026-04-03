import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchWishes,
  createWish,
  updateWish,
  deleteWish,
  completeWish,
  type CreateWishPayload,
  type UpdateWishPayload,
} from "@/lib/api";
import type { WishFilters } from "@/lib/types";

export function useWishes(filters: WishFilters) {
  return useQuery({
    queryKey: ["wishes", filters],
    queryFn: () => fetchWishes(filters),
  });
}

export function useCreateWish() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateWishPayload) => createWish(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishes"] });
    },
  });
}

export function useUpdateWish() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateWishPayload }) =>
      updateWish(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishes"] });
    },
  });
}

export function useDeleteWish() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteWish(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishes"] });
    },
  });
}

export function useCompleteWish() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => completeWish(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["wishes"] });
    },
  });
}
