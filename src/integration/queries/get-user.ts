import { queryOptions } from "@tanstack/react-query";
import { supabaseService } from "~supabase/clientServices";

export const getUserKey = "user";

export const useGetUser = queryOptions({
  queryKey: [getUserKey],
  queryFn: async () => {
    const { data } = await supabaseService.supabase.from("users").select("*")
      .single();
    return data;
  },
});
