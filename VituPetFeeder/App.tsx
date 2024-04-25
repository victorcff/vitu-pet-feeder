if (__DEV__) {
  require('./ReactotronConfig');
}

import React, { useEffect, useState } from 'react';
import { ActivityIndicator, PermissionsAndroid, StatusBar } from 'react-native';
import 'react-native-gesture-handler';

import AppNavigator from './src/navigator';
import AlertModal from './src/components/AlertModal';

function App(): React.JSX.Element {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const requestFineLocationPermission = async () => {
    try {
      const fineLocationPermissionGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão para uso de localização precisa',
          message:
            'O app alimentador precisa desta permissão para acessar as infformações da rede Wifi conectada a este dispositivo',
          buttonPositive: 'Ok',
          buttonNegative: 'Não',
          buttonNeutral: 'Mais tarde',
        },
      );
      if (
        fineLocationPermissionGranted === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Permissão concedida com sucesso! (FINE_LOCATION)');
      }
    } catch (error) {
      const err = error as Error;
      setModalMessage(err.message);
      setShowModal(true);
    }
  };

  const requestCoarseLocationPermission = async () => {
    try {
      const coarseLocationPermissionGranted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        {
          title: 'Permissão para uso de localização precisa',
          message:
            'O app alimentador precisa desta permissão para acessar as infformações da rede Wifi conectada a este dispositivo',
          buttonPositive: 'Ok',
          buttonNegative: 'Não',
          buttonNeutral: 'Mais tarde',
        },
      );
      if (
        coarseLocationPermissionGranted === PermissionsAndroid.RESULTS.GRANTED
      ) {
        console.log('Permissão concedida com sucesso! (COARSE_LOCATION');
      }
    } catch (error) {
      const err = error as Error;
      setModalMessage(err.message);
      setShowModal(true);
    }
  };

  const requesAllPermissions = () => {
    setIsLoading(true);
    requestFineLocationPermission();
    requestCoarseLocationPermission();
    setIsLoading(false);
  };

  useEffect(() => {
    requesAllPermissions();
  }, []);

  return (
    <>
      <StatusBar barStyle={'light-content'} backgroundColor={'#302f2f'} />
      {!isLoading ? (
        <>
          <AppNavigator />
          <AlertModal
            type="warning"
            visible={showModal}
            message={modalMessage}
            onClose={() => setShowModal(false)}
          />
        </>
      ) : (
        <ActivityIndicator animating color={'#eef280'} size={'large'} />
      )}
    </>
  );
}

export default App;
