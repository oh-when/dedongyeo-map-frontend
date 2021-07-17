import React from 'react';
import styled from 'styled-components';
import painter from '~/styles/theme/painter';

export const SubTitle = styled.span`
  font-family: Gmarket Sans TTF;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 32px;
  letter-spacing: -0.04em;
  color: ${painter.basic.white};
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export const MainTitle = styled.span`
  font-family: Gmarket Sans TTF;
  font-style: normal;
  font-weight: bold;
  font-size: 41px;
  line-height: 100%;
  letter-spacing: -0.08em;
  color: ${painter.basic.white};
`;

export const InputBox = styled.div`
  height: 48px;
  width: 100%;
  margin-top: 8px;
  border-bottom: 1px solid ${painter.grayscale[8]};
  background-color: transparent;
`;

export const Input = styled.input.attrs({ type: 'text' })`
  display: block;
  width: 100%;
  height: 100%;
  padding: 0 12px;
  font-size: 16px;
  color: ${painter.grayscale[7]};
  ${painter.form.placeholder('#ADB5BD')}
`;

export const SignInButton = styled.button`
  outline: none;
  border: none;
  border-radius: 8px;
  background-color: ${painter.primary.basic};
  cursor: pointer;
  width: 100%;
  height: 50px;
  color: ${painter.basic.white};
  margin: 40px 0;
`;

export const AreaCheckBox = styled.div`
  margin-top: 30px;
`;

export const ViewCheckBox = styled.div`
  display: inline-block;
  position: relative;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  border: 1px solid ${painter.grayscale[5]};
  background-color: transparent;
  vertical-align: top;
  cursor: pointer;
`;

export const RealCheckBox = styled.input.attrs({ type: 'checkbox' })`
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
  width: 1px;
  height: 1px;
  margin: -1px;
  clip: rect(0 0 0 0);
  &:checked + ${ViewCheckBox} {
    background-color: ${painter.grayscale[9]};
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 4px;
      width: 10px;
      height: 4px;
      margin: auto;
      border: solid ${painter.basic.white};
      border-width: 0 0 2px 2px;
      transform: rotate(-45deg);
    }
  }
`;

export const CheckBoxLabel = styled.label`
  display: inline-block;
  position: relative;
  z-index: 1;
  line-height: 18px;
  font-size: 16px;
  margin-left: -18px;
  padding-left: 22px;
  vertical-align: top;
  color: ${painter.grayscale[5]};
  cursor: pointer;
`;

export const ContentCenterDiv = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

export const SpaceBetweenDiv = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
`;

export const ExtraButton = styled.button`
  border: none;
  outline: none;
  color: ${painter.grayscale['5']};
  cursor: pointer;
`;

export const ForgotDiv = styled.div``;

export const Line = styled.hr`
  border: none;
  backgroud-color: yellow;
  width: 45%;
  height: 1px;
`;

export const Span = styled.span`
  color: ${painter.grayscale['7']};
`;

export const KakaoButton = styled.img.attrs({
  src: '/Kakao.png',
})`
  cursor: pointer;
`;

export const NaverButton = styled.img.attrs({
  src: '/Naver.png',
})`
  margin: 0 15px;
  cursor: pointer;
`;

export const GoogleButton = styled.img.attrs({
  src: '/Google.png',
})`
  cursor: pointer;
`;

export const SignInImg = styled.img.attrs({
  src: '/SignInSticker.png',
})``;

export const ModalDiv = styled.div<{ zIndex: string }>`
  z-index: ${(props) => props.zIndex || '10000'};
  position: absolute;
  min-width: 450px;
  min-height: 600px;
  left: 40%;
  top: 10%;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export const ModalContentDiv = styled.div`
  background-color: ${painter.grayscale[9]};
  width: 100%;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: auto;
  padding: 45px 25px;
  border-radius: 16px;
`;

export const CloseBtn = styled.img.attrs({
  src: '/modal_close_btn.png',
})`
  cursor: pointer;
  width: 36px;
  height: 36px;
`;
