import type { NextApiRequest, NextApiResponse } from 'next';
import { Cart } from '@/lib/bc-client/types/cart';
import { getCookie, deleteCookie } from "cookies-next";
import { getCart } from '@/lib/bc-client/queries/getCart';

type CustomerSessionResp = {
  cart: Cart | null,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CustomerSessionResp>
) {
  if (req.method !== "GET") {
    res.status(404).json({ cart: null });
    return;
  }

  let cart;

  const cartId = getCookie("cartId", { req, res });
  if (cartId) {
    try {
      cart = await getCart(cartId);
    } catch (err) {
      cart = null;
      deleteCookie("cartId", { req, res });
    }
  } else {
    cart = null;
  }

  res.status(200).json({ cart });
}
