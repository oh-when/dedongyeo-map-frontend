import React from 'react';
import { CLASSNAME_COURSE_EDITOR_SPOT } from '~/constants/dom';
import * as $ from './PopupMenuView';
import type { StickerCardDTO } from '~/components/Course/Editor/Editor.d';
import { usePopupPosition, usePopupSticker } from './PopupMenuState';
import { removeStickerCard } from '~/components/Course/Editor/CourseForm/StickerForm/StickerFormState';
import { activeCandidate } from '~/components/Course/Editor/Candidates/CandidatesState';

type Props = {
  sticker: StickerCardDTO
};

export default function PopupMenu(props: Props): JSX.Element {
  const currentSticker = usePopupSticker();
  const position = usePopupPosition();

  const onClickDeleteButton = (e: React.MouseEvent) => {
    e.preventDefault();
    removeStickerCard(props.sticker.id);
    activeCandidate(props.sticker.id);
  };

  if (!currentSticker || props.sticker.id !== currentSticker.id) {
    return null;
  }

  return (
    <$.PopupMenu className={CLASSNAME_COURSE_EDITOR_SPOT} style={position}>
      <$.Button onClick={onClickDeleteButton}>삭제</$.Button>
    </$.PopupMenu>
  );
}
