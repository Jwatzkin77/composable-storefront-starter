import Link from "next/link";
import Image from "next/image";
import { CategoryProduct } from "@/lib/bc-client/types/catalog";

const ProductCard = (
  { product, thumbnailSize }: { product: CategoryProduct, thumbnailSize: number }
) => {
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: product.prices.price.currencyCode,
  });

  return (
    <Link href={`/product${product.path}`}>
    {product.defaultImage && (
      <Image src={product.defaultImage.url} 
        alt={product.defaultImage.altText ?? ''}
        width={thumbnailSize} height={thumbnailSize / 2}
        className="max-w-2xl max-w-full inline-block" />
    )}
    <h2 className="text-lg">{product.name}</h2>
    <p className="font-normal text-sm">{product.sku}</p>
    <p className="font-normal my-2">
      {currencyFormatter.format(product.prices.price.value)}
    </p>
  </Link>
  )
}

export default ProductCard;
