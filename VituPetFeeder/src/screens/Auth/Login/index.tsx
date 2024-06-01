import React, { useEffect, useState } from 'react';
import { Image, Platform, Text, TextInputProps, View } from 'react-native';
import { AxiosError } from 'axios';
import styles from './styles';
import { LoginScreenProps } from '../../../navigator/types/screenProps';
import CustomTextInput from '../../../components/CustomTextInput';
import {
  USER_PASSWORD_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
} from '../../../consts/values';
import Button from '../../../components/Button';
import AlertModal from '../../../components/AlertModal';
import AuthServices from '../../../services/Auth';
import { AuthenticateUserRequest, User } from '../../../types/api';
import { useAuth } from '../../../context/Auth/auth';
import { isLoginParams, isString, isUser } from '../../../utils/checkTypes';
import {
  getAsyncStorageData,
  storeAsyncStorageData,
} from '../../../storage/utils';
import { LOGIN_CREDENTIALS_STORAGE } from '../../../consts/storage';
import { CustomModalButtonGroup } from '../../../types/componentsProps';
import { useFocusEffect } from '@react-navigation/native';

const Login = ({ navigation, route }: LoginScreenProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [modalButtonGroup, setModalButtonGroup] = useState<
    CustomModalButtonGroup[] | undefined
  >(undefined);
  const [supportedBiometryTypes, setSupportedBiometryTypes] = useState({
    faceId: false,
    fingerprint: false,
  });

  const { signIn } = useAuth();

  const authenticate = async (loginParams: AuthenticateUserRequest) => {
    try {
      setIsLoading(true);
      const { data } = await AuthServices.login(loginParams);
      const user: User = {
        id: data.id,
        username: data.username,
        feederDevices: data.feeder_devices,
      };
      if (isUser(user)) {
        signIn(user);
        await storeAsyncStorageData(
          LOGIN_CREDENTIALS_STORAGE,
          JSON.stringify(loginParams),
        );
        if (user.feederDevices.length > 0) navigation.navigate('HomeStack');
        else
          navigation.navigate('SetupNewDevice', {
            screen: 'DeviceConnectionInstructions',
          });
      }
      setIsLoading(false);
    } catch (_error) {
      const error = _error as AxiosError;
      if (error.code === 'ERR_BAD_REQUEST')
        setModalMessage('Usuário ou senha incorretos!');
      else setModalMessage(error.code as string);
      setShowModal(true);
      setIsLoading(false);
    }
  };

  const usernameInputProps: TextInputProps = {
    defaultValue: username,
    maxLength: USERNAME_MAX_LENGTH,
    onChangeText: text => setUsername(text),
    placeholder: 'Nome de usuário',
    placeholderTextColor: '#80f2bd6b',
    style: styles.textInput,
  };

  const passwordInputProps: TextInputProps = {
    defaultValue: password,
    maxLength: USER_PASSWORD_MAX_LENGTH,
    onChangeText: text => setPassword(text),
    placeholder: 'Senha',
    placeholderTextColor: '#80f2bd6b',
    style: styles.textInput,
  };

  // const authenticateWithBiometry = async () => {
  //   try {
  //     const user = await verifyStoredUser();
  //     if (isLoginParams(user)) {
  //       if (verifySupportedBiometryTypes()) {
  //         setModalMessage(
  //           `Login por biometria.${'\n'}Deseja fazer login com o usuário ${
  //             user.username
  //           }?`,
  //         );
  //         const buttonGroup: CustomModalButtonGroup[] = [
  //           {
  //             onPress: () => authenticate(user),
  //             title: 'yes',
  //             type: 'primary',
  //           },
  //           {
  //             onPress: () => setShowModal(false),
  //             title: 'no',
  //             type: 'critical',
  //           },
  //         ];
  //         setModalButtonGroup(buttonGroup);
  //         setShowModal(true);
  //       }
  //     }
  //   } catch (error) {}
  // };

  // const verifySupportedBiometryTypes = () => {
  //   let supported = false;
  //   if (Platform.OS === 'android') {
  //     TouchID.isSupported()
  //       .then(success => (supported = true))
  //       .catch(error => console.log('HELOOUOUO'));
  //   }
  //   return supported;
  // };

  // const verifyStoredUser = async () => {
  //   try {
  //     const data = await getAsyncStorageData(LOGIN_CREDENTIALS_STORAGE);
  //     if (isString(data)) {
  //       return JSON.parse(data);
  //     }
  //   } catch (error) {}
  // };

  // useEffect(() => {
  //   authenticateWithBiometry();
  // }, []);

  // useFocusEffect(() => {

  // })

  return (
    <View style={styles.container}>
      <Image
        source={require('../../../../assets/login-logo.png')}
        style={styles.logoImage}
      />
      <CustomTextInput size="large" textInputProps={usernameInputProps} />
      <CustomTextInput
        size="large"
        textInputProps={passwordInputProps}
        isPassword
      />
      <Text
        onPress={() => navigation.navigate('CreateUser')}
        style={styles.createAccountLink}>
        Criar conta
      </Text>
      <Button
        onPress={() => authenticate({ username, password })}
        isLoading={isLoading}
        size="medium"
        type="login"
        bottom
      />
      <AlertModal
        message={modalMessage}
        onClose={() => {
          setShowModal(false);
        }}
        type="error"
        visible={showModal}
        buttonGroup={modalButtonGroup}
      />
    </View>
  );
};

export default Login;
