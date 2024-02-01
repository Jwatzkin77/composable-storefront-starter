import { bcGqlFetch } from "../bc-client-gql";
import { BasicCartDetails, CartDetails, CartItem } from "../types/cart";

const cartItemFields = `
  entityId
  productEntityId
  sku
  name
  imageUrl
  quantity
  salePrice {
    value
  }
  extendedSalePrice {
    value
  }
`

const getCartsDetailsQuery = `
query GetCart($cartId: String!) {
  site {
    cart(entityId: $cartId) {
      entityId
      currencyCode
      amount {
        value
      }
      baseAmount {
        value
      }
      lineItems {
        totalQuantity,
        physicalItems {
          ...PhysicalItemFields
        }
        digitalItems {
          ...DigitalItemFields
        }
      }
    }
  }
}

fragment PhysicalItemFields on CartPhysicalItem {
  ${cartItemFields}
}

fragment DigitalItemFields on CartDigitalItem {
  ${cartItemFields}
}
`

type GetCartDetailsVars = {
  cartId: string,
}

type GetCartDetailsResp = {
  data: {
    site: {
      cart: BasicCartDetails & {
        lineItems: {
          totalQuantity: number,
          physicalItems: CartItem[],
          digitalItems: CartItem[],
        },
      },
    },
  },
}

export const getCartDetails: (
  cartId: string
) => Promise<CartDetails> = async (
  cartId
) => {
  const cartResp = await bcGqlFetch<GetCartDetailsResp, GetCartDetailsVars>(
    getCartsDetailsQuery,
    {
      cartId,
    }
  );

  const cart = cartResp.data.site.cart;
  if (!cart) {
    throw new Error("Cart not found");
  }

  return {
    ...cart,
    totalQuantity: cart.lineItems.totalQuantity,
    lineItems: cart.lineItems.physicalItems.concat(cart.lineItems.digitalItems),
  }
}
