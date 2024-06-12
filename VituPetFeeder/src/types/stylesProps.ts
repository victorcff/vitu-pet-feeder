import { CustomModalType } from './componentsProps';
import { Size } from './general';

type ButtonStyleProps = {
  size?: Size;
  width?: number;
  bottom?: boolean;
};

type CustomTextInputStyleProps = {
  size?: Size;
  width?: number;
  centerAlign?: boolean;
};

export type { ButtonStyleProps, CustomTextInputStyleProps };
