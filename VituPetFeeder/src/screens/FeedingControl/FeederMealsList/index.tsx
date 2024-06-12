import React, { useEffect, useState } from 'react';
import { FlatList, Pressable, Text, TextInputProps, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { FeederMealsListScreenProps } from '../../../navigator/types/screenProps';
import MealsServices from '../../../services/MealsServices';
import { ActivateMealRequest, Meal, MealResponse } from '../../../types/api';
import { isMeal } from '../../../utils/checkTypes';
import { useFeederDevices } from '../../../context/FeederDevices';
import CustomTextInput from '../../../components/CustomTextInput';

const FeederMealsList = ({ navigation, route }: FeederMealsListScreenProps) => {
  const { feederDevices } = useFeederDevices();

  const [meals, setMeals] = useState<Meal[]>([]);
  const [weight, setWeight] = useState('');

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

  const activateMeal = async () => {
    try {
      const params: ActivateMealRequest = {
        weight: parseInt(weight),
      };
      await MealsServices.activateMeal(params);
    } catch (error) {
      console.error(error);
    }
  };

  const weightInputProps: TextInputProps = {
    defaultValue: weight,
    maxLength: 4,
    onChangeText: text => setWeight(text),
    placeholder: 'Peso da refeição',
    placeholderTextColor: '#80f2bd6b',
    inputMode: 'numeric',
    textAlign: 'center',
    style: { fontSize: 34 },
  };

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
        <View style={styles.infoContainer}>
          <View>
            <FlatList
              data={feederDevices[0]?.meals}
              renderItem={renderItem}
              keyExtractor={item => item.id.toString()}
            />
          </View>
          {/* <Icon
            color="#eef280"
            name="add-circle"
            size={100}
            onPress={goCreateMeal}
          /> */}
          <Icon color="#eef280" name="play" size={100} onPress={activateMeal} />
        </View>
      ) : (
        // <Icon
        //   color="#eef280"
        //   name="add-circle"
        //   size={100}
        //   onPress={goCreateMeal}
        // />

        <>
          <CustomTextInput
            size="large"
            textInputProps={weightInputProps}
            centerAlign
          />
          <Icon color="#eef280" name="play" size={100} onPress={activateMeal} />
        </>
      )}
    </View>
  );
};

export default FeederMealsList;
