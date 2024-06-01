import React from 'react';
import { SetupNewDeviceStackParamsList } from './types/paramsList';
import DeviceConnectionInstructions from '../screens/SetupNewDevice/DeviceConnectionInstructions';
import InsertWifiCredentials from '../screens/SetupNewDevice/InsertWifiCredentials';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import InsertDeviceName from '../screens/SetupNewDevice/InsertDeviceName';

const SetupNewDeviceStack =
  createNativeStackNavigator<SetupNewDeviceStackParamsList>();

const SetupNewDevice = () => (
  <SetupNewDeviceStack.Navigator initialRouteName="DeviceConnectionInstructions">
    <SetupNewDeviceStack.Screen
      name="DeviceConnectionInstructions"
      component={DeviceConnectionInstructions}
      options={{ headerShown: false }}
    />
    <SetupNewDeviceStack.Screen
      name="InsertWifiCredentials"
      component={InsertWifiCredentials}
      options={{ headerShown: false }}
    />
    <SetupNewDeviceStack.Screen
      name="InsertDeviceName"
      component={InsertDeviceName}
      options={{ headerShown: false }}
    />
  </SetupNewDeviceStack.Navigator>
);

export default SetupNewDevice;
