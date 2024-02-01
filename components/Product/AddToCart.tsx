import { useState } from "react";
import { Cart } from "@/lib/bc-client/types/cart";
import { Product } from "@/lib/bc-client/types/catalog";
import { useCustomerSession } from "@/context/customerSession";

const AddToCart = ({ product }: {product: Product}) => {
  const [loading, setLoading] = useState(false);
  const { setCart } = useCustomerSession();

  const onClick = async () => {
    setLoading(true);

    const res:{cart: Cart | null} = await fetch("/api/addToCart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        productId: product.entityId,
      })
    }).then(res => res.json());

    if (res.cart) {
      setCart(res.cart);
    }

    setLoading(false);
  }

  return (
    <div>
      <button disabled={loading} className="p-2 rounded-md text-lg w-44
        bg-neutral-700 text-white hover:bg-neutral-500 disabled:bg-neutral-500"
        onClick={onClick}>
          {loading ? (
            <span>...</span>
          ) : (
            <span>
              Add to Cart
            </span>
          )}
        </button>
    </div>
  )
}

export default AddToCart;
