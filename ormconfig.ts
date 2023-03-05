import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";
import { config } from './config/configuration';

export const ormConfig: MysqlConnectionOptions = {
	type: "mysql", 
	host: config.dbHost, 
	port: config.dbPort,
	username: config.dbUser, 
	password: config.dbPassword, 
	database: config.dbDatabase,
	entities: [
	  'dist/**/*.entity{.ts,.js}',
	], 
	logging: true, 
	synchronize: true,
  }