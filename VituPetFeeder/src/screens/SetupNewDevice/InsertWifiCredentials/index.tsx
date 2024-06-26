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
    style: styles.textInput,
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
        <CustomTextInput
          size={'large'}
          textInputProps={passwordInputProps}
          isPassword
        />
      </View>
      <View>
        <Button
          size="medium"
          type="save"
          onPress={() => {}}
          isLoading={isLoading}
        />
      </View>
      <AlertModal
        message={modalMessage}
        onClose={() => setShowModal(false)}
        type="success"
        visible={showModal}
      />
    </View>
  );
};

export default InsertWifiCredentials;
