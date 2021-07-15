import React from 'react';
import Head from 'next/head';
import GNB from '~/components/_layout/GNB';
import Wrap from '~/components/_layout/Wrap';
import Main from '~/components/_layout/Main';
import CourseList from '~/components/Course/List';
import { addApolloState, initializeApollo } from '~/lib/apollo/client';
import type { GetServerSideProps } from 'next';
import { GET_COURSES_BY_DATE } from '~/components/Course/List/SideBar/Calendar/CalendarState';
import { changeCurrentCourses } from '~/components/Course/List/SideBar/CourseList/CourseListState';
import Popup from '~/components/Popup';

type Props = {
  courses: GQL.Course[];
};

export const getServerSideProps: GetServerSideProps = async () => {
  const client = initializeApollo();
  const { data } = await client.query<
    GQL.Query.Courses.Data,
    GQL.Query.Courses.Variables
  >({
    query: GET_COURSES_BY_DATE,
    variables: {
      searchCourseInput: {
        startAt: 1622505600000,
        endAt: 1625097600000,
        isShare: true,
      },
    },
  });
  const courses = (data && data.courses) || [];

  addApolloState(client, {
    props: {},
    revalidate: 1,
  });

  return { props: { courses } };
};

const CourseListPage: React.FC<Props> = ({ courses }) => {
  changeCurrentCourses(courses);

  return (
    <>
      <Head>
        <title>데동여지도 Deji</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Wrap>
        <GNB />
        <Main>
          <CourseList />
          <Popup />
        </Main>
      </Wrap>
    </>
  );
};

export default CourseListPage;
