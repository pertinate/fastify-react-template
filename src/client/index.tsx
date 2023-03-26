import { Route, Routes } from "react-router-dom";
import { useTrpc } from "./util/useTRPC";
import { trpcReact } from "./util/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ReactDOM from "react-dom/client";
import Router from "./router";

const queryClient = new QueryClient();

const App = () => {
  const trpcClient = useTrpc();
  return (
    <trpcReact.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <Router />
      </QueryClientProvider>
    </trpcReact.Provider>
  );
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <App />
);
