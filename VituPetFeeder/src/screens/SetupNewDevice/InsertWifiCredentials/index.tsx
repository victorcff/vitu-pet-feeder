import React, { useState } from 'react';
import { Text, TextInputProps, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { InsertWifiCredentialsScreenProps } from '../../../navigator/types/screenProps';
import styles from './styles';
import Button from '../../../components/Button';
import { setupNewDeviceInstructionMessage } from '../../../consts';
import CustomTextInput from '../../../components/CustomTextInput';
import {
  SSID_MAX_LENGTH,
  WIFI_PASSWORD_MAX_LENGTH,
} from '../../../consts/values';
import { fillStringWithWhiteSpace } from '../../../utils/stringTransform';
import SetupNewDeviceServices from '../../../services/SetupNewDeviceServices';
import AlertModal from '../../../components/AlertModal';

const InsertWifiCredentials = ({
  navigation,
  route,
}: InsertWifiCredentialsScreenProps) => {
  const { ssid } = route.params;

  const [wifiSsid, setWifiSsid] = useState(ssid);
  const [password, setPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onCloseModal = () => {
    setShowModal(false);
    navigation.navigate('Drawer', { screen: 'FeedingControlDashboard' });
  };

  const ssidInputProps: TextInputProps = {
    autoFocus: ssid !== '' ? false : true,
    defaultValue: ssid,
    maxLength: SSID_MAX_LENGTH,
    onChangeText: text => setWifiSsid(text),
    placeholder: 'SSID',
    placeholderTextColor: '#80f2bd6b',
    style: styles.textInput,
  };

  const passwordInputProps: TextInputProps = {
    autoFocus: ssid !== '' ? true : false,
    defaultValue: password,
    maxLength: WIFI_PASSWORD_MAX_LENGTH,
    onChangeText: text => setPassword(text),
    placeholder: 'Senha',
    placeholderTextColor: '#80f2bd6b',
    secureTextEntry: true,
    style: styles.textInput,
  };

  const sendWifiCredentials = async () => {
    const formattedSsid = fillStringWithWhiteSpace(wifiSsid, SSID_MAX_LENGTH);
    const formattedPassword = fillStringWithWhiteSpace(
      password,
      WIFI_PASSWORD_MAX_LENGTH,
    );
    const ssidRealLength = fillStringWithWhiteSpace(
      wifiSsid.length.toString(),
      2,
    );
    const passwordRealLength = fillStringWithWhiteSpace(
      password.length.toString(),
      2,
    );
    const reqBody = formattedSsid.concat(
      ssidRealLength,
      formattedPassword,
      passwordRealLength,
    );

    try {
      setIsLoading(true);
      const { data } = await SetupNewDeviceServices.sendWifiCredentials(
        reqBody,
      );
      setModalMessage(data);
      setIsLoading(false);
      setShowModal(true);
    } catch (error) {
      const err = error as Error;
      console.error(err.message);
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Icon name="wifi-sync" size={150} color={'#eef280'} />
        <Text style={styles.message}>
          {setupNewDeviceInstructionMessage.insertWifiCredentials}
        </Text>
      </View>
      <View>
        <CustomTextInput size={'large'} textInputProps={ssidInputProps} />
        <CustomTextInput size={'large'} textInputProps={passwordInputProps} />
      </View>
      <View>
        <Button
          size="medium"
          type="save"
          onPress={() => sendWifiCredentials()}
          isLoading={isLoading}
        />
      </View>
      <AlertModal
        message={modalMessage}
        onClose={onCloseModal}
        type="success"
        visible={showModal}
      />
    </View>
  );
};

export default InsertWifiCredentials;
