import { getAccessToken } from "@/api/getAccessToken";

export async function fetchRequisition(requisitionId: string) {
  const response = await fetch(
    `https://bankaccountdata.gocardless.com/api/v2/requisitions/${requisitionId}/`,
    {
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${await getAccessToken()}`,
      },
    }
  );

  if (!response.ok) {
    console.log(await response.text());
    throw new Error("Failed to fetch requisition data");
  }

  const requisitionData = await response.json();
  return requisitionData;
}
