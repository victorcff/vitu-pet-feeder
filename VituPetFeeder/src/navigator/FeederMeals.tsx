import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FeederMealsStackParamsList } from './types/paramsList';
import FeederMealsList from '../screens/FeedingControl/FeederMealsList';
import UpdateMeal from '../screens/FeedingControl/UpdateMeal';

const FeederMealsStack =
  createNativeStackNavigator<FeederMealsStackParamsList>();

const FeederMeals = () => (
  <FeederMealsStack.Navigator initialRouteName="FeederMealsList">
    <FeederMealsStack.Screen
      name="FeederMealsList"
      component={FeederMealsList}
      options={{ headerShown: false }}
    />
    <FeederMealsStack.Screen
      name="UpdateMeal"
      component={UpdateMeal}
      options={{ headerShown: false }}
    />
  </FeederMealsStack.Navigator>
);

export default FeederMeals;
