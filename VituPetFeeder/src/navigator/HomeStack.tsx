import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeStackParamsList } from './types/paramsList';
import SetupNewDevice from './SetupNewDeviceStack';
import FeedingControl from './FeedingControlStack';
import DrawerContent from '../components/DrawerContent';
import { Dimensions } from 'react-native';
import DrawerItemIcon from 'react-native-vector-icons/MaterialIcons';

const { width } = Dimensions.get('window');

const HomeStack = createDrawerNavigator<HomeStackParamsList>();

const Home = () => (
  <HomeStack.Navigator
    screenOptions={{
      drawerStyle: {
        backgroundColor: '#a3a3a3',
        width: 0.65 * width,
      },
      overlayColor: '#302f2f',
      drawerActiveTintColor: '#302f2f',
      drawerActiveBackgroundColor: '#80f2bd',
      drawerInactiveTintColor: '#80f2bd',
      drawerInactiveBackgroundColor: '#575353c7',
      drawerLabelStyle: {
        fontSize: 16,
      },
    }}
    initialRouteName="FeedingControl"
    backBehavior="history"
    drawerContent={({ navigation, ...props }) => (
      <DrawerContent {...props} navigation={navigation} />
    )}>
    <HomeStack.Screen
      name="FeedingControl"
      component={FeedingControl}
      options={{
        headerShown: false,
        drawerIcon: ({ focused }) => (
          <DrawerItemIcon
            name="device-hub"
            size={focused ? 30 : 20}
            color={focused ? '#302f2f' : '#80f2bd'}
          />
        ),
        drawerLabel: 'Seus Dispositivos',
      }}
    />
    <HomeStack.Screen
      name="SetupNewDevice"
      component={SetupNewDevice}
      options={{
        headerShown: false,
        drawerIcon: ({ focused }) => (
          <DrawerItemIcon
            name="leak-add"
            size={focused ? 35 : 25}
            color={focused ? '#302f2f' : '#80f2bd'}
          />
        ),
        drawerLabel: 'Novo Dispositivo',
      }}
    />
  </HomeStack.Navigator>
);

export default Home;
