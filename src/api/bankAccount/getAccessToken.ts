import { env } from "@/env";
import { z } from "zod";

export async function getAccessToken(): Promise<string> {
  const response = await fetch(
    "https://bankaccountdata.gocardless.com/api/v2/token/new/",
    {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        secret_id: env.GOCARDLESS_SECRET_ID,
        secret_key: env.GOCARDLESS_SECRET_KEY,
      }),
    }
  );

  const responseSchema = z.object({
    access: z.string(),
    access_expires: z.number(),
    refresh: z.string(),
    refresh_expires: z.number(),
  });

  const data = responseSchema.parse(await response.json());
  return data.access;
}
