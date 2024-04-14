import { NavigatorScreenParams } from "@react-navigation/native"

type RootStackParamsList = {
  ConnectingToWifi: NavigatorScreenParams<ConnectingToWifiStackParamsList>;
}

type ConnectingToWifiStackParamsList = {
  ConnectToBle: undefined
  InsertWifiCredentials: undefined
}

export type {
  RootStackParamsList,
  ConnectingToWifiStackParamsList
}
