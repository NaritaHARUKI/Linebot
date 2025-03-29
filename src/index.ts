import express from 'express'
import axios from 'axios'
import dotenv from 'dotenv'
import fs from 'fs'

const app = express()
const port = 3000

dotenv.config()
app.use(express.json())

app.post('/webhook', async (req, res) => {
  const events = req.body.events
  if (!events || events.length === 0) {
    writeLog(`req ${req.body}`)
    res.status(400).json({ error: 'No events found' });
    return;
  }

  const event = events[0]
  const message = event.message
  const replyToken = event.replyToken

  await sendReplyMessage(replyToken, `${message.text}だと？黙れ！`, event.source.userId)
  res.status(200).send()
})

app.listen(port, () => {
  console.log(`server is listening on port ${port}`)
})

const sendReplyMessage = async (replyToken:string, messageText:string,userId:string) => {
  const replyMessage = {
    replyToken: replyToken,
    messages: [
      {
        type: 'text',
        text: messageText,
      },
    ],
  };

  try {
    await axios.post('https://api.line.me/v2/bot/message/reply', replyMessage, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.CHANNEL_ACCESS_TOKEN}`,
      },
    })
    writeLog(`res ${userId} ${messageText}だと？黙れ！`)
  } catch (error) {
    writeLog(`res ${userId} Error sending reply message: ${error}`)
  }
}

const writeLog = async (logMessage: string) => {
  const logFilePath = `${__dirname}/ore-no.log`
  const timestamp = new Date().toISOString()
  const logEntry = `[${timestamp}] ${logMessage}\n`
  
  try {
    await fs.promises.appendFile(logFilePath, logEntry)
  } catch (err) {
    // console.error(`Error writing log${err}`)
  }
}