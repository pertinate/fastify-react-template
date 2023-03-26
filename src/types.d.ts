declare module NodeJS {
  interface ProcessEnv {
    ENV: "production" | "stage" | "development";
    FASTIFY_SECRET: string;
    DISCORD_CLIENT_ID: string;
    DISCORD_CLIENT_SECRET: string;
  }
}
