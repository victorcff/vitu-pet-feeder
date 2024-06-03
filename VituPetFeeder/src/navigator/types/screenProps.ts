import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  AuthStackParamsList,
  FeederMealsStackParamsList,
  FeedingControlStackParamsList,
  HomeStackParamsList,
  SetupNewDeviceStackParamsList,
} from './paramsList';
import { CompositeScreenProps } from '@react-navigation/native';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';

type DeviceConnectionInstructionsProps = NativeStackScreenProps<
  SetupNewDeviceStackParamsList,
  'DeviceConnectionInstructions'
>;

type InsertWifiCredentialsScreenProps = NativeStackScreenProps<
  SetupNewDeviceStackParamsList,
  'InsertWifiCredentials'
>;

type InsertDeviceNameScreenProps = CompositeScreenProps<
  NativeStackScreenProps<SetupNewDeviceStackParamsList, 'InsertDeviceName'>,
  DrawerScreenProps<HomeStackParamsList>
>;

type FeedingControlDashboardScreenProps = CompositeScreenProps<
  BottomTabScreenProps<
    FeedingControlStackParamsList,
    'FeedingControlDashboard'
  >,
  CompositeScreenProps<
    DrawerScreenProps<HomeStackParamsList>,
    NativeStackScreenProps<FeederMealsStackParamsList>
  >
>;

type ReconnectFeederDeviceScreenProps = CompositeScreenProps<
  BottomTabScreenProps<FeedingControlStackParamsList, 'ReconnectFeederDevice'>,
  CompositeScreenProps<
    DrawerScreenProps<HomeStackParamsList>,
    NativeStackScreenProps<SetupNewDeviceStackParamsList>
  >
>;

type LoginScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamsList, 'Login'>,
  CompositeScreenProps<
    BottomTabScreenProps<FeedingControlStackParamsList>,
    DrawerScreenProps<HomeStackParamsList>
  >
>;

type CreateUserScreenProps = CompositeScreenProps<
  NativeStackScreenProps<AuthStackParamsList, 'CreateUser'>,
  NativeStackScreenProps<SetupNewDeviceStackParamsList>
>;

type LogoutScreenProps = NativeStackScreenProps<AuthStackParamsList, 'Logout'>;

type FeederMealsListScreenProps = CompositeScreenProps<
  NativeStackScreenProps<FeederMealsStackParamsList, 'FeederMealsList'>,
  BottomTabScreenProps<FeedingControlStackParamsList>
>;

type UpdateMealScreenProps = CompositeScreenProps<
  NativeStackScreenProps<FeederMealsStackParamsList, 'UpdateMeal'>,
  BottomTabScreenProps<FeedingControlStackParamsList>
>;

export type {
  DeviceConnectionInstructionsProps,
  InsertWifiCredentialsScreenProps,
  InsertDeviceNameScreenProps,
  FeedingControlDashboardScreenProps,
  LoginScreenProps,
  CreateUserScreenProps,
  FeederMealsListScreenProps,
  LogoutScreenProps,
  ReconnectFeederDeviceScreenProps,
  UpdateMealScreenProps,
};
