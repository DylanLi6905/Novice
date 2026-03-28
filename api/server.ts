import express from 'express'

const app = express()
const port = 8001

app.get('/api/hello', (_req, res) => {
  res.json({ message: 'Hello world' })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
