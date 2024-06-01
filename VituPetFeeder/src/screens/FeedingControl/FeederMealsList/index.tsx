import React, { useEffect } from 'react';
import { View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';
import { FeederMealsListScreenProps } from '../../../navigator/types/screenProps';
import { useAuth } from '../../../context/Auth/auth';

const FeederMealsList = ({ navigation, route }: FeederMealsListScreenProps) => {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <Icon color="#302f2f" name="add-circle" size={100} />
    </View>
  );
};

export default FeederMealsList;
