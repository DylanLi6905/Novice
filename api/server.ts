import "dotenv/config";
import cors from "cors";
import express from 'express'
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth/accounts.js";



const app = express()
const port = 8001

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}))
app.use(cookieParser())
app.use("/api/auth", authRouter);

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello world' })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
