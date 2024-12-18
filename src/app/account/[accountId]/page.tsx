import { getAccessToken } from "../../../getAccessToken";
import { fetchInstitutions } from "./fetchInstitutions";
import { InstitutionBlock } from "./InstitutionBlock";

export default async function Page({
  params,
}: {
  params: Promise<{ accountId: string }>;
}) {
  const accessToken = await getAccessToken();

  console.log(accessToken);

  const institutions = await fetchInstitutions(accessToken);
  console.log(institutions);

  const accountId = (await params).accountId;

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {institutions.map((institution) => (
          <InstitutionBlock
            key={institution.id}
            institution={institution}
            accountId={accountId}
          />
        ))}
      </div>
      <pre>{JSON.stringify(institutions, null, 2)}</pre>
    </div>
  );
}
