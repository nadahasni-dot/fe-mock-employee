import "../app/globals.css";
import { Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <main className="w-full min-h-screen">
        <Outlet />
        <TanStackRouterDevtools />
        <Toaster position="top-right" duration={3000} />
      </main>
    </QueryClientProvider>
  );
}

export default App;
