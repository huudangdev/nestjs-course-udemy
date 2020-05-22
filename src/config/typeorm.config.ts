import {TypeOrmModuleOptions} from '@nestjs/typeorm'
import * as config from 'config'

const dbConfig = config.get('db')

export const TypeOrmConfig : TypeOrmModuleOptions = {
  type: dbConfig.type,
  host: dbConfig.host,
  port: dbConfig.port,
  username: dbConfig.username,
  password: dbConfig.password,
  database: dbConfig.database,
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // Note: {js, ts} err not found Task Entity
  synchronize: dbConfig.synchronize
}