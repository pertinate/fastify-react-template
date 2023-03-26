import type { inferAsyncReturnType } from "@trpc/server";
import type { CreateFastifyContextOptions } from "@trpc/server/adapters/fastify";
import type { FastifyRequest } from "fastify";

export const createContext = async ({
  req,
  res,
}: CreateFastifyContextOptions) => {
  //   let user: User | null = null;
  //   const customReq: FastifyRequest & {
  //     session: {
  //       token?: string;
  //       user?: User;
  //     };
  //   } = req;
  //   const token: any = customReq?.session?.get("token");

  //   if (token !== undefined) {
  //     user = jwt.verify(token, env.JWT_SECRET) as unknown as User;
  //   }

  //   return { req: customReq, res, user };
  return { req, res };
};

export type Context = inferAsyncReturnType<typeof createContext>;
