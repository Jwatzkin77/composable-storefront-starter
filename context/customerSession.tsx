import { useContext, createContext, useEffect, useState, ReactNode } from "react";
import { Cart } from "@/lib/bc-client/types/cart";

type CustomerSessionData = {
  cart: Cart | null,
  setCart: (cart: Cart) => void,
  loggedIn: boolean,
  setLoggedIn: (loggedIn: boolean) => void,
}

export const CustomerSessionContext = createContext<CustomerSessionData>({
  cart: null,
  setCart: (cart) => {},
  loggedIn: false,
  setLoggedIn: (loggedIn) => {},
});

export const CustomerSessionProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Cart | null>(null);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);

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
        setLoggedIn(Boolean(res.loggedIn));
      })
  }, []);

  return (
    <CustomerSessionContext.Provider value={{ cart, setCart, loggedIn, setLoggedIn }}>
      {children}
    </CustomerSessionContext.Provider>
  )
}

export const useCustomerSession = () => useContext(CustomerSessionContext);
