import { ButtonFontSize, WindowPercentage } from "../types/consts";

const windowPercentage: WindowPercentage = {
  small: 40,
  medium: 60,
  large: 80
}

const buttonFontSize: ButtonFontSize = {
  small: 16,
  medium: 20,
  large: 24
}

const BleUUIDs = {
  SERVICE_UUID: 'f25a44a8-93ec-11ee-b9d1-0242ac120002',
  SSID_UUID: 'c480afc2-93ec-11ee-b9d1-0242ac120002',
  PASSWORD_UUID: 'c480ae1e-93ec-11ee-b9d1-0242ac120002',
  CONNECT_TO_WIFI_FLAG_UUID: "c480aaea-93ec-11ee-b9d1-0242ac120002"
}



export {
  windowPercentage,
  buttonFontSize,
  BleUUIDs
}