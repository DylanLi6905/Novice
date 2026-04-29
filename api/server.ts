import "dotenv/config";
import cors from "cors";
import express from 'express'
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth/expressAuth.js";
import { sessionRouter } from "./routes/auth/trpcAuth.js";

import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { t } from "./trpc.js";

// query getting data
// mutation for modifying data
const appRouter = t.router({
  sayHi: t.procedure.query(() => {
    return "Hi"
  }),
  logToServer: t.procedure
    .input(v => {
      if (typeof v === "string") return v

    throw new Error("Invalid input: Expected String")
  }).mutation(({ input }) => {
    console.log(`Client says ${input}`)
    return true
  }),
  session: sessionRouter,
})


const app = express()
const port = 5555

// cors() must run before routes 
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

app.use(cookieParser())
app.use("/trpc", createExpressMiddleware({
  router: appRouter,
  createContext: ({ req, res }) => ({ req, res }),
}))
app.use("/api/auth", authRouter);

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello world' })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})


export type AppRouter = typeof appRouter
