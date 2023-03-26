import path from "path";
import * as url from "url";
import { createServer } from "vite";

const filePath = path.join(__dirname, ".");
console.log(filePath);

const root = path.join(filePath, "../..");

export const createViteServer = async () => {
  const vite = await createServer({
    root,
    logLevel: process.env.ENV === "production" ? "error" : "info",
    server: {
      middlewareMode: true,
      watch: {
        usePolling: true,
        interval: 100,
      },
    },
    appType: "custom",
  });

  return vite;
};
