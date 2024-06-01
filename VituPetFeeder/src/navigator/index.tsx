import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamsList } from './types/paramsList';
import Home from './HomeStack';
import Authenticate from './AuthStack';

const RootStack = createNativeStackNavigator<RootStackParamsList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName={'AuthStack'}>
        <RootStack.Screen
          name="AuthStack"
          component={Authenticate}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="HomeStack"
          component={Home}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
