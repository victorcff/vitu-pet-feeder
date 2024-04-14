import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { ConnectingToWifiStackParamsList } from './types/paramsList'
import ConnectToBle from '../screens/ConnectingToWifi/ConnectToBle'
import InsertWifiCredentials from '../screens/InsertWifiCredentials'

const ConnectingToWifiStack = createStackNavigator<ConnectingToWifiStackParamsList>()

const ConnectingToWifi = () => (
  <ConnectingToWifiStack.Navigator initialRouteName='ConnectToBle' >
    <ConnectingToWifiStack.Screen 
      name='ConnectToBle' 
      component={ConnectToBle}
      options={{headerShown: false}} 
    />
    <ConnectingToWifiStack.Screen
      name='InsertWifiCredentials'
      component={InsertWifiCredentials}
      options={{headerShown: false}}
    />
  </ConnectingToWifiStack.Navigator>
)

export default ConnectingToWifi
