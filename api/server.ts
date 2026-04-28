import "dotenv/config";
import cors from "cors";
import express from 'express'
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth/accounts.js";

import {initTRPC} from  "@trpc/server"
import { createExpressMiddleware } from "@trpc/server/adapters/express";

const t = initTRPC.create()

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
  }).mutation(req => {
    console.log("Client says ${req.input}")
    return true
  })
})


const app = express()
const port = 5555

// cors() must run before routes 
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))

app.use("/trpc", createExpressMiddleware({router: appRouter}))

app.use(cookieParser())
app.use("/api/auth", authRouter);

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello world' })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})


export type AppRouter = typeof appRouter