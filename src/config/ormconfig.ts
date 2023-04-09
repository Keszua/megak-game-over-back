import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { config } from './configuration';

export const ormConfig: MysqlConnectionOptions = {
	type: "mysql", 
	host: process.env.DB_HOST ?? config.dbHost, 
	port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : config.dbPort,
	username: process.env.DB_USERNAME ?? config.dbUser, 
	password: process.env.DB_PASSWORD ?? config.dbPassword, 
	database: config.dbDatabase,
	entities: [
	  'dist/**/*.entity{.ts,.js}',
	],
    bigNumberStrings: false,
	logging: true, 
	synchronize: true,
    charset: "utf8mb4_unicode_ci",
  }