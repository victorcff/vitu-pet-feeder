import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import { version } from '../../../package.json';

const DrawerContent = ({
  navigation,
  ...props
}: DrawerContentComponentProps) => {
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.scrollViewContent}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Vitu Pet Feeder</Text>
      </View>
      <View>
        <DrawerItemList {...props} navigation={navigation} />
      </View>
      <View style={styles.footer}>
        <Text style={styles.footerTitle}>v.{version}</Text>
        <Icon
          name="logout"
          size={30}
          color="#eef280"
          onPress={() => navigation.navigate('Logout')}
        />
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
