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
  reconnect: string;
  login: string;
  createUser: string;
  setupNewDevice: string;
  yes: string;
  no: string;
};

type ModalTitle = {
  warning: string;
  success: string;
  error: string;
};

type CustomModalButtonGroup = {
  type: 'primary' | 'secondary' | 'critical';
  title: keyof ButtonTitle;
  onPress: () => void;
};

type CustomModalType = 'warning' | 'success' | 'error';

type CustomModalProps = {
  type: CustomModalType;
  visible: boolean;
  message: string;
  onClose: () => void;
  buttonGroup?: CustomModalButtonGroup[];
};

type CustomTextInputProps = {
  size: Size;
  textInputProps: TextInputProps;
  isPassword?: boolean;
};

export type {
  ButtonProps,
  ButtonTitle,
  CustomModalProps,
  ModalTitle,
  CustomTextInputProps,
  CustomModalType,
  CustomModalButtonGroup,
};
