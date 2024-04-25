import React from 'react';
import { CustomTextInputProps } from '../../types/componentsProps';
import { TextInput, useWindowDimensions, View } from 'react-native';
import styles from './styles';

const CustomTextInput = ({ size, textInputProps }: CustomTextInputProps) => {
  const { width } = useWindowDimensions();
  return (
    <View style={styles({ size, width }).inputContainer}>
      <TextInput {...textInputProps} cursorColor={'#80f2bd'} />
    </View>
  );
};

export default CustomTextInput;
