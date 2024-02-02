import type { NextApiRequest, NextApiResponse } from 'next';
import { deleteCookie } from "cookies-next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ status: string }>
) {
  if (req.method !== "POST") {
    res.status(404).json({status: "notfound"});
    return;
  }

  deleteCookie("customer", { req, res });

  res.status(200).json({status: "ok"});
}
