import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import styles from './styles';
import { LogoutScreenProps } from '../../../navigator/types/screenProps';
import { useAuth } from '../../../context/Auth/auth';

const Logout = ({ navigation }: LogoutScreenProps) => {
  const { signOut } = useAuth();
  useEffect(() => {
    signOut();
    navigation.navigate('Login');
  });
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/login-logo.png')}
        style={styles.logoImage}
      />
    </View>
  );
};

export default Logout;
