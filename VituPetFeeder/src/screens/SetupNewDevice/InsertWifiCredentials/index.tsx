import React, { useContext, useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import WifiManager from "react-native-wifi-reborn";
import { InsertWifiCredentialsScreenProps } from "../../navigator/types/screenProps";
import Button from "../../components/Button";
import styles from "./styles";
import { BleContext } from "../../context/ble";
import { BleUUIDs } from "../../consts";

const {PASSWORD_UUID, SSID_UUID, CONNECT_TO_WIFI_FLAG_UUID} = BleUUIDs

const InsertWifiCredentials = ({navigation, route}: InsertWifiCredentialsScreenProps) => {
  const [ssid, setSsid] = useState('')
  const [password, setPassword] = useState('')

  const {sendMessage} = useContext(BleContext)

  const sendWifiCredentials = (ssid: string, password: string) => {
    sendMessage(ssid, SSID_UUID)
    sendMessage(password, PASSWORD_UUID)

    setTimeout(() => {
      sendMessage("connect", CONNECT_TO_WIFI_FLAG_UUID)
    }, 3000)
  }

  const getWifiSsid = () => {
    WifiManager.getCurrentWifiSSID().then(
      ssid => {
        console.log('Wifi ssid found!', ssid)
        setSsid(ssid)
      },
      () => {
        console.warn("Cannot get current SSID!");
      }
    )
  }

  useEffect(() => {
    getWifiSsid()
  }, [])
  
  return (
    <View style={styles.container}>
      <Text style={{color: '#000000'}}>{ssid}</Text>
      <TextInput
        onChangeText={text => setPassword(text)}
      />
      <Button
        size="medium"
        type="saveWifiCredentials"
        onPress={() => sendWifiCredentials(ssid, password)}
      />
    </View>
  )
}

export default InsertWifiCredentials