import { ExtendedClient } from "./structs/ExtendedClient"
export * from "colors";
import config from "./config.json";
import { QuickDB } from "quick.db";
import { join } from "path";
import { GuildData } from "./interfaces/Guild";

const client = new ExtendedClient();
client.start();

const rootDir = process.cwd();

const db = {
    guilds: new QuickDB<GuildData>({filePath: join(rootDir, "database/guilds.sqlite"), table: "guilds"})
}

export { client, config, db }