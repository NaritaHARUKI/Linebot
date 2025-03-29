import express from 'express'
import { DB } from './db'

const app = express()
const port = 3000

app.use(express.json())

DB.initialize()
  .then(() => console.log('MySQL接続成功'))
  .catch((err) => console.error('データベース接続エラー:', err))

app.post('/webhook', (req, res) => {
  const message = req.body.message
  res.json({ reply: message })
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})
