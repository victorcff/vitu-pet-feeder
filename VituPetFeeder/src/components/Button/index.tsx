import React from "react";
import { Pressable, Text, useWindowDimensions } from "react-native";
import styles from "./styles";
import { ButtonProps, ButtonTitle } from "../../types/componentsProps";

 const Button = ({size, type, onPress, containerStyle}: ButtonProps) => {
  const {width} = useWindowDimensions()

  const buttonTitle: ButtonTitle = {
    connect: 'Connect to Ble',
    disconnect: 'Disconnect Ble',
    sendMessage: 'Send Message',
    saveWifiCredentials: 'Save Credentials'
  }

  const getButtonTitle = () => buttonTitle[type]
  return (
    <Pressable 
      style={[styles({size, width}).buttoncontainer, containerStyle]} 
      onPress={onPress}
    >
      <Text style={styles({size}).buttonTitle}>
        {getButtonTitle()}
      </Text>
    </Pressable>
  )
}

export default Button