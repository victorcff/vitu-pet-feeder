import React, { useState } from 'react';
import { Text, View } from 'react-native';
import BackIcon from 'react-native-vector-icons/Ionicons';
import { UpdateMealScreenProps } from '../../../navigator/types/screenProps';
import styles from './styles';

const UpdateMeal = ({ navigation, route }: UpdateMealScreenProps) => {
  const mealToUpdate = route.params.meal;
  const [mealName, setMealName] = useState(mealToUpdate?.name);
  return (
    <View style={styles.container}>
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
    </View>
  );
};

export default UpdateMeal;
