import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ReconnectFeederDeviceScreenProps } from '../../../navigator/types/screenProps';
import Button from '../../../components/Button';
import styles from './styles';
import { RECONNECT_FEEDER_DEVICE_WARNING_MESSAGE } from '../../../consts/strings';
import FeederDevicesServices from '../../../services/FeederDevices';
import { useAuth } from '../../../context/Auth/auth';
import { isUser } from '../../../utils/checkTypes';

const ReconnectFeederDevice = ({
  navigation,
}: ReconnectFeederDeviceScreenProps) => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const reconnectFeederDevice = async () => {
    setIsLoading(true);
    try {
      if (isUser(user)) {
        await FeederDevicesServices.reconnectDevice();
        const deleteDeviceParam = user.feederDevices[0].id;
        await FeederDevicesServices.deleteDevice(deleteDeviceParam);
        navigation.navigate('SetupNewDevice', {
          screen: 'DeviceConnectionInstructions',
        });
      }
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.messageContainer}>
        <Icon
          name="warning"
          size={200}
          color="#fcdf3c"
          style={styles.warningIcon}
        />
        <Text style={styles.message}>
          {RECONNECT_FEEDER_DEVICE_WARNING_MESSAGE}
        </Text>
      </View>
      <Button
        size="large"
        type={'reconnect'}
        bottom
        isLoading={isLoading}
        onPress={reconnectFeederDevice}
      />
    </View>
  );
};

export default ReconnectFeederDevice;
