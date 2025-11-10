import { mutationOptions } from "@tanstack/react-query";
import { apiInstance } from "..";
import type { SubscriptionRequest } from "@/types";
const initiateSubscriptionKey = "subscription";

export const useInitSubscription = mutationOptions({
  mutationKey: [initiateSubscriptionKey],
  mutationFn: async (params: SubscriptionRequest) => {
    const { data } = await apiInstance.post("subscription/initialize", params);
    return data;
  },
});
