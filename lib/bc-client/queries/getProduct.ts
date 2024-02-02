import { bcGqlFetch } from "../bc-client-gql";
import { Product } from "../types/catalog";

const getProductQuery = `
query GetProduct(
  $path: String!, 
  $imgSize: Int!
) {
  site {
    route(path: $path) {
      node {
        __typename
        ... on Product {
          entityId
          sku
          name
          description
          prices {
            price {
              value
              currencyCode
            }
          }
          defaultImage {
            url(width: $imgSize)
            altText
          }
        }
      }
    }
  }
}
`;

type GetProductVars = {
  path: string,
  imgSize: number,
}

type GetProductResp = {
  data: {
    site: {
      route: {
        node: Product & {
          "__typename": string,
        },
      },
    },
  },
}

export const getProduct: (
  path: string,
  imgSize: number,
  customerId?: number
) => Promise<Product> = async (
  path,
  imgSize,
  customerId
) => {
  const productResp = await bcGqlFetch<GetProductResp, GetProductVars>(
    getProductQuery,
    {
      path,
      imgSize,
    },
    customerId
  );

  const product = productResp.data.site.route.node;

  if (!product || product.__typename !== "Product") {
    throw new Error(`Product not found for "${path}"`);
  }

  return product;
}
