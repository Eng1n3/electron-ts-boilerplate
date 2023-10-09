import { DataSource, DataSourceOptions } from "typeorm";
import { join } from "path";

export const dataSourceOptions: DataSourceOptions = {
  type: "sqlite",
  database: join(__dirname, "..", "..", "contact.sqlite"),
  entities: [join(__dirname, "..", "**", "*.entity.{ts,js}")],
  synchronize: true,
  migrations: [
    join(__dirname, "..", "database", "migrations", "public", "*{.ts,.js}"),
  ],
};

const AppDataSource = new DataSource(dataSourceOptions);

AppDataSource.initialize()
  .then(() => {
    console.log("Success connect database contact");
  })
  .catch((error) => {
    throw error;
  });

export { AppDataSource };
