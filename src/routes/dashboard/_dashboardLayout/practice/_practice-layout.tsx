import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/dashboard/_dashboardLayout/practice/_practice-layout",
)({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}
