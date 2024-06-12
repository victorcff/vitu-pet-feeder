import React, { useState } from 'react';
import {
  Text,
  TextInput,
  TextInputProps,
  View,
  KeyboardAvoidingView,
} from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import InputIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { UpdateMealScreenProps } from '../../../navigator/types/screenProps';
import styles from './styles';
import CustomTextInput from '../../../components/CustomTextInput';
import { MEAL_NAME_MAX_LENGHT } from '../../../consts/values';
import Button from '../../../components/Button';
import MealsServices from '../../../services/MealsServices';
import {
  CreateMealRequest,
  FeederDevice,
  FeederDeviceResponse,
} from '../../../types/api';
import { useFeederDevices } from '../../../context/FeederDevices';
import FeederDevicesServices from '../../../services/FeederDevices';
import { useAuth } from '../../../context/Auth/auth';
import { isFeederDevice, isUser } from '../../../utils/checkTypes';

const UpdateMeal = ({ navigation, route }: UpdateMealScreenProps) => {
  const mealToUpdate = route.params.meal;
  const { action } = route.params;
  const [mealName, setMealName] = useState(mealToUpdate?.name || '');
  const [hourPicked, setHourPicked] = useState('12');
  const [minutesPicked, setMinutesPicked] = useState('30');
  const [isLoading, setIsLoading] = useState(false);
  const [weight, setWeight] = useState('150');

  const { feederDevices, setFeederDevices } = useFeederDevices();

  const { user } = useAuth();

  const nameInputProps: TextInputProps = {
    defaultValue: mealName,
    maxLength: MEAL_NAME_MAX_LENGHT,
    onChangeText: text => setMealName(text),
    placeholder: 'Nome da refeição',
    placeholderTextColor: '#80f2bd6b',
    style: { fontSize: 18, marginTop: 35, color: '#80f2bd' },
  };

  const handleHourInput = (text: string) => {
    if (!isNaN(+text)) {
      let hour = Number(text);
      if (hour >= 24) hour = 23;
      if (hour < 0) hour = 0;
      setHourPicked(hour.toString());
    } else setHourPicked(text);
  };

  const handleMinuteInput = (text: string) => {
    if (!isNaN(+text)) {
      let minutes = Number(text);
      if (minutes >= 60) minutes = 59;
      if (minutes < 0) minutes = 0;
      setMinutesPicked(minutes.toString());
    } else setMinutesPicked(text);
  };

  const formatFeederDevices = (devicesArray: FeederDeviceResponse[]) => {
    return devicesArray.reduce<FeederDevice[]>((reducedArray, item) => {
      const totalMeals = reducedArray;
      const currentIndexMeal: FeederDevice = {
        ...item,
        ownerId: item.owner_id,
      };
      if (isFeederDevice(currentIndexMeal)) totalMeals.push(currentIndexMeal);
      return totalMeals;
    }, []);
  };

  const handleSavingMealInfo = async () => {
    setIsLoading(true);
    if (action === 'create') {
      let hour = hourPicked;
      let minutes = minutesPicked;
      if (hourPicked.length === 1) hour = `0${hourPicked}`;
      if (minutesPicked.length === 1) minutes = `0${minutesPicked}`;
      try {
        const mealToCreate: CreateMealRequest = {
          device_id: feederDevices[0].id,
          name: mealName,
          time: `${hour}:${minutes}`,
          weight,
        };
        await MealsServices.createMeal(mealToCreate);
        let devices: FeederDeviceResponse[] = [];
        if (isUser(user)) {
          const { data } = await FeederDevicesServices.getAllDevicesFromUser(
            user.id,
          );
          devices = data;
        }
        const formattedDevices = formatFeederDevices(devices);
        setFeederDevices(formattedDevices);
        navigation.replace('FeederMealsList');
      } catch (error) {
        console.error(error);
      }
    } else {
    }
    setIsLoading(false);
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.header}>
        <BackIcon
          name="arrow-back"
          size={26}
          color="#302f2f"
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.headerTitle}>
          {mealName ? mealName : 'Refeição'}
        </Text>
      </View>
      <CustomTextInput size="medium" textInputProps={nameInputProps} />
      <View style={styles.timeInfoContainer}>
        <InputIcon name="clock-time-four" size={70} color="#80f2bd" />
        <View style={styles.timeInputContainer}>
          <TextInput
            cursorColor="#80f2bd"
            inputMode="numeric"
            maxLength={2}
            onChangeText={text => handleHourInput(text)}
            textAlign="right"
            value={hourPicked}
            style={styles.timeTextInput}
          />
          <Text style={styles.twoDots}>:</Text>
          <TextInput
            cursorColor="#80f2bd"
            inputMode="numeric"
            maxLength={2}
            onChangeText={text => handleMinuteInput(text)}
            textAlign="left"
            value={minutesPicked}
            style={styles.timeTextInput}
          />
        </View>
      </View>
      <View style={styles.weightContainer}>
        <InputIcon name="weight" size={70} color="#80f2bd" />
        <View style={styles.weightTextInputContainer}>
          <TextInput
            cursorColor="#80f2bd"
            value={weight}
            inputMode="numeric"
            onChangeText={text => setWeight(text)}
            textAlign="center"
            style={styles.weightTextInput}
          />
          <Text style={styles.weightInputSuffix}>g</Text>
        </View>
      </View>
      <Button
        type={action === 'create' ? 'createUser' : 'update'}
        size="large"
        onPress={() => handleSavingMealInfo()}
        isLoading={isLoading}
      />
    </KeyboardAvoidingView>
  );
};

export default UpdateMeal;
