"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = exports.dataSourceOptions = void 0;
const typeorm_1 = require("typeorm");
const path_1 = require("path");
exports.dataSourceOptions = {
    type: "sqlite",
    database: (0, path_1.join)(__dirname, "..", "..", "databases", "contact.sqlite"),
    entities: [(0, path_1.join)(__dirname, "..", "**", "*.entity.{ts,js}")],
    synchronize: true,
    migrations: [
        (0, path_1.join)(__dirname, "..", "database", "migrations", "public", "*{.ts,.js}"),
    ],
};
const AppDataSource = new typeorm_1.DataSource(exports.dataSourceOptions);
exports.AppDataSource = AppDataSource;
AppDataSource.initialize()
    .then(() => {
    console.log("Success connect database contact");
})
    .catch((error) => {
    throw error;
});
