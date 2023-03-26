import { createServer } from "./server/api";

(async () => {
  try {
    const server = await createServer();
    await server.listen({
      port: 8080,
      host: "0.0.0.0",
    });
    console.log(`Server started on: ${8080}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      process.exit(1);
    }
  }
})();
