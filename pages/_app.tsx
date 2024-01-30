import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main
      className={
        `min-h-screen px-24 py-8 flex flex-wrap 
        items-start content-start justify-center gap-4 text-neutral-950
        ${inter.className}`
      }
    >
      <Component {...pageProps} />
    </main>
  )
}
