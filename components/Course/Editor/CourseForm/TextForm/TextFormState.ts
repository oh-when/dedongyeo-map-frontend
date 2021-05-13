import { makeVar, ReactiveVar, useReactiveVar } from '@apollo/client';

export const formTitleVar: ReactiveVar<string> = makeVar<string>('');

export function useFormTitle(): string {
  return useReactiveVar(formTitleVar);
}

export function setFormTitle(title: string): void {
  formTitleVar(title);
}
