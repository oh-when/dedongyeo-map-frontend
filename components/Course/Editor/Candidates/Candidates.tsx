import React from 'react';
import CandidateCard from './CandidateCard';
import { useCandidates } from './CandidatesState';
import * as $ from './CandidatesView';
import type { CandidateCardDTO } from '../Editor.d';

export default function Candidates(): JSX.Element {
  const candidates: CandidateCardDTO[] = useCandidates();

  return (
    <$.Candidate>
      <$.AreaTitle>스팟 리스트</$.AreaTitle>
      <$.AreaList>
        <$.List>
          {candidates.map((candidate) => (
            <$.Item key={`ci-${candidate.id}`}>
              <CandidateCard candidate={candidate} />
            </$.Item>
          ))}
        </$.List>
      </$.AreaList>
    </$.Candidate>
  );
}
