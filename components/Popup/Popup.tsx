import React, { ReactElement } from 'react';
import { useReactiveVar } from '@apollo/client';
import { PopupType } from '~/@types/popup.d';
import { popupState } from '~/lib/apollo/vars/global';
import Modal from '~/components/_common/Modal';
import SignIn from '~/components/User/SignIn/SignIn';
import SignUp from '~/components/User/SignUp/SignUp';
import ForgotId from '~/components/User/ForgotId/ForgotId';
import ForgotPassword from '../User/ForgotPassword/ForgotPassword';
import SpotGenerator from './SpotGenerator';
import CourseShare from './CourseShare';
import CourseDelete from "./CourseDelete";

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
    case PopupType.COURSE_DELETE: {
      return (
        <Modal>
          <CourseDelete zIndex="10001" {...popupProps} />
        </Modal>
      )
    }
    case PopupType.SIGN_IN: {
      return (
        <Modal>
          <SignIn zIndex="10002" />
        </Modal>
      );
    }
    case PopupType.SIGN_UP: {
      return (
        <Modal>
          <SignUp zIndex="10003" />
        </Modal>
      );
    }
    case PopupType.FORGOT_ID: {
      return (
        <Modal>
          <ForgotId zIndex="10004" />
        </Modal>
      );
    }
    case PopupType.FORGOT_PASSWORD: {
      return (
        <Modal>
          <ForgotPassword zIndex="10005" />
        </Modal>
      );
    }
    default:
      return null;
  }
};
