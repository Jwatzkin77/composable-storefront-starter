import { GetServerSideProps } from 'next';
import Image from 'next/image';
import getGlobalServerSideProps from '@/lib/getGlobalServerSideProps';
import { Category } from '@/lib/bc-client/types/catalog';
import { getCategoryWithProducts } from '@/lib/bc-client/queries/getCategoryWithProducts';
import PageHeading from '@/components/PageHeading';
import ProductCard from '@/components/ProductCard';

export const getServerSideProps = (async (context) => {
  const globalProps = await getGlobalServerSideProps(context);

  const pathParam = context.params?.catPath ?? [];
  const pathSegments = Array.isArray(pathParam) ? pathParam : [pathParam];
  const path = "/" + pathSegments.join("/");

  const mainImgSize = 500;
  const thumbnailSize = 500;
  
  let category;
  try {
    category = await getCategoryWithProducts(
      path, 
      mainImgSize, 
      thumbnailSize
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
  {category, mainImgSize, thumbnailSize}: {category: Category, mainImgSize: number, thumbnailSize: number}
) {
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
    </>
  )
}
