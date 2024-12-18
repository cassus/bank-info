import { z } from "zod";

export const env = z.object({
  NEON_DATABASE_URL: z.string(),
}).parse(process.env);
