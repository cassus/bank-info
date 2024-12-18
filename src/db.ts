import { Kysely } from "kysely";
import { NeonDialect } from "kysely-neon";
import { env } from "./env";
import { DB } from "./db-schema.generated";

export const db = new Kysely<DB>({
  dialect: new NeonDialect({
    connectionString: env.NEON_DATABASE_URL,
  }),
});
