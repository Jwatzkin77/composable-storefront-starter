import { bcGqlFetch } from "../bc-client-gql";
import { BasicCart, Cart, CartFragment } from "../types/cart";

const createCartQuery = `
mutation CreateCart(
  $productId: Int!,
  $quantity: Int!
) {
  cart {
    createCart(
      input: {
        lineItems: [
          {
            quantity: $quantity,
            productEntityId: $productId
          }
        ]
      }
    ) {
      cart {
        ...cartFields
      }
    }
  }
}

${CartFragment}
`;

type CreateCartVars = {
  productId: number,
  quantity: number,
}

type CreateCartResp = {
  data: {
    cart: {
      createCart: {
        cart: BasicCart & {
          lineItems: {
            totalQuantity: number,
          },
        },
      },
    },
  },
}

export const createCart: (
  productId: number,
  quantity: number
) => Promise<Cart> = async (
  productId,
  quantity
) => {
  const cartResp = await bcGqlFetch<CreateCartResp, CreateCartVars>(
    createCartQuery,
    {
      productId,
      quantity,
    }
  );

  const cart = cartResp.data.cart.createCart.cart;

  return {
    ...cart,
    totalQuantity: cart.lineItems.totalQuantity,
  }
}
