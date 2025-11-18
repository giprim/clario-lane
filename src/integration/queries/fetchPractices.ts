import { queryOptions } from "@tanstack/react-query";
import { apiInstance } from "../apiInstance";
import type { Practice } from "@/lib";

export const fetchPracticesKey = "Practices";
export const fetchPractices = queryOptions({
  queryKey: [fetchPracticesKey],
  staleTime: "static",
  queryFn: async (): Promise<Practice[] | null> => {
    const { data } = await apiInstance.get("practice");
    return data.data;
  },
});
