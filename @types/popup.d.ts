export enum PopupType {
  SPOT_GENERATOR,
  COURSE_SHARE,
  SIGN_IN,
  SIGN_UP,
  FORGOT_ID,
  FORGOT_PASSWORD,
}

export type PopupProps = {
  popupType: PopupType;
  popupProps?: SpotGeneratorProps;
};

export type PopupChildProps = {
  zIndex?: string;
};
