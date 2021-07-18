import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import GNB from '~/components/_layout/GNB';
import Wrap from '~/components/_layout/Wrap';
import Main from '~/components/_layout/Main';
import { addApolloState, initializeApollo } from '../lib/apollo/client';
import type { GetStaticProps } from 'next';
import { usePopupOpener } from '../lib/apollo/hooks/usePopup';
import { PopupType } from '~/@types/popup.d';
import { useSession } from 'next-auth/client';

export const getStaticProps: GetStaticProps = async () => {
  const apolloClient = initializeApollo();

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  });
};

const Home = dynamic(() => import('~/components/Home'), {
  ssr: false,
});

const HomePage: React.FC = () => {
  const [session, loading] = useSession();

  const openPopup = usePopupOpener();

  useEffect(() => {
    // TODO: 로그인 안한 사람이면 로그인 팝업 뜨게 하기
    openPopup({
      popupType: PopupType.SIGN_IN,
    });
  }, []);

  return (
    <>
      <Head>
        <title>데동여지도 Deji</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrap>
        <GNB />
        <Main>
          <Home />
        </Main>
      </Wrap>
    </>
  );
};

export default HomePage;
