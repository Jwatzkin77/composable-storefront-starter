import { GetServerSidePropsContext } from 'next';
import { getGlobalData } from './bc-client/queries/getGlobalData';
import getCurrentCustomer from './getCurrentCustomer';

const getGlobalServerSideProps = (async ({ req, res }: GetServerSidePropsContext) => {
  const customer = getCurrentCustomer(req, res);

  let globalData;
  try {
    globalData = await getGlobalData(customer?.entityId);
  } catch (err) {
    console.log(err);
    globalData = null;
  }

  return globalData;
});

export default getGlobalServerSideProps;
