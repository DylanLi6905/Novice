import "dotenv/config";
import express from 'express'
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth/accounts.js";



const app = express()
const port = 8001

app.use(cookieParser())
app.use("/api/auth", authRouter);

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello world' })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
