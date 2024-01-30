import { GetServerSidePropsContext } from 'next';
import { getGlobalData } from './bc-client/queries/getGlobalData';

const getGlobalServerSideProps = (async ({ req, res }: GetServerSidePropsContext) => {
  let globalData;
  try {
    globalData = await getGlobalData();
  } catch (err) {
    console.log(err);
    globalData = null;
  }

  return globalData;
});

export default getGlobalServerSideProps;
