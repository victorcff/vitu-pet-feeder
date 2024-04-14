import React, { useContext, useEffect, useState } from "react"
import { View } from "react-native"
import styles from "./styles"
import { ConnectToBleScreenProps } from "../../../navigator/types/screenProps"
import Button from "../../../components/Button"
import DevicesModal from "../../../components/DevicesModal"
import { BleContext } from "../../../context/ble";
import WifiManager from "react-native-wifi-reborn";

const ConnectToBle = ({navigation}: ConnectToBleScreenProps) => {
  const [devicesModalVisible, setDevicesModalVisible] = useState(false)

  const {scanDevices ,scannedDevices, isConnected} = useContext(BleContext)

  const checkScannedDevices = (deviceListLength: number) => {
    if (deviceListLength !== 0) setDevicesModalVisible(true)
  }

  const checkConnectedDevice = (isConnected: boolean) => {
    if (isConnected) {
      setDevicesModalVisible(false)
      navigation.navigate('InsertWifiCredentials')
    } 
  }

  const isValidWifi = () => {
    WifiManager.getFrequency().then(
      frequency => {
        console.log(frequency, typeof frequency)
      },
      () => {
        console.log('No wifi connected')
      }
    )
  }

  useEffect(() => {
    isValidWifi()
  }, [])

  useEffect(() => {
    checkScannedDevices(scannedDevices.length)
  }, [scannedDevices.length])

  useEffect(() => {
    checkConnectedDevice(isConnected)
  }, [isConnected])

  return (
    <View style={styles.container}>
      <Button 
        size="medium"
        type="connect"
        onPress={scanDevices}
      />
      <DevicesModal 
        visible={devicesModalVisible}
      />
    </View>
  )
}

export default ConnectToBle
