import React, { useState } from 'react';
import * as $ from './SignUpView';
// import { useRouter } from 'next/router';
import type { PopupChildProps } from '~/@types/popup.d';
import { usePopupCloser } from '~/lib/apollo/hooks/usePopup';
import { gql, useMutation } from '@apollo/client';
import { signIn } from 'next-auth/client';

export type Props = PopupChildProps;
const CHECKBOX_ID = 'daedong_chbox_allow';

const CREATE_USER = gql`
  mutation CreateUser($createUserInput: createUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      createdAt
      email
      password
      isAcceptTerms
      nickName
      phone
      status
      updatedAt
    }
  }
`;

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

  const emailRegExp =
    /^[0-9a-z]([-_\.]?[0-9a-z])*@[0-9a-z]([-_\.]?[0-9a-z])*\.[a-z]/;
  const passwordRegExp =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;

  const handleClickCloseButton = (e: React.MouseEvent) => {
    e.preventDefault();
    closePopup();
  };

  const handleEmail = (e: any) => {
    setEmail(e.target.value);
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

  const [createUser] = useMutation<
    GQL.Mutation.CreateUser.Data,
    GQL.Mutation.CreateUser.Variables
  >(CREATE_USER, {
    onCompleted: ({ createUser }) => {
      const email = createUser.email;
      signIn('dedong', { email, password, redirect: false })
        .then((data) => {
          alert('????????? ??????????????????.');
          console.log(data, '???????????? ?????? data');
        })
        .catch((err) => {
          alert('????????? ??????????????????. ?????? ??????????????????.');
          console.log(err, 'err');
        });
    },
  });

  const handleClickSignUp = (e) => {
    e.preventDefault();
    if (modalStep === 1) {
      if (!email) {
        alert('???????????? ??????????????????.');
        return;
      } else if (!emailRegExp.test(email)) {
        alert('???????????? ????????? ???????????? ??????????????????.');
        return;
      } else if (!password) {
        alert('??????????????? ??????????????????.');
        return;
      } else if (!passwordConfirm) {
        alert('??????????????? ??????????????????.');
        return;
      } else if (password !== passwordConfirm) {
        alert('??????????????? ?????? ??????????????????.');
        return;
      } else if (!nickName) {
        alert('???????????? ??????????????????');
        return;
      } else if (!phoneNum) {
        alert('????????? ????????? ??????????????????');
        return;
      } else if (phoneNum.replace(/-/g, '').length < 11) {
        alert('????????? ????????? ????????? ???????????? ??????????????????.');
        return;
      }
      closePopup();
      createUser({
        variables: {
          createUserInput: {
            email,
            nickName,
            password,
            phone: phoneNum.replace(/-/g, ''),
          },
        },
      });
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
            <$.MainTitle>????????????</$.MainTitle>
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
                    ????????? ?????? ?????? ??????
                  </$.CheckBoxLabel>
                </$.DivForCheck>
                <$.DivForCheck>?????????</$.DivForCheck>
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
                    ???????????? ?????? ??? ?????? ?????? (??????)
                  </$.CheckBoxLabel>
                </$.DivForCheck>
                <$.DivForCheck>?????????</$.DivForCheck>
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
                    ???????????? ?????? ??? ?????? ?????? (??????)
                  </$.CheckBoxLabel>
                </$.DivForCheck>
                <$.DivForCheck>?????????</$.DivForCheck>
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
                    ??? 3??? ?????? ?????? (??????)
                  </$.CheckBoxLabel>
                </$.DivForCheck>
                <$.DivForCheck>?????????</$.DivForCheck>
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
                    ????????? ?????? ??????
                  </$.CheckBoxLabel>
                </$.DivForCheck>
                <$.DivForCheck>?????????</$.DivForCheck>
              </$.AreaCheckBox>

              <$.SignUpButton>???????????? ??????????????????</$.SignUpButton>
            </>
          ) : (
            <$.Form onSubmit={handleClickSignUp}>
              <$.InputLabel>?????? ?????????</$.InputLabel>
              <$.InputBox>
                <$.Input
                  value={email}
                  onChange={handleEmail}
                  placeholder="????????? ?????? ??????"
                  type="email"
                />
              </$.InputBox>
              {!isVaildEmail && (
                <$.ErrorMessage>?????? ???????????? ????????? ???????????????</$.ErrorMessage>
              )}

              <$.InputLabel>????????????</$.InputLabel>
              <$.InputBox>
                <$.Input
                  value={password}
                  onChange={handlePassword}
                  placeholder="???????????? (8~32??????)"
                  type="password"
                />
              </$.InputBox>
              {!isValidPassword && (
                <$.ErrorMessage>
                  ?????? ?????????, ???????????? ?????? 8?????? ??????????????? ?????????
                </$.ErrorMessage>
              )}

              <$.InputBox>
                <$.Input
                  value={passwordConfirm}
                  onChange={handlePasswordConfirm}
                  placeholder="???????????? ??????"
                  type="password"
                />
              </$.InputBox>
              {!isValidPasswordConfirm && (
                <$.ErrorMessage>
                  ???????????? ??????????????? ???????????? ????????????
                </$.ErrorMessage>
              )}

              <$.InputLabel>?????????</$.InputLabel>
              <$.InputBox>
                <$.Input
                  value={nickName}
                  onChange={handleNickname}
                  placeholder="???????????? ??????????????????."
                />
              </$.InputBox>

              <$.InputLabel>????????????</$.InputLabel>
              <$.InputBox>
                <$.Input
                  id="phoneNum"
                  name="phoneNum"
                  value={phoneNum}
                  onChange={handlePhoneNum}
                  placeholder="010-0000-0000"
                  maxLength={13}
                />
              </$.InputBox>
              <$.SignUpButton onClick={handleClickSignUp}>
                ????????????
              </$.SignUpButton>
            </$.Form>
          )}
        </$.ModalContentDiv>
      </$.ModalDiv>
    </>
  );
};

export default SignUp;
