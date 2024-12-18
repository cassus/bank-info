"use server";

import { z } from "zod";
import { getAccessToken } from "@/getAccessToken";

const inputSchema = z.object({
  institution_id: z.string(),
});

type EndUserAgreement = z.infer<typeof responseSchema>;
const responseSchema = z.object({
  id: z.string(),
  created: z.string().datetime(),
  max_historical_days: z.number(),
  access_valid_for_days: z.number(),
  access_scope: z.array(z.string()),
  accepted: z.string().nullable(),
  institution_id: z.string(),
});

export async function createEndUserAgreement(
  rawInput: z.infer<typeof inputSchema>
): Promise<EndUserAgreement> {
  const { institution_id } = inputSchema.parse(rawInput);
  const response = await fetch(
    "https://bankaccountdata.gocardless.com/api/v2/agreements/enduser/",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${await getAccessToken()}`,
      },
      body: JSON.stringify({
        institution_id: institution_id,
        // Maybe add these params later to make re-auth less frequent
        // max_historical_days: "180",
        // access_valid_for_days: "30",
        // access_scope: ["balances", "details", "transactions"],
      }),
    }
  );

  const data = await response.json();
  return responseSchema.parse(data);
}
