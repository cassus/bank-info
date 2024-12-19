import type { Kysely } from "kysely";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .alterTable("accounts")
    .alterColumn("slug", (alter) => alter.setNotNull())
    .execute();
}
