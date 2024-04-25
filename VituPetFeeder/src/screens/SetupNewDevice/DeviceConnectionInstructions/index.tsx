import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, AppState, Linking, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ReloadIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Clipboard from '@react-native-clipboard/clipboard';
import styles from './styles';
import { DeviceConnectionInstructionsProps } from '../../../navigator/types/screenProps';
import Button from '../../../components/Button';
import WifiManager from 'react-native-wifi-reborn';
import {
  DEVICE_AP_PASSWORD,
  DEVICE_AP_SSID,
  setupNewDeviceInstructionMessage,
} from '../../../consts';
import AlertModal from '../../../components/AlertModal';

const modalMessage = 'Não foi possível detectar uma rede Wifi.';

const DeviceConnectionInstructions = ({
  navigation,
}: DeviceConnectionInstructionsProps) => {
  const appState = useRef(AppState.currentState);
  const [ssid, setSsid] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [connectedToDevice, setConnectedToDevice] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onModalClose = () => setShowModal(false);

  const goNextStep = async () => {
    if (connectedToDevice) {
      navigation.navigate('InsertWifiCredentials', { ssid });
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
      ssid => {
        if (ssid === DEVICE_AP_SSID) {
          setConnectedToDevice(true);
        } else {
          setConnectedToDevice(false);
          setSsid(ssid);
        }
      },
      () => {
        setConnectedToDevice(false);
        setSsid('');
      },
    );
  };

  const refresh = () => {
    setIsLoading(true);
    getWifiSsid();
    setIsLoading(false);
  };

  useEffect(() => {
    setIsLoading(true);
    getWifiSsid();
    setIsLoading(false);
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
      {isLoading ? (
        <ActivityIndicator animating color={'#80f2bd'} size={'small'} />
      ) : (
        <ReloadIcon
          name="reload"
          size={26}
          color={'#80f2bd'}
          style={styles.reloadIcon}
          onPress={() => refresh()}
        />
      )}

      <View style={styles.messageContainer}>
        <Icon
          name={
            connectedToDevice
              ? 'wifi-tethering'
              : ssid === ''
              ? 'wifi-off'
              : 'wifi'
          }
          size={200}
          color="#eef280"
          style={styles.wifiStatusIndicatorIcon}
        />
        <Text style={styles.message}>
          {connectedToDevice
            ? setupNewDeviceInstructionMessage.connectedToDevice
            : ssid === ''
            ? setupNewDeviceInstructionMessage.noWifi
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
              color={'#80f2bd'}
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
      <AlertModal
        visible={showModal}
        message={modalMessage}
        type="warning"
        onClose={() => onModalClose()}
      />
    </View>
  );
};

export default DeviceConnectionInstructions;
