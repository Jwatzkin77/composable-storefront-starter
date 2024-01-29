export async function bcRestFetch<RespType, ReqType>(
  urlPath: string,
  method: string,
  reqData: ReqType
): Promise<RespType> {
  const { BC_STORE_HASH, BC_API_TOKEN } = process.env;

  const result = await fetch(
    `https://api.bigcommerce.com/stores/${BC_STORE_HASH}/${urlPath}`,
    {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Auth-Token': BC_API_TOKEN ?? '',
      },
      body: JSON.stringify(reqData),
    }
  ).then(res => res.json());

  return result satisfies RespType;
}
