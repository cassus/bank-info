import { db } from "@/db";
import { redirect } from "next/navigation";
import { fetchRequisition } from "../../../../api/fetchRequisition";

export default async function Page({
  params,
}: {
  params: Promise<{
    slug: string;
    accountId: string;
  }>;
}) {
  const { slug, accountId } = await params;

  const account = await db
    .selectFrom("accounts")
    .where("id", "=", accountId)
    .selectAll()
    .executeTakeFirst();

  if (!account) {
    return redirect("/connection/new/" + accountId);
  }

  if (slug !== account.slug) {
    return redirect(`/connection/${account.slug}/${accountId}`);
  }

  // TODO store and read requisition ID from the database
  const requisitionData = await fetchRequisition(
    "9624bb28-e028-4b29-937c-1e4b32a004db"
  );

  return (
    <div>
      <pre>{JSON.stringify(account, null, 2)}</pre>
      <pre>{JSON.stringify(requisitionData, null, 2)}</pre>
    </div>
  );
}
