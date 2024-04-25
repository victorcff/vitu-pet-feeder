import { Size } from './general';
import { StyleProp, TextInputProps, ViewStyle } from 'react-native';

type ButtonProps = {
  size: Size;
  type: keyof ButtonTitle;
  onPress: () => void;
  isLoading?: boolean;
  bottom?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
};

type ButtonTitle = {
  next: string;
  save: string;
  close: string;
  connect: string;
};

type ModalTitle = {
  warning: string;
  success: string;
};

type CustomModalButtonGroup = {
  type: 'primary' | 'secondary' | 'critical';
  title: keyof ButtonTitle;
  onPress: () => void;
};

type CustomModalProps = {
  type: 'warning' | 'success';
  visible: boolean;
  message: string;
  onClose: () => void;
  buttonGroup?: CustomModalButtonGroup[];
};

type CustomTextInputProps = {
  size: Size;
  textInputProps: TextInputProps;
};

export type {
  ButtonProps,
  ButtonTitle,
  CustomModalProps,
  ModalTitle,
  CustomTextInputProps,
};
