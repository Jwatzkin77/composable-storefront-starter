import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import { GlobalDataContext } from "@/context/globalData";
import { CustomerSessionProvider } from "@/context/customerSession";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  const { settings, navCategories } = pageProps;
  return (
    <GlobalDataContext.Provider value={{settings, navCategories}}>
      <CustomerSessionProvider>
        <main
          className={
            `min-h-screen px-24 py-8 flex flex-wrap 
            items-start content-start justify-center gap-4 text-neutral-950
            ${inter.className}`
          }
        >
          <Header />
          <Component {...pageProps} />
        </main>
      </CustomerSessionProvider>
    </GlobalDataContext.Provider>
  )
}
