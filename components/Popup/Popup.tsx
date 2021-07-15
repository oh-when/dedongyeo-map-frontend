import React, { ReactElement } from 'react';
import { useReactiveVar } from '@apollo/client';
import SpotGenerator from './SpotGenerator';
import CourseShare from './CourseShare';
import { PopupType } from '~/@types/popup.d';
import { popupState } from '~/lib/apollo/vars/global';
import Modal from '~/components/_common/Modal';

/**
 * @description
 * App 전체의 Stacking Context(zIndex)를 일괄적으로 관리하고,
 * 모달 통합관리를 위한 모듈
 */
export default function Popup(): ReactElement {
  const { popupType, popupProps } = useReactiveVar(popupState);

  console.log('RENDER POPUP: ', popupType, popupProps);

  switch(popupType) {
    case PopupType.SPOT_GENERATOR: {
      return (
        <Modal>
          <SpotGenerator zIndex="10000" {...popupProps} />
        </Modal>
      );
    }
    case PopupType.COURSE_SHARE: {
      return (
        <Modal>
          <CourseShare zIndex="10001" {...popupProps} />
        </Modal>
      );
    }
    default:
      return null;
  }
}
