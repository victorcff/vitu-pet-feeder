import React, { useEffect, useRef, useState } from 'react';
import { AppState, Linking, Text, View } from 'react-native';
import WifiManager from 'react-native-wifi-reborn';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import styles from './styles';
import { DeviceConnectionInstructionsProps } from '../../../navigator/types/screenProps';
import Button from '../../../components/Button';
import {
  DEVICE_AP_PASSWORD,
  DEVICE_AP_SSID,
  setupNewDeviceInstructionMessage,
} from '../../../consts';

const DeviceConnectionInstructions = ({
  navigation,
}: DeviceConnectionInstructionsProps) => {
  const appState = useRef(AppState.currentState);
  const [ssid, setSsid] = useState('');
  const [connectedToDevice, setConnectedToDevice] = useState(false);

  const goNextStep = async () => {
    if (connectedToDevice) {
      try {
        await Linking.openURL('http://192.168.4.1');
        navigation.navigate('InsertDeviceName');
      } catch (_error) {
        const error = _error as Error;
        console.error(error.message);
      }
    } else {
      try {
        await goToSettings();
      } catch (error) {
        const err = error as Error;
        console.error(err.message);
      }
    }
  };

  const goToSettings = async () => {
    try {
      await Linking.sendIntent('android.settings.WIFI_SETTINGS');
    } catch (error) {
      const err = error as Error;
      console.error(err.message);
    }
  };

  const getWifiSsid = () => {
    WifiManager.getCurrentWifiSSID().then(
      wifiSsid => {
        if (wifiSsid === DEVICE_AP_SSID) {
          setConnectedToDevice(true);
        } else {
          setConnectedToDevice(false);
          setSsid(wifiSsid);
        }
      },
      () => {
        setConnectedToDevice(false);
        setSsid('');
      },
    );
  };

  useEffect(() => {
    getWifiSsid();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        getWifiSsid();
      }

      appState.current = nextAppState;
      console.log('AppState', appState.current);
    });

    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Icon
          name={connectedToDevice ? 'wifi-tethering' : 'wifi'}
          size={200}
          color="#eef280"
          style={styles.wifiStatusIndicatorIcon}
        />
        <Text style={styles.message}>
          {connectedToDevice
            ? setupNewDeviceInstructionMessage.connectedToDevice
            : setupNewDeviceInstructionMessage.noConnectedDevice}
        </Text>
        <View style={styles.passwordContainer}>
          {!connectedToDevice && ssid !== '' ? (
            <Text style={styles.apPassword}>{DEVICE_AP_PASSWORD}</Text>
          ) : (
            <></>
          )}
          {!connectedToDevice && ssid !== '' ? (
            <Icon
              name="content-copy"
              size={30}
              color="#80f2bd"
              onPress={() => Clipboard.setString(DEVICE_AP_PASSWORD)}
            />
          ) : (
            <></>
          )}
        </View>
      </View>
      <Button
        size="medium"
        type={connectedToDevice ? 'next' : 'connect'}
        bottom
        onPress={() => goNextStep()}
      />
    </View>
  );
};

export default DeviceConnectionInstructions;
