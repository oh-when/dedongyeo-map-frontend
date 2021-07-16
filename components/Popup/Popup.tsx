import React from 'react';
import { useReactiveVar } from '@apollo/client';
import SpotGenerator, { Props as SpotGeneratorProps } from './SpotGenerator';
import CourseShare, { Props as CourseShareProps } from './CourseShare';
import { PopupType } from '~/@types/popup.d';
import { popupState } from '~/lib/apollo/vars/global';
import Modal from '~/components/_common/Modal';
import SignIn from '~/components/User/SignIn/SignIn';
import SignUp from '~/components/User/SignUp/SignUp';
import ForgotId from '~/components/User/ForgotId/ForgotId';
import ForgotPassword from '../User/ForgotPassword/ForgotPassword';

/**
 * @description
 * App 전체의 Stacking Context(zIndex)를 일괄적으로 관리하고,
 * 모달 통합관리를 위한 모듈
 */
const Popup: React.FC = () => {
  const { popupType, popupProps } = useReactiveVar(popupState);

  console.log('RENDER POPUP: ', popupType, popupProps);

  if (popupType === null) {
    return null;
  }

  if (popupType === PopupType.SPOT_GENERATOR) {
    const props = popupProps as SpotGeneratorProps;

    return (
      <Modal>
        <SpotGenerator zIndex="10000" {...props} />
      </Modal>
    );
  }

  if (popupType === PopupType.COURSE_SHARE) {
    const props = popupProps as CourseShareProps;

    return (
      <Modal>
        <CourseShare zIndex="10001" {...props} />
      </Modal>
    );
  }

  if (popupType === PopupType.SIGN_IN) {
    return (
      <Modal>
        <SignIn zIndex="10002" />
      </Modal>
    );
  }

  if (popupType === PopupType.SIGN_UP) {
    console.log('SIGN_UP');
    return (
      <Modal>
        <SignUp zIndex="10003" />
      </Modal>
    );
  }

  if (popupType === PopupType.FORGOT_ID) {
    console.log('FORGOT_ID');
    return (
      <Modal>
        <ForgotId zIndex="10004" />
      </Modal>
    );
  }

  if (popupType === PopupType.FORGOT_PASSWORD) {
    console.log('FORGOT_PASSWORD');
    return (
      <Modal>
        <ForgotPassword zIndex="10005" />
      </Modal>
    );
  }

  return null;
};

export default Popup;
