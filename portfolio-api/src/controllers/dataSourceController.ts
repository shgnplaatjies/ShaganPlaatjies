import { DataSource, DataSourceOptions } from "typeorm";
import { AppDataSourceEntities } from "../models/AllEntities";

const DataSourceConfig: DataSourceOptions = {
  type: "mysql",
  host: process.env.DATA_SOURCE_HOST,
  port: Number(process.env.DATA_SOURCE_PORT),
  username: process.env.DATA_SOURCE_USER,
  password: process.env.DATA_SOURCE_PASSWORD,
  database: process.env.DATA_SOURCE_DATABASE_NAME,
  entities: AppDataSourceEntities,
};

export async function AppDataSourceInit() {
  const dataSource = new DataSource(DataSourceConfig);
  await dataSource.initialize();
  return dataSource;
}

export default AppDataSourceInit;
