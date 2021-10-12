import React from 'react';
import Head from 'next/head';
import GNB from '~/components/_layout/GNB';
import Wrap from '~/components/_layout/Wrap';
import Main from '~/components/_layout/Main';
import CourseEditor from '~/components/Course/Editor';
import Popup from '~/components/Popup';
import { addApolloState, initializeApollo } from '~/lib/apollo/client';
import {
  GET_CANDIDATE_STICKERS,
  updateCandidates,
} from '~/components/Course/Editor/Candidates/CandidatesState';
import type { GetServerSideProps } from 'next';
import { serverSideQuery } from '~/lib/apollo/fetch';

type Props = {
  candidates: GQL.Sticker[];
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const client = initializeApollo();
  const { data } = await serverSideQuery<GQL.Query.Stickers.Data>(
    {
      query: GET_CANDIDATE_STICKERS,
    },
    req
  );
  const candidates = (data && data.stickers) || [];

  addApolloState(client, {
    props: {},
    revalidate: 1,
  });

  return { props: { candidates } };
};

const CourseEditorPage: React.FC<Props> = ({ candidates }) => {
  updateCandidates(candidates);

  return (
    <>
      <Head>
        <title>데동여지도 Deji</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrap>
        <GNB />
        <Main>
          <CourseEditor />
          <Popup />
        </Main>
      </Wrap>
    </>
  );
};

export default CourseEditorPage;
