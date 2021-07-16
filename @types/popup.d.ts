import { Props as SpotGeneratorProps } from "~/components/Popup/SpotGenerator";
import { Props as CourseShareProps } from "~/components/Popup/CourseShare";

export enum PopupType {
  SPOT_GENERATOR,
  COURSE_SHARE,
}

export type PopupPropsMap = {
  [PopupType.SPOT_GENERATOR]: SpotGeneratorProps;
  [PopupType.COURSE_SHARE]: CourseShareProps;
}

export type PopupProps<T extends PopupType = any> = {
  popupType: T;
  popupProps?: PopupPropsMap[T];
};

export type PopupChildProps = {
  zIndex?: string;
};
