import { gql, useMutation, useApolloClient } from '@apollo/client';
import { removeMovedCandidates } from '~/components/Course/Editor/Candidates/CandidatesState';
import { resetFormTable, formArrayVar } from './StickerForm/StickerFormState';
import { formTitleVar } from './TextForm/TextFormState';
import { PopupType } from '~/@types/popup.d';
import { usePopupOpener } from '~/lib/apollo/hooks/usePopup';

const GET_COURSE = gql`
  query Course($courseInput: CourseInput!) {
    course(courseInput: $courseInput) {
      _id
      stickers(populate: true) {
        sweet_percent
        sticker_index
      }
      title
      is_share
      courseImage
    }
  }
`;

const CREATE_COURSE = gql`
  mutation CreateCourse($createCourseInput: CreateCourseInput!) {
    createCourse(createCourseInput: $createCourseInput) {
      _id
      stickers(populate: true) {
        sweet_percent
        sticker_index
      }
      title
      is_share
      courseImage
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
    variables: {
      createCourseInput: {
        stickers: [],
        title: '',
        is_share: false,
      },
    },
    onCompleted({ createCourse: data }) {
      client
        .query<GQL.Query.Course.Data, GQL.Query.Course.Variables>({
          query: GET_COURSE,
          variables: {
            courseInput: {
              courseId: data._id,
              courseImageInput: {
                theme: GQL.ImageThemeType.street,
                width: 800,
                height: 800,
              },
            },
          },
        })
        .then(({ data: { course } }) => {
          openPopup({
            popupType: PopupType.COURSE_SHARE,
            popupProps: {
              course,
            },
          });
        })
        .catch((err) => {
          console.error(err);
        });
    },
  });

  return () => {
    removeMovedCandidates();
    resetFormTable();
    createCourse({
      variables: {
        createCourseInput: {
          stickers: formArrayVar()
            .filter((sticker) => sticker !== null)
            .map((sticker) => sticker.id),
          title: formTitleVar(),
          is_share: true,
        },
      },
    });
  };
};
