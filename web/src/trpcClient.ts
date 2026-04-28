import { createTRPCProxyClient, httpBatchLink } from "@trpc/client";
import type { AppRouter } from "../../api/server.js";

export const trpcClient = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      fetch(url, options) {
        return fetch(url, {
          ...options,
          credentials: "include",
        });
      },
      url: "http://localhost:5555/trpc",
    }),
  ],
});
