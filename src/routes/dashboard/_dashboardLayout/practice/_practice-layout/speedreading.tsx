import { SpeedReadingTraining } from "@/components";
import { useSpeedReadingStore } from "@/components/exercises/speedreading/use-speed-reading-store";
import { clientEnv } from "@/config/env";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/_dashboardLayout/practice/_practice-layout/speedreading",
)({
  component: RouteComponent,
  loader: async () => {
    // fetch text and set to state

    try {
      useSpeedReadingStore.setState({ loading: true });
      const response = await fetch(
        `https://${clientEnv.VITE_PROJECT_ID}.supabase.co/functions/v1/make-server-3628aa1b/passages`,
        {
          headers: {
            Authorization: `Bearer ${clientEnv.VITE_PROJECT_ANON_KEY}`,
          },
        },
      );

      const result = await response.json();
      if (result.success) {
        useSpeedReadingStore.setState({ passage: result.data, wpm: 230 });
      } else {
        console.error("Failed to fetch passage:", result.message);
      }
    } catch (error) {
      console.error("Error fetching passage:", error);
    } finally {
      useSpeedReadingStore.setState({ loading: false });
    }
  },
});

function RouteComponent() {
  return <SpeedReadingTraining />;
}
