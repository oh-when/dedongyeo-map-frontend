import { gql, useApolloClient, useMutation } from '@apollo/client';
import { removeMovedCandidates } from '~/components/Course/Editor/Candidates/CandidatesState';
import { resetFormTable, formArrayVar } from './StickerForm/StickerFormState';
import { formTitleVar } from './TextForm/TextFormState';
import { PopupType } from '~/@types/popup.d';
import { usePopupOpener } from '~/lib/apollo/hooks/usePopup';

const GET_COURSES_BY_ID = gql`
  query GetCoursesById($courseId: ID!) {
    courses(courseId: $courseId) {
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

const CREATE_COURSE = gql`
  mutation CreateCourse($createCourseInput: CreateCourseInput!) {
    createCourse(createCourseInput: $createCourseInput) {
      _id
    }
  }
`;

export const useFormSubmitter = (): (() => void) => {
  const client = useApolloClient();
  const openPopup = usePopupOpener();
  const [createCourse] = useMutation<
    GQL.Mutation.CreateCourse.Data,
    GQL.Mutation.CreateCourse.Variables
  >(CREATE_COURSE, {
    onCompleted: ({ createCourse }) => {
      client
        .query<GQL.Query.Course.Data, GQL.Query.Course.Variables>({
          query: GET_COURSES_BY_ID,
          variables: {
            courseId: createCourse._id,
          },
        })
        .then(({ data: { course } }) => {
          openPopup({
            popupType: PopupType.COURSE_SHARE,
            popupProps: {
              course,
            },
          });
        });
    },
  });

  return () => {
    const stickers = formArrayVar()
      .filter((sticker) => sticker !== null)
      .map((sticker) => sticker.id);
    const title = formTitleVar();

    removeMovedCandidates();
    resetFormTable();
    createCourse({
      variables: {
        createCourseInput: {
          stickers,
          title,
          isShare: true,
        },
      },
    });
  };
};
