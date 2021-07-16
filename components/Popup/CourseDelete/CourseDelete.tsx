import React from 'react';
import * as $ from "./CourseDeleteView";
import { usePopupCloser } from '~/lib/apollo/hooks/usePopup';
import { useCourseRemover } from './CourseDeleteState';
import { removeCourseInList } from '~/components/Course/List/SideBar/CourseList/CourseListState';
import type { PopupChildProps } from '~/@types/popup.d';

export type CourseDeleteProps = PopupChildProps & {
  courseId: string;
}

export default function CourseDelete({ courseId, zIndex }: CourseDeleteProps): JSX.Element {
  const closePopup = usePopupCloser();
  const removeCourse = useCourseRemover(() => {
    removeCourseInList(courseId);
    closePopup();
  });

  const onClickDelete = () => {
    window.alert("일단 삭제 ㄴㄴ, 데이터 다시 만들기 귀찮음");
    // removeCourse(courseId)
  }

  return (
    <$.CourseDelete zIndex={zIndex}>
      <$.Layer>
        <$.CloseButton onClick={closePopup} />
        <$.Title>코스 삭제하기</$.Title>
        <$.Description>
          선택한 코스를 삭제하시겠습니까?<br/>
          삭제 시 코스는 복구할 수 없습니다.
        </$.Description>
        <$.ButtonArea>
          <$.Button onClick={closePopup}>취소하기</$.Button>
          <$.Button onClick={onClickDelete}>삭제하기</$.Button>
        </$.ButtonArea>
      </$.Layer>
    </$.CourseDelete>
  )
}