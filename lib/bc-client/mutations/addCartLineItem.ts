import { bcGqlFetch } from "../bc-client-gql";
import { BasicCart, Cart, CartFragment } from "../types/cart";

const addCartLineItemQuery = `
mutation AddCartLineItem(
  $cartId: String!,
  $productId: Int!,
  $quantity: Int!
) {
  cart {
    addCartLineItems(
      input: {
        cartEntityId: $cartId,
        data: {
          lineItems: [
            {
              quantity: $quantity,
              productEntityId: $productId
            }
          ]
        }
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

type AddCartLineItemVars = {
  cartId: string,
  productId: number,
  quantity: number,
}

type AddCartLineItemResp = {
  data: {
    cart: {
      addCartLineItems: {
        cart: BasicCart & {
          lineItems: {
            totalQuantity: number,
          },
        },
      }
    },
  },
}

export const addCartLineItem: (
  cartId: string,
  productId: number,
  quantity: number
) => Promise<Cart> = async (
  cartId,
  productId,
  quantity
) => {
  const cartResp = await bcGqlFetch<AddCartLineItemResp, AddCartLineItemVars>(
    addCartLineItemQuery,
    {
      cartId,
      productId,
      quantity,
    }
  );

  const cart = cartResp.data.cart.addCartLineItems.cart;

  return {
    ...cart,
    totalQuantity: cart.lineItems.totalQuantity,
  }
}
