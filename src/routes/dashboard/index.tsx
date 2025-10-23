import { Dashboard } from "@/components";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    const { session } = context;

    if (!session) {
      throw redirect({ to: "/auth" });
    }
  },
});

function RouteComponent() {
  return <Dashboard />;
}
