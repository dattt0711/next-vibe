import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createCategory, fetchCategories, type CreateCategoryPayload } from "@/lib/api";

export function useCategories(type: "wish" | "location") {
  return useQuery({
    queryKey: ["categories", type],
    queryFn: () => fetchCategories(type),
  });
}

export function useCreateCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateCategoryPayload) => createCategory(payload),
    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["categories", variables.type] });
      if (variables.type === "wish") {
        queryClient.invalidateQueries({ queryKey: ["wishes"] });
      } else {
        queryClient.invalidateQueries({ queryKey: ["locations"] });
      }
    },
  });
}
