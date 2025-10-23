import * as React from "react";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

import { Toaster } from "sonner";
import Navbar from "@/components/navbar";
import { supabaseService } from "@/integration";
import { Footer, PendingPage, ThemeProvider } from "@/components";

export const Route = createRootRoute({
  component: RootComponent,
  pendingComponent: PendingPage,
  beforeLoad: async () => {
    const session = await supabaseService.getSession();
    return { session };
  },
});

function RootComponent() {
  return (
    <React.Fragment>
      <ThemeProvider>
        <Navbar />
        <Outlet />
        <Footer />
        <Toaster position="top-center" />
      </ThemeProvider>
      <TanStackRouterDevtools position="bottom-right" />
    </React.Fragment>
  );
}
