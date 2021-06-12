import { resetCandidates } from './Editor/Candidates/CandidatesState';
import { resetFormTable } from './Editor/CourseForm/StickerForm/StickerFormState';
import { setFormTitle } from './Editor/CourseForm/TextForm/TextFormState';

export function resetCourseState(): void {
  setFormTitle('');
  resetFormTable();
  resetCandidates();
}
