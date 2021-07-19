import React, { useState } from 'react';
import * as $ from './ForgotPasswordView';
// import { useRouter } from 'next/router';
import type { PopupChildProps } from '~/@types/popup.d';
import { usePopupCloser } from '~/lib/apollo/hooks/usePopup';

export type Props = PopupChildProps;

const ForgotPassword: React.FC<Props> = ({ zIndex }) => {
  // const { pathname } = useRouter();
  const emailRegExp = /^[0-9a-z]([-_\.]?[0-9a-z])*@[0-9a-z]([-_\.]?[0-9a-z])*\.[a-z]/;
  const closePopup = usePopupCloser();

  const [email, setEmail] = useState('');

  const handleClickCloseButton = (e: React.MouseEvent) => {
    e.preventDefault();
    closePopup();
  };

  const resetPassword = async (e: any) => {
    e.preventDefault();
    if (email === '') {
      alert('이메일주소를 입력해주세요.');
    } else if (email.match(emailRegExp) === null) {
      alert('이메일주소가 올바르지 않습니다. (영문 소문자만 입력가능)');
    } else {
      // 비밀번호 재설정 쿼리 요청 (백 작업 미정)
    }
  };

  const handleEmailValue = (e: any) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  return (
    <>
      <$.ModalDiv zIndex={zIndex}>
        <$.CloseBtn onClick={handleClickCloseButton} />
        <$.ModalContentDiv>
          <div
            style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <$.MainTitle>비밀번호를 잊으셨나요?</$.MainTitle>
          </div>
          <$.SubTitle>
            비밀번호를 재설정하려는 이메일 주소를 입력해주세요.
          </$.SubTitle>

          <$.InputBox>
            <$.Input
              id="email"
              value={email}
              onChange={handleEmailValue}
              placeholder="example@gmail.com"
            />
          </$.InputBox>
          <$.NextButton onClick={resetPassword}>다음</$.NextButton>
        </$.ModalContentDiv>
      </$.ModalDiv>
    </>
  );
};

export default ForgotPassword;
