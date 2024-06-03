import React, { useCallback, useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import WeightIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { FeedingControlDashboardScreenProps } from '../../../navigator/types/screenProps';
import styles from './styles';
import { useAuth } from '../../../context/Auth/auth';
import { isUser } from '../../../utils/checkTypes';
import FeederDevicesServices from '../../../services/FeederDevices';
import AlertModal from '../../../components/AlertModal';
import Button from '../../../components/Button';
import { CustomModalType } from '../../../types/componentsProps';
import { formatStringOrNumberToDecimalStr } from '../../../utils/stringTransform';
import { FeederDevice } from '../../../types/api';

const FeedingControlDashboard = ({
  navigation,
  route,
}: FeedingControlDashboardScreenProps) => {
  const createdDevice = route.params?.createdDevice;
  const { user } = useAuth();
  const [device, setDevice] = useState({} as FeederDevice);
  const [realTimeWeight, setRealTimeWeight] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalType, setModalType] = useState<CustomModalType>('warning');

  const getRealTimeWeight = useCallback(async () => {
    try {
      setIsLoading(true);
      const {
        data: { weight },
      } = await FeederDevicesServices.getRealTimeWeight();
      setRealTimeWeight(weight.toString());
      setIsLoading(false);
    } catch (_error) {
      const error = _error as Error;
      console.error(error);
      setModalType('error');
      setModalMessage(error.message);
      setShowModal(true);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (createdDevice) setDevice(createdDevice);
    if (isUser(user)) {
      if (user.feederDevices) setDevice(user.feederDevices[0]);
    }
  }, []);

  useEffect(() => {
    if (device) getRealTimeWeight();
  }, [device]);

  return (
    <View style={styles.container}>
      {device ? (
        <>
          <View style={styles.deviceMajorInfo}>
            <Text style={styles.deviceName}>{device.name}</Text>
          </View>
          <TouchableOpacity
            style={styles.realTimeWeightContainer}
            onPress={() => getRealTimeWeight()}>
            {isLoading ? (
              <ActivityIndicator size={20} animating color="#eef280" />
            ) : (
              <>
                <WeightIcon name="weight" color="#80f2bd" size={40} />
                <Text
                  style={
                    styles.deviceRealTimeWeight
                  }>{`${formatStringOrNumberToDecimalStr(
                  realTimeWeight,
                )} g`}</Text>
              </>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FeederMeals', { screen: 'FeederMealsList' })
            }>
            <Image
              style={styles.mealsButton}
              source={require('../../../../assets/meals-logo.png')}
            />
          </TouchableOpacity>
        </>
      ) : (
        <Button
          size="large"
          type="setupNewDevice"
          onPress={() =>
            navigation.navigate('SetupNewDevice', {
              screen: 'DeviceConnectionInstructions',
            })
          }
        />
      )}
      <AlertModal
        message={modalMessage}
        onClose={() => setShowModal(false)}
        type={modalType}
        visible={showModal}
      />
    </View>
  );
};

export default FeedingControlDashboard;
