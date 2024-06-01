import React, { useState } from 'react';
import {
  CreateUserScreenProps,
  LoginScreenProps,
} from '../../../navigator/types/screenProps';
import { TextInputProps, View } from 'react-native';
import styles from './styles';
import CustomTextInput from '../../../components/CustomTextInput';
import {
  USER_PASSWORD_MAX_LENGTH,
  USERNAME_MAX_LENGTH,
} from '../../../consts/values';
import Button from '../../../components/Button';
import AlertModal from '../../../components/AlertModal';
import AuthServices from '../../../services/Auth';
import { AuthenticateUserRequest, CreateUserRequest } from '../../../types/api';
import { useAuth } from '../../../context/Auth/auth';

const CreateUser = ({ navigation, route }: CreateUserScreenProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { signIn } = useAuth();

  const createUser = async () => {
    if (password !== confirmPassword) {
      setModalMessage('Senha não confere.');
      setShowModal(true);
      return;
    }
    try {
      setIsLoading(true);
      const createUserParams: CreateUserRequest = {
        username,
        password,
      };
      const { data } = await AuthServices.createUser(createUserParams);
      const user = data;
      if (user) signIn(user);
      setIsLoading(false);
      navigation.navigate('HomeStack', { screen: 'SetupNewDevice' });
    } catch (_error) {
      const error = _error as Error;
      setIsLoading(false);
      setModalMessage(error.message);
      setShowModal(true);
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

  const passwordConfirmationInputProps: TextInputProps = {
    defaultValue: confirmPassword,
    maxLength: USER_PASSWORD_MAX_LENGTH,
    onChangeText: text => setConfirmPassword(text),
    placeholder: 'Confirme a senha',
    placeholderTextColor: '#80f2bd6b',
    style: styles.textInput,
  };

  return (
    <View style={styles.container}>
      <CustomTextInput size="large" textInputProps={usernameInputProps} />
      <CustomTextInput
        size="large"
        textInputProps={passwordInputProps}
        isPassword
      />
      <CustomTextInput
        size="large"
        textInputProps={passwordConfirmationInputProps}
        isPassword
      />
      <Button
        onPress={() => createUser()}
        isLoading={isLoading}
        size="medium"
        type="createUser"
        bottom
      />
      <AlertModal
        message={modalMessage}
        onClose={() => {
          setShowModal(false);
        }}
        type="error"
        visible={showModal}
      />
    </View>
  );
};

export default CreateUser;
