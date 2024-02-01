import { bcGqlFetch } from "../bc-client-gql";
import { BasicCart, Cart, CartFragment } from "../types/cart";

const getCartQuery = `
query GetCart($cartId: String!) {
  site {
    cart(entityId: $cartId) {
      ...cartFields
    }
  }
}

${CartFragment}
`;

type GetCartVars = {
  cartId: string,
}

type GetCartResp = {
  data: {
    site: {
      cart: BasicCart & {
        lineItems: {
          totalQuantity: number,
        },
      },
    },
  },
}

export const getCart: (
  cartId: string
) => Promise<Cart> = async (
  cartId
) => {
  const cartResp = await bcGqlFetch<GetCartResp, GetCartVars>(
    getCartQuery,
    {
      cartId
    }
  );

  const cart = cartResp.data.site.cart;
  if (!cart) {
    throw new Error("Cart not found");
  }

  return {
    ...cart,
    totalQuantity: cart.lineItems.totalQuantity,
  }
}
