import { db } from "./src/db";
import { defineConfig } from "kysely-ctl";

export default defineConfig({
  // ...
  kysely: db,
  // ...
  migrations: { migrationFolder: "src/db-migrations" },
});
