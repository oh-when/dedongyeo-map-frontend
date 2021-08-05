import styled from 'styled-components';
import painter from '~/styles/theme/painter';

export const ModalWrapper = styled.div`
  width: 492px;
  height: 274px;
  padding: 24px;
  background-color: #ffffff;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  font-family: 'Noto Sans KR', -apple-system, BlinkMacSystemFont, Segoe UI,
    Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
    sans-serif;
  z-index: 10000;

  filter: drop-shadow(0px 2px 20px rgba(73, 80, 87, 0.2));

  h1 {
    font-size: 24px;
    color: #343a40;
    font-weight: 700;
    margin-right: 8px;
    min-width: fit-content;
  }

  h2 {
    font-size: 16px;
    color: #adb5bd;
    font-weight: 700;
    line-height: 24px;
    min-width: fit-content;
  }

  h3 {
    font-size: 16px;
    color: #495057;
    font-weight: 500;
  }
  h4 {
    font-size: 14px;
    color: #adb5bd;
    font-weight: 500;
  }
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
  margin-bottom: 12px;
`;

export const LabelTag = styled.div`
  width: 44px;
  height: 24px;
  padding: 4px 8px;
  background: #449aff;
  border-radius: 4px;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  font-family: Poppins/Body_04_SemiBold;
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

export const SweetContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-right: 4px;
`;

export const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  font-weight: 600;
  color: #868e96;
  span {
    margin-right: 14px;
    line-height: 22px;
  }
`;

export const SweetIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 8px;
`;

export const SettingIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-left: 16px;
`;

export const ContainerColumn = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Empty = styled.div`
  width: 100%;
`;
