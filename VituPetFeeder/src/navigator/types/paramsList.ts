import { NavigatorScreenParams } from '@react-navigation/native';

type RootStackParamsList = {
  HomeStack: NavigatorScreenParams<HomeStackParamsList>;
  AuthStack: NavigatorScreenParams<AuthStackParamsList>;
};

type InsertWifiCredentialsScreenProps = {
  ssid: string;
};

type InsertDeviceNameScreenProps = {
  macAddress: string;
};

type SetupNewDeviceStackParamsList = {
  DeviceConnectionInstructions: undefined;
  InsertWifiCredentials: InsertWifiCredentialsScreenProps;
  InsertDeviceName: undefined;
};

type FeedingControlStackParamsList = {
  FeedingControlDashboard: undefined;
  FeederMealsList: undefined;
};

type HomeStackParamsList = {
  FeedingControl: NavigatorScreenParams<FeedingControlStackParamsList>;
  SetupNewDevice: NavigatorScreenParams<SetupNewDeviceStackParamsList>;
};

type AuthStackParamsList = {
  Login: undefined;
  CreateUser: undefined;
  Logout: undefined;
};

export type {
  RootStackParamsList,
  SetupNewDeviceStackParamsList,
  HomeStackParamsList,
  FeedingControlStackParamsList,
  AuthStackParamsList,
  InsertDeviceNameScreenProps,
};
