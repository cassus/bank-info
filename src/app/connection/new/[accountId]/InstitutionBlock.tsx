"use client";

import Image from "next/image";
import { useState } from "react";
import { Institution } from "@/api/fetchInstitutions";
import { createEndUserAgreement } from "@/api/createEndUserAgreement";

type Props = {
  institution: Institution;
  accountId: string;
};

export function InstitutionBlock({ institution, accountId }: Props) {
  const [result, setResult] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);
    const response = await createEndUserAgreement({
      accountId,
      institution_id: institution.id,
    });
    setResult(JSON.stringify(response, null, 2));
    setIsLoading(false);
  };

  return (
    <div key={institution.id} className="text-center" onClick={onClick}>
      <Image
        src={institution.logo}
        width="100"
        height="100"
        unoptimized
        alt={`${institution.name} logo`}
        className="mx-auto"
      />
      {isLoading ? "Processing..." : "Click me!"}
      {result && <p>{result}</p>}
      <p>{institution.name}</p>
      <pre>{institution.id}</pre>
    </div>
  );
}
