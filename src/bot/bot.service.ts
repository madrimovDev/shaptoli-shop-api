import TelegramBot from 'node-telegram-bot-api'
import prisma from '../prisma/prisma.service'
const token = process.env.BOT_TOKEN
const bot = new TelegramBot(token as string, { polling: true })

const findBotUser = async (chatId: number) => {
  const botUsers = await prisma.botUser.findMany()
  const botUser = botUsers.find((item) => item.telegramId === chatId)
  return !!botUser
}

export const onStartBot = async () => {
  const botUsers = await prisma.botUser.findMany()
  bot.onText(/\/start/, async (msg) => {
    const id = msg.chat.id
    const hasBotUser = await findBotUser(id)
    if (hasBotUser) {
      bot.setMyCommands([
        {
          command: '/start',
          description: 'Start bot',
        },
        {
          command: '/getusers',
          description: 'Get All Bot Users',
        },
      ])

      bot.sendMessage(id, '<pre language="javascript">let i = 0</pre>', {
        parse_mode: 'HTML',
      })
    }
  })

  bot.onText(/\/getusers/, async (msg) => {
    const id = msg.chat.id
    const hasBotUser = await findBotUser(id)

    if (hasBotUser) {
      bot.sendMessage(id, JSON.stringify(botUsers))
    }
  })
}

export default bot
