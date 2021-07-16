import { Props as SpotGeneratorProps } from "~/components/Popup/SpotGenerator";
import { Props as CourseShareProps } from "~/components/Popup/CourseShare";
import { CourseDeleteProps } from "~/components/Popup/CourseDelete";

export enum PopupType {
  SPOT_GENERATOR,
  COURSE_SHARE,
  COURSE_DELETE,
}

export type PopupPropsMap = {
  [PopupType.SPOT_GENERATOR]: SpotGeneratorProps;
  [PopupType.COURSE_SHARE]: CourseShareProps;
  [PopupType.COURSE_DELETE]: CourseDeleteProps;
}

export type PopupProps<T extends PopupType = any> = {
  popupType: T;
  popupProps?: PopupPropsMap[T];
};

export type PopupChildProps = {
  zIndex?: string;
};
