import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthStackParamsList } from './types/paramsList';
import Login from '../screens/Auth/Login';
import CreateUser from '../screens/Auth/CreateUser';
import Logout from '../screens/Auth/Logout';

const AuthStack = createNativeStackNavigator<AuthStackParamsList>();

const Authenticate = () => (
  <AuthStack.Navigator initialRouteName="Login">
    <AuthStack.Screen
      name="Login"
      component={Login}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="CreateUser"
      component={CreateUser}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="Logout"
      component={Logout}
      options={{ headerShown: false }}
    />
  </AuthStack.Navigator>
);

export default Authenticate;
