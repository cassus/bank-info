import { getAccessToken } from "@/api/getAccessToken";
import { getBaseUrl } from "@/utils/getBaseUrl";
import { requisitionZ } from "./requisitionZ";

type Props = {
  slug: string;
  accountId: string;
  institutionId: string;
  agreementId: string;
};

export async function createAuthLink({
  slug,
  accountId,
  institutionId,
  agreementId,
}: Props) {
  const response = await fetch(
    "https://bankaccountdata.gocardless.com/api/v2/requisitions/",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getAccessToken()}`,
      },
      body: JSON.stringify({
        // TODO extract to parameter
        redirect: `${getBaseUrl()}/connection/${slug}/${accountId}/callback`,
        institution_id: institutionId,
        agreement: agreementId,
      }),
    }
  );

  const rawResponse = await response.json();
  console.log(rawResponse);
  return requisitionZ.parse(rawResponse);
}
