import { initTRPC } from "@trpc/server";
import type { Context } from "./context";
import superjson from "superjson";

const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape }) {
    return shape;
  },
});

const protectedStuff = t.middleware(async ({ctx, next}) => {
  return next({ctx: {}})
})

export const router = t.router;
export const privateProcedure = t.procedure.use(protectedStuff);
export const publicProcedure = t.procedure;
