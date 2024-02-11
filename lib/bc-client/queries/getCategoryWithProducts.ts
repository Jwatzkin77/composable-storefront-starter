import { bcGqlFetch } from "../bc-client-gql";
import { BasicCategory, Category, CategoryProduct } from "../types/catalog";

const categoryFragment = `
fragment categoryFields on Category {
  name
  path
  description
  defaultImage {
    url(width: $mainImgSize)
    altText
  }
}
`

const productFragment = `
fragment productFields on Product {
  sku
  name
  path
  prices {
    price {
      value
      currencyCode
    }
  }
  defaultImage {
    url(width: $thumbnailSize)
    altText
  }
}
`

const getCategoryQuery = `
query GetCategory(
  $path: String!,
  $mainImgSize: Int!
  $thumbnailSize: Int!
) {
  site {
    route(path: $path) {
      node {
        __typename
        ... on Category {
          ... categoryFields
          products {
            edges {
              node {
                ... productFields
              }
            }
          }
        }
      }
    }
  }
}

${categoryFragment}

${productFragment}
`;

type GetCategoryWithProductsVars = {
  path: string,
  mainImgSize: number,
  thumbnailSize: number,
}

type GetCategoryWithProductsResp = {
  data: {
    site: {
      route: {
        node: BasicCategory & {
          "__typename": string,
          products: {
            edges: {
              node: CategoryProduct,
            }[],
          },
        },
      },
    },
  },
}

export const getCategoryWithProducts: (
  path: string,
  mainImgSize: number,
  thumbnailSize: number
) => Promise<Category> = async (
  path,
  mainImgSize,
  thumbnailSize
) => {
  const categoryResp = await bcGqlFetch<GetCategoryWithProductsResp, GetCategoryWithProductsVars>(
    getCategoryQuery,
    {
      path,
      mainImgSize,
      thumbnailSize,
    }
  );

  const category = categoryResp.data.site.route.node;
  if (!category || category.__typename !== "Category") {
    throw new Error(`No category found for "${path}"`);
  }

  const products = (category.products?.edges ?? []).map(edge => edge.node);

  return {
    ...category,
    products,
  };
}
