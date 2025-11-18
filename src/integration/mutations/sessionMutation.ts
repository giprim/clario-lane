import { practiced_session } from "@/types";
import { mutationOptions } from "@tanstack/react-query";
import { apiInstance } from "../apiInstance";

export const sessionMutationKey = "session-mutation";
export const sessionMutation = mutationOptions({
  mutationKey: [sessionMutationKey],
  mutationFn: async (params: practiced_session) => {
    const res = await apiInstance.post("practice/session", params);
    return res.status;
  },
});
