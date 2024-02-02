export async function bcGqlFetch<RespType>(query: string, customerId?: number): Promise<RespType>;
export async function bcGqlFetch<RespType, VarsType>(query: string, variables: VarsType, customerId?: number): Promise<RespType>;
export async function bcGqlFetch<RespType, VarsType>(
  query: string,
  variables?: VarsType,
  customerId?: number
): Promise<RespType> {
  const { BC_STORE_HASH, BC_CHANNEL_ID, BC_CI_TOKEN } = process.env;

  const result = await fetch(
    `https://store-${BC_STORE_HASH}-${BC_CHANNEL_ID}.mybigcommerce.com/graphql`,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${BC_CI_TOKEN}`,
        ...(customerId && { 'X-Bc-Customer-Id': String(customerId) }),
      },
      body: JSON.stringify({
        query,
        ...(variables && { variables }),
      }),
    }
  ).then(res => res.json());

  if (result.errors && result.errors.length > 0) {
    const errors = result.errors.map((err: { message: string }) => err.message);
    const err = errors.join(' ') || "An unexpected error occurred during the request.";
    throw new Error(err);
  }

  return result satisfies RespType;
}
