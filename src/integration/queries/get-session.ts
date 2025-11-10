import { queryOptions } from "@tanstack/react-query";
import { supabaseService } from "~supabase/clientServices";

export const getUserSessionKey = "session";

export const getUserSession = queryOptions({
  queryKey: [getUserSessionKey],
  queryFn: async () => {
    const { data: { session } } = await supabaseService.supabase.auth
      .getSession();

    return session;
  },
});
