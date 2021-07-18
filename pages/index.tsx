import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import GNB from '~/components/_layout/GNB';
import Wrap from '~/components/_layout/Wrap';
import Main from '~/components/_layout/Main';
import { addApolloState, initializeApollo } from '../lib/apollo/client';
import type { GetStaticProps } from 'next';
import { usePopupOpener, usePopupCloser } from '../lib/apollo/hooks/usePopup';
import { PopupType } from '~/@types/popup.d';
import { useSession } from 'next-auth/client';
import { GET_COURSES_BY_DATE } from '~/components/Course/List/Sidebar/Calendar/CalendarState';
import { useApolloClient } from '@apollo/client';

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
  const closePopup = usePopupCloser();

  useEffect(() => {
    if (loading) return;
    if (!session) {
      openPopup({
        popupType: PopupType.SIGN_IN,
      });
    } else {
      closePopup();
    }
  }, [session, loading]);

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

function tempRequest() {
  const client = useApolloClient();

  React.useEffect(() => {
    client
      .query<GQL.Query.Courses.Data, GQL.Query.Courses.Variables>({
        query: GET_COURSES_BY_DATE,
        variables: {
          searchCourseInput: {
            // startAt: range[0],
            // endAt: range[1],
            isShare: true
          },
        },
      })
      .then(({ data }) => {
        console.log("요청 완료")
      });
  }, [])
}

export default HomePage;
