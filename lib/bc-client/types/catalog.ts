export type CategoryProduct = {
  sku: string,
  name: string,
  path: string,
  prices: {
    price: {
      value: number,
      currencyCode: string,
    }
  }
  defaultImage?: {
    url: string,
    altText?: string,
  }
}

export type BasicCategory = {
  name: string,
  path: string,
  description?: string,
  defaultImage?: {
    url: string,
    altText?: string,
  }
}

export type Category = BasicCategory & {
  products: CategoryProduct[],
}
