import { GetServerSideProps } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import getGlobalServerSideProps from '@/lib/getGlobalServerSideProps';
import { PagedCategory, CategoryProduct } from '@/lib/bc-client/types/catalog';
import { getCategoryWithProducts } from '@/lib/bc-client/queries/getCategoryWithProducts';
import PageHeading from '@/components/PageHeading';
import ProductCard from '@/components/ProductCard';
import ArrowLongRight from '@/components/icons/ArrowLongRight';
import ArrowLongLeft from '@/components/icons/ArrowLongLeft';

export const getServerSideProps = (async (context) => {
  const globalProps = await getGlobalServerSideProps(context);

  const pathParam = context.params?.catPath ?? [];
  const pathSegments = Array.isArray(pathParam) ? pathParam : [pathParam];
  const path = "/" + pathSegments.join("/");

  const mainImgSize = 500;
  const thumbnailSize = 500;

  const { before, after } = context.query;
  
  let category;
  try {
    category = await getCategoryWithProducts(
      path, 
      mainImgSize,
      thumbnailSize,
      {
        limit: 12,
        before: before ? String(before) : undefined,
        after: after ? String(after) : undefined,
      }
    );
  } catch (err) {
    console.log(err);
    category = null;
  }

  if (!category) {
    return {
      props: { ... globalProps },
      notFound: true,
    }
  }

  return {
    props: {
      ... globalProps,
      category,
      mainImgSize,
      thumbnailSize
    }
  };
}) satisfies GetServerSideProps;

export default function CategoryPage(
  {category, mainImgSize, thumbnailSize}: {category: PagedCategory, mainImgSize: number, thumbnailSize: number}
) {
  const { before, after } = category.page;

  return (
    <>
      <PageHeading>{category.name}</PageHeading>

      <div className="w-full max-w-screen-2xl flex justify-center">
        <div className="px-8 border-x-2 border-neutral-300 xl:w-2/3">
          {category.defaultImage && (
            <Image src={category.defaultImage.url} 
              alt={category.defaultImage.altText ?? ''}
              width={mainImgSize} height={mainImgSize / 2}
              className="max-w-full inline-block mr-4 
                md:w-1/2 md:max-w-3xl md:float-left" />
          )}
          {category.description && (
            <div className="text-lg" dangerouslySetInnerHTML={{__html: category.description}} />
          )}
        </div>
      </div>

      <ul className="w-full max-w-screen-2xl grid grid-cols-1
        md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-8">
        {category.products.map(product => (
          <li key={product.sku} className="bg-neutral-200 rounded-md p-4">
            <ProductCard product={product} thumbnailSize={thumbnailSize} />
          </li>
        ))}
      </ul>

      <div className="w-1/4 flex justify-around">
          {before && (
            <Link href={`/category${category.path}?before=${before}`}><ArrowLongLeft /></Link>
          )}
          {after && (
            <Link href={`/category${category.path}?after=${after}`}><ArrowLongRight /></Link>
          )}
      </div>
    </>
  )
}
