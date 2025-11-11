import type { GoalsType } from "@/types";
import { queryOptions } from "@tanstack/react-query";
import { supabaseService } from "~supabase/clientServices";

export const fetchGoalsKey = "goals";

export const fetchGoals = queryOptions({
  queryKey: [fetchGoalsKey],
  queryFn: async () => {
    const { data } = await supabaseService.sp.from("goals").select("*");
    return data as GoalsType[];
  },
  staleTime: "static",
});
