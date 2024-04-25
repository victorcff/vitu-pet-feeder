import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  Text,
  useWindowDimensions,
} from 'react-native';
import styles from './styles';
import { ButtonProps } from '../../types/componentsProps';
import { buttonTitle } from '../../consts';

const Button = ({
  size,
  type,
  onPress,
  isLoading,
  bottom,
  containerStyle,
}: ButtonProps) => {
  const { width } = useWindowDimensions();

  const getButtonTitle = () => buttonTitle[type];
  return (
    <Pressable
      style={[styles({ size, width, bottom }).buttoncontainer, containerStyle]}
      onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator animating color={'#191931'} size={20} />
      ) : (
        <Text style={styles({ size }).buttonTitle}>{getButtonTitle()}</Text>
      )}
    </Pressable>
  );
};

export default Button;
