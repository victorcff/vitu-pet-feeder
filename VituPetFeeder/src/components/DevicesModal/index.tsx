import React, { useContext, useState } from "react";
import { Modal, Pressable, Text, View } from "react-native";
import { CustomModalProps } from "../../types/componentsProps";
import styles from "./styles";
import { FlatList } from "react-native-gesture-handler";
import { Device } from "react-native-ble-plx";
import Button from "../Button";
import { BleContext } from "../../context/ble";

const DevicesModal = ({visible}: CustomModalProps) => {
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null)

  const {connectToBleDevice, scannedDevices} = useContext(BleContext)

  const renderDeviceItem = (device: Device) => {
    return(
      <View style={[
        styles.deviceItemContainer, 
        {backgroundColor: selectedDevice ? '#2e2e2e' : '#d2d2d2d2'}
      ]}>
        <Text style={styles.deviceItemName}>{device.name}</Text>
        <Pressable 
          style={styles.selectDeviceButton}
          onPress={() => setSelectedDevice(device)}
        >
          <Text style={styles.selectButtonText}>Select</Text>
        </Pressable>    
      </View>
    )
  }

  return (
    <Modal
      animationType="slide"
      hardwareAccelerated
      transparent
      visible={visible}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <FlatList
            data={scannedDevices}
            renderItem={device => renderDeviceItem(device.item)}
            keyExtractor={device => device.id}
            extraData={selectedDevice}
          />
          <Button
            size="medium"
            type="connect"
            onPress={() => connectToBleDevice(selectedDevice)} 
          />
        </View>
      </View>
    </Modal>
  )
}

export default DevicesModal