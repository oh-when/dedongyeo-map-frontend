import {
  gql,
  makeVar,
  ReactiveVar,
  useApolloClient,
  useReactiveVar,
} from '@apollo/client';
import { useEffect } from 'react';
import { changeCurrentCourses } from '~/components/Course/List/Sidebar/CourseList/CourseListState';
import Calendar from '~/util/Calendar';

export const GET_COURSES_BY_DATE = gql`
  query GetCoursesByDate($searchCourseInput: SearchCourseInput) {
    courses(searchCourseInput: $searchCourseInput) {
      _id
      endAt
      isShare
      partners
      startAt
      stickers(populate: true) {
        _id
        sticker_index
        sweet_percent
        spot(populate: true) {
          _id
          place_id
          place_name
          x
          y
        }
      }
      title
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
  const dateObj = new Date(`${cursor[0]}-${cursor[1]}-${cursor[2]}`);
  const range = Calendar.getRangeByDate(dateObj);

  useEffect(() => {
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
        changeCurrentCourses(data.courses);
      });
  }, [cursor]);

  return [cursor, setCursor];
}
