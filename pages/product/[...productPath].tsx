import { GetServerSideProps } from 'next';
import Image from 'next/image';
import getGlobalServerSideProps from '@/lib/getGlobalServerSideProps';
import { Product } from '@/lib/bc-client/types/catalog';
import { getProduct } from '@/lib/bc-client/queries/getProduct';
import PageHeading from '@/components/PageHeading';
import AddToCart from '@/components/Product/AddToCart';
import getCurrentCustomer from '@/lib/getCurrentCustomer';

export const getServerSideProps = (async (context) => {
  const globalProps = await getGlobalServerSideProps(context);

  const pathParam = context.params?.productPath ?? [];
  const pathSegments = Array.isArray(pathParam) ? pathParam : [pathParam];
  const path = "/" + pathSegments.join("/");

  const { req, res } = context;
  const customer = getCurrentCustomer(req, res);

  const imgSize = 900;

  let product;
  try {
    product = await getProduct(path, imgSize, customer?.entityId);
  } catch (err) {
    console.log(err);
    product = null;
  }

  if (!product) {
    return {
      props: {... globalProps},
      notFound: true,
    }
  }

  return {
    props: {
      ... globalProps,
      product,
      imgSize
    }
  };
}) satisfies GetServerSideProps;

export default function ProductPage(
  { product, imgSize }: { product: Product, imgSize: number }
) {
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.prices.price.currencyCode,
  });

  return (
    <>
      <PageHeading>{product.name}</PageHeading>
      <div className="w-full max-w-screen-2xl flex flex-wrap justify-center">
        <div className="w-1/2">
          {product.defaultImage && (
            <Image src={product.defaultImage.url} 
              alt={product.defaultImage.altText ?? ''}
              width={imgSize} height={imgSize / 2}
              className="" />
          )}
        </div>
        <div className="w-1/2 p-4">
          <p className="my-2"><label className="font-bold">SKU:</label> {product.sku}</p>
          {product.description && (
            <div dangerouslySetInnerHTML={{__html: product.description}}
              className="my-2" />
          )}
          <div className="text-lg my-4">
            <label className="font-bold">Price:</label>
            <span> {currencyFormatter.format(product.prices.price.value)}</span>
          </div>
          <AddToCart product={product} />
        </div>
      </div>
    </>
  )
}