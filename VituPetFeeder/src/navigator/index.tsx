import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import ConnectingToWifi from "./ConnectingToWifiStack";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamsList } from "./types/paramsList";

const RootStack = createNativeStackNavigator<RootStackParamsList>()

const AppNavigator = () => (
  <NavigationContainer>
    <RootStack.Navigator initialRouteName="ConnectingToWifi" >
      <RootStack.Screen 
        name='ConnectingToWifi'
        component={ConnectingToWifi}
        options={{headerShown: false}}
      />
    </RootStack.Navigator>
  </NavigationContainer>
)

export default AppNavigator
