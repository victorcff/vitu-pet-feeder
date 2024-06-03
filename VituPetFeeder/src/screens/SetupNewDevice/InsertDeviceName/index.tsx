import React, { useEffect, useRef, useState } from 'react';
import { AppState, Text, TextInputProps, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Button from '../../../components/Button';
import { setupNewDeviceInstructionMessage } from '../../../consts';
import CustomTextInput from '../../../components/CustomTextInput';
import { DEVICE_NAME_MAX_LENGTH } from '../../../consts/values';
import AlertModal from '../../../components/AlertModal';
import { CreateDeviceRequest, FeederDevice, User } from '../../../types/api';
import { InsertDeviceNameScreenProps } from '../../../navigator/types/screenProps';
import { useAuth } from '../../../context/Auth/auth';
import { isFeederDevice, isUser } from '../../../utils/checkTypes';
import styles from './styles';
import UserServices from '../../../services/UserServices';
import FeederDevicesServices from '../../../services/FeederDevices';

const InsertDeviceName = ({
  navigation,
  route,
}: InsertDeviceNameScreenProps) => {
  const appState = useRef(AppState.currentState);
  const [deviceName, setDeviceName] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User>({} as User);
  const [macAddress, setMacAddress] = useState('');

  const { user, updateUser } = useAuth();

  const onCloseModal = () => {
    setShowModal(false);
  };

  const nameInputProps: TextInputProps = {
    defaultValue: deviceName,
    maxLength: DEVICE_NAME_MAX_LENGTH,
    onChangeText: text => setDeviceName(text),
    placeholder: 'Nome do dispositivo',
    placeholderTextColor: '#80f2bd6b',
    style: styles.textInput,
  };

  const createDevice = async () => {
    if (deviceName === '') {
      setModalMessage('Campo nome obrigatório');
      setShowModal(true);
      return;
    }
    try {
      setIsLoading(true);
      const params: CreateDeviceRequest = {
        name: deviceName,
        owner_id: currentUser.id,
        mac_address: macAddress,
      };
      const { data } = await FeederDevicesServices.createDevice(params);
      const device: FeederDevice = {
        id: data.id,
        name: data.name,
        ownerId: data.owner_id,
      };
      if (isUser(user)) {
        const { data } = await UserServices.getUserById(user.id);
        updateUser(data);
      }
      if (isFeederDevice(device))
        navigation.navigate('FeedingControl', {
          screen: 'FeedingControlDashboard',
          params: { createdDevice: device },
        });
      setIsLoading(false);
    } catch (error) {
      const err = error as Error;
      console.error(err);
      setIsLoading(false);
    }
  };

  const getMacAddress = async () => {
    try {
      const {
        data: { mac_address },
      } = await FeederDevicesServices.getMacAddress();
      setMacAddress(mac_address);
    } catch (_error) {
      const error = _error as Error;
      console.error(error.message);
    }
  };

  useEffect(() => {
    if (isUser(user)) setCurrentUser(user);
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', nextAppState => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        if (macAddress === '') getMacAddress();
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
        <Icon name="id-card" size={150} color={'#eef280'} />
        <Text style={styles.message}>
          {setupNewDeviceInstructionMessage.insertDeviceName}
        </Text>
      </View>
      <View>
        <CustomTextInput size={'large'} textInputProps={nameInputProps} />
      </View>
      <View>
        <Button
          size="medium"
          type="save"
          onPress={() => createDevice()}
          isLoading={isLoading}
        />
      </View>
      <AlertModal
        message={modalMessage}
        onClose={onCloseModal}
        type="error"
        visible={showModal}
      />
    </View>
  );
};

export default InsertDeviceName;
