import { z } from "zod";

export type Institution = z.infer<typeof institutionSchema>;

const institutionSchema = z.object({
  id: z.string(),
  name: z.string(),
  bic: z.string(),
  transaction_total_days: z.string(),
  countries: z.array(z.string()),
  logo: z.string(),
  max_access_valid_for_days: z.string(),
});

export async function fetchInstitutions(
  accessToken: string
): Promise<Institution[]> {
  const response = await fetch(
    "https://bankaccountdata.gocardless.com/api/v2/institutions/?country=hu",
    {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    }
  );

  const responseSchema = z.array(institutionSchema);

  const data = responseSchema.parse(await response.json());
  return data;
}
