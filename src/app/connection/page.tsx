import { randomUUID } from "crypto";
import { redirect } from "next/navigation";

export default function Page() {
  const uuid = randomUUID();
  return redirect("/connection/new/" + uuid);
}
