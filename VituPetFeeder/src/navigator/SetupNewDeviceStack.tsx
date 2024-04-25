import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { SetupNewDeviceStackParamsList } from './types/paramsList';
import DeviceConnectionInstructions from '../screens/SetupNewDevice/DeviceConnectionInstructions';
import InsertWifiCredentials from '../screens/SetupNewDevice/InsertWifiCredentials';

const SetupNewDeviceStack =
  createStackNavigator<SetupNewDeviceStackParamsList>();

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
  </SetupNewDeviceStack.Navigator>
);

export default SetupNewDevice;
