import { queryOptions } from "@tanstack/react-query";
import { apiInstance } from "../apiInstance";
import type { PassageResponse } from "@/types";
import { usePracticeStore } from "@/store";

export const fetchPassageKey = "passage";

export const fetchPassage = queryOptions({
  queryKey: [fetchPassageKey],
  staleTime: 20 * 60 * 1000,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
  queryFn: async () => {
    const { data } = await apiInstance.get("practice/passage");
    if (data.data) {
      usePracticeStore.setState({ passage: data?.data?.passage });
    }
    return data.data as PassageResponse;
  },
});
