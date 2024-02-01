import { useCustomerSession } from "@/context/customerSession";
import Link from "next/link";
import Cart from "./icons/Cart";

const MiniCart = () => {
  const {cart} = useCustomerSession();

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: cart?.currencyCode ?? 'USD',
  });

  return (
    <div>
      <Link href="/cart"><Cart className="w-6 h-6 inline-block" /></Link>
      {cart && (
        <span>({cart.totalQuantity}) - {currencyFormatter.format(cart.amount.value)}</span>
      )}
    </div>
  )
}

export default MiniCart;
