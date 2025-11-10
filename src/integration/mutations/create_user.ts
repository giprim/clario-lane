import type { OnboardingType } from "@/store";
import type { UserTable } from "@/types";
import { mutationOptions } from "@tanstack/react-query";
import { supabaseService } from "~supabase/clientServices";

export const useCreateUserMutation = mutationOptions({
  mutationFn: async (params: OnboardingType) => {
    const data = params as unknown as UserTable;
    const { status } = await supabaseService.supabase.from("users").insert(
      {
        ...data,
        current_comprehension_score: data.baseline_comprehension,
        current_wpm: data.baseline_wpm,
        total_sessions: 1,
      },
    );
    return status;
  },
});
