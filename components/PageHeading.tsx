import { ReactNode } from "react";

const PageHeading = ({ children }: { children: ReactNode }) => {
  return (
    <div className="w-full p-2 text-center">
      <h1 className="text-2xl font-bold border-b border-neutral-950 inline-block">{children}</h1>
    </div>
  )
}

export default PageHeading;