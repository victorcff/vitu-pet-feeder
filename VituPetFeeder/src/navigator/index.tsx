import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamsList } from './types/paramsList';
import FeedingControlInput from './DrawerRootStack';

const RootStack = createNativeStackNavigator<RootStackParamsList>();

const AppNavigator = () => (
  <NavigationContainer>
    <RootStack.Navigator initialRouteName="DrawerStack">
      <RootStack.Screen
        name="DrawerStack"
        component={FeedingControlInput}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;

// TODO: terminar de configurar o drawer navigator e testar
