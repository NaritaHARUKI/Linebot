import axios from "axios"
import fs from 'fs'

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
    _writeLog(`res ${userId} ${messageText}だと？黙れ！`)
  } catch (error) {
    _writeLog(`res ${userId} Error sending reply message: ${error}`)
  }
}

const _writeLog = async (logMessage: string) => {
  const logFilePath = `${__dirname}/ore-no.log`
  const timestamp = new Date().toISOString()
  const logEntry = `[${timestamp}] ${logMessage}\n`

  try {
    await fs.promises.appendFile(logFilePath, logEntry)
  } catch (err) {
    // console.error(`Error writing log${err}`)
  }
}

export default sendReplyMessage