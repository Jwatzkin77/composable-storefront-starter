import { useContext, createContext, useEffect, useState, ReactNode } from "react";
import { Cart } from "@/lib/bc-client/types/cart";

type CustomerSessionData = {
  cart: Cart | null,
  setCart: (cart: Cart) => void,
}

export const CustomerSessionContext = createContext<CustomerSessionData>({
  cart: null,
  setCart: (cart) => {},
});

export const CustomerSessionProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);

  useEffect(() => {
    fetch('/api/getCustomerSession', {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then(res => res.json())
      .then(res => {
        if (res.cart) {
          setCart(res.cart);
        }
      })
  }, []);

  return (
    <CustomerSessionContext.Provider value={{ cart, setCart }}>
      {children}
    </CustomerSessionContext.Provider>
  )
}

export const useCustomerSession = () => useContext(CustomerSessionContext);
