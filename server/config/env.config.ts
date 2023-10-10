import * as dotenv from "dotenv";
import { join, resolve } from "path";
import * as fs from "fs";

const isDev: boolean = (process.env.NODE_ENV as string) === "dev";

const filePath = isDev ? ".env.development" : ".env.production";
const envFile = resolve(join(__dirname, "..", "..", "env", filePath));
const envConfig = dotenv.parse(fs.readFileSync(envFile));

const config = <T>(envName: string): T => {
  return envConfig[envName] as T;
};

export default config;
