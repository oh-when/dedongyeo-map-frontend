import { gql, useMutation } from '@apollo/client';

const REMOVE_COURSE = gql`
  mutation RemoveCourse($id: ID!) {
    createCourse(id: $id) {
      ok
    }
  }
`;

export function useCourseRemover(onCompleted: (ok: number) => void) {
  const [removeCourse] = useMutation<
    GQL.Mutation.RemoveCourse.Data,
    GQL.Mutation.RemoveCourse.Variables
  >(REMOVE_COURSE, {
    onCompleted: ({ removeCourse }) => {
      onCompleted(removeCourse.ok);
    }
  })

  return (courseId: string) => {
    removeCourse({
      variables: {
        id: courseId
      }
    })
  }
}
