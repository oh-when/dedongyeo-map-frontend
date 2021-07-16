import React, { useState } from 'react';
import * as $ from './ForgotIdView';
// import { useRouter } from 'next/router';
import type { PopupChildProps } from '~/@types/popup.d';
import { usePopupCloser } from '~/lib/apollo/hooks/usePopup';

export type Props = PopupChildProps;

const ForgotId: React.FC<Props> = ({ zIndex }) => {
  // const { pathname } = useRouter();
  const closePopup = usePopupCloser();
  const phoneRegExp =
    (/(^02.{0}|^01.{1}|[0-9]{3})([0-9]+)([0-9]{4})/, '$1-$2-$3');
  const emailRegExp = /^[0-9a-z]([-_\.]?[0-9a-z])*@[0-9a-z]([-_\.]?[0-9a-z])*\.[a-z]/;

  const [nickName, setNickName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');
  const [isError, setIsError] = useState(false);
  const [modalStep, setModalStep] = useState(0);
  const [email, setEmail] = useState('');

  const handleClickCloseButton = (e: React.MouseEvent) => {
    e.preventDefault();
    closePopup();
  };

  const handlePhoneNum = (e: any) => {
    setPhoneNum(autoHypenPhone(e.target.value));
  };

  const autoHypenPhone = (num: string) => {
    num = num.replace(/[^0-9]/g, '');
    let tmp = '';
    if (num.length < 4) {
      return num;
    } else if (num.length < 7) {
      tmp += num.substr(0, 3);
      tmp += '-';
      tmp += num.substr(3);
      return tmp;
    } else if (num.length < 11) {
      tmp += num.substr(0, 3);
      tmp += '-';
      tmp += num.substr(3, 3);
      tmp += '-';
      tmp += num.substr(6);
      return tmp;
    } else {
      tmp += num.substr(0, 3);
      tmp += '-';
      tmp += num.substr(3, 4);
      tmp += '-';
      tmp += num.substr(7);
      return tmp;
    }
    return num;
  };

  const handleButton = (e: any) => {
    modalStep === 0 ? checkUser() : resetId();
  };

  const handleEmailValue = (e: any) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const checkUser = (e: any) => {
    // '다음'버튼 클릭시 유저 찾는 요청 보내고
    // 1. 유저id와 boolean값이 true로 넘어온다면(?)
    // setModalStep((prev) => prev+1 )
    // 2. 유저 id가 넘어오지 않고 false가 응답으로 온다면
    // setIsError(true)
  };

  const resetId = (e: any) => {
    if (email === '') {
      alert('이메일주소를 입력해주세요.');
    } else if (email.match(emailRegExp) === null) {
      alert('이메일주소가 올바르지 않습니다. (영문 소문자만 입력가능)');
    } else {
      // 아이디 재설정 쿼리 요청 (백 작업 미정)
    }
  };

  return (
    <>
      <$.ModalDiv zIndex={zIndex}>
        <$.CloseBtn onClick={handleClickCloseButton} />
        <$.ModalContentDiv>
          <div
            style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <$.MainTitle>아이디를 잊으셨나요?</$.MainTitle>
          </div>
          <$.SubTitle>
            {modalStep === 0
              ? '회원가입시 등록했던 정보를 입력해주세요.'
              : '아이디 정보를 받을 이메일 주소를 입력해주세요.'}
          </$.SubTitle>

          {modalStep === 0 ? (
            <>
              <$.InputLabel>닉네임</$.InputLabel>
              <$.InputBox>
                <$.Input
                  value={nickName}
                  onChange={(e) => setNickName(e.target.value)}
                  placeholder="닉네임을 입력해주세요."
                />
              </$.InputBox>
              <$.InputLabel>휴대전화</$.InputLabel>
              <$.InputBox>
                <$.Input
                  id="phoneNum"
                  name="phoneNum"
                  type="text"
                  value={phoneNum}
                  onChange={handlePhoneNum}
                  placeholder="010-0000-0000"
                  maxLength="13"
                />
              </$.InputBox>
            </>
          ) : (
            <>
              <$.InputBox>
                <$.Input
                  id="email"
                  value={email}
                  onChange={handleEmailValue}
                  placeholder="dedongyeomap@gmail.com"
                />
              </$.InputBox>
            </>
          )}

          {isError && (
            <$.ErrorDiv>
              <$.ErrorDivText>
                닉네임과 휴대전화 정보가 일치하지 않습니다. 입력한 내용을 다시
                확인해 주세요.
              </$.ErrorDivText>
            </$.ErrorDiv>
          )}

          <$.NextButton onClick={handleButton}>
            {modalStep === 0 ? '다음' : '이메일 전송'}
          </$.NextButton>
        </$.ModalContentDiv>
      </$.ModalDiv>
    </>
  );
};

export default ForgotId;
