import type { NextApiRequest, NextApiResponse } from 'next';
import { setCookie } from "cookies-next";
import { login } from '@/lib/bc-client/mutations/login';
import * as jwt from 'jsonwebtoken';

type LoginReq = {
  email: string,
  password: string,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ loggedIn: boolean, error?: string }>
) {
  if (req.method !== "POST") {
    res.status(404).json({ loggedIn: false });
    return;
  }

  const { JWT_SECRET } = process.env;
  if (!JWT_SECRET) {
    res.status(401).json({ loggedIn: false, error: "Could not perform login" });
    return;
  }

  const reqData = req.body satisfies LoginReq;
  const { email, password } = reqData;

  try {
    const customer = await login(email, password);

    const customerToken = jwt.sign({
      sub: customer.entityId,
    }, JWT_SECRET);

    setCookie("customer", customerToken, { req, res, httpOnly: true, secure: true });

    res.status(200).json({ loggedIn: true });
  } catch (err)  {
    const error = (err instanceof Error) ? err.message : String(err);

    res.status(401).json({ loggedIn: false, error });
  }
}
