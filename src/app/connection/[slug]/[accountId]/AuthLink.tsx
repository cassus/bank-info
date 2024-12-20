import { createAuthLink } from "@/api/createAuthLink";

type Props = {
  accountId: string;
  agreementId: string;
  institutionId: string;
  slug: string;
};

export async function AuthLink({
  accountId,
  agreementId,
  institutionId,
  slug,
}: Props) {
  const authLink = await createAuthLink({
    accountId: accountId,
    agreementId,
    institutionId,
    // agreementId: account.config.endUserAgreement.id,
    // institutionId: account.config.endUserAgreement.institution_id,
    slug: slug,
  });

  return <pre>{JSON.stringify(authLink, null, 2)}</pre>;
}
