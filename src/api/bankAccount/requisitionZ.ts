import { z } from "zod";

export const requisitionZ = z.object({
  id: z.string().uuid(),
  redirect: z.string().url(),
  /**
   * - CR CREATED Requisition has been successfully created
   * - GC GIVING_CONSENT
   * - UA UNDERGOING_AUTHENTICATION
   * - RJ REJECTED
   * - SA SELECTING_ACCOUNTS
   * - GA GRANTING_ACCESS
   * - LN LINKED
   * - EX EXPIRED
   *
   * https://developer.gocardless.com/bank-account-data/statuses#statuses
   */
  status: z.string().min(1),
  agreement: z.string().uuid(),
  accounts: z.array(z.string()),
  reference: z.string(),
  link: z.string().url(),
});
