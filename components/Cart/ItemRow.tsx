import Image from "next/image";
import { CartItem } from "@/lib/bc-client/types/cart";

const CartItemRow = (
  { item, currencyCode }: { item: CartItem, currencyCode: string }
) => {
  const thumbnailSize = 100;

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currencyCode ?? 'USD',
  });

  return (
    <tr className="border-t border-neutral-300">
      <td className="w-1/2 p-8">
        {item.imageUrl && (
          <Image src={item.imageUrl} 
            alt={item.name}
            width={thumbnailSize} height={thumbnailSize / 2}
            className="max-w-2xl max-w-full block" />
        )}
        <p className="font-bold">{item.name}</p>
        {item.sku && (
          <div className="text-sm">
            <label className="font-bold">SKU:</label> {item.sku}
          </div>
        )}
        <p>{currencyFormatter.format(item.salePrice.value)}</p>
      </td>
      <td className="p-8">
        <label className="font-bold">Qty:</label>
        <span> {item.quantity}</span>
      </td>
      <td className="p-8 text-right">
        {currencyFormatter.format(item.extendedSalePrice.value)}
      </td>
    </tr>
  )
}

export default CartItemRow;
