import {
  gql,
  makeVar,
  ReactiveVar,
  useApolloClient,
  useReactiveVar,
} from '@apollo/client';
import { useEffect } from 'react';
import { changeCurrentCourses } from '~/components/Course/List/SideBar/CourseList/CourseListState';

export const GET_COURSES_BY_DATE = gql`
  query GetCoursesByDate {
    courses {
      _id
      title
      courseImage
      is_share
      stickers(populate: true) {
        _id
        is_used
        sticker_index
        sweet_percent
        spot(populate: true) {
          _id
          place_name
          x
          y
        }
      }
    }
  }
`;

type Cursor = [number, number, number];

const now: Date = new Date();
export const cursorVar: ReactiveVar<Cursor> = makeVar([
  now.getFullYear(),
  now.getMonth() + 1,
  now.getDate(),
]);

export function useCursorState(): [Cursor, (newCursor: Cursor) => void] {
  const client = useApolloClient();
  const cursor = useReactiveVar(cursorVar);
  const setCursor = (newCursor: Cursor) => {
    cursorVar(newCursor);
  };

  useEffect(() => {
    client
      .query<GQL.Query.Courses.Data>({
        query: GET_COURSES_BY_DATE,
      })
      .then(({ data }) => {
        changeCurrentCourses(data.courses);
      });
  }, [cursor]);

  return [cursor, setCursor];
}
