import { GetServerSideProps } from 'next';
import PageHeading from "@/components/PageHeading";
import { getGlobalData, StoreSettings } from '@/lib/bc-client/queries/getGlobalData';
import Header from '@/components/Header';

export const getServerSideProps = (async (context) => {
  let globalData;
  try {
    globalData = await getGlobalData();
  } catch (err) {
    console.log(err);
    globalData = null;
  }

  return {
    props: {
      ...globalData,
    }
  };
}) satisfies GetServerSideProps;

export default function Home({ settings }: { settings?: StoreSettings }) {
  return (
    <>
      <Header settings={settings} />
      <PageHeading>Welcome to a BigCommerce Storefront!</PageHeading>
      <div className="w-1/3 text-center">
        This storefront is built in <a target="_blank" href="https://nextjs.org/">Next.js</a>.
      </div>
    </>
  );
}
