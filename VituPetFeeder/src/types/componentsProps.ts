import { Device } from "react-native-ble-plx"
import { Size } from "./general"
import { StyleProp, ViewStyle } from "react-native"

type ButtonProps = {
  size: Size
  type: 
    | 'connect' 
    | 'disconnect' 
    | 'sendMessage' 
    | 'saveWifiCredentials'
  onPress: () => void
  containerStyle?: StyleProp<ViewStyle>
}

type ButtonTitle = {
  connect: string,
  disconnect: string,
  sendMessage: string,
  saveWifiCredentials: string
}

type CustomModalProps = {
  visible: boolean
}

export type {
  ButtonProps,
  ButtonTitle,
  CustomModalProps
}