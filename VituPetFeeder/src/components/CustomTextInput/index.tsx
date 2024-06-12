import React, { useEffect, useState } from 'react';
import { TextInput, useWindowDimensions, View } from 'react-native';
import ShowIcon from 'react-native-vector-icons/Ionicons';
import { CustomTextInputProps } from '../../types/componentsProps';
import styles from './styles';

const CustomTextInput = ({
  size,
  textInputProps,
  isPassword = false,
  centerAlign = false,
}: CustomTextInputProps) => {
  const { width } = useWindowDimensions();
  const [hidePassword, setHidePassword] = useState(false);

  useEffect(() => {
    if (isPassword) setHidePassword(true);
    else setHidePassword(false);
  }, [isPassword]);

  const renderIcon = () => (
    <ShowIcon
      name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
      size={26}
      color="#eef280"
      onPress={() => setHidePassword(!hidePassword)}
    />
  );

  return (
    <View style={styles({ size, width, centerAlign }).inputContainer}>
      <TextInput
        {...textInputProps}
        style={[styles({}).textInput, textInputProps.style]}
        secureTextEntry={hidePassword}
        cursorColor={'#80f2bd'}
        autoCapitalize="none"
      />
      {isPassword && renderIcon()}
    </View>
  );
};

export default CustomTextInput;
