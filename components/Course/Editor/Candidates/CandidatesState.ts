import { useEffect } from 'react';
import { makeVar, useReactiveVar } from '@apollo/client';
import { CandidateCardStatus } from '~/components/Course/Editor/Editor.d';
import type { CandidateCardDTO } from '~/components/Course/Editor/Editor.d';

export const candidatesVar = makeVar<CandidateCardDTO[]>([]);

export function useCandidates(): CandidateCardDTO[] {
  const candidates = useReactiveVar(candidatesVar);

  useEffect(() => {
    // TODO: query
    candidatesVar([]);
  }, []);

  return candidates;
}

export function setCandidateStatus(
  id: string,
  status: CandidateCardStatus
): void {
  const nextCandidates = candidatesVar().map((candidate) =>
    candidate.id === id
      ? {
          ...candidate,
          status,
        }
      : candidate
  );
  candidatesVar(nextCandidates);
}

export function removeMovedCandidates(): void {
  const nextCandidates = candidatesVar().filter(
    (candidate) => candidate.status === CandidateCardStatus.Moved
  );

  candidatesVar(nextCandidates);
}

export function getMovingCandidate(): CandidateCardDTO {
  const candidates: CandidateCardDTO[] = candidatesVar();
  let movingCandidate: CandidateCardDTO = null;

  for (let i = 0; i < candidates.length; ++i) {
    if (candidates[i].status === CandidateCardStatus.Moving) {
      movingCandidate = candidates[i];
      break;
    }
  }

  return movingCandidate;
}
