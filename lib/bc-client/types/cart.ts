export type BasicCart = {
  entityId: string,
  currencyCode: string,
  amount: {
    value: number,
  },
}

export type Cart = BasicCart & {
  totalQuantity: number,
}

export const CartFragment = `
fragment cartFields on Cart {
  entityId
  currencyCode
  amount {
    value
  }
  lineItems {
    totalQuantity
  }
}
`

export type CartItem = {
  entityId: string,
  productEntityId: number,
  sku?: string,
  name: string,
  imageUrl?: string,
  quantity: number,
  salePrice: {
    value: number,
  },
  extendedSalePrice: {
    value: number,
  },
}

export type BasicCartDetails = BasicCart & {
  baseAmount: {
    value: number,
  },
}

export type CartDetails = BasicCartDetails & Cart & {
  lineItems: CartItem[],
}
