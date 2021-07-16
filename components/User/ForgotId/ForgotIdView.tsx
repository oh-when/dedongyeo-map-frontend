import React from 'react';
import styled from 'styled-components';
import painter from '~/styles/theme/painter';

export const MainTitle = styled.span`
  color: ${painter.grayscale[1]};
  font-family: Noto Sans CJK KR;
  font-style: normal;
  font-weight: bold;
  font-size: 18px;
  line-height: 24px;
`;

export const SubTitle = styled.span`
  color: ${painter.grayscale[1]};
  font-family: Noto Sans CJK KR;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 22px;
  margin: 48px 0 0;
`;

export const InputLabel = styled.label`
  color: ${painter.grayscale[1]};
  font-family: Noto Sans CJK KR;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  margin: 30px 0 10px;
`;

export const InputBox = styled.div`
  height: 48px;
  width: 100%;
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

export const NextButton = styled.button`
  outline: none;
  border: none;
  border-radius: 8px;
  background-color: ${painter.primary.basic};
  cursor: pointer;
  width: 100%;
  height: 50px;
  color: ${painter.basic.white};
  margin: 200px 0 35px;
`;

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

export const ErrorDiv = styled.div`
  width: 424px;
  height: 68px;
  background-color: ${painter.grayscale[10]};
  opacity: 0.3;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 18px;
  margin-top: 30px;
`;

export const ErrorDivText = styled.span`
  font-family: Noto Sans CJK KR;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: ${painter.grayscale[5]};
`;
