import React from 'react';
import styled from 'styled-components';
import painter from '~/styles/theme/painter';

export const AreaForm = styled.div`
  margin-top: 40px;
`;

export const FieldSet = styled.div`
  position: relative;
  & + & {
    margin-top: 32px;
  }
`;

export const FieldLabel = styled.strong`
  display: block;
  font-size: 18px;
  color: ${painter.grayscale[9]};
`;

export const FieldInputBox = styled.div`
  position: relative;
  height: 48px;
  margin-top: 16px;
  background-color: ${painter.grayscale[1]};
  border-radius: 8px;
`;

export const InputVisitant = styled.input.attrs({
  type: 'text',
})`
  display: block;
  width: 100%;
  height: 100%;
  padding-left: 16px;
  font-weight: 500;
  font-size: 16px;
  color: ${painter.grayscale[9]};
  ${(props) => painter.form.placeholder(painter.grayscale[6](props))}
`;

export const DateLabel = styled.strong<{
  isSelected: boolean;
}>`
  display: block;
  height: 100%;
  padding-left: 12px;
  font-weight: 500;
  font-size: 16px;
  line-height: 48px;
  color: ${(props) =>
    props.isSelected
      ? painter.grayscale[9](props)
      : painter.grayscale[6](props)};
`;

export const DatePickerOpenButton = styled.a.attrs({ href: '#' })`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
`;

export const SubmitButton = styled.a.attrs({ href: '#', role: 'button' })`
  display: block;
  height: 56px;
  margin-top: 48px;
  border-radius: 8px;
  background-color: ${painter.primary.basic};
  font-weight: 700;
  font-size: 18px;
  line-height: 56px;
  text-align: center;
  color: ${painter.basic.white};
`;

export const DatePickerLayer = styled.div`
  position: absolute;
  z-index: 1;
  top: -358px;
  left: 0;
  width: 100%;
  border: 1px solid #ebebeb;
  border-radius: 8px;
  background-color: ${painter.basic.white};
`;
