import React from 'react';
import { getStickerIconWithSugar } from '~/constants/sugar';
import { CandidateCardStatus } from '~/components/Course/Editor/Editor.d';
import { setCandidateStatus } from '~/components/Course/Editor/Candidates/CandidatesState';
import { formatDate } from '~/util';
import { DRAG_IDENTIFIER_VALUE, DRAG_KEY } from '~/constants/dom';
import * as $ from './CandidateCardView';
import type { CandidateCardDTO } from '../../Editor.d';

type Props = {
  candidate: CandidateCardDTO;
};

export default function CandidateCard(props: Props): JSX.Element {
  const { candidate } = props;

  const StickerIcon = getStickerIconWithSugar(
    candidate.sweetPercent,
    candidate.stickerIndex
  );
  const isDraggable: boolean = candidate.status === CandidateCardStatus.Wait;

  const handleDragStart = (e: React.DragEvent) => {
    setCandidateStatus(candidate.id, CandidateCardStatus.Moving);
    e.dataTransfer.setData(DRAG_KEY, DRAG_IDENTIFIER_VALUE);
    e.dataTransfer.effectAllowed = 'move';
  };

  return (
    <$.CandidateCard draggable={isDraggable} onDragStart={handleDragStart}>
      <$.AreaIcon>
        {StickerIcon && <StickerIcon width="72" height="72" />}
      </$.AreaIcon>
      <$.AreaDescription>
        <$.SpotName>{candidate.spotName}</$.SpotName>
        <$.Info>
          <$.Partner>{candidate.partner}</$.Partner>
          <$.Timestamp>{formatDate(candidate.timestamp, true)}</$.Timestamp>
        </$.Info>
      </$.AreaDescription>
    </$.CandidateCard>
  );
}
