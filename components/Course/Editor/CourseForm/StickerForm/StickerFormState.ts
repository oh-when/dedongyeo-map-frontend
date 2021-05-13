import { makeVar, ReactiveVar, useReactiveVar } from '@apollo/client';
import {
  setCandidateStatus,
  getMovingCandidate,
} from '~/components/Course/Editor/Candidates/CandidatesState';
import { CandidateCardStatus } from '~/components/Course/Editor/Editor.d';
import type {
  StickerCardDTO,
  FormArrayDTO,
  CandidateCardDTO,
} from '~/components/Course/Editor/Editor.d';

export const formArrayVar: ReactiveVar<FormArrayDTO> = makeVar<FormArrayDTO>([
  null,
]);

export function useFormArray(): FormArrayDTO {
  return useReactiveVar(formArrayVar);
}

export function addPlaceholder(): void {
  formArrayVar([...formArrayVar(), null]);
}

export function replacePlaceholder(order: number): void {
  const dropped: CandidateCardDTO = getMovingCandidate();
  const stickerCardDTO: StickerCardDTO = {
    id: dropped.id,
    spotName: dropped.spotName,
    sweetPercent: dropped.sweetPercent,
    stickerIndex: dropped.stickerIndex,
    partner: dropped.partner,
    timestamp: dropped.timestamp,
  };

  const nextFormArray: FormArrayDTO = [...formArrayVar()];
  const index: number = order - 1;

  nextFormArray.splice(index, 1, stickerCardDTO);
  formArrayVar(nextFormArray);
  setCandidateStatus(dropped.id, CandidateCardStatus.Moved);
}

export function resetFormTable(): void {
  formArrayVar([null]);
}
