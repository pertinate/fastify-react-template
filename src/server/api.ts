import fastify from "fastify";
import cookie, { FastifyCookieOptions } from "@fastify/cookie";
import fastifySession from "@fastify/session";
import fastifyOauth from "@fastify/oauth2";
import fastifyWebsocket from "@fastify/websocket";
import {
  fastifyTRPCPlugin,
  CreateFastifyContextOptions,
} from "@trpc/server/adapters/fastify";
import middie from "@fastify/middie";
import { reactSSR } from "./react-ssr";
import * as context from "./createContext";
import { prisma } from "../util/prisma";
import { DiscordToken, DiscordProfile } from "../util/discord";
import { appRouter } from "./router/index";

export const createServer = async () => {
  const server = fastify({
    maxParamLength: 5000,
    logger: true,
  });

  const fastifyCookieOptions: FastifyCookieOptions = {
    secret: process.env.FASTIFY_SECRET,
  };

  await server.register(cookie, fastifyCookieOptions);

  // await server.register(fastifyOauth, {
  //   name: "Discord",
  //   credentials: {
  //     client: {
  //       id: process.env.DISCORD_CLIENT_ID,
  //       secret: process.env.DISCORD_CLIENT_SECRET,
  //     },
  //     auth: {
  //       authorizeHost: "https://discord.com",
  //       authorizePath: "/oauth2/authorize",
  //       tokenHost: "https://discord.com",
  //       tokenPath: "/api/oauth2/token",
  //       revokePath: "/api/oauth2/token/revoke",
  //     },
  //   },
  //   scope: ["identify", "email"],
  //   // scope: 'identify email',
  //   startRedirectPath: "/login",
  //   callbackUri: "http://localhost:3000/api/auth/callback/discord",
  // });

  // await server.route({
  //   method: "GET",
  //   url: "/api/auth/callback/discord",
  //   handler: async (req, res) => {
  //     const { code } = req.query as { code: string };

  //     const token = (await (
  //       await fetch("https://discord.com/api/oauth2/token", {
  //         method: "POST",
  //         //@ts-ignore
  //         body: new URLSearchParams({
  //           client_id: process.env.DISCORD_CLIENT_ID,
  //           client_secret: process.env.DISCORD_CLIENT_SECRET,
  //           code,
  //           grant_type: "authorization_code",
  //           redirect_uri: "http://localhost:3000/api/auth/callback/discord",
  //           scope: "identify email",
  //         }).toString(),
  //         headers: {
  //           "Content-Type": "application/x-www-form-urlencoded",
  //         },
  //       })
  //     ).json()) as DiscordToken;

  //     const profile = (await (
  //       await fetch("https://discord.com/api/users/@me", {
  //         headers: {
  //           authorization: `${token.token_type} ${token.access_token}`,
  //         },
  //       })
  //     ).json()) as DiscordProfile;

  //     if (profile.avatar === null) {
  //       const defaultAvatarNumber = parseInt(profile.discriminator) % 5;
  //       profile.image_url = `https://cdn.discordapp.com/embed/avatars/${defaultAvatarNumber}.png`;
  //     } else {
  //       const format = profile.avatar.startsWith("a_") ? "gif" : "png";
  //       profile.image_url = `https://cdn.discordapp.com/avatars/${profile.id}/${profile.avatar}.${format}`;
  //     }

  //     req.session.set("token", JSON.stringify(token));
  //     req.session.set("profile", JSON.stringify(profile));

  //     console.log(req.session);

  //     return "";
  //   },
  // });

  // //@ts-ignore
  // await server.register(fastifySession, {
  //   cookieName: "sessionId",
  //   secret: process.env.FASTIFY_SECRET,
  //   cookie: {
  //     secure: process.env.ENV == "production",
  //     expires: (() => {
  //       const now = new Date();

  //       return new Date(now.valueOf() + 1000 * 60 * 60 * 24);
  //     })(),
  //   },
  //   // store: {
  //   //   get: async (sid) => {
  //   //     const session = await prisma.session.findFirst({
  //   //       where: {
  //   //         sessionToken: sid,
  //   //       },
  //   //       include: {
  //   //         user: true,
  //   //       },
  //   //     });

  //   //     if (session == null) return null;
  //   //     return session;
  //   //   },
  //   //   set: async (sid, session) => {
  //   //     const previousSession = await prisma.session.findFirst({
  //   //       where: {
  //   //         sessionToken: sid,
  //   //       },
  //   //     });
  //   //     let user;
  //   //     if (!previousSession) {
  //   //       user = await prisma.session.create({
  //   //         data: {
  //   //           expires: new Date(new Date().getSeconds() + 1000 * 60 * 60 * 24),
  //   //           sessionToken: sid,
  //   //           user: {
  //   //             create: {},
  //   //           },
  //   //         },
  //   //         select: {
  //   //           user: {
  //   //             select: {
  //   //               id: true,
  //   //             },
  //   //           },
  //   //         },
  //   //       });
  //   //     }
  //   //     if (!session.get("token") || !session.get("profile")) return;
  //   //     const token = JSON.parse(session.get("token")) as DiscordToken;
  //   //     const profile = JSON.parse(session.get("profile")) as DiscordProfile;
  //   //     if (previousSession) {
  //   //       user = {
  //   //         user: await prisma.user.findFirst({
  //   //           where: {
  //   //             id: profile.id,
  //   //             name: profile.username,
  //   //             email: profile.email,
  //   //             discriminator: profile.discriminator,
  //   //             verified: profile.verified,
  //   //             discordId: profile.id,
  //   //           },
  //   //         }),
  //   //       };
  //   //     }

  //   //     const id = user?.user?.id || "";
  //   //     await prisma.user.update({
  //   //       data: {
  //   //         name: profile.username,
  //   //         email: profile.email,
  //   //         image: profile.image_url,
  //   //         discriminator: profile.discriminator,
  //   //         verified: profile.verified,
  //   //         discordId: profile.id,
  //   //       },
  //   //       where: {
  //   //         id,
  //   //       },
  //   //     });
  //   //     return;
  //   //   },
  //   //   destroy: async (sid) => {
  //   //     await prisma.session.delete({
  //   //       where: {
  //   //         sessionToken: sid,
  //   //       },
  //   //     });
  //   //   },
  //   // },
  // });

  await server.register(middie);
  await server.register(fastifyWebsocket);
  await server.register(fastifyTRPCPlugin, {
    useWSS: true,
    prefix: "/api/trpc",
    trpcOptions: {
      router: appRouter,
      createContext: async (args: CreateFastifyContextOptions) => {
        const value = await context.createContext(args);

        return value;
      },
    },
  });
  await server.register(reactSSR);
  return server;
};
