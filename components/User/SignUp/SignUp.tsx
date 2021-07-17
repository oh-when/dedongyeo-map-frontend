import React, { useState } from 'react';
import * as $ from './SignUpView';
// import { useRouter } from 'next/router';
import type { PopupChildProps } from '~/@types/popup.d';
import { usePopupCloser } from '~/lib/apollo/hooks/usePopup';

export type Props = PopupChildProps;
const CHECKBOX_ID = 'daedong_chbox_allow';

const SignUp: React.FC<Props> = ({ zIndex }) => {
  // const { pathname } = useRouter();
  const closePopup = usePopupCloser();

  const [isAllAgree, setIsAllAgree] = useState(false);
  const [agreeOne, setAgreeOne] = useState(true);
  const [agreeTwo, setAgreeTwo] = useState(true);
  const [agreeThree, setAgreeThree] = useState(true);
  const [agreeFour, setAgreeFour] = useState(true);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [nickName, setNickName] = useState('');
  const [phoneNum, setPhoneNum] = useState('');

  const [isVaildEmail, setIsVaildEmail] = useState(true);
  const [isValidPassword, setIsValidPassword] = useState(true);
  const [isValidPasswordConfirm, setIsValidPasswordConfirm] = useState(true);
  const [modalStep, setModalStep] = useState(1);

  const emailRegExp = /^[0-9a-z]([-_\.]?[0-9a-z])*@[0-9a-z]([-_\.]?[0-9a-z])*\.[a-z]/;
  const passwordRegExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

  const handleClickCloseButton = (e: React.MouseEvent) => {
    e.preventDefault();
    closePopup();
  };

  const handleEmail = (e: any) => {
    const val = e.target.value;
    if (emailRegExp.test(val)) {
      // 사용중인 이메일 계정인지 쿼리 날려서 검증 필요
      // setIsVaildEmail 결정
      setEmail(e.target.value);
    }
  };

  const handlePassword = (e: any) => {
    const val = e.target.value;
    setPassword(val);
    if (passwordRegExp.test(val)) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
  };

  const handlePasswordConfirm = (e: any) => {
    const val = e.target.value;
    setPasswordConfirm(val);
    if (isValidPassword) {
      if (password === val) {
        setIsValidPasswordConfirm(true);
      } else {
        setIsValidPasswordConfirm(false);
      }
    }
  };

  const handleNickname = (e: any) => {
    const val = e.target.value;
    setNickName(val);
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

  const handleCheck = (e: any, id: string) => {
    console.log(e.target.checked, 'e,target.checked');
    console.log(id, 'id');
  };

  return (
    <>
      <$.ModalDiv zIndex={zIndex}>
        <$.CloseBtn onClick={handleClickCloseButton} />
        <$.ModalContentDiv>
          <div
            style={{ display: 'flex', justifyContent: 'center', width: '100%' }}
          >
            <$.MainTitle>회원가입</$.MainTitle>
          </div>

          {modalStep === 0 ? (
            <>
              <$.AreaCheckBox>
                <$.DivForCheck>
                  <$.RealCheckBox
                    id="isAllAgree"
                    checked={isAllAgree}
                    onClick={(e) => handleCheck(e, 'isAllAgree')}
                  />
                  <$.ViewCheckBox />
                  <$.CheckBoxLabel htmlFor="isAllAgree">
                    서비스 약관 전체 동의
                  </$.CheckBoxLabel>
                </$.DivForCheck>
                <$.DivForCheck>자세히</$.DivForCheck>
              </$.AreaCheckBox>

              <$.AreaCheckBox>
                <$.DivForCheck>
                  <$.RealCheckBox
                    id="agreeOne"
                    checked={agreeOne}
                    onClick={(e) => handleCheck(e, 'agreeOne')}
                  />
                  <$.ViewCheckBox />
                  <$.CheckBoxLabel htmlFor="agreeOne">
                    개인정보 수집 및 이용 안내 (필수)
                  </$.CheckBoxLabel>
                </$.DivForCheck>
                <$.DivForCheck>자세히</$.DivForCheck>
              </$.AreaCheckBox>

              <$.AreaCheckBox>
                <$.DivForCheck>
                  <$.RealCheckBox
                    id="agreeTwo"
                    checked={agreeTwo}
                    onClick={(e) => handleCheck(e, 'agreeTwo')}
                  />
                  <$.ViewCheckBox />
                  <$.CheckBoxLabel htmlFor="agreeTwo">
                    위치정보 수집 및 이용 안내 (필수)
                  </$.CheckBoxLabel>
                </$.DivForCheck>
                <$.DivForCheck>자세히</$.DivForCheck>
              </$.AreaCheckBox>

              <$.AreaCheckBox>
                <$.DivForCheck>
                  <$.RealCheckBox
                    id="agreeThree"
                    checked={agreeThree}
                    onClick={(e) => handleCheck(e, 'agreeThree')}
                  />
                  <$.ViewCheckBox />
                  <$.CheckBoxLabel htmlFor="agreeThree">
                    제 3자 제공 동의 (필수)
                  </$.CheckBoxLabel>
                </$.DivForCheck>
                <$.DivForCheck>자세히</$.DivForCheck>
              </$.AreaCheckBox>

              <$.AreaCheckBox>
                <$.DivForCheck>
                  <$.RealCheckBox
                    id="agreeFour"
                    checked={agreeFour}
                    onClick={(e) => handleCheck(e, 'agreeFour')}
                  />
                  <$.ViewCheckBox />
                  <$.CheckBoxLabel htmlFor="agreeFour">
                    마케팅 수신 동의
                  </$.CheckBoxLabel>
                </$.DivForCheck>
                <$.DivForCheck>자세히</$.DivForCheck>
              </$.AreaCheckBox>
            </>
          ) : (
            <>
              <$.InputLabel>계정 이메일</$.InputLabel>
              <$.InputBox>
                <$.Input
                  value={email}
                  onChange={handleEmail}
                  placeholder="이메일 주소 입력"
                />
              </$.InputBox>
              {!isVaildEmail && (
                <$.ErrorMessage>이미 사용중인 이메일 계정입니다</$.ErrorMessage>
              )}

              <$.InputLabel>비밀번호</$.InputLabel>
              <$.InputBox>
                <$.Input
                  value={password}
                  onChange={handlePassword}
                  placeholder="비밀번호 (8~32자리)"
                />
              </$.InputBox>
              {!isValidPassword && (
                <$.ErrorMessage>
                  영문 대소문, 특수문자 포함 8자리 이상이어야 합니다
                </$.ErrorMessage>
              )}

              <$.InputBox>
                <$.Input
                  value={passwordConfirm}
                  onChange={handlePasswordConfirm}
                  placeholder="비밀번호 확인"
                />
              </$.InputBox>
              {!isValidPasswordConfirm && (
                <$.ErrorMessage>
                  입력하신 비밀번호가 일치하지 않습니다
                </$.ErrorMessage>
              )}

              <$.InputLabel>닉네임</$.InputLabel>
              <$.InputBox>
                <$.Input
                  value={nickName}
                  onChange={handleNickname}
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
                  maxLength={13}
                />
              </$.InputBox>
            </>
          )}

          <$.SignUpButton>
            {modalStep === 0 ? '동의하고 회원가입하기' : '회원가입'}
          </$.SignUpButton>
        </$.ModalContentDiv>
      </$.ModalDiv>
    </>
  );
};

export default SignUp;
