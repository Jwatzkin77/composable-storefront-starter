import type { NextApiRequest, NextApiResponse } from 'next';
import { getCookie, setCookie, deleteCookie } from "cookies-next";
import { Cart } from '@/lib/bc-client/types/cart';
import { addCartLineItem } from '@/lib/bc-client/mutations/addCartLineItem';
import { createCart } from '@/lib/bc-client/mutations/createCart';

type AddToCartReq = {
  productId: number,
  qty?: number,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ cart: Cart | null }>
) {
  if (req.method !== "POST") {
    res.status(404).json({cart: null});
    return;
  }

  const reqData = req.body satisfies AddToCartReq;
  const qty = reqData.qty ?? 1;

  const cartId = getCookie("cartId", { req, res });

  let cart = null;
  if (cartId) {
    try {
      cart = await addCartLineItem(cartId, reqData.productId, qty);
    } catch (err) {
      // Existing cart ID might not have matched a cart
    }
  }

  if (!cart) {
    try {
      cart = await createCart(reqData.productId, qty);
    } catch (err) {
      console.log(err);
    }
  }

  if (cart) {
    setCookie("cartId", cart.entityId, { req, res, httpOnly: true, secure: true });
  } else {
    deleteCookie("cartId", { req, res });
  }

  res.status(200).json({ cart })
}
