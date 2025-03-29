import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { User } from './entity/User'

export const DB = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'username',
  password: 'password',
  database: 'my_database',
  synchronize: true,
  logging: true,
  entities: [User],
})
