import { makeApi, Zodios, type ZodiosOptions } from "@zodios/core";
import { z } from "zod";

const Account = z
  .object({
    id: z.string().uuid(),
    created: z.string().datetime({ offset: true }),
    last_accessed: z.string().datetime({ offset: true }),
    iban: z.string(),
    bban: z.string(),
    status: z.string(),
    institution_id: z.string(),
    owner_name: z.string(),
  })
  .partial()
  .passthrough();
const ErrorResponse = z
  .object({
    summary: z.string(),
    detail: z.string(),
    type: z.string().optional(),
    status_code: z.number().int(),
  })
  .passthrough();
const BalanceAmountSchema = z
  .object({ amount: z.string(), currency: z.string() })
  .passthrough();
const BalanceSchema = z
  .object({
    balanceAmount: BalanceAmountSchema,
    balanceType: z.string(),
    creditLimitIncluded: z.boolean().optional(),
    lastChangeDateTime: z.string().optional(),
    referenceDate: z.string().optional(),
    lastCommittedTransaction: z.string().optional(),
  })
  .passthrough();
const AccountBalance = z
  .object({ balances: z.array(BalanceSchema) })
  .partial()
  .passthrough();
const OwnerAddressStructuredSchema = z
  .object({
    streetName: z.string(),
    buildingNumber: z.string(),
    townName: z.string(),
    postCode: z.string(),
    country: z.string(),
  })
  .partial()
  .passthrough();
const DetailSchema = z
  .object({
    resourceId: z.string(),
    iban: z.string(),
    bban: z.string(),
    scan: z.string(),
    msisdn: z.string(),
    currency: z.string(),
    ownerName: z.string(),
    name: z.string(),
    displayName: z.string(),
    product: z.string(),
    cashAccountType: z.string(),
    status: z.string(),
    bic: z.string(),
    linkedAccounts: z.string(),
    maskedPan: z.string(),
    usage: z.string(),
    details: z.string(),
    ownerAddressUnstructured: z.array(z.string()),
    ownerAddressStructured: OwnerAddressStructuredSchema,
  })
  .partial()
  .passthrough();
const AccountDetail = z.object({ account: DetailSchema }).passthrough();
const TransactionAmountSchema = z
  .object({ amount: z.string(), currency: z.string() })
  .passthrough();
const CurrencyExchangeSchema = z
  .object({
    sourceCurrency: z.string(),
    exchangeRate: z.string(),
    unitCurrency: z.string(),
    targetCurrency: z.string(),
    quotationDate: z.string(),
    contractIdentification: z.string(),
  })
  .partial()
  .passthrough();
const AccountSchema = z
  .object({
    iban: z.string(),
    bban: z.string(),
    pan: z.string(),
    maskedPan: z.string(),
    msisdn: z.string(),
    currency: z.string(),
  })
  .partial()
  .passthrough();
const TransactionSchema = z
  .object({
    transactionId: z.string().optional(),
    entryReference: z.string().optional(),
    endToEndId: z.string().optional(),
    mandateId: z.string().optional(),
    checkId: z.string().optional(),
    creditorId: z.string().optional(),
    bookingDate: z.string().optional(),
    valueDate: z.string().optional(),
    bookingDateTime: z.string().optional(),
    valueDateTime: z.string().optional(),
    transactionAmount: TransactionAmountSchema,
    currencyExchange: z.array(CurrencyExchangeSchema).optional(),
    creditorName: z.string().optional(),
    creditorAccount: AccountSchema.optional(),
    ultimateCreditor: z.string().optional(),
    debtorName: z.string().optional(),
    debtorAccount: AccountSchema.optional(),
    ultimateDebtor: z.string().optional(),
    remittanceInformationUnstructured: z.string().optional(),
    remittanceInformationUnstructuredArray: z.array(z.string()).optional(),
    remittanceInformationStructured: z.string().optional(),
    remittanceInformationStructuredArray: z.array(z.string()).optional(),
    additionalInformation: z.string().optional(),
    purposeCode: z.string().optional(),
    bankTransactionCode: z.string().optional(),
    proprietaryBankTransactionCode: z.string().optional(),
    internalTransactionId: z.string().optional(),
  })
  .passthrough();
const BankTransaction = z
  .object({
    booked: z.array(TransactionSchema),
    pending: z.array(TransactionSchema).optional(),
  })
  .passthrough();
const AccountTransactions = z
  .object({ transactions: BankTransaction })
  .passthrough();
const EndUserAgreement = z
  .object({
    id: z.string().uuid().optional(),
    created: z.string().datetime({ offset: true }).optional(),
    institution_id: z.string(),
    max_historical_days: z
      .number()
      .int()
      .gte(1)
      .lte(730)
      .optional()
      .default(90),
    access_valid_for_days: z
      .number()
      .int()
      .gte(1)
      .lte(180)
      .optional()
      .default(90),
    access_scope: z
      .array(z.unknown())
      .optional()
      .default(["balances", "details", "transactions"]),
    accepted: z.string().datetime({ offset: true }).nullish(),
  })
  .passthrough();
const PaginatedEndUserAgreementList = z
  .object({
    count: z.number().int(),
    next: z.string().url().nullish(),
    previous: z.string().url().nullish(),
    results: z.array(EndUserAgreement),
  })
  .passthrough();
const EndUserAgreementRequest = z
  .object({
    institution_id: z.string().min(1),
    max_historical_days: z
      .number()
      .int()
      .gte(1)
      .lte(730)
      .optional()
      .default(90),
    access_valid_for_days: z
      .number()
      .int()
      .gte(1)
      .lte(180)
      .optional()
      .default(90),
    access_scope: z
      .array(z.unknown())
      .optional()
      .default(["balances", "details", "transactions"]),
  })
  .passthrough();
const EnduserAcceptanceDetailsRequest = z
  .object({ user_agent: z.string().min(1), ip_address: z.string().min(1) })
  .passthrough();
const Integration = z
  .object({
    id: z.string(),
    name: z.string(),
    bic: z.string().optional(),
    transaction_total_days: z.string().optional().default("90"),
    max_access_valid_for_days: z.string().optional(),
    countries: z.array(z.string()),
    logo: z.string(),
  })
  .passthrough();
const IntegrationRetrieve = z
  .object({
    id: z.string(),
    name: z.string(),
    bic: z.string().optional(),
    transaction_total_days: z.string().optional().default("90"),
    max_access_valid_for_days: z.string().optional(),
    countries: z.array(z.string()),
    logo: z.string(),
    supported_payments: z.object({}).partial().passthrough(),
    supported_features: z.array(z.unknown()),
    identification_codes: z.array(z.unknown()),
  })
  .passthrough();
const StatusEnum = z.enum([
  "CR",
  "ID",
  "LN",
  "RJ",
  "ER",
  "SU",
  "EX",
  "GC",
  "UA",
  "GA",
  "SA",
]);
const Requisition = z
  .object({
    id: z.string().uuid().optional(),
    created: z.string().datetime({ offset: true }).nullish(),
    redirect: z.string().max(1024).url().nullable(),
    status: StatusEnum.optional(),
    institution_id: z.string(),
    agreement: z.string().uuid().optional(),
    reference: z.string().max(256).optional(),
    accounts: z.array(z.string().uuid()).optional(),
    user_language: z.string().max(5).optional(),
    link: z
      .string()
      .url()
      .optional()
      .default(
        "https://ob.gocardless.com/psd2/start/3fa85f64-5717-4562-b3fc-2c963f66afa6/{$INSTITUTION_ID}"
      ),
    ssn: z.string().max(64).optional(),
    account_selection: z.boolean().optional().default(false),
    redirect_immediate: z.boolean().optional().default(false),
  })
  .passthrough();
const PaginatedRequisitionList = z
  .object({
    count: z.number().int(),
    next: z.string().url().nullish(),
    previous: z.string().url().nullish(),
    results: z.array(Requisition),
  })
  .passthrough();
const RequisitionRequest = z
  .object({
    redirect: z.string().min(1).max(1024).url().nullable(),
    institution_id: z.string().min(1),
    agreement: z.string().uuid().optional(),
    reference: z.string().min(1).max(256).optional(),
    user_language: z.string().min(1).max(5).optional(),
    ssn: z.string().max(64).optional(),
    account_selection: z.boolean().optional().default(false),
    redirect_immediate: z.boolean().optional().default(false),
  })
  .passthrough();
const SpectacularRequisition = z
  .object({
    id: z.string().uuid().optional(),
    created: z.string().datetime({ offset: true }).nullish(),
    redirect: z.string().max(1024).url().nullable(),
    status: StatusEnum.optional(),
    institution_id: z.string(),
    agreement: z.string().uuid().optional(),
    reference: z.string().max(256).optional(),
    accounts: z.array(z.unknown()).optional().default([]),
    user_language: z.string().max(5).optional(),
    link: z
      .string()
      .url()
      .optional()
      .default(
        "https://ob.gocardless.com/psd2/start/3fa85f64-5717-4562-b3fc-2c963f66afa6/{$INSTITUTION_ID}"
      ),
    ssn: z.string().max(64).optional(),
    account_selection: z.boolean().optional().default(false),
    redirect_immediate: z.boolean().optional().default(false),
  })
  .passthrough();
const JWTObtainPairRequest = z
  .object({ secret_id: z.string().min(1), secret_key: z.string().min(1) })
  .passthrough();
const SpectacularJWTObtain = z
  .object({
    access: z.string(),
    access_expires: z.number().int().default(86400),
    refresh: z.string(),
    refresh_expires: z.number().int().default(2592000),
  })
  .partial()
  .passthrough();
const JWTRefreshRequest = z
  .object({ refresh: z.string().min(1) })
  .passthrough();
const SpectacularJWTRefresh = z
  .object({
    access: z.string(),
    access_expires: z.number().int().default(86400),
  })
  .partial()
  .passthrough();

export const schemas = {
  Account,
  ErrorResponse,
  BalanceAmountSchema,
  BalanceSchema,
  AccountBalance,
  OwnerAddressStructuredSchema,
  DetailSchema,
  AccountDetail,
  TransactionAmountSchema,
  CurrencyExchangeSchema,
  AccountSchema,
  TransactionSchema,
  BankTransaction,
  AccountTransactions,
  EndUserAgreement,
  PaginatedEndUserAgreementList,
  EndUserAgreementRequest,
  EnduserAcceptanceDetailsRequest,
  Integration,
  IntegrationRetrieve,
  StatusEnum,
  Requisition,
  PaginatedRequisitionList,
  RequisitionRequest,
  SpectacularRequisition,
  JWTObtainPairRequest,
  SpectacularJWTObtain,
  JWTRefreshRequest,
  SpectacularJWTRefresh,
};

const endpoints = makeApi([
  {
    method: "get",
    path: "/api/v2/accounts/:id/",
    alias: "retrieve account metadata",
    description: `Access account metadata.

Information about the account record, such as the processing status and IBAN.

Account status is recalculated based on the error count in the latest req.`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: Account,
    errors: [
      {
        status: 401,
        description: `Token is invalid or expired`,
        schema: ErrorResponse,
      },
      {
        status: 403,
        description: `IP address not whitelisted`,
        schema: ErrorResponse,
      },
      {
        status: 404,
        description: `Account not found`,
        schema: ErrorResponse,
      },
      {
        status: 429,
        description: `Nordigen rate limit exceeded`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "get",
    path: "/api/v2/accounts/:id/balances/",
    alias: "retrieve account balances",
    description: `Access account balances.

Balances will be returned in Berlin Group PSD2 format.`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: AccountBalance,
    errors: [
      {
        status: 400,
        description: `Invalid Account ID`,
        schema: ErrorResponse,
      },
      {
        status: 401,
        description: `AccountInactiveError`,
        schema: ErrorResponse,
      },
      {
        status: 403,
        description: `AccountResourceUnavailable`,
        schema: ErrorResponse,
      },
      {
        status: 404,
        description: `Account not found`,
        schema: ErrorResponse,
      },
      {
        status: 409,
        description: `Account state does not support this operation`,
        schema: ErrorResponse,
      },
      {
        status: 429,
        description: `RateLimitError`,
        schema: ErrorResponse,
      },
      {
        status: 500,
        description: `Couldn&#x27;t update account balances`,
        schema: ErrorResponse,
      },
      {
        status: 503,
        description: `ConnectionError`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "get",
    path: "/api/v2/accounts/:id/details/",
    alias: "retrieve account details",
    description: `Access account details.

Account details will be returned in Berlin Group PSD2 format.`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: AccountDetail,
    errors: [
      {
        status: 400,
        description: `Invalid Account ID`,
        schema: ErrorResponse,
      },
      {
        status: 401,
        description: `AccountInactiveError`,
        schema: ErrorResponse,
      },
      {
        status: 403,
        description: `AccountResourceUnavailable`,
        schema: ErrorResponse,
      },
      {
        status: 404,
        description: `Account not found`,
        schema: ErrorResponse,
      },
      {
        status: 409,
        description: `Account state does not support this operation`,
        schema: ErrorResponse,
      },
      {
        status: 429,
        description: `RateLimitError`,
        schema: ErrorResponse,
      },
      {
        status: 500,
        description: `Couldn&#x27;t update account details`,
        schema: ErrorResponse,
      },
      {
        status: 503,
        description: `ConnectionError`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "get",
    path: "/api/v2/accounts/:id/transactions/",
    alias: "retrieve account transactions",
    description: `Access account transactions.

Transactions will be returned in Berlin Group PSD2 format.`,
    requestFormat: "json",
    parameters: [
      {
        name: "date_from",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "date_to",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: AccountTransactions,
    errors: [
      {
        status: 400,
        description: `Incorrect date range in query parameters`,
        schema: ErrorResponse,
      },
      {
        status: 401,
        description: `AccountInactiveError`,
        schema: ErrorResponse,
      },
      {
        status: 403,
        description: `AccountResourceUnavailable`,
        schema: ErrorResponse,
      },
      {
        status: 404,
        description: `Account not found`,
        schema: ErrorResponse,
      },
      {
        status: 409,
        description: `Account state does not support this operation`,
        schema: ErrorResponse,
      },
      {
        status: 429,
        description: `RateLimitError`,
        schema: ErrorResponse,
      },
      {
        status: 500,
        description: `Couldn&#x27;t update account transactions`,
        schema: ErrorResponse,
      },
      {
        status: 503,
        description: `ConnectionError`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "get",
    path: "/api/v2/agreements/enduser/",
    alias: "retrieve all EUAs for an end user",
    description: `Overwrite pagination to map CONN consent data with end user agreements.

Args:
    request (HttpRequest): Request

Returns:
    HttpResponse: Response`,
    requestFormat: "json",
    parameters: [
      {
        name: "limit",
        type: "Query",
        schema: z.number().int().gte(1).optional().default(100),
      },
      {
        name: "offset",
        type: "Query",
        schema: z.number().int().gte(0).optional().default(0),
      },
    ],
    response: PaginatedEndUserAgreementList,
    errors: [
      {
        status: 401,
        description: `Token is invalid or expired`,
        schema: ErrorResponse,
      },
      {
        status: 403,
        description: `IP address not whitelisted`,
        schema: ErrorResponse,
      },
      {
        status: 404,
        description: `Not found error`,
        schema: ErrorResponse,
      },
      {
        status: 429,
        description: `Nordigen rate limit exceeded`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "post",
    path: "/api/v2/agreements/enduser/",
    alias: "create EUA",
    description: `API endpoints related to end-user agreements.`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: EndUserAgreementRequest,
      },
    ],
    response: EndUserAgreement,
    errors: [
      {
        status: 400,
        description: `Errors related to &#x27;agreement&#x27; field.`,
        schema: ErrorResponse,
      },
      {
        status: 401,
        description: `Token is invalid or expired`,
        schema: ErrorResponse,
      },
      {
        status: 402,
        description: `Free usage limit exceeded`,
        schema: ErrorResponse,
      },
      {
        status: 403,
        description: `IP address not whitelisted`,
        schema: ErrorResponse,
      },
      {
        status: 429,
        description: `Nordigen rate limit exceeded`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "get",
    path: "/api/v2/agreements/enduser/:id/",
    alias: "retrieve EUA by id",
    description: `Retrieve end user agreement by ID`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: EndUserAgreement,
    errors: [
      {
        status: 400,
        description: `Invalid ID`,
        schema: ErrorResponse,
      },
      {
        status: 401,
        description: `Token is invalid or expired`,
        schema: ErrorResponse,
      },
      {
        status: 403,
        description: `IP address not whitelisted`,
        schema: ErrorResponse,
      },
      {
        status: 404,
        description: `Not found error`,
        schema: ErrorResponse,
      },
      {
        status: 429,
        description: `Nordigen rate limit exceeded`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "delete",
    path: "/api/v2/agreements/enduser/:id/",
    alias: "delete EUA by id",
    description: `Delete an end user agreement`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid ID`,
        schema: ErrorResponse,
      },
      {
        status: 401,
        description: `Token is invalid or expired`,
        schema: ErrorResponse,
      },
      {
        status: 403,
        description: `IP address not whitelisted`,
        schema: ErrorResponse,
      },
      {
        status: 404,
        description: `Not found error`,
        schema: ErrorResponse,
      },
      {
        status: 429,
        description: `Nordigen rate limit exceeded`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "put",
    path: "/api/v2/agreements/enduser/:id/accept/",
    alias: "accept EUA",
    description: `Accept an end-user agreement via the API`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: EnduserAcceptanceDetailsRequest,
      },
      {
        name: "id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: EndUserAgreement,
    errors: [
      {
        status: 400,
        description: `Invalid ID`,
        schema: ErrorResponse,
      },
      {
        status: 401,
        description: `Token is invalid or expired`,
        schema: ErrorResponse,
      },
      {
        status: 403,
        description: `IP address not whitelisted`,
        schema: ErrorResponse,
      },
      {
        status: 404,
        description: `Not found error`,
        schema: ErrorResponse,
      },
      {
        status: 405,
        description: `End User Agreements cannot be accepted more than once`,
        schema: ErrorResponse,
      },
      {
        status: 429,
        description: `Nordigen rate limit exceeded`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "get",
    path: "/api/v2/institutions/",
    alias: "retrieve all supported Institutions in a given country",
    description: `List all available institutions`,
    requestFormat: "json",
    parameters: [
      {
        name: "access_scopes_supported",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "account_selection_supported",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "business_accounts_supported",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "card_accounts_supported",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "corporate_accounts_supported",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "country",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "payment_submission_supported",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "payments_enabled",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "pending_transactions_supported",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "private_accounts_supported",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "read_debtor_account_supported",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "read_refund_account_supported",
        type: "Query",
        schema: z.string().optional(),
      },
      {
        name: "ssn_verification_supported",
        type: "Query",
        schema: z.string().optional(),
      },
    ],
    response: z.array(Integration),
    errors: [
      {
        status: 400,
        description: `Unknown Fields`,
        schema: ErrorResponse,
      },
      {
        status: 401,
        description: `Token is invalid or expired`,
        schema: ErrorResponse,
      },
      {
        status: 403,
        description: `IP address not whitelisted`,
        schema: ErrorResponse,
      },
      {
        status: 404,
        description: `Not found error`,
        schema: ErrorResponse,
      },
      {
        status: 429,
        description: `Nordigen rate limit exceeded`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "get",
    path: "/api/v2/institutions/:id/",
    alias: "retrieve institution",
    description: `Get details about a specific Institution and its supported features`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string(),
      },
    ],
    response: IntegrationRetrieve,
    errors: [
      {
        status: 401,
        description: `Token is invalid or expired`,
        schema: ErrorResponse,
      },
      {
        status: 403,
        description: `IP address not whitelisted`,
        schema: ErrorResponse,
      },
      {
        status: 404,
        description: `Not found error`,
        schema: ErrorResponse,
      },
      {
        status: 429,
        description: `Nordigen rate limit exceeded`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "get",
    path: "/api/v2/requisitions/",
    alias: "retrieve all requisitions",
    description: `Retrieve all requisitions belonging to the company`,
    requestFormat: "json",
    parameters: [
      {
        name: "limit",
        type: "Query",
        schema: z.number().int().gte(1).optional().default(100),
      },
      {
        name: "offset",
        type: "Query",
        schema: z.number().int().gte(0).optional().default(0),
      },
    ],
    response: PaginatedRequisitionList,
    errors: [
      {
        status: 400,
        description: `Unknown Fields`,
        schema: ErrorResponse,
      },
      {
        status: 401,
        description: `Token is invalid or expired`,
        schema: ErrorResponse,
      },
      {
        status: 403,
        description: `IP address not whitelisted`,
        schema: ErrorResponse,
      },
      {
        status: 404,
        description: `Not found error`,
        schema: ErrorResponse,
      },
      {
        status: 429,
        description: `Nordigen rate limit exceeded`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "post",
    path: "/api/v2/requisitions/",
    alias: "Create requisition",
    description: `Create a new requisition`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: RequisitionRequest,
      },
    ],
    response: SpectacularRequisition,
    errors: [
      {
        status: 400,
        description: `Field is required`,
        schema: ErrorResponse,
      },
      {
        status: 401,
        description: `Token is invalid or expired`,
        schema: ErrorResponse,
      },
      {
        status: 402,
        description: `Free usage limit exceeded`,
        schema: ErrorResponse,
      },
      {
        status: 403,
        description: `IP address not whitelisted`,
        schema: ErrorResponse,
      },
      {
        status: 404,
        description: `Errors related to &#x27;agreement&#x27; field.`,
        schema: ErrorResponse,
      },
      {
        status: 429,
        description: `Nordigen rate limit exceeded`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "get",
    path: "/api/v2/requisitions/:id/",
    alias: "requisition by id",
    description: `Retrieve a requisition by ID`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: Requisition,
    errors: [
      {
        status: 400,
        description: `Invalid ID`,
        schema: ErrorResponse,
      },
      {
        status: 401,
        description: `Token is invalid or expired`,
        schema: ErrorResponse,
      },
      {
        status: 403,
        description: `IP address not whitelisted`,
        schema: ErrorResponse,
      },
      {
        status: 404,
        description: `Not found error`,
        schema: ErrorResponse,
      },
      {
        status: 429,
        description: `Nordigen rate limit exceeded`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "delete",
    path: "/api/v2/requisitions/:id/",
    alias: "delete requisition by id",
    description: `Delete requisition and its end user agreement`,
    requestFormat: "json",
    parameters: [
      {
        name: "id",
        type: "Path",
        schema: z.string().uuid(),
      },
    ],
    response: z.void(),
    errors: [
      {
        status: 400,
        description: `Invalid ID`,
        schema: ErrorResponse,
      },
      {
        status: 401,
        description: `Token is invalid or expired`,
        schema: ErrorResponse,
      },
      {
        status: 403,
        description: `IP address not whitelisted`,
        schema: ErrorResponse,
      },
      {
        status: 404,
        description: `Not found error`,
        schema: ErrorResponse,
      },
      {
        status: 429,
        description: `Nordigen rate limit exceeded`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "post",
    path: "/api/v2/token/new/",
    alias: "Obtain new access/refresh token pair",
    description: `Obtain JWT pair`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: JWTObtainPairRequest,
      },
    ],
    response: SpectacularJWTObtain,
    errors: [
      {
        status: 401,
        description: `Incorrect secret key or id`,
        schema: ErrorResponse,
      },
      {
        status: 403,
        description: `IP address not whitelisted`,
        schema: ErrorResponse,
      },
      {
        status: 429,
        description: `Nordigen rate limit exceeded`,
        schema: ErrorResponse,
      },
    ],
  },
  {
    method: "post",
    path: "/api/v2/token/refresh/",
    alias: "Get a new access token",
    description: `Refresh access token`,
    requestFormat: "json",
    parameters: [
      {
        name: "body",
        type: "Body",
        schema: z.object({ refresh: z.string().min(1) }).passthrough(),
      },
    ],
    response: SpectacularJWTRefresh,
    errors: [
      {
        status: 401,
        description: `Token is invalid or expired`,
        schema: ErrorResponse,
      },
      {
        status: 403,
        description: `IP address not whitelisted`,
        schema: ErrorResponse,
      },
      {
        status: 429,
        description: `Nordigen rate limit exceeded`,
        schema: ErrorResponse,
      },
    ],
  },
]);

export const api = new Zodios(endpoints);

export function createApiClient(baseUrl: string, options?: ZodiosOptions) {
  return new Zodios(baseUrl, endpoints, options);
}
