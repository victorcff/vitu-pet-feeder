import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  DrawerStackParamsList,
  SetupNewDeviceStackParamsList,
} from './paramsList';

type DeviceConnectionInstructionsProps = NativeStackScreenProps<
  SetupNewDeviceStackParamsList,
  'DeviceConnectionInstructions'
>;

type InsertWifiCredentialsScreenProps = NativeStackScreenProps<
  SetupNewDeviceStackParamsList,
  'InsertWifiCredentials'
>;

type FeedingControlDashboardScreenProps = NativeStackScreenProps<
  DrawerStackParamsList,
  'FeedingControlDashboard'
>;

export type {
  DeviceConnectionInstructionsProps,
  InsertWifiCredentialsScreenProps,
  FeedingControlDashboardScreenProps,
};
