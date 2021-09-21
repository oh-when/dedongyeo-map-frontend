import { popupState } from '../vars/global';
import type { PopupProps, PopupType } from '~/@types/popup';

export function usePopupOpener<T extends PopupType>() {
  return (props: PopupProps<T>) => {
    popupState(props);
  }
}

export const usePopupCloser = () => (): void => {
  popupState({
    popupType: null,
    popupProps: null,
  });
};
