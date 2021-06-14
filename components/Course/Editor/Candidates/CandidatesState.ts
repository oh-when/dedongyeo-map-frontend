import { useEffect } from 'react';
import { gql, makeVar, useApolloClient, useReactiveVar } from '@apollo/client';
import { CandidateCardStatus } from '~/components/Course/Editor/Editor.d';
import type { CandidateCardDTO } from '~/components/Course/Editor/Editor.d';

export const candidatesVar = makeVar<CandidateCardDTO[]>([]);

export const GET_CANDIDATE_STICKERS = gql`
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

export function updateCandidates(newCandidates: GQL.Sticker[]): void {
  const prevs: CandidateCardDTO[] = candidatesVar();
  const candidates: CandidateCardDTO[] = newCandidates
    .filter((sticker) => !sticker.is_used)
    .map((sticker) => {
      const prev = prevs.find((c) => c.id === sticker._id);

      if (prev) {
        return prev;
      }

      return {
        id: sticker._id,
        spotName: sticker.spot.place_name,
        sweetPercent: sticker.sweet_percent,
        stickerIndex: sticker.sticker_index,
        partner: '애인', // TODO: BE 지원
        timestamp: Math.floor(Date.now() / 1000), // TODO: BE 지원
        status: CandidateCardStatus.Wait,
      };
    });

  candidatesVar(candidates);
}

export function useCandidates(): CandidateCardDTO[] {
  const client = useApolloClient();
  const candidates = useReactiveVar(candidatesVar);

  useEffect(() => {
    client
      .query<GQL.Query.Stickers.Data>({
        query: GET_CANDIDATE_STICKERS,
      })
      .then(({ data }) => {
        updateCandidates(data.stickers);
      });
  }, []);

  return candidates;
}

export function resetCandidates(): void {
  candidatesVar([]);
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
