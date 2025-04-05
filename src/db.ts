import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'
import dotenv from 'dotenv'
import { Shop } from './entity/Shop'
import SHOP_STATUS from './type/shop-status'

dotenv.config()

export const DB = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [User,Shop],
})

export const DBORM = {
  User: {
    initialInsert: async (lineId: string, type: string) => {
      const isExsits = await DB.getRepository(User).findOne({ where: { lineId } })
      if (isExsits) {
        await DB.getRepository(User).update({ lineId }, { 
          status: SHOP_STATUS.first.insertShopName,
          type: type,
        })
      }
      const user = new User()
      user.name = ''
      user.lineId = lineId
      user.type = type
      user.status = SHOP_STATUS.first.insertShopName
      await DB.getRepository(User).save(user)
    },
    updateStatus : async (lineId: string, status: string) => {
      const user = await DB.getRepository(User).findOne({ where: { lineId } })
      if (user) {
        user.status = status
        await DB.getRepository(User).save(user)
      }
    },
    insertType: async (lineId: string, type: string) => {
      const user = await DB.getRepository(User).findOne({ where: { lineId } })
      if (user) {
        user.type = type
        await DB.getRepository(User).save(user)
      }
    }
  },
  Shop: {
    findOne: async (userId: string) => {
      const shop = await DB.getRepository(Shop).findOne({ where: { userId } })
      return shop
    },
    save: async (shop: any) => {
      await DB.getRepository(Shop).save(shop)
    },
    update: async (userId: string, data: {
      [key : string]: string
    }) => {
      const shop = await DB.getRepository(Shop).findOne({ where: { userId } })
      if (shop) {
        await DB.getRepository(Shop).save(data)
      }
    }
  }
}
