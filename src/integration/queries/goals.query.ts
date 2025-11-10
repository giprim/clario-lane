import type { GoalsType } from "@/types";
import { queryOptions } from "@tanstack/react-query";
import { supabaseService } from "~supabase/clientServices";

export const goalsRequestKey = "goals";

export const goalsRequest = queryOptions({
  queryKey: [goalsRequestKey],
  queryFn: async () => {
    const { data } = await supabaseService.supabase.from("goals").select("*");
    return data as GoalsType[];
  },
  staleTime: "static",
});
