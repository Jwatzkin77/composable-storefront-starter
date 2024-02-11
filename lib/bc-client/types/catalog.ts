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

export type PagedCategory = Category & {
  page: {
    before: string | null,
    after: string | null,
  }
}

export type Product = {
  entityId: number,
  sku: string,
  name: string,
  description: string,
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
