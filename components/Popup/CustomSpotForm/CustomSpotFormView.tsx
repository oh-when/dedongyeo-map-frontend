import styled from 'styled-components';
import painter from '~/styles/theme/painter';

export const FormWrapper = styled.div`
  width: 400px;
  height: 428px;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, Segoe UI,
    Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif;

  filter: drop-shadow(0px 2px 20px rgba(73, 80, 87, 0.2));
  cursor: default;

  h1 {
    font-size: 24px;
    color: #343a40;
    font-weight: 700;
  }

  h2 {
    font-size: 14px;
    color: #343a40;
    font-weight: 700;
  }

  h3 {
    font-size: 12px;
    color: #adb5bd;
    font-weight: 500;
  }
`;

export const InputContainer = styled.div`
  margin-top: 20px;
`;

export const InputElement = styled.input`
  background-color: #f8f9fa;
  border-radius: 8px;
  width: 100%;
  height: 48px;
  padding: 12px;
  margin-top: 10px;
`;

export const CheckBox = styled.input`
  margin: 10px 10px 10px 0;
`;

export const SubmitButton = styled.button`
  width: 200px;
  height: 40px;
  padding: 10px 24px;
  background-color: #343a40;
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
  border-radius: 8px;
  margin: 24px auto 0;
`;

export const CloseBtn = styled.button`
  z-index: 5;
  background-color: ${painter.basic.white};
  outline: none;
  border: none;
  border-radius: 0 8px 8px 0;
  cursor: pointer;
  overflow: auto;
  align-self: center;
`;
export const CloseIcon = styled.img.attrs({
  src: '/close_btn.png',
})``;

export const ContainerRow = styled.div<{ justifyContent?: string }>`
  display: flex;
  flex-direction: row;
  justify-content: ${(props) =>
    props.justifyContent ? props.justifyContent : 'initial'};

  h2 {
    margin-top: 10px;
    font-weight: 500;
    color: #495057;
  }
`;
