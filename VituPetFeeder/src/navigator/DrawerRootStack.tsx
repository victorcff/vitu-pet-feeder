import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerStackParamsList } from './types/paramsList';
import FeedingControlDashboard from '../screens/FeedingControlInput/FeedingControlDashboard';
import SetupNewDevice from './SetupNewDeviceStack';

const DrawerRootStack = createDrawerNavigator<DrawerStackParamsList>();

const Drawer = () => (
  <DrawerRootStack.Navigator initialRouteName="FeedingControlDashboard">
    <DrawerRootStack.Screen
      name="FeedingControlDashboard"
      component={FeedingControlDashboard}
      options={{ headerShown: false }}
    />
    <DrawerRootStack.Screen
      name="SetupNewDevice"
      component={SetupNewDevice}
      options={{ headerShown: false }}
    />
  </DrawerRootStack.Navigator>
);

export default Drawer;
