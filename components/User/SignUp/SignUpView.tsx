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

export const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  overflow: auto;
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
  margin-top: 8px;
  border-bottom: 1px solid ${painter.grayscale[8]};
  background-color: transparent;
  display: flex;
  justify-content: space-between;
`;

export const Input = styled.input.attrs((props) => ({
  type: props.type || 'text',
}))`
  display: block;
  width: 100%;
  height: 100%;
  padding: 0 12px;
  font-size: 16px;
  color: ${painter.grayscale[7]};
  ${painter.form.placeholder('#ADB5BD')}
`;

export const SignUpButton = styled.button`
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
  margin: 20px 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const DivForCheck = styled.div`
  color: ${painter.grayscale[5]};
`;

export const ViewCheckBox = styled.div`
  display: inline-block;
  width: 18px;
  height: 18px;
  border-radius: 3px;
  background-color: transparent;
  vertical-align: top;
  cursor: pointer;
`;

export const RealCheckBox = styled.input.attrs({ type: 'checkbox' })`
  &:checked {
    background-color: yellow;

    &::before {
      content: '';
      width: 18px;
      height: 18px;
      margin: auto;
      border: solid ${painter.basic.white};
      border-width: 0 0 2px 2px;
      transform: rotate(-45deg);
      background-color: yellow;
    }
  }
`;

export const CheckBoxLabel = styled.label`
  display: inline-block;
  position: relative;
  z-index: 1;
  margin-left: -18px;
  padding-left: 22px;
  vertical-align: top;
  color: ${painter.grayscale[5]};
  cursor: pointer;
  font-family: Noto Sans CJK KR;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
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
  @media ${({ theme }) => theme.device.laptop} {
    left: 40%;
    top: 0%;
  }
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

export const EmailCheckButton = styled.button`
  border: none;
  outline: none;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  width: 129px;
  height: 40px;
  background: ${painter.grayscale['1']};
  border-radius: 8px;
`;

export const Span = styled.span`
  font-family: Noto Sans CJK KR;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: ${painter.grayscale['4']};
  flex: none;
  order: 0;
  flex-grow: 0;
  margin: 0px 10px;
`;

export const ErrorMessage = styled.span`
  font-family: Noto Sans CJK KR;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  color: #ff5b5b;
`;

export const CheckboxAdvice = styled.p`
  margin-top: 8px;
  font-size: 12px;
  line-height: 16px;
  color: ${painter.grayscale[6]};
`;
