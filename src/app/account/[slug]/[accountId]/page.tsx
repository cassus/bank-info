import { db } from "@/db";
import { redirect } from "next/navigation";

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
    return redirect("/account/new/" + accountId);
  }

  if (slug !== account.slug) {
    return redirect(`/account/${account.slug}/${accountId}`);
  }

  return (
    <div>
      <pre>{JSON.stringify(account, null, 2)}</pre>
    </div>
  );
}
