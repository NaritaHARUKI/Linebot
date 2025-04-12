import express from 'express'
import dotenv from 'dotenv'
import checkUserStatus from './useCases/check-user-status'
import sendReplyMessage from './useCases/send-reply-message'
import controlAction from './useCases/control-action'
import { DB } from './db'

const app = express()
const port = 3000

dotenv.config()
app.use(express.json())

DB.initialize().then(() => {
  console.log("✅ DB initialized") 
  app.listen(port, () => {
    console.log(`server is listening on port ${port}`)
  })
}).catch((err) => {
  console.error("❌ DB init error:", err)
})

app.post('/webhook', async (req, res) => {
  const events = req.body.events
  if (!events || events.length === 0) {
    res.status(400).json({ error: 'No events found' })
    return
  }

  // date from message
  const userId = events[0].source.userId
  const event = events[0]
  const message = event.message.text
  const replyToken = event.replyToken

  // check user status
  const status = await checkUserStatus(userId)

  console.log('status', status, 'message', message, 'userId', userId)

  // actions
  const replyMessage = await controlAction({ ...status, message, userId })

  await sendReplyMessage(replyToken, replyMessage, event.source.userId)
  res.status(200).send()
})