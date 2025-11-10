import { apiInstance } from "@/integration";
import type { PlanObject } from "@/types";
import { queryOptions } from "@tanstack/react-query";

export const plansRequestKey = "plans";

export const plansRequest = queryOptions({
  queryKey: [plansRequestKey],
  queryFn: async () => {
    const { data } = await apiInstance.get<PlanObject[]>(
      "subscription/plans",
    );

    return data;
  },
  staleTime: "static",
});
