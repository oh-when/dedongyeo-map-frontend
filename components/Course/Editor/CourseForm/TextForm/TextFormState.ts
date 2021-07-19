import { makeVar, ReactiveVar, useReactiveVar } from '@apollo/client';

export const formTitleVar: ReactiveVar<string> = makeVar<string>('');
export const formIsShareVar: ReactiveVar<boolean> = makeVar<boolean>(true);

export function useFormTitle(): string {
  return useReactiveVar(formTitleVar);
}

export function useIsShare(): boolean {
  return useReactiveVar(formIsShareVar);
}

export function setFormTitle(title: string): void {
  formTitleVar(title);
}

export function setIsShare(isShare: boolean): void {
  formIsShareVar(isShare);
}
