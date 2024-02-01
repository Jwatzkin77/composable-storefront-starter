import { GetServerSideProps } from 'next';
import getGlobalServerSideProps from '@/lib/getGlobalServerSideProps';
import { getCookie } from "cookies-next";
import { getCartDetails } from '@/lib/bc-client/queries/getCartDetails';
import { CartDetails } from '@/lib/bc-client/types/cart';
import PageHeading from '@/components/PageHeading';
import CartItemRow from '@/components/Cart/ItemRow';
import { createCheckoutRedirectUrl } from '@/lib/bc-client/rest/createCheckoutRedirectUrl';

export const getServerSideProps = (async (context) => {
  const globalProps = await getGlobalServerSideProps(context);

  const { req, res } = context;
  const cartId = getCookie("cartId", { req, res });

  let cart;
  try {
    cart = (cartId) ? await getCartDetails(cartId) : null;
  } catch (err) {
    cart = null;
  }

  return {
    props: {
      ... globalProps,
      cart,
      checkoutRedirectUrl: (cartId) ? await createCheckoutRedirectUrl(cartId) : '',
    }
  };
}) satisfies GetServerSideProps;

export default function CartPage(
  { cart, checkoutRedirectUrl }: { cart: CartDetails | null, checkoutRedirectUrl: string }
) {
  if (!cart) {
    return (
      <>
        <PageHeading>Cart</PageHeading>
        <div className="w-1/2 text-center">There are no items in the cart.</div>
      </>
    )
  }

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: cart?.currencyCode ?? 'USD',
  });

  return (
    <>
      <PageHeading>Cart</PageHeading>
      <div className="w-full flex justify-center">
        <table className="w-2/3">
          <tbody>
            {cart.lineItems.map(item => (
              <CartItemRow key={item.entityId} item={item} currencyCode={cart.currencyCode} />
            ))}
          </tbody>
          <tfoot>
            <tr>
              <th className="px-8 py-4 text-right" colSpan={2}>Subtotal</th>
              <td className="px-8 py-4 text-right">{currencyFormatter.format(cart.baseAmount.value)}</td>
            </tr>
            <tr>
              <th className="px-8 py-4 text-right" colSpan={2}>Grand Total</th>
              <td className="px-8 py-4 text-right">{currencyFormatter.format(cart.amount.value)}</td>
            </tr>
            <tr>
              <td></td>
              <td className="p-8 text-right" colSpan={2}>
                {checkoutRedirectUrl && (
                  <a className="p-2 rounded-md text-lg px-4 font-normal cursor-pointer
                    bg-neutral-700 text-white hover:bg-neutral-500 disabled:bg-neutral-500
                    hover:no-underline"
                    href={checkoutRedirectUrl}>
                    Proceed to Checkout
                  </a>
                )}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  )
}