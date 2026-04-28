import { initTRPC } from "@trpc/server";
import type { Request, Response } from "express";

export const t = initTRPC.context<{ req: Request; res: Response }>().create();
