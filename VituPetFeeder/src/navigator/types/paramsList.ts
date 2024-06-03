import { NavigatorScreenParams } from '@react-navigation/native';
import { FeederDevice, Meal } from '../../types/api';

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

type FeedingControlDashboardScreenProps = {
  createdDevice?: FeederDevice;
};

type FeedingControlStackParamsList = {
  FeedingControlDashboard: FeedingControlDashboardScreenProps;
  FeederMeals: NavigatorScreenParams<FeederMealsStackParamsList>;
  ReconnectFeederDevice: undefined;
};

type UpdateMealScreenProps = {
  action: 'create' | 'update';
  meal?: Meal;
};

type FeederMealsStackParamsList = {
  FeederMealsList: undefined;
  UpdateMeal: UpdateMealScreenProps;
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
  FeederMealsStackParamsList,
  InsertDeviceNameScreenProps,
};
