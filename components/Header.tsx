import Image from "next/image";
import { useGlobalData } from "@/context/globalData";

const Header = () => {
  const { settings } = useGlobalData();

  if (!settings) {
    return '';
  }

  const { logoImageUrl, logoText, storeName } = settings;

  return (
    <header className="w-full p-4 border-b border-neutral-300">
      <div className="flex items-center justify-between">
        <h1>
          <a href="/">
            {logoImageUrl ? (
              <Image src={logoImageUrl}
                alt={storeName ?? ''} width={300} height={200} />
            ) : (
              <span className="font-bold text-2xl">{logoText ?? (storeName ?? '')}</span>
            )}
          </a>
        </h1>
      </div>
    </header>
  )
}

export default Header;