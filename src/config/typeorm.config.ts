import {TypeOrmModuleOptions} from '@nestjs/typeorm'

export const TypeOrmConfig : TypeOrmModuleOptions = {
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "Uit1657421717",
  database: "taskmanagment",
  entities: [__dirname + '/../**/*.entity.{js,ts}'], // Note: {js, ts} err not found Task Entity
  synchronize: true
}