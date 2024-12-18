import { z } from "zod";

export const env = z
  .object({
    NEON_DATABASE_URL: z.string().min(1),
    GOCARDLESS_SECRET_ID: z.string().min(1),
    GOCARDLESS_SECRET_KEY: z.string().min(1),
  })
  .parse(process.env);
