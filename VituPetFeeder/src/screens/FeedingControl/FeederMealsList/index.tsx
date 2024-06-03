import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { FeederMealsListScreenProps } from '../../../navigator/types/screenProps';
import MealsServices from '../../../services/MealsServices';
import { Meal, MealResponse } from '../../../types/api';
import { isMeal } from '../../../utils/checkTypes';
import { useFeederDevices } from '../../../context/FeederDevices';

const FeederMealsList = ({ navigation, route }: FeederMealsListScreenProps) => {
  const { feederDevices } = useFeederDevices();

  const [meals, setMeals] = useState<Meal[]>([]);

  const formatMeals = (mealsArray: MealResponse[]) => {
    return mealsArray.reduce<Meal[]>((reducedArray, item) => {
      const totalMeals = reducedArray;
      const currentIndexMeal: Meal = {
        ...item,
        deviceId: item.device_id,
      };
      if (isMeal(currentIndexMeal)) totalMeals.push(currentIndexMeal);
      return totalMeals;
    }, []);
  };

  const getAllMeals = async () => {
    try {
      const { data } = await MealsServices.getAllMealsFromDevice(
        feederDevices[0]?.id,
      );
      const formattedMeals = formatMeals(data);
      setMeals(formattedMeals);
    } catch (error) {
      console.error(error);
    }
  };

  const goToMealDetails = (meal: Meal) =>
    navigation.navigate('UpdateMeal', { action: 'update', meal });

  const deleteMeal = async (mealId: number) => {
    try {
      await MealsServices.deleteMeal(mealId);
      await getAllMeals();
    } catch (error) {
      console.error(error);
    }
  };

  const goCreateMeal = () =>
    navigation.navigate('UpdateMeal', { action: 'create' });

  const renderItem = ({ item }: { item: Meal }) => (
    <View>
      <Pressable onPress={() => goToMealDetails(item)}>
        <Text>{item.name}</Text>
        <View>
          <Text>Peso:</Text>
          <Text>{`${item.weight}`}</Text>
        </View>
      </Pressable>
      <Pressable>
        <Icon
          name="trash"
          size={24}
          color="#302f2f"
          onPress={() => deleteMeal(item.id)}
        />
      </Pressable>
    </View>
  );

  useEffect(() => {
    getAllMeals();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="arrow-back"
          size={26}
          color="#302f2f"
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>{feederDevices[0]?.name}</Text>
      </View>
      {feederDevices[0]?.meals.length > 0 ? (
        <>
          <View>
            <FlatList
              data={feederDevices[0]?.meals}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
            />
          </View>
          <Icon color="#eef280" name="add-circle" size={100} />
        </>
      ) : (
        <Icon
          color="#eef280"
          name="add-circle"
          size={100}
          onPress={goCreateMeal}
        />
      )}
    </View>
  );
};

export default FeederMealsList;
