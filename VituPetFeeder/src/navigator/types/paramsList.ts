import { NavigatorScreenParams } from '@react-navigation/native';

type RootStackParamsList = {
  DrawerStack: NavigatorScreenParams<DrawerStackParamsList>;
};

type InsertWifiCredentialsScreenProps = {
  ssid: string;
};

type SetupNewDeviceStackParamsList = {
  DeviceConnectionInstructions: undefined;
  InsertWifiCredentials: InsertWifiCredentialsScreenProps;
};

type FeedingControlInputStackParamsList = {
  FeedingControlDashboard: undefined;
};

type DrawerStackParamsList = {
  FeedingControlDashboard: NavigatorScreenParams<FeedingControlInputStackParamsList>;
  SetupNewDevice: NavigatorScreenParams<SetupNewDeviceStackParamsList>;
};

export type {
  RootStackParamsList,
  SetupNewDeviceStackParamsList,
  DrawerStackParamsList,
};
