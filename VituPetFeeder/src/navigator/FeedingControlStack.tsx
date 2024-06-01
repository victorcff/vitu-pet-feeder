import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FeedingControlStackParamsList } from './types/paramsList';
import FeedingControlDashboard from '../screens/FeedingControl/FeedingControlDashboard';
import FeederMealsList from '../screens/FeedingControl/FeederMealsList';

const FeedingControlStack =
  createBottomTabNavigator<FeedingControlStackParamsList>();

const FeedingControl = () => (
  <FeedingControlStack.Navigator
    initialRouteName="FeedingControlDashboard"
    backBehavior="initialRoute">
    <FeedingControlStack.Screen
      name="FeedingControlDashboard"
      component={FeedingControlDashboard}
      options={{
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
        tabBarIcon: ({ focused }) => (
          <Icon
            name="home-analytics"
            color={focused ? '#80f2bd' : '#302f2f'}
            size={36}
          />
        ),
        tabBarLabel: 'Dashboard',
        tabBarActiveTintColor: '#80f2bd',
        tabBarActiveBackgroundColor: '#302f2f',
        tabBarInactiveTintColor: '#575353c7',
        tabBarInactiveBackgroundColor: '#80f2bd',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarHideOnKeyboard: true,
      }}
    />
    <FeedingControlStack.Screen
      name="FeederMealsList"
      component={FeederMealsList}
      options={{
        headerShown: false,
        tabBarLabelPosition: 'below-icon',
        tabBarIcon: ({ focused }) => (
          <Icon
            name="food-drumstick"
            color={focused ? '#80f2bd' : '#302f2f'}
            size={36}
          />
        ),
        tabBarLabel: 'Refeições',
        tabBarActiveTintColor: '#80f2bd',
        tabBarActiveBackgroundColor: '#302f2f',
        tabBarInactiveTintColor: '#575353c7',
        tabBarInactiveBackgroundColor: '#80f2bd',
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarHideOnKeyboard: true,
      }}
    />
  </FeedingControlStack.Navigator>
);

export default FeedingControl;
