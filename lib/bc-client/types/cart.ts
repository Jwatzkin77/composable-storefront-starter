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
