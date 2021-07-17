import React, { useState } from 'react';
import * as $ from './SignInView';
// import { useRouter } from 'next/router';
import type { PopupChildProps } from '~/@types/popup.d';
import { usePopupOpener } from '~/lib/apollo/hooks/usePopup';
import { PopupType } from '~/@types/popup.d';
import { usePopupCloser } from '~/lib/apollo/hooks/usePopup';

export type Props = PopupChildProps;
const CHECKBOX_ID = 'daedong_chbox_allow';
const openPopup = usePopupOpener();

const SignIn: React.FC<Props> = ({ zIndex }) => {
  // const { pathname } = useRouter();
  const closePopup = usePopupCloser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleAction = (e: React.MouseEvent, movingType: string) => {
    console.log(movingType);
    e.preventDefault();
    openPopup({
      popupType: PopupType[movingType],
    });
  };

  const handleClickCloseButton = (e: React.MouseEvent) => {
    e.preventDefault();
    closePopup();
  };

  return (
    <>
      <$.ModalDiv zIndex={zIndex}>
        <$.CloseBtn onClick={handleClickCloseButton} />
        <$.ModalContentDiv>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                height: '140px',
              }}
            >
              <$.SubTitle>설레는 데이트 코스를 달달하게 기록하는</$.SubTitle>
              <br />
              <$.MainTitle>데동여지도</$.MainTitle>
            </div>
            <$.SignInImg />
          </div>

          <$.InputBox>
            <$.Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="이메일 (example@gmail.com)"
            />
          </$.InputBox>
          <$.InputBox>
            <$.Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호"
            />
          </$.InputBox>
          <$.AreaCheckBox>
            <$.RealCheckBox id={CHECKBOX_ID} defaultChecked={true} />
            <$.ViewCheckBox />
            <$.CheckBoxLabel htmlFor={CHECKBOX_ID}>
              로그인 상태 유지
            </$.CheckBoxLabel>
          </$.AreaCheckBox>

          <$.SignInButton>로그인</$.SignInButton>

          <$.ContentCenterDiv>
            <hr
              style={{
                width: '45%',
                border: 'none',
                height: '1px',
                backgroundColor: '#495057',
              }}
            />
            <$.Span>또는</$.Span>
            <hr
              style={{
                width: '45%',
                border: 'none',
                height: '1px',
                backgroundColor: '#495057',
              }}
            />
          </$.ContentCenterDiv>

          <$.ContentCenterDiv>
            <$.KakaoButton />
            <$.NaverButton />
            <$.GoogleButton />
          </$.ContentCenterDiv>

          <$.SpaceBetweenDiv>
            <$.ExtraButton onClick={(e) => handleAction(e, 'SIGN_UP')}>
              회원가입
            </$.ExtraButton>
            <$.ForgotDiv>
              <$.ExtraButton onClick={(e) => handleAction(e, 'FORGOT_ID')}>
                아이디 찾기{' | '}
              </$.ExtraButton>
              <$.ExtraButton
                onClick={(e) => handleAction(e, 'FORGOT_PASSWORD')}
              >
                {' '}
                비밀번호 찾기
              </$.ExtraButton>
            </$.ForgotDiv>
          </$.SpaceBetweenDiv>
        </$.ModalContentDiv>
      </$.ModalDiv>
    </>
  );
};

export default SignIn;
