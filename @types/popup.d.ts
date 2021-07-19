import { Props as SpotGeneratorProps } from "~/components/Popup/SpotGenerator";
import { Props as CourseShareProps } from "~/components/Popup/CourseShare";
import { CourseDeleteProps } from "~/components/Popup/CourseDelete";

export enum PopupType {
  SPOT_GENERATOR,
  COURSE_SHARE,
  COURSE_DELETE,
  SIGN_IN,
  SIGN_UP,
  FORGOT_ID,
  FORGOT_PASSWORD,
}

export type PopupPropsMap = {
  [PopupType.SPOT_GENERATOR]: SpotGeneratorProps;
  [PopupType.COURSE_SHARE]: CourseShareProps;
  [PopupType.COURSE_DELETE]: CourseDeleteProps;
  [PopupType.SIGN_IN]: void;
  [PopupType.SIGN_UP]: void;
  [PopupType.FORGOT_ID]: void;
  [PopupType.FORGOT_PASSWORD]: void;
}

export type PopupProps<T extends PopupType = any> = {
  popupType: T;
  popupProps?: PopupPropsMap[T];
};

export type PopupChildProps = {
  zIndex?: string;
};
