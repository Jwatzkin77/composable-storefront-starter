import { GetServerSideProps } from 'next';
import PageHeading from "@/components/PageHeading";
import getGlobalServerSideProps from '@/lib/getGlobalServerSideProps';

export const getServerSideProps = (async (context) => {
  return {
    props: {
      ... await getGlobalServerSideProps(context),
    }
  };
}) satisfies GetServerSideProps;

export default function Home() {
  return (
    <>
      <PageHeading>Welcome to a BigCommerce Storefront!</PageHeading>
      <div className="w-1/3 text-center">
        This storefront is built in <a target="_blank" href="https://nextjs.org/">Next.js</a>.
      </div>
    </>
  );
}
