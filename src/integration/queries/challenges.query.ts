import type { ChallengesType } from "@/types";
import { queryOptions } from "@tanstack/react-query";
import { supabaseService } from "~supabase/clientServices";

export const challengeRequestKey = "challenges";

export const challengeRequest = queryOptions({
  queryKey: [challengeRequestKey],
  queryFn: async () => {
    const { data } = await supabaseService.supabase
      .from("challenges")
      .select("*");
    return data as ChallengesType[];
  },
  staleTime: "static",
});
