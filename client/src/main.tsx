import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Toaster } from "react-hot-toast";
import "./index.css";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { TaskFromProvider } from "./context";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <TaskFromProvider>
          <App />
          <Toaster position={"top-right"} reverseOrder={false} />
          <ReactQueryDevtools />
        </TaskFromProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>
);
