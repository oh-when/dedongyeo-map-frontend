import { useEffect } from 'react';
import { gql, makeVar, useApolloClient, useReactiveVar } from '@apollo/client';
import { CandidateCardStatus } from '~/components/Course/Editor/Editor.d';
import type { CandidateCardDTO } from '~/components/Course/Editor/Editor.d';

export const candidatesVar = makeVar<CandidateCardDTO[]>([]);

const GET_CANDIDATE_STICKERS = gql`
  query GetStickers {
    stickers {
      _id
      sticker_index
      sweet_percent
      is_used
      spot(populate: true) {
        _id
        place_name
      }
    }
  }
`;

export function useCandidates(): CandidateCardDTO[] {
  const client = useApolloClient();
  const candidates = useReactiveVar(candidatesVar);

  useEffect(() => {
    client
      .query<GQL.Query.Stickers.Data>({
        query: GET_CANDIDATE_STICKERS,
      })
      .then(({ data }) => {
        const candidates: CandidateCardDTO[] = data.stickers
          .filter((sticker) => !sticker.is_used)
          .map((sticker) => ({
            id: sticker._id,
            spotName: sticker.spot.place_name,
            sweetPercent: sticker.sweet_percent,
            stickerIndex: sticker.sticker_index,
            partner: '애인', // TODO: BE 지원
            timestamp: Date.now(), // TODO: BE 지원
            status: CandidateCardStatus.Wait,
          }));
        candidatesVar(candidates);
      });
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
